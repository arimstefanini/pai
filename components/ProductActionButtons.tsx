import { Button } from "@/src/design-system/components/Button";
import { CustomCTA } from "@/components/CustomCTA";

type Props = {
  onPurchase: () => void;
  productName: string;
  compact?: boolean;
};

export function ProductActionButtons({ onPurchase, productName, compact = false }: Props) {
  const sizeClass = compact ? "h-11" : "h-12";

  return (
    <div className="flex gap-2 sm:gap-3">
      <Button onClick={onPurchase} className={`flex-1 rounded-full ${sizeClass} text-sm font-semibold`}>
        Comprar agora
      </Button>
      <CustomCTA
        productName={productName}
        className={`inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background ${sizeClass} text-sm font-semibold text-text-primary transition hover:bg-surface active:scale-[0.98]`}
      />
    </div>
  );
}
