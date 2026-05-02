import Link from "next/link";

export function CustomOrderSection() {
  return (
    <section className="border-t border-neutral-100 bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Tem algo em mente?
        </h2>
        <div className="mt-6 space-y-4 text-pretty text-neutral-600">
          <p>
            Você não precisa encontrar pronto.
            <br />
            Pode simplesmente pedir.
          </p>
          <p>
            Nos descreva o que você quer — e a gente transforma em um projeto real.
          </p>
        </div>
        <Link
          href="/orcamento"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
        >
          Solicitar orçamento
        </Link>
      </div>
    </section>
  );
}
