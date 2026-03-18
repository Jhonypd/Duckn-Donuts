import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import type { Produto } from "../types.index";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

interface ProductCardProps {
  product: Produto;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
  onImageClick: (product: Produto) => void;
}

export function CardProduto({
  product,
  quantity,
  onQuantityChange,
  onImageClick,
}: ProductCardProps) {
  const handleIncrement = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(59,42,20,0.10)] border border-[#FDE8C5] flex items-stretch gap-0 mb-3.5 overflow-hidden transition-all duration-150 hover:translate-y-0.5 hover:shadow-[0_6px_20px_rgba(59,42,20,0.13)]">
      {/* Imagem */}
      <div
        className="w-27 min-w-27 relative overflow-hidden bg-[#FDF6E8] cursor-pointer group"
        onClick={() => onImageClick(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-1.5 right-1.5 bg-white/50 rounded-md w-5.5 h-5.5 flex items-center justify-center pointer-events-none">
          <ZoomInOutlinedIcon className="w-3 h-3 text-[#3B2A14]" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 pb-2.5 flex flex-col justify-between gap-1.5">
        <div>
          {product.badge && (
            <div className="inline-block bg-[#FDE8F3] text-[#b5496a] text-[10px] font-bold px-1.5 py-0.5 rounded-full mb-1">
              {product.badge}
            </div>
          )}
          <h3
            className="text-base font-semibold text-[#3B2A14] leading-tight mb-0.5"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {product.name}
          </h3>
          <p className="text-[11.5px] text-[#7A6040] leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Preço e Controles */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <div
            className="text-lg font-bold text-[#7A4A00]"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            R$ {product.price.toFixed(2).replace(".", ",")}
          </div>

          {/* Seletor de Quantidade */}
          <div className="flex items-center gap-1.5 bg-[#FDF6E8] rounded-full px-1 py-0.5 border border-[#FDE8C5]">
            <button
              onClick={handleDecrement}
              className={`w-7 h-7 rounded-full border-none cursor-pointer flex items-center justify-center transition-all active:scale-90 ${
                quantity > 0
                  ? "bg-[#FDE8C5] text-[#7A4A00]"
                  : "bg-[#E8E4DC] text-[#7A6040]"
              }`}
            >
              <RemoveOutlinedIcon className="w-4 h-4" strokeWidth={3} />
            </button>
            <div
              className="min-w-4.5 text-center text-base font-semibold text-[#3B2A14]"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              {quantity}
            </div>
            <button
              onClick={handleIncrement}
              className="w-7 h-7 rounded-full border-none cursor-pointer bg-[#F4A635] text-[#7A4A00] flex items-center justify-center transition-all active:scale-90"
            >
              <AddOutlinedIcon className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
