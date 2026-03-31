import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AdminApiPedido,
  AdminApiPedidosResponse,
  AdminOrderStatus,
} from "../types.index";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

type IncluirPedidoPayload = {
  clienteNome: string;
  clienteWhatsapp: string;
  dataEntrega: string;
  horaEntrega: string;
  tipoEntrega: "retirada" | "entrega";
  endereco?: string;
  formaPagamento: "pix" | "dinheiro" | "cartao credito" | "cartao debito";
  observacao?: string;
  itens: Array<{
    produtoId: number;
    quantidade: number;
  }>;
};

type IncluirPedidoResponse = {
  success: boolean;
  mensagem?: string;
  codigoHttp?: number;
  resultado: {
    pedidoId: number;
  };
};

type EditarPedidoPayload = {
  id: number;
  endereco?: string;
  itens?: Array<{
    produtoId: number;
    quantidade: number;
  }>;
};

type AlterarStatusPayload = {
  id: number;
  status: "pendente" | "em preparacao" | "pronto" | "entregue";
};

type CancelarPedidoPayload = {
  id: number;
  motivo?: string;
};

type ApiDefaultResponse = {
  success: boolean;
  mensagem?: string;
  codigoHttp?: number;
  resultado: null;
};

export const pedidosApi = createApi({
  reducerPath: "pedidosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Pedidos"],
  endpoints: (builder) => ({
    incluirPedido: builder.mutation<
      IncluirPedidoResponse,
      IncluirPedidoPayload
    >({
      query: (payload) => ({
        url: "/pedidos/incluir",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Pedidos"],
    }),

    editarPedido: builder.mutation<ApiDefaultResponse, EditarPedidoPayload>({
      query: (payload) => ({
        url: "/pedidos/editar",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Pedidos"],
    }),

    listarPedidos: builder.query<AdminApiPedido[], void>({
      query: () => ({
        url: "/pedidos/listar",
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }),
      transformResponse: (response: AdminApiPedidosResponse) => {
        return response.resultado.pedidos;
      },
      providesTags: ["Pedidos"],
    }),

    alterarStatusPedido: builder.mutation<
      ApiDefaultResponse,
      AlterarStatusPayload
    >({
      query: (payload) => ({
        url: "/pedidos/alterar-status",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Pedidos"],
    }),

    cancelarPedido: builder.mutation<ApiDefaultResponse, CancelarPedidoPayload>(
      {
        query: (payload) => ({
          url: "/pedidos/cancelar",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["Pedidos"],
      },
    ),
  }),
});

export const {
  useIncluirPedidoMutation,
  useEditarPedidoMutation,
  useListarPedidosQuery,
  useAlterarStatusPedidoMutation,
  useCancelarPedidoMutation,
} = pedidosApi;

export const adminStatusToApiStatus: Record<
  Exclude<AdminOrderStatus, "cancelado">,
  AlterarStatusPayload["status"]
> = {
  novo: "pendente",
  preparo: "em preparacao",
  pronto: "pronto",
  entregue: "entregue",
};
