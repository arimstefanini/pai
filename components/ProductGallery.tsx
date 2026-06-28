/**
 * ProductGallery - Instagram-like gallery component
 * Displays products in a grid with automatic media type detection
 */

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

interface ProductGalleryProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function ProductGallery({
  products,
  title = "Prova visual",
  subtitle = "Do estúdio ao ambiente real — cada detalhe importa.",
}: ProductGalleryProps) {
  return (
    <section
      id="galeria"
      className="scroll-mt-20 border-t border-neutral-100 bg-neutral-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-pretty text-neutral-600">{subtitle}</p>

        {/* Products Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.metadata.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-neutral-500">Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </section>
  );
}
