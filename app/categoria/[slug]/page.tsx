import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InspirationGrid } from "@/components/InspirationGrid";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
  type CategorySlug,
} from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Categoria" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const list = getProductsByCategory(category.slug as CategorySlug);

  return (
    <div>
      <section className="border-b border-neutral-200 bg-white">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Categoria
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-4 text-pretty text-neutral-600">
              {category.description}
            </p>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 lg:block">
            <div className="relative ml-auto mr-4 mt-8 aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl opacity-90 ring-1 ring-neutral-200/80">
              <Image
                src={category.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-8 max-w-2xl text-pretty text-neutral-600">
          Esses são apenas exemplos. Você pode pedir algo totalmente diferente.
        </p>
        {list.length === 0 ? (
          <p className="text-neutral-600">
            Em breve novos exemplos nesta categoria. Enquanto isso,{" "}
            <a href="/orcamento" className="font-semibold underline underline-offset-2">
              solicite um orçamento
            </a>
            .
          </p>
        ) : (
          <InspirationGrid products={list} />
        )}
      </section>
    </div>
  );
}
