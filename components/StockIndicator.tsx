type Props = {
  count: number;
};

export function StockIndicator({ count }: Props) {
  return (
    <p className="text-sm font-medium text-neutral-700">
      Restam{" "}
      <span className="tabular-nums font-semibold text-neutral-900">
        {count}
      </span>{" "}
      {count === 1 ? "unidade" : "unidades"}
    </p>
  );
}
