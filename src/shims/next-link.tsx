import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Shim for `next/link` so that @wolfconsulting/legal-pages (which imports
 * `Link` from "next/link") works in a Vite + React Router project.
 * Converts Next.js `href` prop to React Router's `to` prop.
 * External URLs and mailto links fall through to a plain `<a>`.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }
>(function NextLinkShim({ href, ...props }, ref) {
  if (
    !href ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return <a ref={ref} href={href} {...props} />;
  }
  return <RouterLink ref={ref} to={href} {...props} />;
});

export default Link;
