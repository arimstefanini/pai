import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProductById, products, type CategorySlug } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ categoria?: string }>;
};

const allowedCategories: CategorySlug[] = [
  "casa",
  "brinquedos",
  "mecanicos",
  "maquetes",
  "variados",
];

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Produto" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { categoria } = await searchParams;

  const product = getProductById(id);
  if (!product) notFound();
  const initialCategory = allowedCategories.includes(categoria as CategorySlug)
    ? (categoria as CategorySlug)
    : null;

  return (
    <ProductDetailClient
      product={product}
      allProducts={products}
      initialCategory={initialCategory}
    />
  );
}
