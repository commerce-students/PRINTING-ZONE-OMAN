import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The company's EXISTING logo, used exactly as supplied.
 *
 * The file at /public/brand/printing-zone-oman-logo.png is the unmodified
 * original asset retrieved from the company's live website (160 × 100, RGB with
 * alpha). It is never redrawn, recoloured, cropped, stretched or replaced — only
 * scaled proportionally, with clear space around it. See /docs/BRAND-ASSETS.md.
 */
export function Logo({
  href = "/",
  priority = false,
  className = "",
  height = 44,
}: {
  href?: string | null;
  priority?: boolean;
  className?: string;
  height?: number;
}) {
  const width = Math.round((height * site.logo.width) / site.logo.height);

  const image = (
    <Image
      src={site.logo.src}
      alt={site.logo.alt}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className="block h-auto w-auto"
      style={{ height, width: "auto" }}
    />
  );

  if (!href) {
    return <span className={`inline-flex items-center ${className}`}>{image}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="Printing Zone Oman — home"
      className={`inline-flex items-center rounded-sm ${className}`}
    >
      {image}
    </Link>
  );
}
