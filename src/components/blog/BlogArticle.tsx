import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";
import { NewsletterCompact } from "@/components/sections/NewsletterCompact";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { QuizBanner } from "@/components/sections/QuizBanner";

export function BlogArticle({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  return (
    <article className="pb-20">
      {/* Header Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 md:pt-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-lavender-dark font-medium hover:gap-2.5 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Alle Artikel
        </Link>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {post.categories.map((cat) => (
            <span
              key={cat}
              className="text-xs font-semibold text-lavender-dark bg-lavender/10 px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Author + Meta */}
        <div className="mt-6 flex items-center gap-4">
          <Link href="/ueber-ewelina" className="shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden relative border-2 border-lavender/15 shadow-sm">
              <Image
                src="/images/author/ewelina-ueber-mich.jpeg"
                alt="Ewelina Gawlik"
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
          </Link>
          <div>
            <Link
              href="/ueber-ewelina"
              className="text-sm font-semibold text-charcoal hover:text-lavender-dark transition-colors"
            >
              Ewelina Gawlik
            </Link>
            <p className="text-xs text-lavender-dark font-medium">
              Kindheitspädagogin B.A.
            </p>
          </div>
          <span className="h-5 w-px bg-charcoal/10" />
          <div className="flex items-center gap-4 text-sm text-charcoal-lighter">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px bg-gradient-to-r from-lavender/30 via-rose/20 to-transparent" />
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-lavender/5 shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-10">
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-charcoal
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-charcoal-light prose-p:leading-relaxed
            prose-a:text-lavender-dark prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-strong:text-charcoal prose-strong:font-semibold
            prose-ul:text-charcoal-light prose-ol:text-charcoal-light
            prose-li:leading-relaxed prose-li:my-1
            prose-blockquote:border-l-lavender prose-blockquote:text-charcoal-light prose-blockquote:not-italic
            prose-img:rounded-xl prose-img:shadow-sm
            prose-hr:border-lavender/20
          "
        >
          {children}
        </div>
      </div>

      {/* Quiz CTA */}
      <div className="mx-auto max-w-3xl mt-6">
        <QuizBanner variant="blog" />
      </div>

      {/* Share */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-10">
        <div className="h-px bg-gradient-to-r from-transparent via-lavender/20 to-transparent mb-6" />
        <ShareButtons slug={post.slug} title={post.title} />
      </div>

      {/* Related Posts */}
      <RelatedPosts slug={post.slug} />

      {/* Newsletter – full width like shop */}
      <div className="mt-16">
        <NewsletterCompact variant="default" />
      </div>

      {/* Back */}
      <div className="mt-8 text-center pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-lavender/10 px-6 py-3 text-sm font-semibold text-lavender-dark hover:bg-lavender/20 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>
      </div>
    </article>
  );
}
