import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, ProdutoDisplay } from "../types.index";

interface CarrinhoContextValue {
  itens: CartItem[];
  setQuantidade: (produto: ProdutoDisplay, quantidade: number) => void;
  setQuantidadePorId: (productId: number, quantidade: number) => void;
  limpar: () => void;
  totalItens: number;
  totalPreco: number;
}

const CarrinhoContext = createContext<CarrinhoContextValue | undefined>(
  undefined,
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);

  const setQuantidade = (produto: ProdutoDisplay, quantidade: number) => {
    setItens((prev) => {
      const index = prev.findIndex((item) => item.id === produto.id);
      if (quantidade <= 0) {
        if (index === -1) return prev;
        return prev.filter((item) => item.id !== produto.id);
      }

      if (index === -1) {
        return [...prev, { ...produto, quantity: quantidade }];
      }

      const next = [...prev];
      next[index] = { ...next[index], quantity: quantidade };
      return next;
    });
  };

  const setQuantidadePorId = (productId: number, quantidade: number) => {
    setItens((prev) => {
      const index = prev.findIndex((item) => item.id === productId);
      if (index === -1) return prev;
      if (quantidade <= 0) {
        return prev.filter((item) => item.id !== productId);
      }
      const next = [...prev];
      next[index] = { ...next[index], quantity: quantidade };
      return next;
    });
  };

  const limpar = () => setItens([]);

  const totalItens = useMemo(
    () => itens.reduce((sum, item) => sum + item.quantity, 0),
    [itens],
  );
  const totalPreco = useMemo(
    () => itens.reduce((sum, item) => sum + item.preco * item.quantity, 0),
    [itens],
  );

  const value = useMemo(
    () => ({
      itens,
      setQuantidade,
      setQuantidadePorId,
      limpar,
      totalItens,
      totalPreco,
    }),
    [itens, totalItens, totalPreco],
  );

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  }
  return context;
}
