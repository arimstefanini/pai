import Link from "next/link";

const nav = [
  { href: "/#categorias", label: "Categorias" },
  { href: "/#galeria", label: "Galeria" },
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
