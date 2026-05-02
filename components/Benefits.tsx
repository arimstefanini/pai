const items = [
  {
    title: "Acabamento premium fosco",
    body: "Superfície com aparência sofisticada e leitura visual limpa.",
    icon: "finish",
  },
  {
    title: "Design exclusivo",
    body: "Cada criação pode ser personalizada para seu estilo e espaço.",
    icon: "design",
  },
  {
    title: "Produção limitada",
    body: "Estoque visível e capacidade controlada para manter qualidade.",
    icon: "limited",
  },
  {
    title: "Material resistente",
    body: "Peças pensadas para durar no uso real, além de decorar.",
    icon: "shield",
  },
];

function Icon({ type }: { type: string }) {
  if (type === "finish") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
        <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "design") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
        <path d="M4 20 20 4M7 4h13v13" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "limited") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l2.5 2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function Benefits() {
  return (
    <section className="border-t border-neutral-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Benefícios racionais
        </h2>
        <p className="mt-3 max-w-2xl text-pretty text-neutral-600">
          Argumentos objetivos para decidir com confiança e sem fricção.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-neutral-700 ring-1 ring-neutral-200">
                  <Icon type={item.icon} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
