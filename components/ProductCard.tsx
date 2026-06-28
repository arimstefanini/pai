import Link from "next/link";
import { ProductMedia } from "@/components/ProductMedia";
import { CustomCTA } from "@/components/CustomCTA";
import { ProductMedia } from "@/components/ProductMedia";
import type { Product } from "@/lib/data";
import { formatBRL } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { metadata, media } = product;
  const categoryName = getCategoryName(metadata.category);
  const priceFormatted = formatPrice(metadata.price);

  return (
    <article
      data-product-card-id={product.id}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/80 transition hover:shadow-md hover:ring-neutral-300"
    >
      <Link
        href={getProductUrl(product)}
        className="relative block aspect-square overflow-hidden bg-neutral-100"
      >
        <ProductMedia
          id={product.id}
          src="/video/videoBlender.mp4"
          poster={product.images.studio}
          label={`${product.name} em vídeo`}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {metadata.limited && (
            <Badge variant="attention">Edição limitada</Badge>
          )}
          <Badge variant="default">{categoryName}</Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-semibold text-neutral-900">{metadata.title}</h3>
        <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
          {metadata.description}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-neutral-900">
            {priceFormatted}
          </span>
        </div>
        <Link
          href={getProductUrl(product)}
          className="mt-4 text-sm font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
        >
          Ver
        </Link>
        <div className="mt-3">
          <CustomCTA productName={metadata.title} />
        </div>
      </div>
    </article>
  );
}
