import Image from "next/image";
import type { ProductMedia as ProductMediaData } from "@/lib/products";

type ProductMediaProps = {
  id: string;
  media: ProductMediaData;
  label: string;
  className?: string;
  priority?: boolean;
};

export function ProductMedia({
  id,
  media,
  label,
  className = "",
  priority = false,
}: ProductMediaProps) {
  if (media.type === "image") {
    return (
      <Image
        src={media.url}
        alt={label}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <video
      data-product-video-id={id}
      className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${className}`}
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={media.url} type={`video/${media.format}`} />
      Seu navegador não suporta vídeo HTML5.
    </video>
  );
}
