import { useState } from "react";
import { useNavigate } from "react-router";
import type { CartItem } from "../../types.index";
import { CabecalhoPedido } from "./cabecalho-pedido";
import { CardItensPedido } from "./card-itens-pedido";
import { DadosCliente } from "./dados-cliente";
import { IndicadorEtapas } from "./indicador-etapas";
import { ObservacoesPedido } from "./observacoes-pedido";
import { RodapeConfirmacao } from "./rodape-confirmacao";
import { SacolaVazia } from "./sacola-vazia";
import { TipoEntrega } from "./tipo-entrega";
import type { ErrosCliente, TipoEntrega as TipoEntregaValue } from "./tipos";

interface PedidoRevisaoProps {
  itens: CartItem[];
  onQuantidade: (productId: number, quantity: number) => void;
  onVoltar?: () => void;
  whatsappLoja?: string;
  rotaSucesso?: string;
}

export function PedidoRevisao({
  itens,
  onQuantidade,
  onVoltar,
  whatsappLoja = "5547900000000",
  rotaSucesso = "/pedido-confirmado",
}: PedidoRevisaoProps) {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [tipoEntrega, setTipoEntrega] =
    useState<TipoEntregaValue>("delivery");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [erros, setErros] = useState<ErrosCliente>({
    nome: false,
    whatsapp: false,
  });

  const subtotal = itens.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0,
  );
  const taxaEntrega = tipoEntrega === "delivery" ? 5.0 : 0;
  const total = subtotal + taxaEntrega;

  const formatPrice = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  const maskWhatsApp = (value: string) => {
    let v = value.replace(/\\D/g, "").slice(0, 11);
    if (v.length <= 2) v = v.replace(/^(\\d{0,2})/, "($1");
    else if (v.length <= 7)
      v = v.replace(/^(\\d{2})(\\d{0,5})/, "($1) $2");
    else v = v.replace(/^(\\d{2})(\\d{5})(\\d{0,4})/, "($1) $2-$3");
    return v;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskWhatsApp(e.target.value);
    setWhatsapp(masked);
    if (erros.whatsapp && masked.replace(/\\D/g, "").length === 11) {
      setErros({ ...erros, whatsapp: false });
    }
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    if (erros.nome && e.target.value.trim().length >= 2) {
      setErros({ ...erros, nome: false });
    }
  };

  const validarFormulario = () => {
    const nomeValido = nome.trim().length >= 2;
    const whatsappValido = whatsapp.replace(/\\D/g, "").length === 11;

    setErros({
      nome: !nomeValido,
      whatsapp: !whatsappValido,
    });

    return nomeValido && whatsappValido;
  };

  const handleConfirmar = () => {
    if (!validarFormulario()) return;

    const orderCode = "DCK" + Math.floor(1000 + Math.random() * 9000);

    let message = `🐥 *Novo pedido — Duck'n Donuts*\\n`;
    message += `📋 *Pedido:* ${orderCode}\\n\\n`;
    message += `👤 *Cliente:* ${nome}\\n`;
    message += `📱 *WhatsApp:* ${whatsapp}\\n`;
    message += `🚀 *Tipo:* ${
      tipoEntrega === "delivery" ? "Entrega 🛵" : "Retirada 🏪"
    }\\n\\n`;
    message += `*Itens:*\\n`;

    itens.forEach((item) => {
      message += `• ${item.quantity}x ${item.nome} — ${formatPrice(
        item.quantity * item.preco,
      )}\\n`;
    });

    message += `\\n*Subtotal:* ${formatPrice(subtotal)}`;
    if (tipoEntrega === "delivery")
      message += `\\n*Entrega:* ${formatPrice(5.0)}`;
    message += `\\n*Total: ${formatPrice(total)}*`;
    if (observacoes) message += `\\n\\n📝 *Obs:* ${observacoes}`;

    navigate(rotaSucesso, {
      state: {
        orderCode,
        customerName: nome,
        whatsappMessage: message,
        whatsappPhone: whatsappLoja,
      },
    });
  };

  const handleEditar = () => {
    setEtapa(1);
  };

  const handleVoltar = () => {
    if (etapa > 1) {
      setEtapa(1);
      return;
    }
    if (onVoltar) {
      onVoltar();
      return;
    }
    navigate("/");
  };

  const handleAvancar = () => {
    if (etapa === 1) {
      setEtapa(2);
      return;
    }
    handleConfirmar();
  };

  if (itens.length === 0) {
    return <SacolaVazia onVoltar={handleVoltar} />;
  }

  return (
    <div
      className="min-h-screen bg-[#FFFDF7] pb-32"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <CabecalhoPedido onVoltar={handleVoltar} />
      <IndicadorEtapas etapa={etapa} />

      <div className="max-w-[480px] mx-auto px-4">
        <CardItensPedido
          itens={itens}
          subtotal={subtotal}
          taxaEntrega={taxaEntrega}
          total={total}
          onEditar={handleEditar}
          onQuantidade={onQuantidade}
          formatPrice={formatPrice}
          editavel={etapa === 1}
          mostrarEditar={etapa === 2}
        />

        {etapa === 2 && (
          <>
            <TipoEntrega tipo={tipoEntrega} onChange={setTipoEntrega} />

            <DadosCliente
              nome={nome}
              whatsapp={whatsapp}
              erros={erros}
              onNomeChange={handleNomeChange}
              onWhatsappChange={handleWhatsAppChange}
            />

            <ObservacoesPedido
              observacoes={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </>
        )}
      </div>

      <RodapeConfirmacao
        total={total}
        onConfirmar={handleAvancar}
        formatPrice={formatPrice}
        textoBotao={etapa === 1 ? "Continuar" : "Confirmar pedido"}
      />
    </div>
  );
}
