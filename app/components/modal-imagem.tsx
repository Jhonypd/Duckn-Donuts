import type { ProdutoDisplay } from "../types.index";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ImageModalProps {
  product: ProdutoDisplay | null;
  onClose: () => void;
}

export function ModalImagem({ product, onClose }: ImageModalProps) {
  const imageSrc =
    product?.image ||
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80";

  return (
    <Dialog open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden p-0">
        <img
          src={imageSrc}
          alt={product?.nome ?? "Produto"}
          className="bg-dn-cream h-60 w-full object-cover"
        />
        <DialogHeader className="px-4.5 pt-4 pb-0">
          <DialogTitle
            className="text-[22px] font-bold"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            {product?.nome}
          </DialogTitle>
          <p className="text-dn-mocha text-[13px] leading-relaxed">
            {product?.descricao || "Sem descrição disponível"}
          </p>
        </DialogHeader>
        <div className="px-4.5 pb-5 pt-3">
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="bg-dn-cream text-dn-mocha hover:bg-dn-stone cursor-pointer rounded-lg border-none px-4 py-2 text-[13px] font-bold transition-colors"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
