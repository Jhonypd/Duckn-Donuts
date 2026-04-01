import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import type { CartItem } from "../../types.index";
import { Button } from "../ui/button";

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
    <div className="border-dn-cream-border hover:bg-dn-cream flex items-center gap-3 border-b px-4 py-2.5 transition-colors last:border-b-0">
      <img
        src={item.image || PLACEHOLDER_IMAGE}
        alt={item.nome}
        className="bg-dn-cream h-13 w-13 shrink-0 rounded-[10px] object-cover"
      />
      <div className="flex flex-1 flex-col justify-between gap-1.5">
        <div
          className="text-dn-cocoa max-w-48 overflow-hidden text-[15px] leading-tight font-semibold text-nowrap overflow-ellipsis"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {item.nome}
        </div>
        <div className="mt-1 flex w-full items-center justify-between gap-2">
          {editavel ? (
            <div className="border-dn-cream-border bg-dn-mist flex items-center gap-1 rounded-full border px-0.5 py-0.5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onQuantidade(item.id, item.quantity - 1)}
                className="bg-dn-cream border-dn-cream-border text-dn-caramel-deep flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded-full border-none transition-all active:scale-90"
                aria-label="Diminuir quantidade"
              >
                {item.quantity > 1 ? (
                  <RemoveOutlinedIcon className="h-3.5! w-3.5!" />
                ) : (
                  <DeleteIcon className="h-3.5! w-3.5! text-red-500" />
                )}
              </Button>
              <span
                className="text-dn-caramel-deep min-w-4 text-center text-sm font-semibold"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onQuantidade(item.id, item.quantity + 1)}
                className="bg-dn-caramel text-dn-caramel-deep flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded-full border-none transition-all active:scale-90"
                aria-label="Aumentar quantidade"
              >
                <AddOutlinedIcon className="h-3.5! w-3.5!" />
              </Button>
            </div>
          ) : (
            <span className="text-dn-mocha text-[11px] font-semibold">
              {item.quantity}x
            </span>
          )}
          <span
            className="text-dn-caramel-deep shrink-0 text-base font-bold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {formatPrice(item.preco * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
