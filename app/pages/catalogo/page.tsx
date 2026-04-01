import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import type { ProdutoDisplay, CategoriaProdutos } from "../../types.index";
import { CardProduto } from "../../components/card-produtos";
import { ModalImagem } from "../../components/modal-imagem";
import { useListarProdutosQuery } from "../../api/produtosApi";
import { CartFooter } from "../../components/cart-footer";
import { useCarrinho } from "../../context/carrinho-contexto";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../components/ui/combobox";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

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
  const { itens, setQuantidade, totalItens, totalPreco } = useCarrinho();
  const [produtos, setProdutos] = useState<ProdutoDisplay[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProdutoDisplay | null>(
    null,
  );
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>(
    "all",
  );
  const [busca, setBusca] = useState("");

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

  const handleViewCart = () => {
    navigate("/pedido-revisao");
  };

  type CategoriaOption = { value: string; label: string };

  const categoriaOptions = useMemo<CategoriaOption[]>(
    () => [
      { value: "all", label: "Todas as categorias" },
      ...CATEGORIAS.map((categoria) => ({
        value: String(categoria.id),
        label: categoria.label,
      })),
    ],
    [],
  );

  const selectedCategoria =
    categoriaOptions.find((option) => option.value === categoriaSelecionada) ??
    categoriaOptions[0];

  const handleCategoriaChange = (value: CategoriaOption | null) => {
    setCategoriaSelecionada(value?.value ?? "all");
  };

  const categoriaAtual = CATEGORIAS.find(
    (categoria) => String(categoria.id) === categoriaSelecionada,
  );

  const filtrosAtivos =
    busca.trim().length > 0 || categoriaSelecionada !== "all";

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const categoriaId =
      categoriaSelecionada === "all" ? null : Number(categoriaSelecionada);

    return produtos.filter((produto) => {
      const matchBusca =
        termo.length === 0 ||
        produto.nome.toLowerCase().includes(termo) ||
        (produto.descricao?.toLowerCase().includes(termo) ?? false);
      const matchCategoria =
        categoriaId === null ? true : produto.categoria === categoriaId;
      return matchBusca && matchCategoria;
    });
  }, [busca, categoriaSelecionada, produtos]);

  const categoriasSet = new Set(CATEGORIAS.map((c) => c.id));
  const produtosPorCategoria = CATEGORIAS.map((categoria) => ({
    ...categoria,
    items: produtosFiltrados.filter((p) => p.categoria === categoria.id),
  }));
  const produtosSemCategoria = produtosFiltrados.filter(
    (p) => p.categoria === undefined || !categoriasSet.has(p.categoria),
  );

  const handleClearFilters = () => {
    setBusca("");
    setCategoriaSelecionada("all");
  };

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-lg text-red-600">Erro ao carregar produtos.</p>
      </div>
    );
  }

  return (
    <div
      className="bg-dn-cream relative min-h-screen pb-24"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <div className="bg-dn-rose/40 pointer-events-none absolute -top-24 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full blur-3xl" />
      <div className="bg-dn-caramel/35 pointer-events-none absolute -bottom-28 right-[-3rem] h-64 w-64 rounded-full blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-dn-caramel/20 text-dn-caramel-deep flex h-12 w-12 items-center justify-center rounded-2xl">
              <LocalCafeRoundedIcon className="h-6! w-6!" />
            </div>
            <div>
              <h1
                className="text-dn-cocoa text-2xl font-bold"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Catálogo Duck'n Donuts
              </h1>
              <p className="text-dn-mocha text-sm font-semibold">
                Escolha seus donuts favoritos e finalize em poucos passos.
              </p>
            </div>
          </div>
        </header>

        <div className="hidden flex-col gap-3 rounded-2xl border border-dn-cream-border bg-white/80 p-4 shadow-[0_10px_24px_rgba(59,42,20,0.08)] backdrop-blur md:flex">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="flex flex-col gap-1.5">
              <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                Buscar produto
              </label>
              <div className="relative">
                <SearchRoundedIcon className="text-dn-mist absolute left-3 top-1/2 h-5! w-5! -translate-y-1/2" />
                <Input
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Ex: chocolate, doce de leite..."
                  className="bg-dn-cream text-dn-cocoa h-auto rounded-[10px] border-[1.5px] border-dn-cream-border px-3.5 py-3 pl-10 text-[15px] font-semibold"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                Categoria
              </label>
              <Combobox
                items={categoriaOptions}
                value={selectedCategoria}
                onValueChange={(value) => handleCategoriaChange(value)}
                itemToStringLabel={(item) => item.label}
                itemToStringValue={(item) => item.value}
                isItemEqualToValue={(a, b) => a.value === b.value}
                filter={null}
              >
                <ComboboxInput
                  placeholder="Todas as categorias"
                  className="bg-dn-cream text-dn-cocoa h-auto rounded-[10px] border-[1.5px] border-dn-cream-border px-3.5 py-2.5 text-[15px] font-semibold"
                  showClear={categoriaSelecionada !== "all"}
                />
                <ComboboxContent className="border-dn-cream-border rounded-2xl border bg-white/95">
                  <ComboboxList>
                    {(option) => (
                      <ComboboxItem key={option.value} value={option}>
                        {option.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                  <ComboboxEmpty>Nenhum resultado</ComboboxEmpty>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-dn-mist text-xs font-semibold">
              {produtosFiltrados.length} itens encontrados
            </p>
            {filtrosAtivos && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-dn-cocoa hover:text-dn-caramel-deep text-xs font-bold"
                  >
                    Limpar filtros
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar filtros?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Seus filtros atuais serão removidos.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearFilters}>
                      Limpar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:hidden">
          <div>
            <p className="text-dn-cocoa text-sm font-semibold">
              {produtosFiltrados.length} itens encontrados
            </p>
            {filtrosAtivos && (
              <p className="text-dn-mist text-[11px] font-semibold">
                Filtros ativos
              </p>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="border-dn-cream-border bg-white text-dn-cocoa rounded-xl px-3 py-2 text-sm font-semibold"
              >
                <FilterAltRoundedIcon className="h-4! w-4!" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                    Buscar produto
                  </label>
                  <div className="relative">
                    <SearchRoundedIcon className="text-dn-mist absolute left-3 top-1/2 h-5! w-5! -translate-y-1/2" />
                    <Input
                      value={busca}
                      onChange={(event) => setBusca(event.target.value)}
                      placeholder="Ex: chocolate, doce de leite..."
                      className="bg-dn-cream text-dn-cocoa h-auto rounded-[10px] border-[1.5px] border-dn-cream-border px-3.5 py-3 pl-10 text-[15px] font-semibold"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                    Categoria
                  </label>
                  <Combobox
                    items={categoriaOptions}
                    value={selectedCategoria}
                    onValueChange={(value) => handleCategoriaChange(value)}
                    itemToStringLabel={(item) => item.label}
                    itemToStringValue={(item) => item.value}
                    isItemEqualToValue={(a, b) => a.value === b.value}
                    filter={null}
                  >
                    <ComboboxInput
                      placeholder="Todas as categorias"
                      className="bg-dn-cream text-dn-cocoa h-auto rounded-[10px] border-[1.5px] border-dn-cream-border px-3.5 py-2.5 text-[15px] font-semibold"
                      showClear={categoriaSelecionada !== "all"}
                    />
                    <ComboboxContent className="border-dn-cream-border rounded-2xl border bg-white/95">
                      <ComboboxList>
                        {(option) => (
                          <ComboboxItem key={option.value} value={option}>
                            {option.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                      <ComboboxEmpty>Nenhum resultado</ComboboxEmpty>
                    </ComboboxContent>
                  </Combobox>
                </div>
              </div>
              <SheetFooter>
                {filtrosAtivos && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-dn-cream-border text-dn-cocoa"
                      >
                        Limpar filtros
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Limpar filtros?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Seus filtros atuais serão removidos.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearFilters}>
                          Limpar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <SheetClose asChild>
                  <Button
                    type="button"
                    className="bg-dn-caramel text-dn-caramel-deep hover:bg-dn-caramel-dark"
                  >
                    Aplicar filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-5 pb-14">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <Skeleton className="h-5 w-40" />
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 2 }).map((__, cardIndex) => (
                    <Skeleton key={cardIndex} className="h-24 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="border-dn-cream-border bg-white/80 mt-4 rounded-2xl border px-6 py-10 text-center shadow-[0_10px_24px_rgba(59,42,20,0.08)]">
            <p className="text-dn-cocoa text-lg font-bold">
              Nenhum produto encontrado
            </p>
            <p className="text-dn-mocha mt-2 text-sm font-semibold">
              Tente ajustar sua busca ou remover os filtros.
            </p>
            {filtrosAtivos && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearFilters}
                className="text-dn-caramel-deep mt-4 font-bold"
              >
                Limpar filtros
              </Button>
            )}
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-7 pb-14">
            {categoriaSelecionada === "all" ? (
              <>
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
              </>
            ) : (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2
                    className="text-dn-cocoa text-[20px] font-bold"
                    style={{ fontFamily: "Fredoka, sans-serif" }}
                  >
                    {categoriaAtual?.label ?? "Categoria"}
                  </h2>
                  <span className="text-dn-mist text-xs">
                    {produtosFiltrados.length} itens
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {produtosFiltrados.map((p) => (
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
        )}
      </div>

      <ModalImagem
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartFooter
        totalItems={totalItens}
        totalPrice={totalPreco}
        onViewCart={handleViewCart}
      />
    </div>
  );
};
export default CatalogoPage;
