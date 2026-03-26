import type { CartItem } from "../../types.index";
import { ItemPedido } from "./item-pedido";
import { ResumoPedido } from "./resumo-pedido";

interface CardItensPedidoProps {
  itens: CartItem[];
  subtotal: number;
  taxaEntrega: number;
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
    <div className="bg-white rounded-2xl border border-[#FDE8C5] mt-4 overflow-hidden shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="px-4 py-3.5 pb-3 border-b border-[#FDE8C5] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🍩</span>
          <span
            className="text-[17px] font-semibold text-[#3B2A14]"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Itens do pedido
          </span>
        </div>
        {mostrarEditar && (
          <button
            onClick={onEditar}
            className="text-xs font-bold text-[#7A4A00] bg-[#FDE8C5] border-none rounded-md px-2.5 py-1 cursor-pointer hover:bg-[#F2C46D] transition-colors"
          >
            Editar
          </button>
        )}
      </div>

      <div className="py-1">
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
