"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const categoryMenu = [
  { href: "/galeria?categoria=todos", label: "TODOS" },
  { href: "/galeria?categoria=avatar", label: "AVATAR" },
  { href: "/galeria?categoria=totem", label: "TOTEM" },
  { href: "/galeria?categoria=mecanicos", label: "PROJETOS MECÂNICOS" },
  { href: "/galeria?categoria=maquetes", label: "MAQUETES" },
  { href: "/galeria?categoria=variados", label: "VARIADOS" },
];

const nav = [
  { href: "/galeria?categoria=todos", label: "Galeria" },
  { href: "/orcamento", label: "Orçamento" },
];

export function SiteHeader() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#404040] bg-[#2e2e2e]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link href="/" className="flex flex-col items-center gap-1">
          <Image
            src="/image/logo.png"
            alt="Stefanini Produções"
            width={456}
            height={456}
            className="h-10 w-auto rounded-md"
            priority
          />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-4" aria-label="Principal">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsCategoriesOpen((open) => !open)}
              onMouseDown={(event) => event.preventDefault()}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700/70 hover:text-neutral-200 sm:px-4"
              aria-haspopup="menu"
              aria-expanded={isCategoriesOpen}
              aria-controls="categories-menu"
            >
              Categorias
            </button>

            <div
              id="categories-menu"
              className={`absolute left-1/2 top-full z-50 w-[min(82vw,18rem)] -translate-x-1/2 pt-2 transition-all duration-200 sm:left-auto sm:right-0 sm:translate-x-0 ${
                isCategoriesOpen
                  ? "pointer-events-auto visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-1 opacity-0"
              }`}
            >
              <div className="max-w-[calc(100vw-2rem)] rounded-xl border border-[#404040] bg-[#2e2e2e]/95 p-2 shadow-xl backdrop-blur-md">
                {categoryMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsCategoriesOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold tracking-wide text-neutral-300 transition hover:bg-neutral-700/60 hover:text-neutral-200"
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
              onClick={(event) => {
                if (item.href === "/galeria?categoria=todos") {
                  event.preventDefault();
                  window.location.href = "/galeria?categoria=todos";
                }
              }}
              className="rounded-md px-2 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-700/70 hover:text-neutral-200 sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
