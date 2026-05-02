import {
  createProduct,
  type CategorySlug,
  type Product,
  type ProductImageSet,
} from "@/lib/productFactory";

export type { CategorySlug, Product } from "@/lib/productFactory";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  shortDescription: string;
  coverImage: string;
};

export type Testimonial = {
  id: string;
  quote: string;
};

const u = (photoPath: string, w = 1200) =>
  `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${w}&q=85`;

const image = (
  studio: string,
  lifestyle: string,
  texture: string,
): ProductImageSet => ({
  studio: u(studio),
  lifestyle: u(lifestyle),
  texture: u(texture),
});

export const categories: Category[] = [
  {
    slug: "casa",
    name: "Casa",
    description: "Decoracao, esculturas, vasos e objetos minimalistas.",
    shortDescription: "Decoracao, esculturas, vasos e objetos minimalistas.",
    coverImage: u("photo-1615876235886-7b93c2830d04"),
  },
  {
    slug: "brinquedos",
    name: "Brinquedos",
    description: "Bonecos, itens criativos e personalizados.",
    shortDescription: "Bonecos, itens criativos e personalizados.",
    coverImage: u("photo-1566576721347-d08810dc9abf"),
  },
  {
    slug: "mecanicos",
    name: "Projetos mecânicos",
    description: "Peças funcionais e soluções práticas.",
    shortDescription: "Peças funcionais e soluções práticas.",
    coverImage: u("photo-1581092160562-40aa08e78837"),
  },
  {
    slug: "maquetes",
    name: "Maquetes arquitetônicas",
    description: "Modelos detalhados para visualização arquitetônica.",
    shortDescription: "Modelos detalhados para visualização arquitetônica.",
    coverImage: u("photo-1503387762-592deb58ef4e"),
  },
  {
    slug: "variados",
    name: "Variados",
    description: "Itens customizados sob demanda.",
    shortDescription: "Itens customizados sob demanda.",
    coverImage: u("photo-1631541965785-d87a7c37f53d"),
  },
];

