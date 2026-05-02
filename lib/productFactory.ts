export type CategorySlug =
  | "casa"
  | "brinquedos"
  | "mecanicos"
  | "maquetes"
  | "variados";

export type ProductImageSet = {
  studio: string;
  lifestyle: string;
  texture: string;
};

export type ProductConfig = {
  id: string;
  nome: string;
  categoria: CategorySlug;
  tipo: string;
  preco: number;
  precoOriginal: number;
  estoque: number;
  descricaoCurta: string;
  imagens: ProductImageSet;
  edicaoLimitada?: boolean;
  pecaUnica?: boolean;
  destaque?: boolean;
};

export type Product = ProductConfig & {
  name: string;
  categorySlug: CategorySlug;
  description: string;
  images: ProductImageSet;
  price: number;
  priceAnchor: number;
  initialStock: number;
  limitedEdition: boolean;
  uniquePiece: boolean;
  featured: boolean;
};

export function createProduct(config: ProductConfig): Product {
  return {
    ...config,
    name: config.nome,
    categorySlug: config.categoria,
    description: config.descricaoCurta,
    images: config.imagens,
    price: config.preco,
    priceAnchor: config.precoOriginal,
    initialStock: config.estoque,
    limitedEdition: config.edicaoLimitada ?? false,
    uniquePiece: config.pecaUnica ?? false,
    featured: config.destaque ?? false,
  };
}
