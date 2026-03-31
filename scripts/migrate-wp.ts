import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WP_BASE = "https://xn--gefhlsfrderung-1pb5g.de";
const WP_API = `${WP_BASE}/wp-json/wp/v2`;
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "content", "blog");
const IMAGES_DIR = path.join(PROJECT_ROOT, "public", "images", "blog");

// All 18 post IDs in chronological order
const POST_IDS = [
  1439, 42, 121, 2208, 2338, 2378, 2404, 2470, 2557, 2602, 2844, 3006, 3143,
  3168, 3198, 3290, 3622, 3766,
];

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  featured_media: number;
  categories: number[];
}

interface WPMedia {
  source_url: string;
  alt_text: string;
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
}

interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  categories: string[];
  image: string;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ⚠ Could not download image: ${url}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buffer);
    console.log(`  ✓ Image: ${path.basename(destPath)}`);
  } catch (e) {
    console.warn(`  ⚠ Image download failed: ${url}`, e);
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

function calcReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} Min.`;
}

function cleanWordPressHtml(html: string): string {
  let cleaned = html;

  // Remove Elementor wrapper sections and divs (keep inner content)
  cleaned = cleaned.replace(
    /<section[^>]*class="[^"]*elementor[^"]*"[^>]*>/gi,
    ""
  );
  cleaned = cleaned.replace(/<\/section>/gi, "");

  // Remove elementor container divs but keep content
  cleaned = cleaned.replace(
    /<div[^>]*class="[^"]*elementor-(widget-container|element|widget|column|row|section|container|inner)[^"]*"[^>]*>/gi,
    ""
  );
  // Remove matching closing divs (rough but effective)
  // We'll handle this by removing all divs and keeping block-level content
  cleaned = cleaned.replace(
    /<div[^>]*class="[^"]*mfn-[^"]*"[^>]*>/gi,
    ""
  );
  cleaned = cleaned.replace(
    /<div[^>]*class="[^"]*mcb-[^"]*"[^>]*>/gi,
    ""
  );

  // Remove all remaining wrapper divs (aggressive but needed for Elementor)
  cleaned = cleaned.replace(/<div[^>]*>/gi, "");
  cleaned = cleaned.replace(/<\/div>/gi, "");

  // Remove style attributes
  cleaned = cleaned.replace(/\s*style="[^"]*"/gi, "");

  // Remove class attributes
  cleaned = cleaned.replace(/\s*class="[^"]*"/gi, "");

  // Remove id attributes
  cleaned = cleaned.replace(/\s*id="[^"]*"/gi, "");

  // Remove data-* attributes
  cleaned = cleaned.replace(/\s*data-[a-z-]+="[^"]*"/gi, "");

  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p>\s*(&nbsp;)?\s*<\/p>/gi, "");

  // Remove spans that just wrap text
  cleaned = cleaned.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");

  // Remove width/height attributes from images (let CSS handle)
  cleaned = cleaned.replace(
    /\s*(width|height|loading|decoding|fetchpriority|sizes|srcset)="[^"]*"/gi,
    ""
  );

  return cleaned;
}

function replacePromoContent(html: string): {
  html: string;
  hasNewsletter: boolean;
  hasBookPromo: boolean;
  hasEbookPromo: boolean;
} {
  let hasNewsletter = false;
  let hasBookPromo = false;
  let hasEbookPromo = false;

  let result = html;

  // Replace newsletter forms (Brevo/Sendinblue)
  if (
    result.includes("sib_signup_form") ||
    result.includes("sib-form") ||
    result.includes("newsletter")
  ) {
    // Remove everything from form start to form end
    result = result.replace(
      /<form[^>]*sib[^>]*>[\s\S]*?<\/form>/gi,
      "\n\n<NewsletterSignup />\n\n"
    );
    // Also catch newsletter section wrappers
    result = result.replace(
      /Melde dich jetzt für[\s\S]*?(?=<h[1-6]|<p>(?!.*[Nn]ewsletter)|\n\n<)/gi,
      "\n\n<NewsletterSignup />\n\n"
    );
    if (
      result.includes("<NewsletterSignup") ||
      html.includes("sib_signup_form")
    ) {
      hasNewsletter = true;
    }
  }

  // Replace WooCommerce product blocks
  if (result.includes("woocommerce") || result.includes("product")) {
    result = result.replace(
      /<ul[^>]*products[^>]*>[\s\S]*?<\/ul>/gi,
      "\n\n<BookPromo />\n\n"
    );
    // Also catch product shortcode output
    result = result.replace(
      /\[products?[^\]]*\]/gi,
      "\n\n<BookPromo />\n\n"
    );
    if (result.includes("<BookPromo")) {
      hasBookPromo = true;
    }
  }

  // Check for ebook/bundle references
  if (
    html.toLowerCase().includes("e-book") ||
    html.toLowerCase().includes("ebook") ||
    html.toLowerCase().includes("leitfaden")
  ) {
    // If there's a book promo already, check if it's actually an ebook
    if (html.toLowerCase().includes("bundle")) {
      // Bundle includes both book + ebook
      hasBookPromo = true;
    }
  }

  // If no newsletter tag was inserted but there was a newsletter section, add manual flag
  if (
    !hasNewsletter &&
    (html.includes("Newsletter") || html.includes("abonnieren"))
  ) {
    hasNewsletter = true;
    // Add at the end if not already present
    if (!result.includes("<NewsletterSignup")) {
      result = result + "\n\n<NewsletterSignup />\n\n";
    }
  }

  return { html: result, hasNewsletter, hasBookPromo, hasEbookPromo };
}

async function fetchCategories(): Promise<Map<number, string>> {
  const cats = await fetchJSON<WPCategory[]>(`${WP_API}/categories?per_page=100`);
  const map = new Map<number, string>();
  for (const cat of cats) {
    map.set(cat.id, cat.name);
  }
  return map;
}

async function migratePost(
  postId: number,
  categoryMap: Map<number, string>,
  turndown: TurndownService
): Promise<BlogMeta> {
  console.log(`\n--- Fetching post ${postId}...`);

  const post = await fetchJSON<WPPost>(`${WP_API}/posts/${postId}`);
  const slug = post.slug;
  console.log(`  Title: ${stripHtml(post.title.rendered)}`);

  // Create image directory
  const imgDir = path.join(IMAGES_DIR, slug);
  fs.mkdirSync(imgDir, { recursive: true });

  // Download featured image
  let featuredImagePath = "";
  if (post.featured_media) {
    try {
      const media = await fetchJSON<WPMedia>(
        `${WP_API}/media/${post.featured_media}`
      );
      if (media.source_url) {
        const ext = path.extname(new URL(media.source_url).pathname) || ".jpg";
        featuredImagePath = `/images/blog/${slug}/featured${ext}`;
        await downloadImage(
          media.source_url,
          path.join(PROJECT_ROOT, "public", featuredImagePath)
        );
      }
    } catch (e) {
      console.warn(`  ⚠ Featured image fetch failed for post ${postId}`);
    }
  }

  // Process content
  let content = post.content.rendered;

  // Download content images and rewrite URLs
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  let match;
  const imageUrls = new Set<string>();
  while ((match = imgRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.includes("wp-content/uploads") && !imageUrls.has(url)) {
      imageUrls.add(url);
      const urlObj = new URL(url);
      let filename = path.basename(urlObj.pathname);
      // Remove size suffixes like -300x200
      filename = filename.replace(/-\d+x\d+(?=\.\w+$)/, "");
      const localPath = `/images/blog/${slug}/${filename}`;

      // Try to get full-size image (remove size suffix from URL too)
      const fullSizeUrl = url.replace(/-\d+x\d+(?=\.\w+)/, "");
      await downloadImage(
        fullSizeUrl,
        path.join(PROJECT_ROOT, "public", localPath)
      );

      // Replace all size variants of this image in content
      const baseUrl = url.replace(/-\d+x\d+(?=\.\w+)/, "").replace(/\.\w+$/, "");
      const escapedBase = baseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      content = content.replace(
        new RegExp(`${escapedBase}(-\\d+x\\d+)?\\.[a-zA-Z]+`, "g"),
        localPath
      );
    }
  }

  // Replace promotional content
  const promo = replacePromoContent(content);
  content = promo.html;

  // Clean WordPress HTML
  content = cleanWordPressHtml(content);

  // Convert to Markdown
  let markdown = turndown.turndown(content);

  // Clean up excessive newlines
  markdown = markdown.replace(/\n{4,}/g, "\n\n\n");

  // Escape curly braces for MDX
  markdown = markdown.replace(/(?<!\\)\{(?!\/\*)/g, "\\{");
  markdown = markdown.replace(/(?<!\\)\}(?!\*\/)/g, "\\}");

  // But un-escape component tags
  markdown = markdown.replace(
    /\\{(\s*\/\*[\s\S]*?\*\/\s*)\\}/g,
    "{$1}"
  );

  // Build imports
  const imports: string[] = [];
  if (promo.hasNewsletter || markdown.includes("<NewsletterSignup")) {
    imports.push(
      'import { NewsletterSignup } from "@/components/blog/NewsletterSignup";'
    );
  }
  if (promo.hasBookPromo || markdown.includes("<BookPromo")) {
    imports.push(
      'import { BookPromo } from "@/components/blog/BookPromo";'
    );
  }
  if (promo.hasEbookPromo || markdown.includes("<EbookPromo")) {
    imports.push(
      'import { EbookPromo } from "@/components/blog/EbookPromo";'
    );
  }

  const mdxContent = imports.length
    ? `${imports.join("\n")}\n\n${markdown}`
    : markdown;

  // Write MDX file
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  fs.writeFileSync(mdxPath, mdxContent, "utf-8");
  console.log(`  ✓ MDX: ${slug}.mdx`);

  // Build metadata
  const categories = post.categories
    .map((id) => categoryMap.get(id))
    .filter(Boolean) as string[];

  const cleanText = stripHtml(post.content.rendered);

  return {
    slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered).replace(/\s*\[…\]$/, "…"),
    date: post.date.split("T")[0],
    readTime: calcReadTime(cleanText),
    categories,
    image: featuredImagePath,
  };
}

async function main() {
  console.log("=== WordPress → MDX Migration ===\n");

  // Setup turndown
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  // Keep component tags as-is
  turndown.addRule("keepComponents", {
    filter: (node) => {
      const tagName = node.nodeName.toLowerCase();
      return ["newslettersignup", "bookpromo", "ebookpromo"].includes(tagName);
    },
    replacement: (_content, node) => {
      return `\n\n<${node.nodeName} />\n\n`;
    },
  });

  // Ensure directories exist
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  // Fetch categories
  console.log("Fetching categories...");
  const categoryMap = await fetchCategories();
  console.log(`  Found ${categoryMap.size} categories`);

  // Migrate each post
  const allMeta: BlogMeta[] = [];

  for (const postId of POST_IDS) {
    try {
      const meta = await migratePost(postId, categoryMap, turndown);
      allMeta.push(meta);
    } catch (e) {
      console.error(`  ✗ Failed to migrate post ${postId}:`, e);
    }
  }

  // Sort by date (newest first)
  allMeta.sort((a, b) => b.date.localeCompare(a.date));

  // Generate blog.ts data
  const allCategories = new Set<string>();
  for (const m of allMeta) {
    for (const c of m.categories) allCategories.add(c);
  }

  const postsArray = allMeta
    .map(
      (m) =>
        `  {
    slug: ${JSON.stringify(m.slug)},
    title: ${JSON.stringify(m.title)},
    excerpt: ${JSON.stringify(m.excerpt)},
    date: ${JSON.stringify(m.date)},
    readTime: ${JSON.stringify(m.readTime)},
    categories: ${JSON.stringify(m.categories)},
    image: ${JSON.stringify(m.image)},
  }`
    )
    .join(",\n");

  const categoriesArray = [...allCategories].sort();

  const blogTsContent = `export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  categories: string[];
  image: string;
};

export const blogPosts: BlogPost[] = [
${postsArray},
];

export const blogCategories = [
  "Alle",
${categoriesArray.map((c) => `  ${JSON.stringify(c)},`).join("\n")}
];

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
`;

  const blogTsPath = path.join(PROJECT_ROOT, "scripts", "blog-data-output.ts");
  fs.writeFileSync(blogTsPath, blogTsContent, "utf-8");
  console.log(`\n✓ Generated blog data → scripts/blog-data-output.ts`);

  console.log(`\n=== Migration Complete ===`);
  console.log(`  Posts migrated: ${allMeta.length}`);
  console.log(`  Categories: ${categoriesArray.join(", ")}`);
}

main().catch(console.error);
