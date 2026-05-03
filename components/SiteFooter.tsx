import Link from "next/link";
import Image from "next/image";
import PaiPeImage from "@/public/image/pai_pe.jpeg";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-start gap-4">
          <div className="h-36 w-24 overflow-hidden rounded-xl border border-neutral-200/80 sm:h-40 sm:w-28">
            <Image
              src={PaiPeImage}
              alt="Cliente segurando peça impressa em 3D"
              className="h-full w-full object-cover object-top"
              sizes="(min-width: 640px) 112px, 96px"
            />
          </div>
          <div>
            <p className="text-base font-semibold text-neutral-800">
              Transformamos ideias em objetos reais.
            </p>
            <div className="mt-2 flex flex-col items-start gap-2 text-sm font-medium text-neutral-700">
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-full bg-green-600 px-5 text-sm font-semibold text-white transition hover:bg-green-500"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-full bg-pink-600 px-5 text-sm font-semibold text-white transition hover:bg-pink-500"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral-700 sm:mt-auto sm:self-end">
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
