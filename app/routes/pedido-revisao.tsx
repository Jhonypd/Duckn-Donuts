import type { Route } from "./+types/pedido-revisao";
import PedidoRevisaoPage from "../pages/pedido-revisao/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Confirmar Pedido" },
    { name: "description", content: "Revise seu pedido" },
  ];
}

export default function PedidoRevisaoRoute() {
  return <PedidoRevisaoPage />;
}
