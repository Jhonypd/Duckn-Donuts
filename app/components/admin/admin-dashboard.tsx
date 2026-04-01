import { useMemo, useState } from "react";

import {
  adminStatusToApiStatus,
  useAlterarStatusPedidoMutation,
  useCancelarPedidoMutation,
  useEditarPedidoMutation,
  useListarPedidosQuery,
} from "../../api/pedidosApi";
import { useListarProdutosQuery } from "../../api/produtosApi";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { AdminOrdersBoard } from "./admin-orders-board";
import { AdminOrderModal } from "./admin-order-modal";
import { AdminSidebar } from "./admin-sidebar";
import { AdminStatsRow } from "./admin-stats-row";
import { AdminTopbar } from "./admin-topbar";
import type { AdminOrder, AdminOrderStatus } from "./admin-types";

import "./admin-dashboard.css";

const formatMoneyShort = (value: number) => {
  if (value >= 1000) {
    return `R$${(value / 1000).toFixed(1)}k`;
  }

  return `R$${Math.round(value)}`;
};

const toAdminStatus = (rawStatus: number): AdminOrderStatus => {
  switch (rawStatus) {
    case 0:
      return "novo";
    case 1:
      return "preparo";
    case 2:
      return "pronto";
    case 3:
      return "entregue";
    case 4:
      return "cancelado";
    default:
      return "novo";
  }
};

const toAdminOrder = (pedido: {
  id: number;
  clienteNome: string;
  clienteWhatsapp: string;
  dataEntrega: string;
  horaEntrega: string;
  tipoEntrega: number;
  endereco?: string | null;
  formaPagamento: number;
  observacao?: string | null;
  itens: Array<{
    id: number;
    produtoId: number;
    quantidade: number;
    produtoNome: string;
    valorUnitario: number;
  }>;
  valorTotal: number;
  createdAt: string;
  status: number;
}): AdminOrder => ({
  id: pedido.id,
  code: `DCK${String(1000 + pedido.id).slice(-4)}`,
  customer: pedido.clienteNome,
  phone: pedido.clienteWhatsapp,
  delivery: pedido.tipoEntrega === 1 ? "delivery" : "retirada",
  items: pedido.itens.map((item) => `${item.quantidade}x ${item.produtoNome}`),
  detailedItems: pedido.itens.map((item) => ({
    id: item.id,
    productId: item.produtoId,
    productName: item.produtoNome,
    quantity: item.quantidade,
    unitPrice: item.valorUnitario,
  })),
  address: pedido.endereco || undefined,
  paymentMethod:
    pedido.formaPagamento === 0
      ? "dinheiro"
      : pedido.formaPagamento === 1
        ? "pix"
        : pedido.formaPagamento === 2
          ? "cartao_credito"
          : "cartao_debito",
  deliveryDate: pedido.dataEntrega,
  deliveryTime: pedido.horaEntrega,
  notes: pedido.observacao || undefined,
  total: pedido.valorTotal,
  createdAt: pedido.createdAt ? new Date(pedido.createdAt) : new Date(),
  status: toAdminStatus(pedido.status),
});

