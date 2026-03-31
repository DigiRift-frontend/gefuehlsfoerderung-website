import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { BookPromo } from "@/components/blog/BookPromo";
import { EbookPromo } from "@/components/blog/EbookPromo";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    NewsletterSignup,
    BookPromo,
    EbookPromo,
    img: ({ alt, ...rest }) => (
      <Image
        width={800}
        height={450}
        className="rounded-xl my-6"
        alt={alt || ""}
        {...(rest as Omit<React.ComponentProps<typeof Image>, "alt">)}
      />
    ),
    ...components,
  };
}
