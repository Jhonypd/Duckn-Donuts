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
    <div className="fixed bottom-0 left-0 right-0 z-200 px-4 pt-2.5 pb-4 bg-transparent pointer-events-none">
      <button
        onClick={onViewCart}
        className="max-w-120 mx-auto w-full flex items-center justify-between bg-[#3B2A14] border-none rounded-[14px] px-4.5 py-3.5 cursor-pointer shadow-[0_-4px_24px_rgba(59,42,20,0.14)] pointer-events-auto transition-all duration-150 hover:bg-[#4a3318] hover:translate-y-[-1px] gap-3"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="bg-[#F4A635] text-[#7A4A00] w-7 h-7 rounded-full flex items-center justify-center text-[15px] font-bold transition-transform duration-250 animate-bump"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {totalItems}
          </div>
          <div
            className="text-white text-base font-semibold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Ver sacola
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="text-[#F4A635] text-[17px] font-bold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            R$ {totalPrice.toFixed(2).replace(".", ",")}
          </div>
          <div className="text-[#F4A635] text-base">›</div>
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
