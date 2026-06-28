/**
 * Inspiration grid - displays products in a grid layout
 */

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

interface InspirationGridProps {
  products: Product[];
}

export function InspirationGrid({ products }: InspirationGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.metadata.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
