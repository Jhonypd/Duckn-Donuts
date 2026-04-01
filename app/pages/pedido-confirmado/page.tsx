import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import { useCarrinho } from "../../context/carrinho-contexto";

type PedidoConfirmadoState = {
  orderCode: string;
  customerName: string;
  whatsappMessage: string;
  whatsappPhone: string;
};

export default function PedidoConfirmadoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { limpar } = useCarrinho();

  const state = (location.state || null) as PedidoConfirmadoState | null;

  useEffect(() => {
    if (state) {
      limpar();
    }
  }, [limpar, state]);

  const whatsappUrl = useMemo(() => {
    if (!state?.whatsappPhone || !state?.whatsappMessage) return "";
    const text = encodeURIComponent(state.whatsappMessage);
    return `https://wa.me/${state.whatsappPhone}?text=${text}`;
  }, [state]);

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div
      className="bg-dn-cream relative min-h-screen px-4 py-10"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <div className="bg-dn-rose/40 pointer-events-none absolute -top-24 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full blur-3xl" />
      <div className="bg-dn-caramel/35 pointer-events-none absolute -bottom-24 right-[-3rem] h-64 w-64 rounded-full blur-3xl" />

      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="border-dn-cream-border rounded-3xl border bg-white px-6 py-7 shadow-[0_18px_40px_rgba(59,42,20,0.16)]">
          <div className="flex flex-col items-center text-center">
            <div className="bg-dn-cream-border mb-3 flex h-14 w-14 items-center justify-center rounded-2xl">
              <CheckCircleRoundedIcon className="text-dn-caramel h-10! w-10!" />
            </div>
            <h1
              className="text-dn-cocoa text-[24px] font-bold"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Pedido confirmado
            </h1>
            <p className="text-dn-mocha mt-2 text-sm font-semibold">
              {state?.customerName
                ? `Obrigado, ${state.customerName}!`
                : "Obrigado pelo seu pedido!"}
            </p>
            {state?.orderCode && (
              <div className="bg-dn-cream text-dn-caramel-deep mt-4 rounded-full px-3 py-1 text-xs font-bold">
                Codigo do pedido: {state.orderCode}
              </div>
            )}
          </div>

          {!state && (
            <div className="border-dn-cream-border bg-dn-cream text-dn-mocha mt-6 rounded-xl border px-4 py-3 text-center text-xs font-semibold">
              Nao encontramos os dados do pedido. Volte ao catalogo para iniciar
              um novo.
            </div>
          )}

          <div className="mt-6 grid gap-3">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:bg-dn-caramel-dark bg-dn-caramel text-dn-caramel-deep flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors"
              >
                <WhatsAppIcon className="h-5! w-5!" />
                Enviar pedido no WhatsApp
              </a>
            )}
            <button
              onClick={handleVoltar}
              className="bg-dn-cocoa hover:bg-dn-cocoa-dark w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors"
            >
              Voltar ao catalogo
            </button>
          </div>
        </div>

        <div className="border-dn-cream-border flex items-center gap-3 rounded-2xl border bg-white px-5 py-4 shadow-[0_8px_24px_rgba(59,42,20,0.08)]">
          <div className="bg-dn-caramel/15 text-dn-caramel-deep flex h-10 w-10 items-center justify-center rounded-xl">
            <LocalCafeRoundedIcon className="h-5! w-5!" />
          </div>
          <div>
            <p className="text-dn-cocoa text-sm font-semibold">
              Sua encomenda esta sendo preparada
            </p>
            <p className="text-dn-mist text-xs font-semibold">
              Em breve nossa equipe confirma o horario com voce.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
