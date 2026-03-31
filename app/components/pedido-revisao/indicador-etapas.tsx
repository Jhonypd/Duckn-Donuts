interface IndicadorEtapasProps {
  etapa: 1 | 2 | 3;
}

const getCirculoClasses = (etapaAtual: number, etapaIndicador: number) => {
  if (etapaAtual < etapaIndicador) {
    return "bg-dn-stone text-dn-mist";
  }
  if (etapaAtual === etapaIndicador) {
    return "bg-dn-caramel text-dn-caramel-deep";
  }
  return "bg-dn-caramel-deep text-dn-cream";
};

const getTextoClasses = (etapaAtual: number, etapaIndicador: number) => {
  if (etapaAtual < etapaIndicador) return "text-dn-mist";
  if (etapaAtual === etapaIndicador) return "text-dn-caramel-deep";
  return "text-dn-caramel-deep";
};

const getLinhaClasses = (ativa: boolean) =>
  ativa ? "bg-dn-caramel-deep" : "bg-dn-stone";

export function IndicadorEtapas({ etapa }: IndicadorEtapasProps) {
  return (
    <div className="border-dn-cream-border flex items-center justify-center gap-0 border-b bg-white px-5 py-3.5">
      <div className="flex items-center gap-1.5">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-bold ${getCirculoClasses(
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
      <div className={`mx-1 h-0.5 w-8 ${getLinhaClasses(etapa > 1)}`} />
      <div className="flex items-center gap-1.5">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-bold ${getCirculoClasses(
            etapa,
            2,
          )}`}
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {etapa > 2 ? "✓" : "2"}
        </div>
        <div className={`text-[11px] font-bold ${getTextoClasses(etapa, 2)}`}>
          Dados e entrega
        </div>
      </div>
      <div className={`mx-1 h-0.5 w-8 ${getLinhaClasses(etapa > 2)}`} />
      <div className="flex items-center gap-1.5">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-bold ${getCirculoClasses(
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
