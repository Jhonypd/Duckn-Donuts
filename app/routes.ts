import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin", "routes/admin.tsx"),
  route("pedido-revisao", "routes/pedido-revisao.tsx"),
  route("pedido-confirmado", "routes/pedido-confirmado.tsx"),
  // Catch-all route for unmatched paths
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
