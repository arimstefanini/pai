import Link from "next/link";
import { CustomCTA } from "@/components/CustomCTA";
import { ProductMedia } from "@/components/ProductMedia";
import type { Product } from "@/lib/data";
import { formatBRL } from "@/lib/data";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  return (
    <article
      data-product-card-id={product.id}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/80 transition hover:shadow-md hover:ring-neutral-300"
    >
      <Link
        href={`/produto/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-neutral-100"
      >
        <ProductMedia
          id={product.id}
          src="/video/videoBlender.mp4"
          poster={product.images.studio}
          label={`${product.name} em vídeo`}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.limitedEdition && (
            <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white">
              Edição limitada
            </span>
          )}
          {product.uniquePiece && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200/80">
              Peça única
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-semibold text-neutral-900">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm text-neutral-400 line-through">
            {formatBRL(product.priceAnchor)}
          </span>
          <span className="text-lg font-semibold text-neutral-900">
            {formatBRL(product.price)}
          </span>
        </div>
        <Link
          href={`/produto/${product.id}`}
          className="mt-4 text-sm font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
        >
          Ver
        </Link>
        <div className="mt-3">
          <CustomCTA productName={product.name} />
        </div>
      </div>
    </article>
  );
}
