/**
 * Inspiration grid - displays products in a grid layout
 */

import { ProductCard } from "@/components/ProductCard";
import { ProductPlaybackController } from "@/components/playback/ProductPlaybackController";

interface InspirationGridProps {
  products: Product[];
}

export function InspirationGrid({ products }: InspirationGridProps) {
  return (
    <ProductPlaybackController>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </ProductPlaybackController>
  );
}
