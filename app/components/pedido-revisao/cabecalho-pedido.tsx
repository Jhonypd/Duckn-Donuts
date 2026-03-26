import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface CabecalhoPedidoProps {
  onVoltar: () => void;
}

export function CabecalhoPedido({ onVoltar }: CabecalhoPedidoProps) {
  return (
    <div className="bg-[#F4A635] p-3.5 px-5 flex items-center gap-3 sticky top-0 z-50 shadow-[0_2px_12px_rgba(59,42,20,0.15)]">
      <button
        onClick={onVoltar}
        className="w-9 h-9 bg-white/35 border-none rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-white/55 transition-colors flex-shrink-0"
        aria-label="Voltar"
      >
        <ArrowBackIosNewIcon className="text-[#3B2A14] text-base" />
      </button>
      <div className="flex-1">
        <h1
          className="text-xl font-bold text-[#3B2A14] leading-none"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Confirmar Pedido
        </h1>
        <div className="text-[11px] text-[#7A4A00] font-semibold mt-0.5">
          Revise os itens antes de enviar
        </div>
      </div>
      <img src="/logo.webp" alt="Duck" className="w-6 h-6" />
    </div>
  );
}
