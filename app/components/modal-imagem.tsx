import type { Produto } from "../types.index";

interface ImageModalProps {
  product: Produto | null;
  onClose: () => void;
}

export function ModalImagem({ product, onClose }: ImageModalProps) {
  if (!product) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed pointer-events-none inset-0 bg-[rgba(30,18,6,0.72)] backdrop-blur-sm z-500 flex items-center justify-center p-6 not-even:pop"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl max-w-95 w-full overflow-hidden animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover bg-[#FDF6E8]"
        />

        {/* Informações */}
        <div className="p-4 pb-5 px-4.5">
          <h2
            className="text-[22px] font-bold text-[#3B2A14] mb-1.5"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {product.name}
          </h2>
          <p className="text-[13px] text-[#7A6040] leading-relaxed mb-3.5">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="bg-[#FDF6E8] border-none rounded-lg px-4 py-2 text-[13px] font-bold text-[#7A6040] cursor-pointer hover:bg-[#E8E4DC] transition-colors"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.88); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
