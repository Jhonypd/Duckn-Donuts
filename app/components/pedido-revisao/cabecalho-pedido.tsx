import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button } from "../ui/button";

interface CabecalhoPedidoProps {
  onVoltar: () => void;
}

export function CabecalhoPedido({ onVoltar }: CabecalhoPedidoProps) {
  return (
    <div className="bg-dn-caramel sticky top-0 z-50 flex items-center gap-3 p-3.5 px-5 shadow-[0_2px_12px_rgba(59,42,20,0.15)]">
      <Button
        type="button"
        variant="ghost"
        onClick={onVoltar}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border-none bg-white/35 transition-colors hover:bg-white/55"
        aria-label="Voltar"
      >
        <ArrowBackIosNewIcon className="text-dn-cocoa h-6! w-6! text-base" />
      </Button>
      <div className="flex-1">
        <h1
          className="text-dn-cocoa text-xl leading-none font-bold"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Confirmar Pedido
        </h1>
        <div className="text-dn-mocha mt-0.5 text-[11px] font-semibold">
          Revise os itens antes de enviar
        </div>
      </div>
      <img src="/logo.webp" alt="Duck" className="h-8 w-8 rounded-full" />
    </div>
  );
}
