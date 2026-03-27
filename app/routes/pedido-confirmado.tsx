import type { Route } from "./+types/pedido-confirmado";
import PedidoConfirmadoPage from "../pages/pedido-confirmado/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pedido confirmado" },
    { name: "description", content: "Seu pedido foi confirmado" },
  ];
}

export default function PedidoConfirmadoRoute() {
  return <PedidoConfirmadoPage />;
}
