# Product System - File-based CMS

Este é um sistema de gerenciamento de produtos baseado em arquivos. Nenhuma alteração no código é necessária para adicionar novos produtos.

## 🎯 Objetivo

Transformar `public/produtos/` em um pequeno CMS baseado em arquivos, permitindo que novos produtos sejam adicionados sem modificar nenhuma linha de código React.

## 📁 Estrutura

```
public/produtos/
├── produto-1.mp4          # Mídia (vídeo)
├── produto-1.json         # Metadados
├── produto-2.jpg          # Mídia (imagem)
├── produto-2.json         # Metadados
└── ...
```

## ➕ Como Adicionar um Novo Produto

### Passo 1: Preparar os Arquivos

Coloque dois arquivos na pasta `public/produtos/`:

**1. Arquivo de mídia** (escolha um formato)
- `nome-do-produto.mp4` (vídeo)
- `nome-do-produto.jpg` (imagem)
- `nome-do-produto.png` (imagem)
- `nome-do-produto.webp` (imagem)

**2. Arquivo JSON** com metadados
- `nome-do-produto.json`

### Passo 2: Preencher o JSON

```json
{
  "id": "nome-do-produto",
  "title": "Nome do Produto",
  "slug": "nome-do-produto",
  "category": "casa",
  "featured": false,
  "type": "video",
  "description": "Descrição breve do produto.",
  "tags": ["tag1", "tag2", "tag3"],
  "story": "A história por trás do produto.",
  "cta": "Quero algo parecido",
  "price": 99,
  "limited": false,
  "stock": 10
}
```

### Passo 3: Pronto! 🎉

O produto aparecerá automaticamente:
- ✅ Na galeria (página `/galeria`)
- ✅ Na página de categoria (página `/categoria/[slug]`)
- ✅ Na página de produto individual
- ✅ Nos filtros
- ✅ Na busca

Nenhuma alteração no código necessária.

## 📋 Campos do JSON

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|------------|-----------|
| `id` | string | Sim | ID único (deve ser igual ao nome do arquivo) |
| `title` | string | Sim | Título do produto |
| `slug` | string | Sim | URL-friendly slug (usado em links) |
| `category` | string | Sim | Categoria: `casa`, `brinquedos`, `mecanicos`, `maquetes`, `rpg`, `variados` |
| `featured` | boolean | Sim | Se aparece em seções especiais |
| `type` | string | Sim | Tipo de mídia: `image` ou `video` |
| `description` | string | Sim | Descrição breve |
| `tags` | string[] | Sim | Array de tags para busca |
| `story` | string | Sim | História/narrativa do produto |
| `cta` | string | Sim | Texto do botão de ação |
| `price` | number | Sim | Preço em reais |
| `limited` | boolean | Sim | Se é edição limitada |
| `stock` | number | Sim | Quantidade em estoque |

## 🎥 Vídeos (Comportamento Instagram)

Os vídeos têm comportamento idêntico ao Instagram:

- ✅ **Autoplay**: Inicia automaticamente quando 70% visível
- ✅ **Muted**: Sem som (permite autoplay)
- ✅ **Loop**: Repetição contínua
- ✅ **PlaysInline**: Em mobile, toca inline sem fullscreen
- ✅ **Um de cada vez**: Apenas um vídeo toca por vez

Isso é gerenciado automaticamente pelo hook `useVideoAutoPlay`.

## 🖼️ Imagens

Imagens têm o mesmo layout que vídeos:

- Responsive
- Lazy loading
- Hover effect
- Mesmo componente (MediaRenderer)

## 🔍 Usando Produtos no Código

### Carregar todos os produtos

```typescript
import { loadAllProducts } from "@/lib/products";

const products = await loadAllProducts();
```

### Carregar um produto específico

```typescript
import { loadProductById, loadProductBySlug } from "@/lib/products";

const product = await loadProductById("nome-do-produto");
const product = await loadProductBySlug("nome-do-produto");
```

### Filtrar produtos

```typescript
import { filterProducts } from "@/lib/products";

// Por categoria
const casa = filterProducts(products, { category: "casa" });

// Por featured
const featured = filterProducts(products, { featured: true });

// Por busca
const results = filterProducts(products, { search: "vaso" });

// Combinar
const limited = filterProducts(products, {
  category: "casa",
  limited: true,
});
```

### Extrair categorias

```typescript
import { extractCategories } from "@/lib/products";

const categories = extractCategories(products);
```

