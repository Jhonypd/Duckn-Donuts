import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Produto, ListarProdutosResponse } from "../types.index";

const API_BASE_URL = "http://localhost:8080";

export const produtosApi = createApi({
  reducerPath: "produtosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Produtos"],
  endpoints: (builder) => ({
    listarProdutos: builder.query<Produto[], { incluirInativos?: boolean }>({
      query: ({ incluirInativos = false }) => ({
        url: "/produtos/listar",
        method: "GET",
        headers: {
          incluirInativos: incluirInativos ? "1" : "0",
          "content-type": "application/json",
        },
      }),
      transformResponse: (response: ListarProdutosResponse) => {
        return response.resultado.produtos;
      },
      providesTags: ["Produtos"],
    }),
  }),
});

export const { useListarProdutosQuery } = produtosApi;
