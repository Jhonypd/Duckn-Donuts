import { STATUS_META } from "./admin-types";
import type { AdminOrder } from "./admin-types";

type AdminOrderCardProps = {
  order: AdminOrder;
  onChangeStatus: (id: number, status: AdminOrder["status"]) => void;
  onCancelOrder: (id: number) => void;
  onOpenDetails: (id: number) => void;
  onOpenEdit: (id: number) => void;
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const timeAgo = (date: Date) => {
  const diffMinutes = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 60000),
  );

  if (diffMinutes < 1) return "agora";
  if (diffMinutes === 1) return "1 min atras";
  if (diffMinutes < 60) return `${diffMinutes} min atras`;

  const hours = Math.floor(diffMinutes / 60);
  return `${hours}h atras`;
};

export const AdminOrderCard = ({
  order,
  onChangeStatus,
  onCancelOrder,
  onOpenDetails,
  onOpenEdit,
}: AdminOrderCardProps) => {
  if (order.status === "cancelado") return null;

  const status = STATUS_META[order.status];

  return (
    <article className={`admin-order-card admin-order-card--${order.status}`}>
      <header className="admin-order-top">
        <div>
          <p className="admin-order-code">{order.code}</p>
          <p className="admin-order-time">{timeAgo(order.createdAt)}</p>
        </div>
        <span className="admin-order-status">{status.label}</span>
      </header>

      <div className="admin-order-middle">
        <p className="admin-order-customer">{order.customer}</p>
        <span className="admin-order-delivery">
          {order.delivery === "delivery" ? "Entrega" : "Retirada"}
        </span>
      </div>

      <p className="admin-order-items">{order.items.join(", ")}</p>

      <footer className="admin-order-footer">
        <span className="admin-order-total">{formatMoney(order.total)}</span>
      </footer>

      <div className="admin-order-actions admin-order-actions--full">
        <button
          type="button"
          className="admin-order-btn admin-order-btn--neutral"
          onClick={() => onOpenDetails(order.id)}
        >
          Detalhes
        </button>
        <button
          type="button"
          className="admin-order-btn admin-order-btn--neutral"
          onClick={() => onOpenEdit(order.id)}
        >
          Alterar
        </button>

        <select
          className="admin-order-status-select"
          value={order.status}
          onChange={(event) =>
            onChangeStatus(order.id, event.target.value as AdminOrder["status"])
          }
        >
          <option value="novo">Novo</option>
          <option value="preparo">Em preparo</option>
          <option value="pronto">Pronto</option>
          <option value="entregue">Entregue</option>
        </select>

        <div className="admin-order-actions">
          {order.status !== "entregue" ? (
            <button
              type="button"
              className="admin-order-btn admin-order-btn--cancel"
              onClick={() => onCancelOrder(order.id)}
            >
              Cancelar
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};
