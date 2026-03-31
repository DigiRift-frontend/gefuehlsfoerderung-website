import Image from "next/image";
import Link from "next/link";
import { getRelatedPosts } from "@/lib/blog";

export function RelatedPosts({ slug }: { slug: string }) {
  const posts = getRelatedPosts(slug, 3);
  if (posts.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-16">
      <h2 className="text-2xl font-bold text-charcoal text-center mb-8">
        Das könnte dich auch interessieren
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-charcoal leading-snug line-clamp-2 group-hover:text-lavender-dark transition-colors">
                {post.title}
              </h3>
              <p className="mt-1.5 text-xs text-charcoal-lighter line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
