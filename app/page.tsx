import { Benefits } from "@/components/Benefits";
import { CategorySection } from "@/components/CategorySection";
import { CustomCTA } from "@/components/CustomCTA";
import { Hero } from "@/components/Hero";
import { MobileHomeBar } from "@/components/MobileHomeBar";
import { ScarcityBanner } from "@/components/ScarcityBanner";
import { Storytelling } from "@/components/Storytelling";
import { Testimonials } from "@/components/Testimonials";
import { categories, getCategoryPreview } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col pb-24 sm:pb-0">
      <Hero />
      <Storytelling />

      <section
        id="ideias"
        className="border-t border-neutral-100 bg-white py-12 sm:py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Veja algumas ideias
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-neutral-600">
            Esses são só exemplos. Você pode pedir algo diferente.
          </p>
        </div>
      </section>

      {categories.map((category) => (
        <CategorySection
          key={category.slug}
          category={category}
          products={getCategoryPreview(category.slug)}
        />
      ))}

      <Benefits />

      <section className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Tem algo em mente?
          </h2>
          <p className="mt-4 text-neutral-600">
            Não precisa encontrar pronto. Se você consegue imaginar, dá pra
            criar.
          </p>
          <div className="mt-8 flex justify-center">
            <CustomCTA label="Quero criar meu projeto" />
          </div>
        </div>
      </section>

      <ScarcityBanner />
      <Testimonials />
      <MobileHomeBar />
    </div>
  );
}
