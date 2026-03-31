"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { blogPosts, formatDate } from "@/lib/blog";

const articles = blogPosts.slice(0, 3).map((post, i) => ({
  title: post.title,
  excerpt: post.excerpt,
  date: formatDate(post.date),
  readTime: post.readTime,
  category: post.categories[0],
  href: `/blog/${post.slug}`,
  image: post.image,
  color: ["bg-lavender/10", "bg-rose/10", "bg-sage/10"][i],
}));

export function BlogTeaser() {
  return (
    <section className="py-16 md:py-24 bg-cream relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
        >
          <div>
            <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Wissen &amp; Tipps
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">
              Aus dem Blog
            </h2>
          </div>
          <Button href="/blog" variant="ghost" className="group">
            Alle Artikel
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link href={article.href}>
                <div
                  className={`aspect-[16/10] rounded-2xl ${article.color} mb-5 overflow-hidden relative`}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-lavender-dark bg-lavender/10 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-charcoal-lighter">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-semibold text-charcoal group-hover:text-lavender-dark transition-colors text-lg leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal-light leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <p className="mt-3 text-xs text-charcoal-lighter">
                  {article.date}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
