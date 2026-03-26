import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { ProdutoDisplay, CategoriaProdutos } from "../../types.index";
import { CardProduto } from "../../components/card-produtos";
import { ModalImagem } from "../../components/modal-imagem";
import { useListarProdutosQuery } from "../../api/produtosApi";
import { CartFooter } from "../../components/cart-footer";
import { useCarrinho } from "../../context/carrinho-contexto";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80";

const CATEGORIAS = [
  { id: 0 as CategoriaProdutos, label: "Novidades" },
  { id: 4 as CategoriaProdutos, label: "Promoções" },
  { id: 1 as CategoriaProdutos, label: "Recheados" },
  { id: 2 as CategoriaProdutos, label: "Normais" },
  { id: 3 as CategoriaProdutos, label: "Gourmés" },
];

const CatalogoPage = () => {
  const { data, isLoading, isError } = useListarProdutosQuery({
    incluirInativos: false,
  });
  const navigate = useNavigate();
  const {
    itens,
    setQuantidade,
    totalItens,
    totalPreco,
  } = useCarrinho();
  const [produtos, setProdutos] = useState<ProdutoDisplay[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProdutoDisplay | null>(
    null,
  );

  useEffect(() => {
    if (data) {
      const normalizedProdutos: ProdutoDisplay[] = data.map((produto) => ({
        ...produto,
        image: PLACEHOLDER_IMAGE,
      }));
      setProdutos(normalizedProdutos);
    }
  }, [data]);

  const quantidadePorId = useMemo(() => {
    const map = new Map<number, number>();
    itens.forEach((item) => map.set(item.id, item.quantity));
    return map;
  }, [itens]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    const product = produtos.find((p) => p.id === productId);
    if (!product) return;
    setQuantidade(product, quantity);
  };

  const categoriasSet = new Set(CATEGORIAS.map((c) => c.id));
  const produtosPorCategoria = CATEGORIAS.map((categoria) => ({
    ...categoria,
    items: produtos.filter((p) => p.categoria === categoria.id),
  }));
  const produtosSemCategoria = produtos.filter(
    (p) => p.categoria === undefined || !categoriasSet.has(p.categoria),
  );

  const handleViewCart = () => {
    navigate("/pedido-revisao");
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
      <div className="flex w-full max-w-3xl flex-col gap-7 pb-14">
        {produtosPorCategoria.map((categoria) =>
          categoria.items.length === 0 ? null : (
            <section key={categoria.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2
                  className="text-dn-cocoa text-[20px] font-bold"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  {categoria.label}
                </h2>
                <span className="text-dn-mist text-xs">
                  {categoria.items.length} itens
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {categoria.items.map((p) => (
                  <CardProduto
                    key={p.id}
                    product={p}
                    quantity={quantidadePorId.get(p.id) || 0}
                    onQuantityChange={handleQuantityChange}
                    onImageClick={setSelectedProduct}
                  />
                ))}
              </div>
            </section>
          ),
        )}

        {produtosSemCategoria.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2
                className="text-dn-cocoa text-[20px] font-bold"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Outros
              </h2>
              <span className="text-dn-mist text-xs">
                {produtosSemCategoria.length} itens
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {produtosSemCategoria.map((p) => (
                <CardProduto
                  key={p.id}
                  product={p}
                  quantity={quantidadePorId.get(p.id) || 0}
                  onQuantityChange={handleQuantityChange}
                  onImageClick={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <ModalImagem
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Footer com Carrinho */}
      <CartFooter
        totalItems={totalItens}
        totalPrice={totalPreco}
        onViewCart={handleViewCart}
      />

    </div>
  );
};
export default CatalogoPage;
