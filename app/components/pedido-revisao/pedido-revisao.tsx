import { useState } from "react";
import { useNavigate } from "react-router";
import type { CartItem } from "../../types.index";
import { useIncluirPedidoMutation } from "../../api/pedidosApi";
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
  whatsappLoja = "5547997145097",
  rotaSucesso = "/pedido-confirmado",
}: PedidoRevisaoProps) {
  const navigate = useNavigate();
  const [incluirPedido, { isLoading: enviandoPedido }] =
    useIncluirPedidoMutation();

  const now = new Date();
  const initialDate = now.toISOString().slice(0, 10);
  const initialTime = new Date(now.getTime() + 40 * 60 * 1000)
    .toTimeString()
    .slice(0, 5);

  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntregaValue>("pickup");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [endereco, setEndereco] = useState("");
  const [formaPagamento, setFormaPagamento] = useState<
    "" | "pix" | "dinheiro" | "cartao credito" | "cartao debito"
  >("pix");
  const [dataEntrega, setDataEntrega] = useState(initialDate);
  const [horaEntrega, setHoraEntrega] = useState(initialTime);
  const [observacoes, setObservacoes] = useState("");
  const [erroEnvio, setErroEnvio] = useState("");
  const [erros, setErros] = useState<ErrosCliente>({
    nome: false,
    whatsapp: false,
    endereco: false,
    formaPagamento: false,
    dataEntrega: false,
    horaEntrega: false,
  });

  const subtotal = itens.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0,
  );
  const taxaEntrega = tipoEntrega === "delivery" ? 10.0 : 0;
  const total = subtotal + taxaEntrega;

  const formatPrice = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  const maskWhatsApp = (value: string) => {
    let v = value.replace(/\\D/g, "").slice(0, 11);
    if (v.length <= 2) v = v.replace(/^(\\d{0,2})/, "($1");
    else if (v.length <= 7) v = v.replace(/^(\\d{2})(\\d{0,5})/, "($1) $2");
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
    const enderecoValido =
      tipoEntrega === "delivery" ? endereco.trim().length >= 5 : true;
    const formaPagamentoValida = Boolean(formaPagamento);
    const dataEntregaValida = dataEntrega.trim().length === 10;
    const horaEntregaValida = horaEntrega.trim().length >= 5;

    setErros({
      nome: !nomeValido,
      whatsapp: !whatsappValido,
      endereco: !enderecoValido,
      formaPagamento: !formaPagamentoValida,
      dataEntrega: !dataEntregaValida,
      horaEntrega: !horaEntregaValida,
    });

    return (
      nomeValido &&
      whatsappValido &&
      enderecoValido &&
      formaPagamentoValida &&
      dataEntregaValida &&
      horaEntregaValida
    );
  };

  const handleConfirmar = async () => {
    if (!validarFormulario()) return;

    setErroEnvio("");

    const payload = {
      clienteNome: nome.trim(),
      clienteWhatsapp: whatsapp,
      dataEntrega,
      horaEntrega,
      tipoEntrega:
        tipoEntrega === "delivery"
          ? ("entrega" as const)
          : ("retirada" as const),
      endereco: tipoEntrega === "delivery" ? endereco.trim() : undefined,
      formaPagamento,
      observacao: observacoes.trim() || undefined,
      itens: itens.map((item) => ({
        produtoId: item.id,
        quantidade: item.quantity,
      })),
    };

    try {
      const response = await incluirPedido(payload).unwrap();
      const orderCode = `DCK${String(1000 + response.resultado.pedidoId).slice(-4)}`;

      let message = `Novo pedido - Duck'n Donuts\n`;
      message += `Pedido: ${orderCode}\n\n`;
      message += `Cliente: ${nome}\n`;
      message += `WhatsApp: ${whatsapp}\n`;
      message += `Tipo: ${tipoEntrega === "delivery" ? "Entrega" : "Retirada"}\n\n`;
      message += `Data: ${dataEntrega}\n`;
      message += `Hora: ${horaEntrega}\n`;
      message += `Pagamento: ${formaPagamento}\n`;
      if (tipoEntrega === "delivery") {
        message += `Endereco: ${endereco}\n`;
      }
      message += "\n";
      message += `Itens:\n`;

      itens.forEach((item) => {
        message += `- ${item.quantity}x ${item.nome} - ${formatPrice(
          item.quantity * item.preco,
        )}\n`;
      });

      message += `\nSubtotal: ${formatPrice(subtotal)}`;
      if (tipoEntrega === "delivery") {
        message += `\nEntrega: ${formatPrice(taxaEntrega)}`;
      }
      message += `\nTotal: ${formatPrice(total)}`;
      if (observacoes) {
        message += `\n\nObs: ${observacoes}`;
      }

      navigate(rotaSucesso, {
        state: {
          orderCode,
          customerName: nome,
          whatsappMessage: message,
          whatsappPhone: whatsappLoja,
        },
      });
    } catch {
      setErroEnvio("Nao foi possivel enviar seu pedido. Tente novamente.");
    }
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
    if (enviandoPedido) return;

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
      className="bg-dn-cream-border min-h-screen pb-28"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <CabecalhoPedido onVoltar={handleVoltar} />
      <IndicadorEtapas etapa={etapa} />

      <div className="mx-auto max-w-120 px-4">
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

            <div className="border-dn-cream-border mt-4 overflow-hidden rounded-2xl border bg-white shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
              <div className="border-dn-cream-border flex items-center gap-2 border-b px-4 py-3.5 pb-3">
                <span
                  className="text-dn-cocoa text-[17px] font-semibold"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  Entrega e pagamento
                </span>
              </div>

              <div className="flex flex-col gap-3.5 p-4">
                {tipoEntrega === "delivery" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                      Endereco
                    </label>
                    <input
                      type="text"
                      value={endereco}
                      onChange={(e) => {
                        setEndereco(e.target.value);
                        if (
                          erros.endereco &&
                          e.target.value.trim().length >= 5
                        ) {
                          setErros((prev) => ({ ...prev, endereco: false }));
                        }
                      }}
                      placeholder="Rua, numero e bairro"
                      className={`bg-dn-cream text-dn-cocoa placeholder:text-dn-mist w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[15px] font-semibold transition-all outline-none placeholder:font-medium ${
                        erros.endereco
                          ? "border-dn-rose-strong shadow-[0_0_0_3px_rgba(181,73,106,0.12)]"
                          : "border-dn-cream-border focus:border-dn-caramel focus:bg-white focus:shadow-[0_0_0_3px_rgba(244,166,53,0.18)]"
                      }`}
                    />
                    {erros.endereco && (
                      <span className="text-dn-rose-strong text-[11px] font-bold">
                        Informe o endereco para entrega.
                      </span>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                      Data
                    </label>
                    <input
                      type="date"
                      value={dataEntrega}
                      min={initialDate}
                      onChange={(e) => {
                        setDataEntrega(e.target.value);
                        if (erros.dataEntrega && e.target.value) {
                          setErros((prev) => ({ ...prev, dataEntrega: false }));
                        }
                      }}
                      className={`bg-dn-cream text-dn-cocoa w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[15px] font-semibold transition-all outline-none ${
                        erros.dataEntrega
                          ? "border-dn-rose-strong"
                          : "border-dn-cream-border focus:border-dn-caramel focus:bg-white"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={horaEntrega}
                      onChange={(e) => {
                        setHoraEntrega(e.target.value);
                        if (erros.horaEntrega && e.target.value) {
                          setErros((prev) => ({ ...prev, horaEntrega: false }));
                        }
                      }}
                      className={`bg-dn-cream text-dn-cocoa w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[15px] font-semibold transition-all outline-none ${
                        erros.horaEntrega
                          ? "border-dn-rose-strong"
                          : "border-dn-cream-border focus:border-dn-caramel focus:bg-white"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                    Forma de pagamento
                  </label>
                  <select
                    value={formaPagamento}
                    onChange={(e) => {
                      setFormaPagamento(
                        e.target.value as
                          | ""
                          | "pix"
                          | "dinheiro"
                          | "cartao credito"
                          | "cartao debito",
                      );
                      if (erros.formaPagamento && e.target.value) {
                        setErros((prev) => ({
                          ...prev,
                          formaPagamento: false,
                        }));
                      }
                    }}
                    className={`bg-dn-cream text-dn-cocoa w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[15px] font-semibold transition-all outline-none ${
                      erros.formaPagamento
                        ? "border-dn-rose-strong"
                        : "border-dn-cream-border focus:border-dn-caramel focus:bg-white"
                    }`}
                  >
                    <option value="pix">Pix</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="cartao credito">Cartao de credito</option>
                    <option value="cartao debito">Cartao de debito</option>
                  </select>
                  {erros.formaPagamento && (
                    <span className="text-dn-rose-strong text-[11px] font-bold">
                      Selecione uma forma de pagamento.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <ObservacoesPedido
              observacoes={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />

            {erroEnvio && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                {erroEnvio}
              </div>
            )}
          </>
        )}
      </div>

      <RodapeConfirmacao
        total={total}
        onConfirmar={handleAvancar}
        formatPrice={formatPrice}
        textoBotao={etapa === 1 ? "Continuar" : "Confirmar pedido"}
        carregando={enviandoPedido}
      />
    </div>
  );
}
