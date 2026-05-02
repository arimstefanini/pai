import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export function CategoryGrid() {
  return (
    <section
      id="categorias"
      className="scroll-mt-20 border-t border-neutral-100 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Categorias
        </h2>
        <p className="mt-3 max-w-2xl text-pretty text-neutral-600">
          Escolha um caminho — cada categoria tem exemplos prontos para inspirar
          ou encomendar.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/categoria/${cat.slug}`}
                className="group block overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80 transition hover:ring-neutral-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cat.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <span className="text-lg font-semibold text-white sm:text-xl">
                      {cat.name}
                    </span>
                    <p className="mt-1 text-sm text-white/90">
                      {cat.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
