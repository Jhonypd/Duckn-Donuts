type AdminTopbarProps = {
  onRefresh: () => void;
  refreshing?: boolean;
};

export const AdminTopbar = ({
  onRefresh,
  refreshing = false,
}: AdminTopbarProps) => {
  return (
    <header className="admin-topbar">
      <div>
        <p className="admin-topbar-title">Gestao de pedidos</p>
        <p className="admin-topbar-subtitle">Painel administrativo</p>
      </div>

      <div className="admin-topbar-right">
        <button
          type="button"
          className="admin-primary-btn"
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Atualizando..." : "Atualizar pedidos"}
        </button>
      </div>
    </header>
  );
};
