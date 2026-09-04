import Link from "next/link";
import { CustomCTA } from "@/components/CustomCTA";
import { ProductMedia } from "@/components/ProductMedia";
import type { Product } from "@/lib/products";
import { formatPrice, getCategoryName, getProductUrl } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "attention" }) {
  const classes =
    variant === "attention"
      ? "bg-amber-100 text-amber-900 ring-amber-200"
      : "text-neutral-800 ring-neutral-200";

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ring-1 ${classes}`}>
      {children}
    </span>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const { metadata, media } = product;
  const categoryName = getCategoryName(metadata.category);
  const productUrl = getProductUrl(product);

  return (
    <article
      data-product-card-id={metadata.id}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/80 transition hover:shadow-md hover:ring-neutral-300"
    >
      <Link
        href={productUrl}
        className="relative block aspect-square overflow-hidden bg-neutral-100"
      >
        <ProductMedia
          id={metadata.id}
          media={media}
          label={`${metadata.title} em mídia do produto`}
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {metadata.limited && <Badge variant="attention">Edição limitada</Badge>}
          <Badge>{categoryName}</Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-semibold text-neutral-900">{metadata.title}</h3>
        <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
          {metadata.description}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-neutral-900">
            {formatPrice(metadata.price)}
          </span>
        </div>
        <Link
          href={productUrl}
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