export const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState<
    "" | "delivery" | "retirada"
  >("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "total">("newest");
  const [filterStatus, setFilterStatus] = useState<AdminOrderStatus | null>(
    null,
  );
  const [modalMode, setModalMode] = useState<"details" | "edit">("details");
  const [activeOrderId, setActiveOrderId] = useState<number | null>(null);

  const {
    data: pedidosApi = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useListarPedidosQuery(undefined, { pollingInterval: 30000 });
  const { data: products = [] } = useListarProdutosQuery({
    incluirInativos: false,
  });

  const [alterarStatusPedido, { isLoading: isUpdatingStatus }] =
    useAlterarStatusPedidoMutation();
  const [cancelarPedido, { isLoading: isCancelingOrder }] =
    useCancelarPedidoMutation();
  const [editarPedido, { isLoading: isEditingOrder }] =
    useEditarPedidoMutation();

  const orders = useMemo(() => pedidosApi.map(toAdminOrder), [pedidosApi]);
  const activeOrder = useMemo(
    () => orders.find((item) => item.id === activeOrderId) || null,
    [activeOrderId, orders],
  );

  const activeOrders = useMemo(
    () => orders.filter((order) => order.status !== "cancelado"),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    const next = activeOrders.filter((order) => {
      if (filterStatus && order.status !== filterStatus) return false;
      if (deliveryFilter && order.delivery !== deliveryFilter) return false;
      if (!query) return true;

      return (
        order.code.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query)
      );
    });

    if (sortBy === "oldest") {
      return [...next].sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      );
    }

    if (sortBy === "total") {
      return [...next].sort((a, b) => b.total - a.total);
    }

    return [...next].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }, [activeOrders, deliveryFilter, filterStatus, search, sortBy]);

  const ordersByStatus = useMemo(
    () => ({
      novo: filteredOrders.filter((order) => order.status === "novo"),
      preparo: filteredOrders.filter((order) => order.status === "preparo"),
      pronto: filteredOrders.filter((order) => order.status === "pronto"),
      entregue: filteredOrders.filter((order) => order.status === "entregue"),
    }),
    [filteredOrders],
  );

  const counts = useMemo(() => {
    const receita = activeOrders
      .filter((order) => order.status === "entregue")
      .reduce((sum, order) => sum + order.total, 0);

    return {
      novo: activeOrders.filter((order) => order.status === "novo").length,
      preparo: activeOrders.filter((order) => order.status === "preparo")
        .length,
      pronto: activeOrders.filter((order) => order.status === "pronto").length,
      entregue: activeOrders.filter((order) => order.status === "entregue")
        .length,
      receita: formatMoneyShort(receita),
    };
  }, [activeOrders]);

  const changeOrderStatus = (id: number, selectedStatus: AdminOrderStatus) => {
    if (selectedStatus === "cancelado") {
      cancelOrder(id);
      return;
    }

    const order = orders.find((item) => item.id === id);
    if (!order || order.status === "cancelado") return;

    if (order.status === selectedStatus) return;

    alterarStatusPedido({
      id,
      status: adminStatusToApiStatus[selectedStatus],
    })
      .unwrap()
      .catch(() => {
        window.alert("Nao foi possivel atualizar o status do pedido.");
      });
  };

  const cancelOrder = (id: number) => {
    const shouldCancel = window.confirm("Deseja cancelar este pedido?");
    if (!shouldCancel) return;

    cancelarPedido({ id })
      .unwrap()
      .catch(() => {
        window.alert("Nao foi possivel cancelar o pedido.");
      });
  };

  const openDetailsModal = (id: number) => {
    setActiveOrderId(id);
    setModalMode("details");
  };

  const openEditModal = (id: number) => {
    setActiveOrderId(id);
    setModalMode("edit");
  };

  const closeModal = () => {
    setActiveOrderId(null);
  };

  const saveOrderEdit = (
    orderId: number,
    payload: {
      endereco?: string;
      itens: Array<{ produtoId: number; quantidade: number }>;
    },
  ) => {
    editarPedido({
      id: orderId,
      endereco: payload.endereco,
      itens: payload.itens,
    })
      .unwrap()
      .then(() => {
        setModalMode("details");
      })
      .catch(() => {
        window.alert("Nao foi possivel salvar as alteracoes do pedido.");
      });
  };

  const isMutating = isUpdatingStatus || isCancelingOrder || isEditingOrder;

  return (
    <div className="admin-shell">
      <AdminSidebar newOrdersCount={counts.novo} />

      <main className="admin-main">
        <AdminTopbar
          onRefresh={() => {
            refetch();
          }}
          refreshing={isFetching}
        />

        <div className="admin-content">
          {isLoading ? (
            <p className="admin-feedback">Carregando pedidos...</p>
          ) : null}
          {isError ? (
            <p className="admin-feedback admin-feedback--error">
              Nao foi possivel carregar os pedidos da API.
            </p>
          ) : null}
          {isMutating ? (
            <p className="admin-feedback">Sincronizando alteracoes...</p>
          ) : null}

          <AdminStatsRow
            counts={counts}
            filterStatus={filterStatus}
            onFilterStatus={setFilterStatus}
          />

          <section className="admin-toolbar" aria-label="Filtros de pedidos">
            <Input
              className="admin-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por codigo ou cliente"
            />

            <Select
              value={deliveryFilter || "all"}
              onValueChange={(value) =>
                setDeliveryFilter(
                  value === "all" ? "" : (value as "delivery" | "retirada"),
                )
              }
            >
              <SelectTrigger className="admin-select w-45">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="delivery">Entrega</SelectItem>
                <SelectItem value="retirada">Retirada</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(value) =>
                setSortBy(value as "newest" | "oldest" | "total")
              }
            >
              <SelectTrigger className="admin-select w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
                <SelectItem value="total">Maior valor</SelectItem>
              </SelectContent>
            </Select>

            <p className="admin-filter-count">
              {filteredOrders.length} pedido
              {filteredOrders.length === 1 ? "" : "s"}
            </p>
          </section>

          <AdminOrdersBoard
            ordersByStatus={ordersByStatus}
            onChangeStatus={changeOrderStatus}
            onCancelOrder={cancelOrder}
            onOpenDetails={openDetailsModal}
            onOpenEdit={openEditModal}
          />

          <AdminOrderModal
            open={Boolean(activeOrder)}
            mode={modalMode}
            order={activeOrder}
            products={products}
            onClose={closeModal}
            onChangeStatus={changeOrderStatus}
            onSaveEdit={saveOrderEdit}
            changingStatus={isUpdatingStatus}
            savingEdit={isEditingOrder}
          />
        </div>
      </main>
    </div>
  );
};
