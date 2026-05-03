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
    <section className="border-t border-neutral-100 bg-neutral-50 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Orçamento personalizado
        </h1>
        <p className="mt-3 text-neutral-600 sm:max-w-2xl">
          Não precisa encontrar pronto. Se você consegue imaginar, dá pra criar.
        </p>

        <div className="mt-8">
          <CustomOrderForm initialSuggestion={suggestion} />
        </div>
      </div>
    </section>
  );
}
