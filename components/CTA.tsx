import Link from "next/link";

export function CTA() {
  return (
    <section className="border-t border-neutral-100 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Se você pensou em algo, já vale tentar.
        </h2>
        <p className="mt-4 text-pretty text-neutral-600">
          Se você consegue descrever, a gente consegue produzir.
        </p>
        <Link
          href="/orcamento"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-10 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
        >
          Começar meu projeto
        </Link>
      </div>
    </section>
  );
}
