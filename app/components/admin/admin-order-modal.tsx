import { useEffect, useMemo, useState } from "react";

import type { Produto } from "../../types.index";

import type { AdminOrder, AdminOrderStatus } from "./admin-types";

type DraftItem = {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
};

type AdminOrderModalProps = {
  open: boolean;
  mode: "details" | "edit";
  order: AdminOrder | null;
  products: Produto[];
  onClose: () => void;
  onChangeStatus: (orderId: number, status: AdminOrderStatus) => void;
  onSaveEdit: (
    orderId: number,
    payload: {
      endereco?: string;
      itens: Array<{ produtoId: number; quantidade: number }>;
    },
  ) => void;
  changingStatus: boolean;
  savingEdit: boolean;
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatPayment = (raw: string) => {
  switch (raw) {
    case "pix":
      return "Pix";
    case "dinheiro":
      return "Dinheiro";
    case "cartao_credito":
      return "Cartao de credito";
    case "cartao_debito":
      return "Cartao de debito";
    default:
      return raw;
  }
};

export const AdminOrderModal = ({
  open,
  mode,
  order,
  products,
  onClose,
  onChangeStatus,
  onSaveEdit,
  changingStatus,
  savingEdit,
}: AdminOrderModalProps) => {
  const [draftAddress, setDraftAddress] = useState("");
  const [draftItems, setDraftItems] = useState<DraftItem[]>([]);
  const [selectedStatus, setSelectedStatus] =
    useState<AdminOrderStatus>("novo");
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [selectedProductQuantity, setSelectedProductQuantity] =
    useState<number>(1);

  useEffect(() => {
    if (!order || !open) return;

    setDraftAddress(order.address || "");
    setSelectedStatus(order.status);
    setDraftItems(
      order.detailedItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      })),
    );
  }, [open, order]);

  const draftTotal = useMemo(
    () =>
      draftItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [draftItems],
  );

  if (!open || !order) return null;

  const removeItem = (productId: number) => {
    setDraftItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  };

  const changeItemQuantity = (productId: number, quantity: number) => {
    setDraftItems((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const addProduct = () => {
    if (!selectedProductId || selectedProductQuantity <= 0) return;

    const product = products.find((item) => item.id === selectedProductId);
    if (!product) return;

    setDraftItems((current) => {
      const found = current.find(
        (item) => item.productId === selectedProductId,
      );
      if (found) {
        return current.map((item) =>
          item.productId === selectedProductId
            ? { ...item, quantity: item.quantity + selectedProductQuantity }
            : item,
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          productName: product.nome,
          unitPrice: product.preco,
          quantity: selectedProductQuantity,
        },
      ];
    });
  };

  const saveEdit = () => {
    if (draftItems.length === 0) {
      window.alert("O pedido precisa ter ao menos 1 produto.");
      return;
    }

    if (order.delivery === "delivery" && draftAddress.trim().length < 5) {
      window.alert("Informe o endereco para pedidos de entrega.");
      return;
    }

    onSaveEdit(order.id, {
      endereco: draftAddress.trim() || undefined,
      itens: draftItems.map((item) => ({
        produtoId: item.productId,
        quantidade: item.quantity,
      })),
    });
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="admin-modal-head">
          <div>
            <p className="admin-modal-title">
              {mode === "details" ? "Detalhes do pedido" : "Alterar pedido"}
            </p>
            <p className="admin-modal-subtitle">
              {order.code} - {order.customer}
            </p>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            Fechar
          </button>
        </div>

        {mode === "details" ? (
          <div className="admin-modal-body">
            <div className="admin-modal-block">
              <p className="admin-modal-block-title">Cadastro</p>
              <p className="admin-modal-line">Cliente: {order.customer}</p>
              <p className="admin-modal-line">WhatsApp: {order.phone}</p>
              <p className="admin-modal-line">
                Tipo: {order.delivery === "delivery" ? "Entrega" : "Retirada"}
              </p>
              <p className="admin-modal-line">
                Endereco: {order.address || "Nao informado"}
              </p>
              <p className="admin-modal-line">
                Pagamento: {formatPayment(order.paymentMethod)}
              </p>
              <p className="admin-modal-line">Data: {order.deliveryDate}</p>
              <p className="admin-modal-line">Hora: {order.deliveryTime}</p>
              <p className="admin-modal-line">
                Observacao: {order.notes || "Nenhuma"}
              </p>
            </div>

            <div className="admin-modal-block">
              <p className="admin-modal-block-title">Itens</p>
              {order.detailedItems.map((item) => (
                <div key={item.id} className="admin-modal-item-row">
                  <span>
                    {item.quantity}x {item.productName}
                  </span>
                  <strong>{formatMoney(item.quantity * item.unitPrice)}</strong>
                </div>
              ))}
              <p className="admin-modal-total">
                Total: {formatMoney(order.total)}
              </p>
            </div>

            <div className="admin-modal-block">
              <p className="admin-modal-block-title">Mudar status</p>
              <div className="admin-modal-status-row">
                <select
                  className="admin-select"
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(event.target.value as AdminOrderStatus)
                  }
                >
                  <option value="novo">Novo</option>
                  <option value="preparo">Em preparo</option>
                  <option value="pronto">Pronto</option>
                  <option value="entregue">Entregue</option>
                </select>
                <button
                  type="button"
                  className="admin-order-btn admin-order-btn--advance"
                  onClick={() => onChangeStatus(order.id, selectedStatus)}
                  disabled={changingStatus}
                >
                  {changingStatus ? "Salvando..." : "Salvar status"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-modal-body">
            <div className="admin-modal-block">
              <p className="admin-modal-block-title">Alterar endereco</p>
              <input
                className="admin-search"
                value={draftAddress}
                onChange={(event) => setDraftAddress(event.target.value)}
                placeholder="Endereco"
                disabled={order.delivery !== "delivery"}
              />
            </div>

            <div className="admin-modal-block">
              <p className="admin-modal-block-title">Produtos do pedido</p>
              {draftItems.map((item) => (
                <div key={item.productId} className="admin-modal-edit-item">
                  <div className="admin-modal-edit-main">
                    <span>{item.productName}</span>
                    <small>{formatMoney(item.unitPrice)}</small>
                  </div>
                  <div className="admin-modal-edit-actions">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        changeItemQuantity(
                          item.productId,
                          Number(event.target.value || 0),
                        )
                      }
                    />
                    <button
                      type="button"
                      className="admin-order-btn admin-order-btn--cancel"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}

              <div className="admin-modal-add-product">
                <select
                  className="admin-select"
                  value={selectedProductId || ""}
                  onChange={(event) =>
                    setSelectedProductId(Number(event.target.value))
                  }
                >
                  <option value="">Selecione um produto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.nome} - {formatMoney(product.preco)}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={selectedProductQuantity}
                  onChange={(event) =>
                    setSelectedProductQuantity(Number(event.target.value || 1))
                  }
                />
                <button
                  type="button"
                  className="admin-order-btn admin-order-btn--advance"
                  onClick={addProduct}
                >
                  Adicionar
                </button>
              </div>

              <p className="admin-modal-total">
                Novo total (estimado): {formatMoney(draftTotal)}
              </p>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-order-btn admin-order-btn--advance"
                onClick={saveEdit}
                disabled={savingEdit}
              >
                {savingEdit ? "Salvando..." : "Salvar alteracoes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
