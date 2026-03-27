import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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

  const whatsappUrl = useMemo(() => {
    if (!state?.whatsappPhone || !state?.whatsappMessage) return "";
    const text = encodeURIComponent(state.whatsappMessage);
    return `https://wa.me/${state.whatsappPhone}?text=${text}`;
  }, [state]);

  const handleVoltar = () => {
    navigate("/");
  };

  const handleLimpar = () => {
    limpar();
  };

  return (
    <div
      className="min-h-screen bg-dn-cream-border px-4 py-10"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <div className="mx-auto max-w-120">
        <div className="rounded-2xl border border-dn-cream-border bg-white px-6 py-7 shadow-[0_2px_12px_rgba(59,42,20,0.08)]">
          <div className="flex flex-col items-center text-center">
            <CheckCircleRoundedIcon className="text-dn-caramel h-12! w-12!" />
            <h1
              className="mt-3 text-[22px] font-bold text-dn-cocoa"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Pedido confirmado
            </h1>
            <p className="mt-1 text-sm font-semibold text-dn-mocha">
              {state?.customerName
                ? `Obrigado, ${state.customerName}!`
                : "Obrigado pelo seu pedido!"}
            </p>
            {state?.orderCode && (
              <div className="mt-3 rounded-full bg-dn-cream px-3 py-1 text-xs font-bold text-dn-caramel-deep">
                Codigo do pedido: {state.orderCode}
              </div>
            )}
          </div>

          {!state && (
            <div className="mt-5 rounded-xl border border-dn-cream-border bg-dn-cream px-4 py-3 text-center text-xs font-semibold text-dn-mocha">
              Nao encontramos os dados do pedido. Volte ao catalogo para
              iniciar um novo.
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:bg-dn-caramel-dark bg-dn-caramel flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-dn-caramel-deep transition-colors"
                onClick={handleLimpar}
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
      </div>
    </div>
  );
}
