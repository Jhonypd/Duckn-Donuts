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
    <div className="border-dn-cream-border mt-4 overflow-hidden rounded-2xl border bg-white shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
      <div className="border-dn-cream-border flex items-center gap-2 border-b px-4 py-3.5 pb-3">
        <span
          className="text-dn-cocoa text-[17px] font-semibold"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Seus dados
        </span>
      </div>
      <div className="flex flex-col gap-3.5 p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
            Seu nome
          </label>
          <div className="relative">
            <input
              type="text"
              value={nome}
              onChange={onNomeChange}
              placeholder="Como devemos te chamar?"
              className={`bg-dn-cream text-dn-cocoa placeholder:text-dn-mist w-full rounded-[10px] border-[1.5px] px-3.5 py-3 pl-10 text-[15px] font-semibold transition-all outline-none placeholder:font-medium ${
                erros.nome
                  ? "border-dn-rose-strong shadow-[0_0_0_3px_rgba(181,73,106,0.12)]"
                  : nome.trim().length >= 2
                    ? "border-dn-caramel-dark"
                    : "border-dn-cream-border focus:border-dn-caramel focus:bg-white focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)]"
              }`}
            />
          </div>
          {erros.nome && (
            <span className="text-dn-rose-strong text-[11px] font-bold">
              Por favor, informe seu nome.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
            WhatsApp
          </label>
          <div className="relative">
            <input
              type="tel"
              value={whatsapp}
              onChange={onWhatsappChange}
              placeholder="(00) 00000-0000"
              className={`bg-dn-cream text-dn-cocoa placeholder:text-dn-mist w-full rounded-[10px] border-[1.5px] px-3.5 py-3 pl-10 text-[15px] font-semibold transition-all outline-none placeholder:font-medium ${
                erros.whatsapp
                  ? "border-dn-rose-strong shadow-[0_0_0_3px_rgba(181,73,106,0.12)]"
                  : whatsapp.replace(/\\D/g, "").length === 11
                    ? "border-dn-caramel-dark"
                    : "border-dn-cream-border focus:border-dn-caramel focus:bg-white focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)]"
              }`}
            />
          </div>
          <span className="text-dn-mist text-[11px] font-semibold">
            Vamos enviar a confirmacao pelo WhatsApp.
          </span>
          {erros.whatsapp && (
            <span className="text-dn-rose-strong text-[11px] font-bold">
              Por favor, informe um WhatsApp valido.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
