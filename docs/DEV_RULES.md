# ⚙️ DEV RULES – 3D CUSTOM PLATFORM

## 🎯 Objetivo

Garantir código escalável, legível e fácil de evoluir.

---

## 🧱 ARQUITETURA

* Usar Next.js App Router
* Separar por responsabilidade:

  * /components → UI reutilizável
  * /app → páginas
  * /lib → lógica e dados
  * /hooks → hooks customizados
  * /context → estado global

---

## 🧩 COMPONENTES

* Componentes devem ser pequenos e reutilizáveis
* Evitar componentes com múltiplas responsabilidades
* Nomear claramente:

Ex:

* ProductCard
* CategorySection
* CustomCTA

---

## 🔁 REUTILIZAÇÃO

* Nunca duplicar código
* Extrair lógica comum para hooks ou utils
* UI deve ser baseada em dados (config-driven)

---

## 🧠 ESTADO

* Usar Context API para orçamento (budget)
* Evitar prop drilling profundo
* Manter estado mínimo necessário

---

## 📦 DADOS

* Produtos devem vir de arquivos (data.ts)
* Nunca hardcodar dentro de componentes
* Facilitar adição de novos produtos sem alterar UI

---

## 🎯 FUNÇÕES

* Funções devem ser puras quando possível
* Nome claro (ex: createProduct, formatPrice)

---

## 🧼 LIMPEZA

* Remover código não usado
* Evitar console.log em produção
* Manter tipagem forte (TypeScript)

---

## ⚡ PERFORMANCE

* Usar lazy loading quando necessário
* Evitar re-render desnecessário
* Usar memoização com cuidado

---

## ❗ REGRA DE OURO

Se o código:

* está difícil de entender → refatorar
* está duplicado → abstrair
* está acoplado → desacoplar
