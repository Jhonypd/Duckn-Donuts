interface CartFooterProps {
  totalItems: number;
  totalPrice: number;
  onViewCart: () => void;
}

export function CartFooter({
  totalItems,
  totalPrice,
  onViewCart,
}: CartFooterProps) {
  if (totalItems === 0) return null;

  return (
    <div className="bg-dn-cocoa hover:bg-dn-cocoa-dark pointer-events-auto fixed right-0 bottom-0 left-0 z-200 mx-auto flex w-full cursor-pointer items-center justify-between gap-3 border-none px-4 py-3.5 pt-2.5 pb-4 shadow-[0_-4px_24px_rgba(59,42,20,0.14)] transition-all duration-150 hover:translate-y-px">
      <div className="flex flex-col items-start gap-2 text-left">
        <p className="text-[10px]">Total sem a entrega</p>
        <p
          className="text-dn-caramel text-lg font-bold"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          R$ {totalPrice.toFixed(2).replace(".", ",")}
          <span className="text-dn-mist text-[10px]">
            {" "}
            / {totalItems} {totalItems === 1 ? "item" : "itens"}
          </span>
        </p>
      </div>
      <button
        onClick={onViewCart}
        className="bg-dn-caramel hover:bg-dn-caramel-dark pointer-events-auto cursor-pointer items-center justify-between rounded-2xl border-none px-4.5 py-2 transition-all duration-150 hover:translate-y-px"
      >
        <div
          className="text-base font-semibold text-white"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Ver sacola
        </div>
      </button>

      <style>{`
        @keyframes bump {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .animate-bump {
          animation: bump 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
