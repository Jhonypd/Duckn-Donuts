type AdminSidebarProps = {
  newOrdersCount: number;
};

export const AdminSidebar = ({ newOrdersCount }: AdminSidebarProps) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <p className="admin-sidebar-title">Duck'n Donuts</p>
        <p className="admin-sidebar-subtitle">Painel admin</p>
      </div>

      <nav className="admin-sidebar-nav" aria-label="Navegacao do admin">
        <button
          type="button"
          className="admin-nav-item admin-nav-item--active"
        >
          <span className="admin-nav-label">Pedidos</span>
          <span
            className="admin-nav-badge"
            aria-label={`${newOrdersCount} pedidos novos`}
          >
            {newOrdersCount}
          </span>
        </button>

        <button
          type="button"
          className="admin-nav-item"
          disabled
        >
          <span className="admin-nav-label">Cardapio</span>
          <span className="admin-nav-soon">Em breve</span>
        </button>

        <button
          type="button"
          className="admin-nav-item"
          disabled
        >
          <span className="admin-nav-label">Configuracoes</span>
          <span className="admin-nav-soon">Em breve</span>
        </button>
      </nav>

      <div className="admin-sidebar-footer">
        <p className="admin-store-name">Loja Centro</p>
        <p className="admin-store-status">Aberta agora</p>
      </div>
    </aside>
  );
};
