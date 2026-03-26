interface IndicadorEtapasProps {
  etapa: 1 | 2 | 3;
}

const getCirculoClasses = (etapaAtual: number, etapaIndicador: number) => {
  if (etapaAtual < etapaIndicador) {
    return "bg-[#E8E4DC] text-[#AEAAA2]";
  }
  if (etapaAtual === etapaIndicador) {
    return "bg-[#F4A635] text-[#7A4A00]";
  }
  return "bg-[#27AE60] text-white";
};

const getTextoClasses = (etapaAtual: number, etapaIndicador: number) => {
  if (etapaAtual < etapaIndicador) return "text-[#AEAAA2]";
  if (etapaAtual === etapaIndicador) return "text-[#7A4A00]";
  return "text-[#7A6040]";
};

const getLinhaClasses = (ativa: boolean) =>
  ativa ? "bg-[#27AE60]" : "bg-[#E8E4DC]";

export function IndicadorEtapas({ etapa }: IndicadorEtapasProps) {
  return (
    <div className="bg-white px-5 py-3.5 flex items-center justify-center gap-0 border-b border-[#FDE8C5]">
      <div className="flex items-center gap-1.5">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${getCirculoClasses(
            etapa,
            1,
          )}`}
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {etapa > 1 ? "✓" : "1"}
        </div>
        <div className={`text-[11px] font-bold ${getTextoClasses(etapa, 1)}`}>
          Sacola
        </div>
      </div>
      <div className={`w-8 h-0.5 mx-1 ${getLinhaClasses(etapa > 1)}`} />
      <div className="flex items-center gap-1.5">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${getCirculoClasses(
            etapa,
            2,
          )}`}
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {etapa > 2 ? "✓" : "2"}
        </div>
        <div className={`text-[11px] font-bold ${getTextoClasses(etapa, 2)}`}>
          Revisao
        </div>
      </div>
      <div className={`w-8 h-0.5 mx-1 ${getLinhaClasses(etapa > 2)}`} />
      <div className="flex items-center gap-1.5">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${getCirculoClasses(
            etapa,
            3,
          )}`}
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          3
        </div>
        <div className={`text-[11px] font-bold ${getTextoClasses(etapa, 3)}`}>
          Confirmado
        </div>
      </div>
    </div>
  );
}
