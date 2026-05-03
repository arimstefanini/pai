"use client";

import { useCallback, useEffect, useState } from "react";

const successMessage =
  "Recebemos sua ideia. Vamos analisar e te responder com um orçamento.";
const DRAFT_STORAGE_KEY = "custom-order-description-draft";
const SUGGESTION_STORAGE_KEY = "custom-order-product-suggestion";

type Props = {
  initialSuggestion?: string;
};

export function CustomOrderForm({ initialSuggestion = "" }: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState(() => {
    if (typeof window === "undefined") return initialSuggestion;
    const savedDraft = sessionStorage.getItem(DRAFT_STORAGE_KEY);
    const savedSuggestion = sessionStorage.getItem(SUGGESTION_STORAGE_KEY);
    return initialSuggestion || savedDraft || savedSuggestion || "";
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (!f) {
      setFile(null);
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      sessionStorage.removeItem(SUGGESTION_STORAGE_KEY);
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!initialSuggestion) return;
    sessionStorage.setItem(SUGGESTION_STORAGE_KEY, initialSuggestion);
  }, [initialSuggestion]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(DRAFT_STORAGE_KEY, description);
  }, [description]);

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 text-center"
        role="status"
      >
        <p className="text-base font-medium text-emerald-900">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div>
        <label
          htmlFor="quote-name"
          className="block text-sm font-medium text-neutral-800"
        >
          Nome
        </label>
        <input
          id="quote-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-neutral-900 outline-none ring-neutral-900/10 transition focus:border-neutral-400 focus:bg-white focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="quote-whatsapp"
          className="block text-sm font-medium text-neutral-800"
        >
          WhatsApp
        </label>
        <input
          id="quote-whatsapp"
          name="whatsapp"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-neutral-900 outline-none ring-neutral-900/10 transition focus:border-neutral-400 focus:bg-white focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="quote-desc"
          className="block text-sm font-medium text-neutral-800"
        >
          Descrição do projeto
        </label>
        <textarea
          id="quote-desc"
          name="description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-neutral-900 outline-none ring-neutral-900/10 transition focus:border-neutral-400 focus:bg-white focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="quote-file"
          className="block text-sm font-medium text-neutral-800"
        >
          Upload de imagem <span className="font-normal text-neutral-500">(opcional)</span>
        </label>
        <input
          id="quote-file"
          name="file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="mt-2 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-neutral-800"
        />
        {previewUrl && file && (
          <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={file.name}
              className="max-h-48 w-full object-contain"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.99]"
      >
        Quero criar isso
      </button>
    </form>
  );
}
