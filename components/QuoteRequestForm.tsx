"use client";

import { useState } from "react";

type QuoteRequestFormProps = {
  initialMessage?: string;
};

export function QuoteRequestForm({ initialMessage = "" }: QuoteRequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  if (submitted) {
    return (
      <div className="rounded-2xl border border-neutral-700 bg-neutral-800/70 p-8 text-center">
        <p className="text-base font-medium text-neutral-200">
          Solicitação enviada com sucesso. Vamos analisar e te responder com um orçamento.
        </p>
      </div>
    );
  }

  return (
    <form
      className="w-full space-y-6 rounded-2xl border border-neutral-700 bg-neutral-800/70 p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-300">
            Nome completo
          </label>
          <input
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
          id="message"
          name="message"
          required
          defaultValue={initialMessage}
          rows={6}
          className="w-full resize-y rounded-xl border border-neutral-600 bg-neutral-900/70 px-4 py-3 text-neutral-200 outline-none transition focus:border-neutral-400"
          placeholder="Ex: quero um suporte personalizado para..."
        />
      </div>

      <div>
        <label htmlFor="reference" className="mb-2 block text-sm font-medium text-neutral-300">
          Referência (imagem) - opcional
        </label>
        <input
          id="reference"
          name="reference"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-neutral-300 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-200 file:px-4 file:py-2 file:font-semibold file:text-neutral-900 hover:file:bg-neutral-100"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? "");
          }}
        />
        {fileName ? <p className="mt-2 text-xs text-neutral-400">Arquivo: {fileName}</p> : null}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-neutral-200 py-3.5 text-sm font-semibold text-black transition hover:bg-white"
      >
        Solicitar orçamento personalizado
      </button>
    </form>
  );
}
