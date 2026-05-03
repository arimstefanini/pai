import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="border-t border-neutral-100 bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Quem já criou com a gente
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.id}
              className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium leading-relaxed text-neutral-800">
                &ldquo;{t.quote}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
