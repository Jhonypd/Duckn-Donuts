import { useEffect, useState } from "react";
import type { CartItem, Produto, ProdutoDisplay } from "../../types.index";
import { CardProduto } from "../../components/card-produtos";
import { ModalImagem } from "../../components/modal-imagem";
import { useListarProdutosQuery } from "../../api/produtosApi";
import { CartFooter } from "../../components/cart-footer";
import { SacolaDrawer } from "../../components/sacola-drawer";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80";

const CatalogoPage = () => {
  const { data, isLoading, isError } = useListarProdutosQuery({
    incluirInativos: false,
  });
  const [produtos, setProdutos] = useState<ProdutoDisplay[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<ProdutoDisplay | null>(
    null,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (data) {
      const normalizedProdutos: ProdutoDisplay[] = data.map((produto) => ({
        ...produto,
        image: PLACEHOLDER_IMAGE,
      }));
      setProdutos(normalizedProdutos);
    }
  }, [data]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity === 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [productId]: quantity });
    }
  };

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = produtos.find((p) => p.id === parseInt(productId));
      if (!product) return undefined;
      return { ...product, quantity };
    })
    .filter((item): item is CartItem => Boolean(item));

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0,
  );

  const handleViewCart = () => {
    setIsCartOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-lg">Carregando produtos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-lg text-red-600">Erro ao carregar produtos.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-3xl flex-col gap-4 pb-14">
        {produtos &&
          produtos.map((p) => (
            <CardProduto
              key={p.id}
              product={p}
              quantity={cart[p.id] || 0}
              onQuantityChange={handleQuantityChange}
              onImageClick={setSelectedProduct}
            />
          ))}
      </div>

      <ModalImagem
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Footer com Carrinho */}
      <CartFooter
        totalItems={totalItems}
        totalPrice={totalPrice}
        onViewCart={handleViewCart}
      />

      {/* Drawer da Sacola */}
      <SacolaDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        totalPrice={totalPrice}
      />
    </div>
  );
};
export default CatalogoPage;
