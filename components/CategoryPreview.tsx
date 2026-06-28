/**
 * Category preview - displays a grid of products
 */

import { ProductCard } from "@/components/ProductCard";
import { ProductPlaybackController } from "@/components/playback/ProductPlaybackController";
import type { Product } from "@/lib/products";

interface CategoryPreviewProps {
  products: Product[];
}

export function CategoryPreview({ products }: CategoryPreviewProps) {
  return (
    <ProductPlaybackController className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.metadata.id} product={product} />
      ))}
    </ProductPlaybackController>
  );
}
