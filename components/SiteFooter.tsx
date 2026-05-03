import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">
            Transformamos ideias em objetos reais.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
            <span className="font-medium text-neutral-700">Contatos:</span>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-neutral-900"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M20.52 3.48A11.88 11.88 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.2 1.6 6.04L0 24l6.12-1.6A11.95 11.95 0 0 0 12.02 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.5-8.52ZM12.02 21.84a9.8 9.8 0 0 1-4.98-1.36l-.36-.21-3.63.95.97-3.54-.24-.37A9.8 9.8 0 0 1 2.18 12c0-5.43 4.41-9.84 9.84-9.84 2.63 0 5.1 1.02 6.95 2.89a9.77 9.77 0 0 1 2.9 6.95c0 5.43-4.42 9.84-9.85 9.84Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.46a8.96 8.96 0 0 1-1.66-2.07c-.17-.3-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-neutral-900"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.25 2.43.43a4.89 4.89 0 0 1 1.77 1.15 4.89 4.89 0 0 1 1.15 1.77c.18.46.38 1.26.43 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.97-.43 2.43a5.19 5.19 0 0 1-2.92 2.92c-.46.18-1.26.38-2.43.43-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.25-2.43-.43a4.89 4.89 0 0 1-1.77-1.15 4.89 4.89 0 0 1-1.15-1.77c-.18-.46-.38-1.26-.43-2.43A69.8 69.8 0 0 1 1.16 12c0-3.2.01-3.58.07-4.85.05-1.17.25-1.97.43-2.43a5.19 5.19 0 0 1 2.92-2.92c.46-.18 1.26-.38 2.43-.43A69.8 69.8 0 0 1 12 1.16Zm0 1.95c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.18.4-.56.22-.96.48-1.38.9-.42.42-.68.82-.9 1.38-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.18.22.56.48.96.9 1.38.42.42.82.68 1.38.9.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.18-.4a3.24 3.24 0 0 0 2.28-2.28c.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.18-.22-.56-.48-.96-.9-1.38-.42-.42-.82-.68-1.38-.9-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.76-.07Zm0 3.32A4.57 4.57 0 1 1 7.43 12 4.57 4.57 0 0 1 12 7.43Zm0 7.54A2.97 2.97 0 1 0 9.03 12 2.97 2.97 0 0 0 12 14.97Zm5.82-7.77a1.07 1.07 0 1 1-1.07-1.07 1.07 1.07 0 0 1 1.07 1.07Z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-neutral-900"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.12 11.93V15.56H7.08V12.07h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
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
