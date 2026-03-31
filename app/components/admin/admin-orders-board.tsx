import { AdminOrderCard } from "./admin-order-card";
import { STATUS_META } from "./admin-types";
import type { AdminOrder, AdminOrderStatus } from "./admin-types";

type OrdersByStatus = {
  novo: AdminOrder[];
  preparo: AdminOrder[];
  pronto: AdminOrder[];
  entregue: AdminOrder[];
};

type AdminOrdersBoardProps = {
  ordersByStatus: OrdersByStatus;
  onChangeStatus: (id: number, status: AdminOrderStatus) => void;
  onCancelOrder: (id: number) => void;
  onOpenDetails: (id: number) => void;
  onOpenEdit: (id: number) => void;
};

const COLUMNS: Array<Exclude<AdminOrderStatus, "cancelado">> = [
  "novo",
  "preparo",
  "pronto",
  "entregue",
];

export const AdminOrdersBoard = ({
  ordersByStatus,
  onChangeStatus,
  onCancelOrder,
  onOpenDetails,
  onOpenEdit,
}: AdminOrdersBoardProps) => {
  return (
    <section className="admin-kanban" aria-label="Quadro de pedidos">
      {COLUMNS.map((status) => {
        const list = ordersByStatus[status];

        return (
          <article
            key={status}
            className={`admin-column admin-column--${status}`}
          >
            <header className="admin-column-header">
              <h2 className="admin-column-title">
                {STATUS_META[status].label}
              </h2>
              <span className="admin-column-count">{list.length}</span>
            </header>

            <div className="admin-column-body">
              {list.length ? (
                list.map((order) => (
                  <AdminOrderCard
                    key={order.id}
                    order={order}
                    onChangeStatus={onChangeStatus}
                    onCancelOrder={onCancelOrder}
                    onOpenDetails={onOpenDetails}
                    onOpenEdit={onOpenEdit}
                  />
                ))
              ) : (
                <p className="admin-column-empty">Sem pedidos nesta coluna.</p>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
};