### Formatar dados

```typescript
import { formatPrice, getCategoryName, getStockStatus } from "@/lib/products";

const priceStr = formatPrice(product.metadata.price); // "R$ 99"
const catName = getCategoryName(product.metadata.category); // "Casa"
const stock = getStockStatus(product); // { label: "5 em estoque", status: "low" }
```

## 🧩 Componentes

### ProductCard

Renderiza um produto em um card:

```typescript
import { ProductCard } from "@/components/ProductCard";

<ProductCard product={product} />
```

### ProductGallery

Grid de produtos:

```typescript
import { ProductGallery } from "@/components/ProductGallery";

<ProductGallery
  products={products}
  title="Inspirações"
  subtitle="Veja nossas criações"
/>
```

### MediaRenderer

Renderiza automaticamente imagem ou vídeo:

```typescript
import { MediaRenderer } from "@/components/MediaRenderer";

<MediaRenderer
  media={product.media}
  alt={product.metadata.title}
/>
```

## ⚙️ Arquitetura

```
lib/products/
├── types.ts          # Interfaces TypeScript
├── loader.ts         # Descoberta e carregamento de arquivos
├── mapper.ts         # Mapeamento de dados
├── filters.ts        # Filtros e busca
├── utils.ts          # Funções auxiliares
├── integration.ts    # Integração com páginas
└── index.ts          # Exportações públicas

hooks/
└── useVideoAutoPlay.ts  # Hook para autoplay de vídeos

components/
├── MediaRenderer.tsx      # Renderiza imagem ou vídeo
├── ProductCard.tsx        # Card do produto
├── ProductGallery.tsx     # Grid de produtos
└── StockIndicator.tsx     # Status de estoque
```

## 🔄 Cache

Os produtos são carregados uma vez e cacheados em memória. Para limpar o cache (desenvolvimento):

```typescript
import { clearProductCache } from "@/lib/products";

clearProductCache(); // Recarrega na próxima vez
```

## 📱 Mobile

Todos os componentes são totalmente responsivos:

- Mobile-first
- Touch-friendly
- Lazy loading
- Vídeos tocam inline sem fullscreen

## 🎯 Checklist de Adição de Produto

- [ ] Arquivo de mídia em `public/produtos/` (mp4 ou jpg/png/webp)
- [ ] Arquivo JSON com mesmo nome base
- [ ] `id` e `slug` correspondem ao nome do arquivo
- [ ] `category` é válida
- [ ] `type` é `image` ou `video` (conforme arquivo)
- [ ] Todos os campos obrigatórios preenchidos
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Mídia é otimizada (não muito pesada)
- [ ] Descrição é clara e concisa

## 🐛 Debugging

Se um produto não aparecer, verifique:

1. **Arquivo JSON**: Deve ter o mesmo nome base que a mídia
2. **Sintaxe JSON**: Use validador online se tiver dúvida
3. **Campos obrigatórios**: Todos devem estar preenchidos
4. **Type correto**: Deve ser `image` ou `video`
5. **Category válida**: Uma das 6 categorias permitidas

Erros são logados no console durante o build.

## 📝 Exemplo Completo

```
Arquivo: public/produtos/vaso-minimalista.json
```

```json
{
  "id": "vaso-minimalista",
  "title": "Vaso Minimalista Branco",
  "slug": "vaso-minimalista",
  "category": "casa",
  "featured": true,
  "type": "image",
  "description": "Vaso em cerâmica com design minimalista e acabamento liso.",
  "tags": ["vaso", "cerâmica", "minimalismo", "decoração"],
  "story": "Simplicidade que impressiona.",
  "cta": "Quero um parecido",
  "price": 129,
  "limited": false,
  "stock": 15
}
```

```
Arquivo: public/produtos/vaso-minimalista.jpg
(imagem do produto)
```

**Resultado**: Produto aparece automaticamente em:
- Galeria `/galeria`
- Categoria `/categoria/casa`
- Página individual `/produto/vaso-minimalista`
- Na seção de produtos em destaque da homepage

## 🚀 Próximos Passos

Para integrar com mais componentes:

1. Atualize `app/page.tsx` para usar `getCategoryPreview()`
2. Atualize componentes de categoria para usar o novo sistema
3. Crie página de busca usando `searchProductsQuery()`
4. Integre com sistema de carrinho/checkout

Veja `lib/products/integration.ts` para funções prontas.
