# Design System

## Estrutura
- `tokens/`: valores globais (cores, espaçamentos, tipografia e bordas)
- `components/`: primitives reutilizáveis
- `utils/`: utilitários auxiliares

## Tokens no Tailwind (v4)
Os tokens estão expostos em `app/globals.css` via `@theme inline`, permitindo utilitários como:
- `bg-background`, `bg-surface`
- `text-text-primary`, `text-text-secondary`
- `border-border`
- `ring-brand-accent`

## Dark mode
O dark mode é habilitado via classe `.dark` no elemento raiz:

```tsx
<html className="dark">
```

Com isso, os mesmos utilitários do Tailwind passam a usar os valores de tema escuro definidos por CSS variables.

## Animações padrão
- `animate-fade-in`: entrada suave para cards e blocos de conteúdo.
- `animate-float`: microinteração contínua para badges e elementos de destaque.

## Uso rápido
```tsx
import { Badge, Button, Card, Input, Section } from "@/src/design-system";

<Section>
  <Card>
    <Badge>Edição limitada</Badge>
    <Input placeholder="Seu nome" />
    <Button>Quero algo parecido</Button>
  </Card>
</Section>
```
