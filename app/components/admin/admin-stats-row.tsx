import type { AdminOrderStatus } from "./admin-types";

type StatsCounts = {
  novo: number;
  preparo: number;
  pronto: number;
  entregue: number;
  receita: string;
};

type AdminStatsRowProps = {
  counts: StatsCounts;
  filterStatus: AdminOrderStatus | null;
  onFilterStatus: (status: AdminOrderStatus | null) => void;
};

type StatCard = {
  key: "novo" | "preparo" | "pronto" | "entregue";
  label: string;
};

const STAT_CARDS: StatCard[] = [
  { key: "novo", label: "Novos" },
  { key: "preparo", label: "Em preparo" },
  { key: "pronto", label: "Prontos" },
  { key: "entregue", label: "Entregues" },
];

export const AdminStatsRow = ({
  counts,
  filterStatus,
  onFilterStatus,
}: AdminStatsRowProps) => {
  return (
    <section className="admin-stats-row" aria-label="Resumo de pedidos">
      {STAT_CARDS.map((card) => (
        <button
          key={card.key}
          type="button"
          className={`admin-stat-card ${filterStatus === card.key ? "is-active" : ""}`}
          onClick={() =>
            onFilterStatus(filterStatus === card.key ? null : card.key)
          }
        >
          <span className="admin-stat-value">{counts[card.key]}</span>
          <span className="admin-stat-label">{card.label}</span>
        </button>
      ))}

      <article
        className="admin-stat-card admin-stat-card--revenue"
        aria-label="Receita de pedidos entregues"
      >
        <span className="admin-stat-value">{counts.receita}</span>
        <span className="admin-stat-label">Receita hoje</span>
      </article>
    </section>
  );
};
