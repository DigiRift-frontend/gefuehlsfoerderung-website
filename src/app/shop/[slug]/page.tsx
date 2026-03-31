import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";
import { ProductDetail } from "@/components/shop/ProductDetail";
import type { Metadata } from "next";

const SITE_URL = "https://gefühlsförderung.de";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const url = `${SITE_URL}/shop/${product.slug}`;
  const imageUrl = `${SITE_URL}${product.images[0]}`;

  return {
    title: product.title,
    description: product.description,
    keywords: [
      ...(product.emotions ?? []),
      product.category,
      "Gefühlsförderung",
      "Kinder",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      title: product.title,
      description: product.description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [imageUrl],
    },
  };
}

function ProductJsonLd({
  product,
}: {
  product: (typeof products)[number];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => `${SITE_URL}${img}`),
    brand: {
      "@type": "Brand",
      name: "Gefühlsförderung",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Gefühlsförderung",
      },
    },
    ...(product.ageRange && { audience: { "@type": "PeopleAudience", suggestedAge: product.ageRange } }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({
  product,
}: {
  product: (typeof products)[number];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${SITE_URL}/shop/${product.slug}`,
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd product={product} />
      <ProductDetail product={product} relatedProducts={related} />
    </>
  );
}
