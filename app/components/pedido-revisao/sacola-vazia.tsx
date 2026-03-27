import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

interface SacolaVaziaProps {
  onVoltar: () => void;
}

export function SacolaVazia({ onVoltar }: SacolaVaziaProps) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#FFFDF7] p-6"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <ShoppingBagIcon
        className="text-dn-cocoa/50 h-16! w-16!"
        strokeWidth={4}
      />
      <p className="text-dn-mist mb-6 text-center">
        Sua sacola esta vazia.
        <br />
        Volte e adicione donuts!
      </p>
      <button
        onClick={onVoltar}
        className="hover:bg-dn-caramel-dark bg-dn-caramel text-dn-caramel-deep rounded-xl px-6 py-3 font-bold transition-colors"
        style={{ fontFamily: "Fredoka, sans-serif" }}
      >
        Voltar ao cardápio
      </button>
    </div>
  );
}
