import type { TipoEntrega } from "./tipos";

interface TipoEntregaProps {
  tipo: TipoEntrega;
  onChange: (tipo: TipoEntrega) => void;
}

export function TipoEntrega({ tipo, onChange }: TipoEntregaProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#FDE8C5] mt-4 overflow-hidden shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="px-4 py-3.5 pb-3 border-b border-[#FDE8C5] flex items-center gap-2">
        <span className="text-lg">📍</span>
        <span
          className="text-[17px] font-semibold text-[#3B2A14]"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Como quer receber?
        </span>
      </div>
      <div className="p-4 pt-3">
        <div className="flex gap-2.5">
          <div
            onClick={() => onChange("delivery")}
            className={`flex-1 border-[1.5px] rounded-[10px] p-2.5 px-3 cursor-pointer transition-all ${
              tipo === "delivery"
                ? "border-[#F4A635] bg-[#FDE8C5]"
                : "border-[#FDE8C5] bg-[#FFFDF7] hover:border-[#F2C46D] hover:bg-[#FDE8C5]"
            }`}
          >
            <div className="text-xl">🛵</div>
            <div
              className="text-sm font-semibold text-[#3B2A14] mt-0.5"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Entrega
            </div>
            <div className="text-[11px] text-[#7A6040] font-semibold">
              ~35 min · R$ 5,00
            </div>
          </div>
          <div
            onClick={() => onChange("pickup")}
            className={`flex-1 border-[1.5px] rounded-[10px] p-2.5 px-3 cursor-pointer transition-all ${
              tipo === "pickup"
                ? "border-[#F4A635] bg-[#FDE8C5]"
                : "border-[#FDE8C5] bg-[#FFFDF7] hover:border-[#F2C46D] hover:bg-[#FDE8C5]"
            }`}
          >
            <div className="text-xl">🏪</div>
            <div
              className="text-sm font-semibold text-[#3B2A14] mt-0.5"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Retirada
            </div>
            <div className="text-[11px] text-[#7A6040] font-semibold">
              ~15 min · Gratis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
