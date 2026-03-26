import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useEffect } from "react";
import type { CartItem } from "../types.index";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
}

export function SacolaDrawer({
  isOpen,
  onClose,
  items,
  totalPrice,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("sacola-open");
    return () => {
      document.body.classList.remove("sacola-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const placeholderImage =
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80";

  const handleFinalize = () => {
    alert("Finalizando pedido! 🐥");
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-700 flex items-end justify-center bg-[rgba(30,18,6,0.6)] backdrop-blur-[3px]">
        {/* Drawer */}
        <div className="z-701 max-h-[78vh] w-full max-w-120 animate-[slideUp_0.25s_cubic-bezier(0.34,1.2,0.64,1)] overflow-hidden rounded-t-2xl bg-white px-3 pt-3 pb-8">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2
              className="text-dn-cocoa flex items-center gap-2 text-center text-[22px] font-bold"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              <ShoppingBagIcon /> Minha sacola
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="bg-dn-cream text-dn-mocha hover:bg-dn-stone flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none transition-colors"
            >
              <CloseIcon className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div
              className="text-dn-mist py-8 text-center text-sm"
              style={{
                backgroundImage: `<ShoppingBagIcon />`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              🐥 Sua sacola está vazia.
              <br />
              Adicione um donut!
            </div>
          ) : (
            <>
              <div className="shadow-dn-cream-border h-48 overflow-y-auto scroll-smooth shadow">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-dn-cream-border flex items-center gap-3 border-b px-1 py-2.5"
                  >
                    <img
                      src={item.image || placeholderImage}
                      alt={item.nome}
                      className="bg-dn-cream h-13 w-13 shrink-0 rounded-[10px] object-cover"
                    />
                    <div className="flex-1">
                      <div
                        className="text-dn-cocoa text-[15px] font-semibold"
                        style={{ fontFamily: "Fredoka, sans-serif" }}
                      >
                        {item.nome}
                      </div>
                      <div className="text-dn-mist mt-0.5 text-xs">
                        {item.quantity}x · R${" "}
                        {item.preco.toFixed(2).replace(".", ",")} cada
                      </div>
                    </div>
                    <div
                      className="text-dn-caramel-deep text-base font-bold"
                      style={{ fontFamily: "Fredoka, sans-serif" }}
                    >
                      R${" "}
                      {(item.preco * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-dn-caramel mt-4 flex items-center justify-between border-t-2 pt-3.5">
                <div
                  className="text-dn-cocoa text-lg font-semibold"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  Total
                </div>
                <div
                  className="text-dn-caramel-deep text-[22px] font-bold"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </div>
              </div>

              {/* Botão Finalizar */}
              <button
                onClick={handleFinalize}
                className="bg-dn-caramel text-dn-caramel-deep hover:bg-dn-caramel-dark mt-4 w-full cursor-pointer rounded-[10px] border-none py-3.5 text-[17px] font-bold transition-colors"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Finalizar pedido
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
