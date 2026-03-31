type AdminTopbarProps = {
  clockValue: string;
  onRefresh: () => void;
  refreshing?: boolean;
};

export const AdminTopbar = ({
  clockValue,
  onRefresh,
  refreshing = false,
}: AdminTopbarProps) => {
  return (
    <header className="admin-topbar">
      <div>
        <p className="admin-topbar-title">Gestao de pedidos</p>
        <p className="admin-topbar-subtitle">Acompanhamento em tempo real</p>
      </div>

      <div className="admin-topbar-right">
        <span className="admin-live-pill">Ao vivo</span>
        <span className="admin-clock">{clockValue}</span>
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
