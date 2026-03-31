"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SVGProps } from "react";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const footerNav = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Gefühls-Quiz", href: "/quiz" },
    { name: "Über Ewelina", href: "/ueber-ewelina" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "AGB", href: "/agb" },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/gefuehls_foerderung/",
      icon: InstagramIcon,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100079552061321",
      icon: FacebookIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ewelina-gawlik-2639a3244",
      icon: LinkedinIcon,
    },
    {
      name: "Pinterest",
      href: "https://www.pinterest.de/03e7ou0bzun1qeny53apaff84yesuj/",
      icon: PinterestIcon,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream-dark mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <span className="font-heading text-3xl text-lavender-light">
              Gefühlsförderung
            </span>
            <p className="mt-4 text-sm text-cream-dark/70 leading-relaxed">
              Hilf deinem Kind, seine Gefühle zu verstehen und ein starker,
              empathischer Erwachsener zu werden.
            </p>
            <div className="flex gap-3 mt-6">
              {footerNav.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-cream/5 hover:bg-lavender/20 rounded-full transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-4 w-4 text-cream-dark/80" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lavender-light mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerNav.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-dark/70 hover:text-lavender-light transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lavender-light mb-4">
              Informationen
            </h3>
            <ul className="space-y-3">
              {footerNav.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-dark/70 hover:text-lavender-light transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-lavender-light mb-4">
              Kontakt
            </h3>
            <p className="text-sm text-cream-dark/70">
              Ewelina Gawlik
              <br />
              Kindheitspädagogin B.A.
            </p>
            <a
              href="mailto:mail@ewelinagawlik.de"
              className="text-sm text-lavender-light hover:text-lavender transition-colors mt-2 inline-block"
            >
              mail@ewelinagawlik.de
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-cream/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-cream-dark/50">
            &copy; {new Date().getFullYear()} Ewelina Gawlik. Alle Rechte
            vorbehalten.
          </p>
          <p className="text-xs text-cream-dark/40">
            Von einer Kindheitspädagogin entwickelt
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
