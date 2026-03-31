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

export interface AdminApiPedidoItem {
  id: number;
  produtoId: number;
  produtoNome: string;
  quantidade: number;
  valorUnitario: number;
}

export interface AdminApiPedido {
  id: number;
  clienteNome: string;
  clienteWhatsapp: string;
  dataEntrega: string;
  horaEntrega: string;
  tipoEntrega: number;
  endereco?: string | null;
  formaPagamento: number;
  status: number;
  observacao?: string | null;
  valorTotal: number;
  createdAt: string;
  updatedAt: string;
  itens: AdminApiPedidoItem[];
}

export interface AdminApiPedidosResponse {
  success: boolean;
  resultado: {
    pedidos: AdminApiPedido[];
  };
  mensagem?: string;
  codigoHttp: number;
}

export type AdminOrderStatus =
  | "novo"
  | "preparo"
  | "pronto"
  | "entregue"
  | "cancelado";
