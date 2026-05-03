import { Animated3DMedia } from "@/components/Animated3DMedia";

export function Storytelling() {
  return (
    <section className="border-t border-neutral-100 bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
        <div className="order-1 w-full lg:w-[50%] justify-self-center">
          <Animated3DMedia
            webmSrc="/video/storytelling-3d-alpha.webm"
            mp4Src="/video/videoBlender.mp4"
            posterLabel="Animação 3D com fallback"
            maxDurationSeconds={30}
          />
        </div>

        <div className="order-2">
          <p className="text-lg font-medium leading-relaxed text-neutral-900 sm:text-xl">
            Nem tudo precisa vir pronto.
          </p>
          <div className="mt-8 space-y-6 text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>
              Algumas das melhores ideias começam como um rascunho, uma necessidade
              ou até uma curiosidade.
            </p>
            <p>
              A impressão 3D permite tirar isso do papel e transformar em algo
              real — sem depender de produção em massa.
            </p>
            <p className="font-medium text-neutral-800">
              Aqui, cada peça pode nascer diferente.
            </p>
          </div>
          <p className="mt-10 text-sm italic text-neutral-500">
            Isso não é só um objeto. É algo pensado para existir do seu jeito.
          </p>
        </div>
      </div>
    </section>
  );
}
