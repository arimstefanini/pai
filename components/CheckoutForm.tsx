"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { formatBRL, getProductById } from "@/lib/data";

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const product = useMemo(
    () => (productId ? getProductById(productId) : undefined),
    [productId],
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<"pix" | "card">("pix");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  if (!productId || !product) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <p className="text-neutral-600">
          Nenhum produto selecionado. Escolha um item na{" "}
          <Link
            href="/"
            className="font-semibold text-neutral-900 underline underline-offset-2"
          >
            página inicial
          </Link>
          .
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-10 text-center"
        role="status"
      >
        <p className="text-lg font-semibold text-emerald-900">
          Pedido recebido
        </p>
        <p className="mt-2 text-sm text-emerald-800">
          Em breve você recebe a confirmação por e-mail ou WhatsApp (simulação).
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Resumo
        </p>
        <p className="mt-1 font-semibold text-neutral-900">{product.name}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm text-neutral-400 line-through">
            {formatBRL(product.priceAnchor)}
          </span>
          <span className="text-lg font-semibold text-neutral-900">
            {formatBRL(product.price)}
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="chk-name"
          className="block text-sm font-medium text-neutral-800"
        >
          Nome
        </label>
        <input
          id="chk-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
        />
      </div>

      <div>
        <label
          htmlFor="chk-address"
          className="block text-sm font-medium text-neutral-800"
        >
          Endereço
        </label>
        <textarea
          id="chk-address"
          name="address"
          required
          rows={3}
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900/10"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-neutral-800">
          Pagamento
        </legend>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 has-[:checked]:border-neutral-900 has-[:checked]:bg-white has-[:checked]:ring-2 has-[:checked]:ring-neutral-900/10">
            <input
              type="radio"
              name="payment"
              value="pix"
              checked={payment === "pix"}
              onChange={() => setPayment("pix")}
              className="size-4 border-neutral-300 text-neutral-900"
            />
            <span className="text-sm font-medium text-neutral-900">PIX</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 has-[:checked]:border-neutral-900 has-[:checked]:bg-white has-[:checked]:ring-2 has-[:checked]:ring-neutral-900/10">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={payment === "card"}
              onChange={() => setPayment("card")}
              className="size-4 border-neutral-300 text-neutral-900"
            />
            <span className="text-sm font-medium text-neutral-900">Cartão</span>
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.99]"
      >
        Finalizar compra
      </button>
    </form>
  );
}
