"use client";

import Link from "next/link";
import { useState } from "react";

const categoryMenu = [
  { href: "/produto/vaso-orbita?categoria=casa", label: "CASA" },
  { href: "/produto/vaso-orbita?categoria=brinquedos", label: "BRINQUEDOS" },
  { href: "/produto/vaso-orbita?categoria=mecanicos", label: "PROJETOS MECÂNICOS" },
  { href: "/produto/vaso-orbita?categoria=maquetes", label: "MAQUETES" },
];

const nav = [
  { href: "/produto/vaso-orbita", label: "Galeria" },
  { href: "/orcamento", label: "Orçamento" },
];

export function SiteHeader() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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
          <div className="relative">
            <button
              type="button"
              aria-expanded={categoriesOpen}
              aria-controls="category-dropdown"
              onClick={() => setCategoriesOpen((prev) => !prev)}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:px-4"
            >
              Categorias
            </button>

            {categoriesOpen && (
              <div
                id="category-dropdown"
                className="absolute right-0 top-full z-50 mt-1 w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl"
              >
                {categoryMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setCategoriesOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold tracking-wide text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
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
