import Image from "next/image";
import type { Product } from "@/lib/data";

type Props = {
  products: Product[];
  title?: string;
  subtitle?: string;
};

export function ProductGallery({
  products,
  title = "Prova visual",
  subtitle = "Do estúdio ao ambiente real — cada detalhe importa.",
}: Props) {
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

        <div className="mt-10 space-y-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8"
            >
              <h3 className="text-lg font-semibold text-neutral-900">
                {product.name}
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <figure className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={product.images.studio}
                    alt={`${product.name} — fundo claro`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-white/90 px-3 py-2 text-xs font-medium text-neutral-600 backdrop-blur-sm">
                    Produto isolado
                  </figcaption>
                </figure>
                <figure className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={product.images.lifestyle}
                    alt={`${product.name} — ambiente`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-white/90 px-3 py-2 text-xs font-medium text-neutral-600 backdrop-blur-sm">
                    Ambiente real
                  </figcaption>
                </figure>
                <figure className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={product.images.texture}
                    alt={`${product.name} — textura`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-white/90 px-3 py-2 text-xs font-medium text-neutral-600 backdrop-blur-sm">
                    Close da textura
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
