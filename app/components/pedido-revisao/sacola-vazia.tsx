interface SacolaVaziaProps {
  onVoltar: () => void;
}

export function SacolaVazia({ onVoltar }: SacolaVaziaProps) {
  return (
    <div
      className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-6"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <div className="text-6xl mb-4">🛒</div>
      <p className="text-[#AEAAA2] text-center mb-6">
        Sua sacola esta vazia.
        <br />
        Volte e adicione donuts!
      </p>
      <button
        onClick={onVoltar}
        className="bg-[#F4A635] text-[#7A4A00] px-6 py-3 rounded-xl font-bold hover:bg-[#e6961f] transition-colors"
        style={{ fontFamily: "Fredoka, sans-serif" }}
      >
        Voltar ao cardapio
      </button>
    </div>
  );
}
