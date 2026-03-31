import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blog";
import { BlogArticle } from "@/components/blog/BlogArticle";
import type { Metadata } from "next";

const SITE_URL = "https://gefühlsförderung.de";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}${post.image}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.categories,
    authors: [{ name: "Ewelina Gawlik", url: `${SITE_URL}/ueber-ewelina` }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.modifiedDate ?? post.date,
      authors: ["Ewelina Gawlik"],
      tags: post.categories,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

function BlogPostingJsonLd({ post }: { post: (typeof blogPosts)[number] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.modifiedDate ?? post.date,
    author: {
      "@type": "Person",
      name: "Ewelina Gawlik",
      url: `${SITE_URL}/ueber-ewelina`,
      jobTitle: "Kindheitspädagogin B.A.",
    },
    publisher: {
      "@type": "Organization",
      name: "Gefühlsförderung",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.categories.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ post }: { post: (typeof blogPosts)[number] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  let Content: React.ComponentType;
  try {
    const mdx = await import(`@/content/blog/${slug}.mdx`);
    Content = mdx.default;
  } catch {
    notFound();
  }

  return (
    <>
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />
      <BlogArticle post={post}>
        <Content />
      </BlogArticle>
    </>
  );
}

export const dynamicParams = false;
