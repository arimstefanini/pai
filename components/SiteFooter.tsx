import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-neutral-600">
          Transformamos ideias em objetos reais.
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral-700">
          <Link href="/" className="hover:text-neutral-900">
            Início
          </Link>
          <Link href="/orcamento" className="hover:text-neutral-900">
            Orçamento
          </Link>
        </div>
      </div>
    </footer>
  );
}
