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
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t px-4 py-3 pb-5">
      <div className="mx-auto max-w-120">
        <button
          onClick={onConfirmar}
          className="hover:bg-dn-cocoa-dark bg-dn-cocoa flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border-none px-5 py-2.5 text-white transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="text-[17px] font-bold"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              {textoBotao}
            </span>
          </div>
          <span
            className="text-dn-caramel text-[17px] font-bold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {formatPrice(total)}
          </span>
        </button>
      </div>
    </div>
  );
}
