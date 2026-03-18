import { useState } from "react";
import type { CartItem, Produto } from "../../types.index";
import { CardProduto } from "../../components/card-produtos";
import { produtos } from "../../utils/produtos";
import { ModalImagem } from "../../components/modal-imagem";

const CatalogoPage = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity === 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [productId]: quantity });
    }
  };

  const cartItems: CartItem[] = Object.entries(cart).map(
    ([productId, quantity]) => {
      const product = produtos.find((p) => p.id === productId)!;
      return { ...product, quantity };
    },
  );

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col max-w-3xl w-full gap-4">
        {produtos.map((product) => (
          <CardProduto
            key={product.id}
            product={product}
            quantity={cart[product.id] || 0}
            onQuantityChange={handleQuantityChange}
            onImageClick={setSelectedProduct}
          />
        ))}
      </div>

      <ModalImagem
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
export default CatalogoPage;
