import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductPlaybackController } from "@/components/playback/ProductPlaybackController";

type Props = {
  products: Product[];
};

export function InspirationGrid({ products }: Props) {
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
