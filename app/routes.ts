import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Catch-all route for unmatched paths
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
