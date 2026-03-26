import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import type { CartItem } from "../../types.index";

interface ItemPedidoProps {
  item: CartItem;
  onQuantidade: (productId: number, quantity: number) => void;
  formatPrice: (value: number) => string;
  editavel?: boolean;
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80";

export function ItemPedido({
  item,
  onQuantidade,
  formatPrice,
  editavel = true,
}: ItemPedidoProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#FDF6E8] last:border-b-0 hover:bg-[#FFFDF7] transition-colors">
      <img
        src={item.image || PLACEHOLDER_IMAGE}
        alt={item.nome}
        className="w-[52px] h-[52px] rounded-[10px] object-cover bg-[#FDF6E8] flex-shrink-0"
      />
      <div className="flex-1">
        <div
          className="text-[15px] font-semibold text-[#3B2A14] leading-tight"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {item.nome}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {editavel ? (
            <div className="flex items-center gap-1 bg-[#FDF6E8] border border-[#FDE8C5] rounded-full px-0.5 py-0.5">
              <button
                onClick={() => onQuantidade(item.id, item.quantity - 1)}
                className="w-5.5 h-5.5 rounded-full bg-[#FDE8C5] text-[#7A4A00] border-none cursor-pointer flex items-center justify-center transition-all active:scale-90"
                aria-label="Diminuir quantidade"
              >
                <RemoveOutlinedIcon className="h-3.5 w-3.5" />
              </button>
              <span
                className="min-w-[16px] text-center text-sm font-semibold text-[#3B2A14]"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantidade(item.id, item.quantity + 1)}
                className="w-5.5 h-5.5 rounded-full bg-[#F4A635] text-[#7A4A00] border-none cursor-pointer flex items-center justify-center transition-all active:scale-90"
                aria-label="Aumentar quantidade"
              >
                <AddOutlinedIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-[11px] text-[#7A6040] font-semibold">
              {item.quantity}x
            </span>
          )}
          <span className="text-[11px] text-[#AEAAA2] font-semibold">
            {formatPrice(item.preco)} cada
          </span>
        </div>
      </div>
      <span
        className="text-base font-bold text-[#7A4A00] flex-shrink-0"
        style={{ fontFamily: "Fredoka, sans-serif" }}
      >
        {formatPrice(item.preco * item.quantity)}
      </span>
    </div>
  );
}
