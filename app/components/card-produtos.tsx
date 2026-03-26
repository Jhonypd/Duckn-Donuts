import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import type { ProdutoDisplay } from "../types.index";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

interface ProductCardProps {
  product: ProdutoDisplay;
  quantity: number;
  onQuantityChange: (productId: number, quantity: number) => void;
  onImageClick: (product: ProdutoDisplay) => void;
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

  // Placeholder image if not provided
  const imageSrc =
    product.image ||
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80";

  return (
    <div className="border-dn-cream-border mb-3.5 flex items-stretch gap-0 overflow-hidden rounded-xl border bg-white shadow-[0_2px_12px_rgba(59,42,20,0.10)] transition-all duration-150 hover:translate-y-0.5 hover:shadow-[0_6px_20px_rgba(59,42,20,0.13)]">
      {/* Imagem */}
      <div
        className="bg-dn-cream group relative w-27 min-w-27 cursor-pointer overflow-hidden"
        onClick={() => onImageClick(product)}
      >
        <img
          src={imageSrc}
          alt={product.nome}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute right-1.5 bottom-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-md bg-white/50">
          <ZoomInOutlinedIcon className="text-dn-cocoa h-3 w-3" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col justify-between gap-1.5 p-3 pb-2.5">
        <div>
          {product.badge && (
            <div className="bg-dn-rose text-dn-rose-strong mb-1 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-bold">
              {product.badge}
            </div>
          )}
          <h3
            className="text-dn-cocoa mb-0.5 text-base leading-tight font-semibold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {product.nome}
          </h3>
          <p className="text-dn-mocha line-clamp-2 text-[11.5px] leading-relaxed">
            {product.descricao || "Sem descrição disponível"}
          </p>
        </div>

        {/* Preço e Controles */}
        <div className="mt-1 flex items-center justify-between gap-2">
          <div
            className="text-dn-caramel-deep text-lg font-bold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            R$ {product.preco.toFixed(2).replace(".", ",")}
          </div>

          {/* Seletor de Quantidade */}
          <div className="bg-dn-cream border-dn-cream-border flex items-center gap-1.5 rounded-full border px-1 py-0.5">
            <button
              onClick={handleDecrement}
              className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none transition-all active:scale-90 ${
                quantity > 0
                  ? "bg-dn-cream-border text-dn-caramel-deep"
                  : "bg-dn-stone text-dn-mocha"
              }`}
            >
              <RemoveOutlinedIcon className="h-4 w-4" strokeWidth={3} />
            </button>
            <div
              className="text-dn-cocoa min-w-4.5 text-center text-base font-semibold"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              {quantity}
            </div>
            <button
              onClick={handleIncrement}
              className="bg-dn-caramel text-dn-caramel-deep flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none transition-all active:scale-90"
            >
              <AddOutlinedIcon className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
