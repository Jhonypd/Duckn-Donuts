import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pedido-revisao", "routes/pedido-revisao.tsx"),
  // Catch-all route for unmatched paths
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
