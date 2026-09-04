"use client";

import { useRef, useState } from "react";
import { sendQuoteToWhatsapp } from "@/lib/whatsapp/openWhatsapp";

type QuoteRequestFormProps = {
  initialMessage?: string;
  product?: string;
};

const MAX_DESCRIPTION_LENGTH = 1200;

export function QuoteRequestForm({ initialMessage = "", product }: QuoteRequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(initialMessage.length);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Gather form data
    const formData = {
      name: nameRef.current?.value ?? "",
      phone: phoneRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      description: messageRef.current?.value ?? "",
      product,
    };

    // Send to WhatsApp
    const result = sendQuoteToWhatsapp(formData);

    if (!result.success) {
      setError(result.error || "Erro ao enviar. Tente novamente.");
      return;
    }

    // Show success message
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-neutral-700 bg-neutral-800/70 p-8 text-center">
        <p className="text-base font-medium text-neutral-200">
          Seu WhatsApp foi aberto! 🎉
        </p>
        <p className="mt-3 text-sm text-neutral-400">
          Caso tenha anexado uma imagem, envie-a na conversa para complementar seu pedido.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-neutral-300 underline hover:text-neutral-200"
        >
          Enviar novo orçamento
        </button>
      </div>
    );
  }

  return (
    <form
      className="w-full space-y-6 rounded-2xl border border-neutral-700 bg-neutral-800/70 p-6 sm:p-8"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-300">
            Nome completo
          </label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-neutral-600 bg-neutral-900/70 px-4 py-3 text-neutral-200 outline-none transition focus:border-neutral-400"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-300">
            WhatsApp
          </label>
          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full rounded-xl border border-neutral-600 bg-neutral-900/70 px-4 py-3 text-neutral-200 outline-none transition focus:border-neutral-400"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-300">
          E-mail (opcional)
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl border border-neutral-600 bg-neutral-900/70 px-4 py-3 text-neutral-200 outline-none transition focus:border-neutral-400"
          placeholder="voce@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-300">
          Descreva sua ideia
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          required
          maxLength={MAX_DESCRIPTION_LENGTH}
          defaultValue={initialMessage}
          onChange={(e) => setDescriptionLength(e.target.value.length)}
          rows={6}
          className="w-full resize-y rounded-xl border border-neutral-600 bg-neutral-900/70 px-4 py-3 text-neutral-200 outline-none transition focus:border-neutral-400"
          placeholder="Ex: quero um suporte personalizado para..."
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-neutral-400">
            {descriptionLength} / {MAX_DESCRIPTION_LENGTH} caracteres
          </p>
          {descriptionLength >= MAX_DESCRIPTION_LENGTH && (
            <p className="text-xs text-amber-400">
              Sua descrição está muito grande. Após abrir o WhatsApp você poderá enviar informações complementares em novas mensagens.
            </p>
          )}
        </div>
      </div>

     

      <button
        type="submit"
        className="w-full rounded-full py-3.5 text-sm font-semibold text-black transition hover:bg-white"
      >
        Solicitar orçamento personalizado
      </button>
    </form>
  );
}
