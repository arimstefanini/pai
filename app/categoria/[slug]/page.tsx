/**
 * Category page
 * Shows all products in a category from the file-based CMS
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InspirationGrid } from "@/components/InspirationGrid";
import {
  extractCategories,
  getProductsByCategory,
  type ProductMetadata,
  loadAllProducts,
} from "@/lib/products";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all categories
 */
export async function generateStaticParams() {
  const products = await loadAllProducts();
  const categories = extractCategories(products);
  return categories.map((c) => ({ slug: c.slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await loadAllProducts();
  const categories = extractCategories(products);
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Categoria" };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

/**
 * Category page
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Load all products
  const allProducts = await loadAllProducts();
  const categories = extractCategories(allProducts);

  // Find category
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  // Get products in category
  const products = await getProductsByCategory(
    slug as ProductMetadata["category"],
  );

  return (
    <div>
      {/* Header */}
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mb-8 max-w-2xl text-pretty text-neutral-600">
          Esses são apenas exemplos. Você pode pedir algo totalmente diferente.
        </p>
        {products.length === 0 ? (
          <p className="text-neutral-600">
            Em breve novos exemplos nesta categoria. Enquanto isso,{" "}
            <a
              href="/orcamento"
              className="font-semibold underline underline-offset-2"
            >
              solicite um orçamento
            </a>
            .
          </p>
        ) : (
          <InspirationGrid products={products} />
        )}
      </section>
    </div>
  );
}
