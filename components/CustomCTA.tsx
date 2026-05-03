import Link from "next/link";

type Props = {
  productName?: string;
  className?: string;
  label?: string;
};

export function CustomCTA({
  productName,
  className,
  label = "Quero algo parecido",
}: Props) {
  const qs = productName
    ? `?produto=${encodeURIComponent(productName)}`
    : "";

  return (
    <Link
      href={`/orcamento${qs}`}
      className={
        className ??
        "inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
      }
    >
      {label}
    </Link>
  );
}
