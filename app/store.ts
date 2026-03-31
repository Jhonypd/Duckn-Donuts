import { configureStore } from "@reduxjs/toolkit";
import { pedidosApi } from "./api/pedidosApi";
import { produtosApi } from "./api/produtosApi";

export const store = configureStore({
  reducer: {
    [pedidosApi.reducerPath]: pedidosApi.reducer,
    [produtosApi.reducerPath]: produtosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pedidosApi.middleware,
      produtosApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
