import Link from "next/link";
import type { Category, Product } from "@/lib/data";
import { CategoryPreview } from "@/components/CategoryPreview";

type Props = {
  category: Category;
  products: Product[];
};

export function CategorySection({ category, products }: Props) {
  return (
    <section className="border-t border-neutral-100 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              {category.name}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{category.description}</p>
          </div>
          <Link
            href={`/categoria/${category.slug}`}
            className="text-sm font-semibold text-neutral-800 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-950"
          >
            Ver tudo
          </Link>
        </div>
        <CategoryPreview products={products} />
      </div>
    </section>
  );
}
