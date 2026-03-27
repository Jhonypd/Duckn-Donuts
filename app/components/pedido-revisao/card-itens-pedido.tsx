import type { CartItem } from "../../types.index";
import { ItemPedido } from "./item-pedido";
import { ResumoPedido } from "./resumo-pedido";

interface CardItensPedidoProps {
  itens: CartItem[];
  subtotal: number;
  taxaEntrega?: number;
  total: number;
  onEditar: () => void;
  onQuantidade: (productId: number, quantity: number) => void;
  formatPrice: (value: number) => string;
  editavel?: boolean;
  mostrarEditar?: boolean;
}

export function CardItensPedido({
  itens,
  subtotal,
  taxaEntrega,
  total,
  onEditar,
  onQuantidade,
  formatPrice,
  editavel = true,
  mostrarEditar = true,
}: CardItensPedidoProps) {
  return (
    <div className="border-dn-cream-border mt-4 overflow-hidden rounded-2xl border bg-white shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="border-dn-cream-border flex items-center justify-between border-b px-4 py-3.5 pb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-dn-cocoa text-[17px] font-semibold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Itens do pedido
          </span>
        </div>
        {mostrarEditar && (
          <button
            onClick={onEditar}
            className="bg-dn-cream-border text-dn-cocoa hover:bg-dn-cream-border cursor-pointer rounded-md border-none px-2.5 py-1 text-xs font-bold transition-colors"
          >
            Editar
          </button>
        )}
      </div>

      <div className="h-52 overflow-y-auto py-1">
        {itens.map((item) => (
          <ItemPedido
            key={item.id}
            item={item}
            onQuantidade={onQuantidade}
            formatPrice={formatPrice}
            editavel={editavel}
          />
        ))}
      </div>

      <ResumoPedido
        subtotal={subtotal}
        taxaEntrega={taxaEntrega}
        total={total}
        formatPrice={formatPrice}
      />
    </div>
  );
}
