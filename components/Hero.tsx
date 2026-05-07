import Image from "next/image";
import Link from "next/link";
import { getHeroFeaturedProduct } from "@/lib/data";

export function Hero() {
  const featured = getHeroFeaturedProduct();
  const heroImage = featured.images.lifestyle;

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:py-20">
        <div className="order-2 flex flex-col justify-center text-center lg:order-1 lg:text-left">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Impressão 3D sob medida
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Você imagina. A gente cria.
          </h1>
          <p className="mt-4 w-full text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Transforme qualquer ideia em um objeto real — sem precisar saber modelar ou desenhar.
          </p>

          <div className="mt-6">
            <p className="text-sm text-neutral-500">
              De decoração a peças funcionais. Do simples ao complexo.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Link
              href="/orcamento"
              className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              Criar minha ideia
            </Link>
            <Link
              href="/#ideias"
              className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white px-8 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-50 active:scale-[0.98]"
            >
              Ver exemplos
            </Link>
          </div>

          <p className="mt-6 w-full text-sm leading-relaxed text-neutral-500">
            Não encontrou pronto? Melhor ainda.
            <Link
              href={`/produto/${featured.id}`}
              className="ml-1 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-700"
            >
              Comprar algo pronto
            </Link>
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200/60 sm:aspect-[3/4]">
            <Image
              src={heroImage}
              alt={featured.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
