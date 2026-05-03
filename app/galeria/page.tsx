import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { products, type CategorySlug, getProductById } from "@/lib/data";

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function GaleriaPage({ searchParams }: Props) {
  const { categoria } = await searchParams;

  const allowedCategories = ["casa", "brinquedos", "mecanicos", "maquetes"];
  const initialCategory = allowedCategories.includes(categoria as CategorySlug)
    ? (categoria as CategorySlug)
    : null;

  const fallbackProduct = getProductById("vaso-orbita") ?? products[0];

  if (!fallbackProduct) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={fallbackProduct}
      allProducts={products}
      initialCategory={initialCategory}
    />
  );
}
