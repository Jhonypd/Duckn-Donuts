interface RodapeConfirmacaoProps {
  total: number;
  onConfirmar: () => void;
  formatPrice: (value: number) => string;
  textoBotao: string;
}

export function RodapeConfirmacao({
  total,
  onConfirmar,
  formatPrice,
  textoBotao,
}: RodapeConfirmacaoProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFFDF7] border-t border-[#FDE8C5] px-4 py-3 pb-5 z-50 shadow-[0_-4px_20px_rgba(59,42,20,0.10)]">
      <div className="max-w-[480px] mx-auto">
        <button
          onClick={onConfirmar}
          className="w-full bg-[#3B2A14] text-white border-none rounded-[14px] px-5 py-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#4a3318] active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">💬</span>
            <span
              className="text-[17px] font-bold"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              {textoBotao}
            </span>
          </div>
          <span
            className="text-[17px] font-bold text-[#F4A635]"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {formatPrice(total)}
          </span>
        </button>
        <div className="text-center text-[11px] text-[#AEAAA2] font-semibold mt-2">
          Voce sera redirecionado para o WhatsApp da loja
        </div>
      </div>
    </div>
  );
}
