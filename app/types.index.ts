// API Types based on PHP API
export enum CategoriaProdutos {
  NOVIDADES = 0,
  RECHEADOS = 1,
  NORMAIS = 2,
  GOURMES = 3,
  PROMOCOES = 4,
}

export interface Produto {
  id: number;
  nome: string;
  referencia: string;
  descricao?: string;
  preco: number;
  inativo: 0 | 1;
  categoria?: CategoriaProdutos;
}

// Local display types (can extend Produto if needed)
export interface ProdutoDisplay extends Produto {
  image?: string;
  badge?: string;
}

export interface CartItem extends ProdutoDisplay {
  quantity: number;
}

// API Response types
export interface ListarProdutosResponse {
  success: boolean;
  resultado: {
    produtos: Produto[];
  };
  mensagem?: string;
  codigoHttp: number;
}
