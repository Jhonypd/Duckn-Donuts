export type AdminOrderStatus =
  | "novo"
  | "preparo"
  | "pronto"
  | "entregue"
  | "cancelado";

export type AdminOrder = {
  id: number;
  code: string;
  customer: string;
  phone: string;
  delivery: "delivery" | "retirada";
  items: string[];
  detailedItems: Array<{
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  address?: string;
  paymentMethod: string;
  deliveryDate: string;
  deliveryTime: string;
  notes?: string;
  total: number;
  createdAt: Date;
  status: AdminOrderStatus;
};

export const STATUS_FLOW: Array<Exclude<AdminOrderStatus, "cancelado">> = [
  "novo",
  "preparo",
  "pronto",
  "entregue",
];

export const STATUS_META: Record<
  Exclude<AdminOrderStatus, "cancelado">,
  {
    label: string;
    nextLabel: string | null;
  }
> = {
  novo: { label: "Novos", nextLabel: "Iniciar preparo" },
  preparo: { label: "Em preparo", nextLabel: "Marcar como pronto" },
  pronto: { label: "Pronto p/ entrega", nextLabel: "Confirmar entrega" },
  entregue: { label: "Entregues", nextLabel: null },
};