const productConfigs = [
  {
    id: "vaso-orbita",
    nome: "Vaso Órbita",
    categoria: "casa",
    tipo: "vaso",
    precoOriginal: 120,
    preco: 69,
    estoque: 7,
    descricaoCurta: "Vaso escultural com linhas fluidas e acabamento premium.",
    imagens: image(
      "photo-1578500494198-246f612d51b9",
      "photo-1615876235886-7b93c2830d04",
      "photo-1610701596000-5baa1cf2e189",
    ),
    destaque: true,
    edicaoLimitada: true,
  },
  {
    id: "escultura-linhas",
    nome: "Escultura Linhas",
    categoria: "casa",
    tipo: "escultura",
    precoOriginal: 189,
    preco: 119,
    estoque: 12,
    descricaoCurta: "Escultura minimalista para decoracao sofisticada.",
    imagens: image(
      "photo-1600607687939-ce8a6c25118c",
      "photo-1600607687644-c7171b424f5c",
      "photo-1615529328331-f8917597711f",
    ),
    edicaoLimitada: true,
  },
  {
    id: "luminaria-aurora",
    nome: "Luminária Aurora",
    categoria: "casa",
    tipo: "luminaria",
    precoOriginal: 165,
    preco: 99,
    estoque: 10,
    descricaoCurta: "Luminária decorativa com textura translúcida.",
    imagens: image(
      "photo-1513506003901-1e6a229e2d15",
      "photo-1484101403633-562f891dc89a",
      "photo-1507473885765-e6ed057f782c",
    ),
    edicaoLimitada: true,
  },
  {
    id: "boneco-heroi",
    nome: "Boneco Herói Custom",
    categoria: "brinquedos",
    tipo: "boneco",
    precoOriginal: 95,
    preco: 59,
    estoque: 5,
    descricaoCurta: "Figura customizável com acabamento premium.",
    imagens: image(
      "photo-1566576721347-d08810dc9abf",
      "photo-1515488042361-ee00e0ddd4e4",
      "photo-1558618666-fcd25c85cd64",
    ),
    edicaoLimitada: true,
  },
  {
    id: "miniatura-colecao",
    nome: "Miniatura de Coleção",
    categoria: "brinquedos",
    tipo: "miniatura",
    precoOriginal: 140,
    preco: 89,
    estoque: 20,
    descricaoCurta: "Miniatura detalhada para coleção e presente.",
    imagens: image(
      "photo-1535585209827-a15fcdbc4c2d",
      "photo-1608889825205-eebdb9cd580e",
      "photo-1614732414836-046c000a0f28",
    ),
  },
  {
    id: "puzzle-custom",
    nome: "Puzzle Custom 3D",
    categoria: "brinquedos",
    tipo: "puzzle",
    precoOriginal: 130,
    preco: 79,
    estoque: 11,
    descricaoCurta: "Puzzle criativo feito sob demanda.",
    imagens: image(
      "photo-1511512578047-dfb367046420",
      "photo-1606092195730-5d7b9af1efc5",
      "photo-1616628182509-6f5b27f6d5c1",
    ),
    edicaoLimitada: true,
  },
  {
    id: "engrenagem-prototipo",
    nome: "Engrenagem Protótipo",
    categoria: "mecanicos",
    tipo: "peça mecânica",
    precoOriginal: 78,
    preco: 45,
    estoque: 8,
    descricaoCurta: "Peça funcional para protótipos e ajustes técnicos.",
    imagens: image(
      "photo-1581092160562-40aa08e78837",
      "photo-1581091226825-a6a2a5aee158",
      "photo-1565043589221-1a6fd9ae45c7",
    ),
    edicaoLimitada: true,
  },
  {
    id: "suporte-tecnico",
    nome: "Suporte Técnico Modular",
    categoria: "mecanicos",
    tipo: "suporte",
    precoOriginal: 110,
    preco: 72,
    estoque: 15,
    descricaoCurta: "Suporte resistente para uso técnico diário.",
    imagens: image(
      "photo-1581092918056-0c4c3ac33795",
      "photo-1581092160607-ee22621dd2ec",
      "photo-1581092918056-0c4c3ac33795",
    ),
  },
  {
    id: "base-ferramenta",
    nome: "Base Técnica Sob Medida",
    categoria: "mecanicos",
    tipo: "base funcional",
    precoOriginal: 142,
    preco: 95,
    estoque: 14,
    descricaoCurta: "Base modular para bancada e prototipagem.",
    imagens: image(
      "photo-1581093804475-577d72e60714",
      "photo-1581092787765-e3feb951d987",
      "photo-1581092918367-1fd2149fa2c3",
    ),
  },
  {
    id: "maquete-residencial",
    nome: "Maquete Residencial",
    categoria: "maquetes",
    tipo: "maquete",
    precoOriginal: 420,
    preco: 299,
    estoque: 3,
    descricaoCurta: "Modelo em escala com leitura limpa de volumes.",
    imagens: image(
      "photo-1503387762-592deb58ef4e",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-ccccc4b422f3",
    ),
    edicaoLimitada: true,
    pecaUnica: true,
  },
  {
    id: "maquete-comercial",
    nome: "Maquete Comercial",
    categoria: "maquetes",
    tipo: "maquete",
    precoOriginal: 380,
    preco: 249,
    estoque: 6,
    descricaoCurta: "Maquete para apresentação comercial e institucional.",
    imagens: image(
      "photo-1487958449943-2429e8be8625",
      "photo-1497366216548-37526070297c",
      "photo-1503387762-592deb58ef4e",
    ),
  },
  {
    id: "maquete-urbana",
    nome: "Maquete Urbana Premium",
    categoria: "maquetes",
    tipo: "maquete",
    precoOriginal: 510,
    preco: 349,
    estoque: 2,
    descricaoCurta: "Conjunto urbano em escala com alto nível de detalhe.",
    imagens: image(
      "photo-1494526585095-c41746248156",
      "photo-1479839672679-a46483c0e7c8",
      "photo-1460317442991-0ec209397118",
    ),
    edicaoLimitada: true,
    pecaUnica: true,
  },
  {
    id: "display-marca",
    nome: "Display de Marca",
    categoria: "variados",
    tipo: "display",
    precoOriginal: 175,
    preco: 109,
    estoque: 13,
    descricaoCurta: "Display exclusivo para vitrine e ambientação.",
    imagens: image(
      "photo-1554469384-e58fac16e23a",
      "photo-1520607162513-77705c0f0d4a",
      "photo-1498050108023-c5249f4df085",
    ),
    edicaoLimitada: true,
  },
  {
    id: "trofeu-exclusivo",
    nome: "Troféu Exclusivo",
    categoria: "variados",
    tipo: "troféu",
    precoOriginal: 200,
    preco: 129,
    estoque: 9,
    descricaoCurta: "Troféu sob medida com acabamento premium.",
    imagens: image(
      "photo-1614732414836-046c000a0f28",
      "photo-1513151233558-d860c5398176",
      "photo-1610701596000-5baa1cf2e189",
    ),
    edicaoLimitada: true,
  },
  {
    id: "organizador-desk",
    nome: "Organizador de Mesa",
    categoria: "variados",
    tipo: "organizador",
    precoOriginal: 98,
    preco: 64,
    estoque: 18,
    descricaoCurta: "Organizador minimalista com divisórias personalizadas.",
    imagens: image(
      "photo-1631541965785-d87a7c37f53d",
      "photo-1497366811353-6870744d04b2",
      "photo-1581783898377-1c85bf937674",
    ),
  },
] as const;

export const products: Product[] = productConfigs.map((config) =>
  createProduct(config),
);

export const testimonials: Testimonial[] = [
  { id: "1", quote: "Ficou melhor do que eu imaginei" },
  { id: "2", quote: "Conseguiram fazer exatamente como pedi" },
  { id: "3", quote: "Processo simples e resultado incrível" },
];

export const heroFeaturedProductId = "vaso-orbita";

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getCategoryPreview(slug: CategorySlug): Product[] {
  return getProductsByCategory(slug).slice(0, 3);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getHeroFeaturedProduct(): Product {
  const p = getProductById(heroFeaturedProductId);
  return p ?? products[0];
}
