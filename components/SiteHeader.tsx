import Link from "next/link";

const categoryMenu = [
  { href: "/categoria/casa", label: "CASA" },
  { href: "/categoria/brinquedos", label: "BRINQUEDOS" },
  { href: "/categoria/mecanicos", label: "PROJETOS MECÂNICOS" },
  { href: "/categoria/maquetes", label: "MAQUETES" },
];

const nav = [
  { href: "/produto/vaso-orbita", label: "Galeria" },
  { href: "/orcamento", label: "Orçamento" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-neutral-900 sm:text-base"
        >
          FORMA<span className="text-neutral-400">3D</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4" aria-label="Principal">
          <div className="group relative">
            <Link
              href="/#categorias"
              className="rounded-md px-2 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-3 sm:text-sm"
            >
              Categorias
            </Link>

            <div className="pointer-events-none absolute right-0 top-full mt-2 w-64 translate-y-1 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                {categoryMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-xs font-semibold tracking-wide text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
