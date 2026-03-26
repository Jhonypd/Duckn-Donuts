interface ObservacoesPedidoProps {
  observacoes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ObservacoesPedido({
  observacoes,
  onChange,
}: ObservacoesPedidoProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#FDE8C5] mt-4 overflow-hidden shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="px-4 py-3.5 pb-3 border-b border-[#FDE8C5] flex items-center gap-2">
        <span className="text-lg">📝</span>
        <span
          className="text-[17px] font-semibold text-[#3B2A14]"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Observacoes
        </span>
      </div>
      <div className="p-4">
        <label className="text-xs font-bold text-[#7A6040] uppercase tracking-wide block mb-1.5">
          Algum pedido especial?
        </label>
        <textarea
          value={observacoes}
          onChange={onChange}
          placeholder="Ex: sem acucar no glazed, donut surpresa para aniversario..."
          className="w-full px-3.5 py-3 border-[1.5px] border-[#FDE8C5] rounded-[10px] text-sm font-medium text-[#3B2A14] bg-[#FFFDF7] resize-none outline-none min-h-[72px] transition-all placeholder:text-[#AEAAA2] focus:border-[#F4A635] focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)] focus:bg-white"
        />
      </div>
    </div>
  );
}
