import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductPlaybackController } from "@/components/playback/ProductPlaybackController";

type Props = {
  products: Product[];
};

export function CategoryPreview({ products }: Props) {
  return (
    <ProductPlaybackController className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductPlaybackController>
  );
}
