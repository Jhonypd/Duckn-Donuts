import { configureStore } from "@reduxjs/toolkit";
import { produtosApi } from "./api/produtosApi";

export const store = configureStore({
  reducer: {
    [produtosApi.reducerPath]: produtosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(produtosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
