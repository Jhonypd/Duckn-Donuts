interface ObservacoesPedidoProps {
  observacoes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ObservacoesPedido({
  observacoes,
  onChange,
}: ObservacoesPedidoProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-dn-cream-border bg-white shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="flex items-center gap-2 border-b border-dn-cream-border px-4 py-3.5 pb-3">
        <span
          className="text-[17px] font-semibold text-dn-cocoa"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Observações
        </span>
      </div>
      <div className="p-4">
        <label className="mb-1.5 block text-xs font-bold tracking-wide text-dn-mocha uppercase">
          Algum pedido especial?
        </label>
        <textarea
          value={observacoes}
          onChange={onChange}
          placeholder="Ex: sem açucar no glazed, donut surpresa para aniversario..."
          className="min-h-18 w-full resize-none rounded-[10px] border-[1.5px] border-dn-cream-border bg-dn-cream px-3.5 py-3 text-sm font-medium text-dn-cocoa transition-all outline-none placeholder:text-dn-mist focus:border-dn-caramel focus:bg-white focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)]"
        />
      </div>
    </div>
  );
}
