import type { ProdutoDisplay } from "../types.index";

interface ImageModalProps {
  product: ProdutoDisplay | null;
  onClose: () => void;
}

export function ModalImagem({ product, onClose }: ImageModalProps) {
  if (!product) return null;

  const imageSrc =
    product.image ||
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80";

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
          src={imageSrc}
          alt={product.nome}
          className="w-full h-60 object-cover bg-dn-cream"
        />

        {/* Informações */}
        <div className="p-4 pb-5 px-4.5">
          <h2
            className="text-[22px] font-bold text-dn-cocoa mb-1.5"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {product.nome}
          </h2>
          <p className="text-[13px] text-dn-mocha leading-relaxed mb-3.5">
            {product.descricao || "Sem descrição disponível"}
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="bg-dn-cream border-none rounded-lg px-4 py-2 text-[13px] font-bold text-dn-mocha cursor-pointer hover:bg-dn-stone transition-colors"
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
