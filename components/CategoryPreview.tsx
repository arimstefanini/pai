import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  products: Product[];
};

export function CategoryPreview({ products }: Props) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
