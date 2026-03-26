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
      className="not-even:pop fixed inset-0 z-500 flex items-center justify-center bg-[rgba(30,18,6,0.72)] p-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-95 animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem */}
        <img
          src={imageSrc}
          alt={product.nome}
          className="bg-dn-cream h-60 w-full object-cover"
        />

        {/* Informações */}
        <div className="p-4 px-4.5 pb-5">
          <h2
            className="text-dn-cocoa mb-1.5 text-[22px] font-bold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {product.nome}
          </h2>
          <p className="text-dn-mocha mb-3.5 text-[13px] leading-relaxed">
            {product.descricao || "Sem descrição disponível"}
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={onClose}
              className="bg-dn-cream text-dn-mocha hover:bg-dn-stone cursor-pointer rounded-lg border-none px-4 py-2 text-[13px] font-bold transition-colors"
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
