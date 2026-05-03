import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/CustomOrderForm";

export const metadata: Metadata = {
  title: "Orçamento sob medida",
  description:
    "Descreva seu projeto. Recebemos sua ideia e respondemos com orçamento.",
};

type Props = {
  searchParams: Promise<{ produto?: string }>;
};

export default async function OrcamentoPage({ searchParams }: Props) {
  const { produto } = await searchParams;
  const suggestion = produto
    ? `Quero algo parecido com: ${produto}\nDetalhes que imagino: `
    : "";

  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-1 sm:py-1">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        Orçamento personalizado
      </h1>
      <p className="mt-1 text-pretty text-neutral-600">
        Não precisa encontrar pronto. Se você consegue imaginar, dá pra criar.
      </p>
      <div className="mt-1">
        <CustomOrderForm initialSuggestion={suggestion} />
      </div>
    </div>
  );
}
