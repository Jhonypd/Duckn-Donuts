import { Textarea } from "../ui/textarea";

interface ObservacoesPedidoProps {
  observacoes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ObservacoesPedido({
  observacoes,
  onChange,
}: ObservacoesPedidoProps) {
  return (
    <div className="border-dn-cream-border mt-4 overflow-hidden rounded-2xl border bg-white shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="border-dn-cream-border flex items-center gap-2 border-b px-4 py-3.5 pb-3">
        <span
          className="text-dn-cocoa text-[17px] font-semibold"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Observações
        </span>
      </div>
      <div className="p-4">
        <label className="text-dn-mocha mb-1.5 block text-xs font-bold tracking-wide uppercase">
          Algum pedido especial?
        </label>
        <Textarea
          value={observacoes}
          onChange={onChange}
          placeholder="Ex: sem açucar no glazed, donut surpresa para aniversario..."
          className="border-dn-cream-border bg-dn-cream text-dn-cocoa placeholder:text-dn-mist focus:border-dn-caramel min-h-18 w-full resize-none rounded-[10px] border-[1.5px] px-3.5 py-3 text-sm font-medium transition-all outline-none focus:bg-white focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)]"
        />
      </div>
    </div>
  );
}
