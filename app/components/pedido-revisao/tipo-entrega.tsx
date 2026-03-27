import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StoreIcon from "@mui/icons-material/Store";
import type { TipoEntrega } from "./tipos";

interface TipoEntregaProps {
  tipo: TipoEntrega;
  onChange: (tipo: TipoEntrega) => void;
}

export function TipoEntrega({ tipo, onChange }: TipoEntregaProps) {
  return (
    <div className="border-dn-cream-border mt-4 overflow-hidden rounded-2xl border bg-white shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="border-dn-cream-border flex items-center gap-2 border-b px-4 py-3.5 pb-3">
        <span
          className="text-dn-cocoa text-[17px] font-semibold"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Como quer receber?
        </span>
      </div>
      <div className="p-4 pt-3">
        <div className="flex gap-2.5">
          <div
            onClick={() => onChange("delivery")}
            className={`h-full flex-1 cursor-pointer flex-col justify-between gap-4 rounded-[10px] border-[1.5px] p-2.5 px-3 transition-all ${
              tipo === "delivery"
                ? "border-dn-caramel bg-dn-cream-border"
                : "hover:bg-dn-cream-border border-dn-cream-border bg-dn-stone hover:border-dn-caramel"
            }`}
          >
            <div
              className="text-dn-cocoa mt-0.5 flex items-center gap-3 text-sm font-semibold"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              <DeliveryDiningIcon className="h-7! w-7!" />
              Entrega
            </div>
            <div className="text-dn-cocoa text-[11px] font-semibold">
              ~35 min · R$ 5,00
            </div>
          </div>
          <div
            onClick={() => onChange("pickup")}
            className={`h-full flex-1 cursor-pointer flex-col justify-between gap-4 rounded-[10px] border-[1.5px] p-2.5 px-3 transition-all ${
              tipo === "pickup"
                ? "border-dn-caramel bg-dn-cream-border"
                : "hover:bg-dn-cream-border border-dn-cream-border bg-dn-stone hover:border-dn-caramel"
            }`}
          >
            <div
              className="text-dn-cocoa mt-0.5 text-sm font-semibold"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              <StoreIcon className="h-7! w-7!" />
              Retirada
            </div>
            <div className="text-dn-cocoa text-[11px] font-semibold">
              ~15 min · Gratis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
