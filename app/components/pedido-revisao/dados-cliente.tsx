import type { ErrosCliente } from "./tipos";

interface DadosClienteProps {
  nome: string;
  whatsapp: string;
  erros: ErrosCliente;
  onNomeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWhatsappChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DadosCliente({
  nome,
  whatsapp,
  erros,
  onNomeChange,
  onWhatsappChange,
}: DadosClienteProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#FDE8C5] mt-4 overflow-hidden shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="px-4 py-3.5 pb-3 border-b border-[#FDE8C5] flex items-center gap-2">
        <span className="text-lg">👤</span>
        <span
          className="text-[17px] font-semibold text-[#3B2A14]"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Seus dados
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#7A6040] uppercase tracking-wide">
            Seu nome
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">
              😊
            </span>
            <input
              type="text"
              value={nome}
              onChange={onNomeChange}
              placeholder="Como devemos te chamar?"
              className={`w-full px-3.5 pl-10 py-3 border-[1.5px] rounded-[10px] text-[15px] font-semibold text-[#3B2A14] bg-[#FFFDF7] outline-none transition-all placeholder:text-[#AEAAA2] placeholder:font-medium ${
                erros.nome
                  ? "border-[#e74c3c] shadow-[0_0_0_3px_rgba(231,76,60,0.12)]"
                  : nome.trim().length >= 2
                    ? "border-[#27AE60]"
                    : "border-[#FDE8C5] focus:border-[#F4A635] focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)] focus:bg-white"
              }`}
            />
          </div>
          {erros.nome && (
            <span className="text-[11px] text-[#e74c3c] font-bold">
              Por favor, informe seu nome.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#7A6040] uppercase tracking-wide">
            WhatsApp
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">
              📱
            </span>
            <input
              type="tel"
              value={whatsapp}
              onChange={onWhatsappChange}
              placeholder="(00) 00000-0000"
              className={`w-full px-3.5 pl-10 py-3 border-[1.5px] rounded-[10px] text-[15px] font-semibold text-[#3B2A14] bg-[#FFFDF7] outline-none transition-all placeholder:text-[#AEAAA2] placeholder:font-medium ${
                erros.whatsapp
                  ? "border-[#e74c3c] shadow-[0_0_0_3px_rgba(231,76,60,0.12)]"
                  : whatsapp.replace(/\\D/g, "").length === 11
                    ? "border-[#27AE60]"
                    : "border-[#FDE8C5] focus:border-[#F4A635] focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)] focus:bg-white"
              }`}
            />
          </div>
          <span className="text-[11px] text-[#AEAAA2] font-semibold">
            Vamos enviar a confirmacao pelo WhatsApp.
          </span>
          {erros.whatsapp && (
            <span className="text-[11px] text-[#e74c3c] font-bold">
              Por favor, informe um WhatsApp valido.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
