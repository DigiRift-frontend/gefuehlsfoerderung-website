"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts, blogCategories, formatDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function BlogList() {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered =
    activeCategory === "Alle"
      ? blogPosts
      : blogPosts.filter((p) => p.categories.includes(activeCategory));

  const colors = [
    "bg-lavender/10",
    "bg-rose/10",
    "bg-sage/10",
    "bg-gold/10",
    "bg-lavender/10",
    "bg-rose/10",
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-10 justify-center"
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-lavender text-white shadow-sm"
                  : "bg-white text-charcoal-light hover:bg-lavender/10 border border-lavender/15"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                {/* Article Image */}
                <div
                  className={`aspect-[16/10] rounded-2xl ${colors[i % colors.length]} relative mb-5 overflow-hidden group-hover:shadow-md transition-shadow`}
                >
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-xs text-charcoal/25 italic">
                        [Artikelbild]
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  {post.categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-semibold text-lavender-dark bg-lavender/10 px-2.5 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                  <span className="flex items-center gap-1 text-xs text-charcoal-lighter">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-semibold text-lg text-charcoal group-hover:text-lavender-dark transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-charcoal-light leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-charcoal-lighter">
                    {formatDate(post.date)}
                  </p>
                  <span className="text-sm text-lavender-dark font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lesen
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-charcoal-lighter py-12">
            Keine Artikel in dieser Kategorie gefunden.
          </p>
        )}

        {/* Author Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-white rounded-3xl p-8 md:p-12 border border-lavender/10 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="w-24 h-24 rounded-full bg-lavender/15 flex items-center justify-center shrink-0">
            <span className="text-3xl">👩‍💼</span>
          </div>
          <div>
            <p className="text-sm text-lavender-dark font-semibold uppercase tracking-wider">
              Autorin
            </p>
            <h3 className="text-xl font-bold text-charcoal mt-1">
              Ewelina Gawlik
            </h3>
            <p className="mt-2 text-charcoal-light leading-relaxed">
              Kindheitspädagogin B.A. und Mutter von zwei Kindern. Ewelina
              schreibt über die emotionale Entwicklung von Kindern und gibt
              praxisnahe Tipps für den Familienalltag.
            </p>
            <Link
              href="/ueber-ewelina"
              className="mt-3 inline-flex items-center gap-1 text-sm text-lavender-dark font-medium hover:gap-2 transition-all"
            >
              Mehr über Ewelina
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
