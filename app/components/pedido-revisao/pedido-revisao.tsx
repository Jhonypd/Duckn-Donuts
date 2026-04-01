import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
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
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import type { ErrosCliente, TipoEntrega as TipoEntregaValue } from "./tipos";

interface PedidoRevisaoProps {
  itens: CartItem[];
  onQuantidade: (productId: number, quantity: number) => void;
  onVoltar?: () => void;
  whatsappLoja?: string;
  rotaSucesso?: string;
}

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseLocalDate = (value: string) => {
  if (!value || value.trim().length !== 10) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const isDateInAllowedWindow = (
  value: string,
  minDate: string,
  maxDate: string,
) => {
  if (value.trim().length !== 10) return false;
  return value >= minDate && value <= maxDate;
};

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
  const minDeliveryDate = toLocalDateString(now);
  const maxDeliveryDate = toLocalDateString(addDays(now, 30));
  const initialDate = minDeliveryDate;
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
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  const [erros, setErros] = useState<ErrosCliente>({
    nome: false,
    whatsapp: false,
    endereco: false,
    formaPagamento: false,
    dataEntrega: false,
    horaEntrega: false,
  });

  const selectedDeliveryDate = parseLocalDate(dataEntrega);
  const minDeliveryDateObj = parseLocalDate(minDeliveryDate);
  const maxDeliveryDateObj = parseLocalDate(maxDeliveryDate);
  const deliveryDateLabel = selectedDeliveryDate
    ? format(selectedDeliveryDate, "dd 'de' MMMM", { locale: ptBR })
    : "Selecionar data";

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

  const buildObservacaoFinal = () => {
    const base = observacoes.trim();
    if (!base) return undefined;
    return base;
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

  const handleTipoEntregaChange = (value: TipoEntregaValue) => {
    setTipoEntrega(value);
  };

  const validarFormulario = () => {
    const nomeValido = nome.trim().length >= 2;
    const whatsappValido = whatsapp.replace(/\\D/g, "").length === 11;
    const enderecoValido =
      tipoEntrega === "delivery" ? endereco.trim().length >= 5 : true;
    const formaPagamentoValida = Boolean(formaPagamento);
    const dataEntregaValida = isDateInAllowedWindow(
      dataEntrega,
      minDeliveryDate,
      maxDeliveryDate,
    );
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
    if (!formaPagamento) return;

    setErroEnvio("");
    const observacaoFinal = buildObservacaoFinal();

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
      observacao: observacaoFinal,
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
      if (observacaoFinal) {
        message += `\n\nObs: ${observacaoFinal}`;
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
      className="bg-dn-cream relative min-h-screen overflow-hidden pb-28"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <div className="bg-dn-rose/40 pointer-events-none absolute -top-24 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full blur-3xl" />
      <div className="bg-dn-caramel/35 pointer-events-none absolute -bottom-24 right-[-3rem] h-64 w-64 rounded-full blur-3xl" />

      <CabecalhoPedido onVoltar={handleVoltar} />
      <IndicadorEtapas etapa={etapa} />

      <div className="relative mx-auto max-w-120 px-4 lg:max-w-6xl">
        {etapa === 1 && (
          <CardItensPedido
            itens={itens}
            subtotal={subtotal}
            taxaEntrega={taxaEntrega}
            total={total}
            onEditar={handleEditar}
            onQuantidade={onQuantidade}
            formatPrice={formatPrice}
            editavel={etapa === 1}
            mostrarEditar={false}
          />
        )}

        {etapa === 2 && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="order-2 flex flex-col gap-4 lg:order-1">
              <TipoEntrega tipo={tipoEntrega} onChange={handleTipoEntregaChange} />

              <DadosCliente
                nome={nome}
                whatsapp={whatsapp}
                erros={erros}
                onNomeChange={handleNomeChange}
                onWhatsappChange={handleWhatsAppChange}
              />

              <div className="border-dn-cream-border overflow-hidden rounded-2xl border bg-white shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
                <div className="border-dn-cream-border flex items-center justify-between gap-3 border-b px-4 py-3.5 pb-3">
                  <span
                    className="text-dn-cocoa text-[17px] font-semibold"
                    style={{ fontFamily: "Fredoka, sans-serif" }}
                  >
                    Entrega e pagamento
                  </span>
                  {maxDeliveryDateObj && (
                    <span className="text-dn-mocha text-[11px] font-semibold">
                      Janela ate {format(maxDeliveryDateObj, "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </span>
                  )}
                </div>

                <TooltipProvider>
                  <div className="flex flex-col gap-4 p-4">
                    {tipoEntrega === "delivery" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                          Endereco
                        </label>
                        <Input
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
                          className={`bg-dn-cream text-dn-cocoa placeholder:text-dn-mist h-auto w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[15px] font-semibold transition-all placeholder:font-medium ${
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
                        <div className="flex items-center gap-1.5">
                          <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                            Data
                          </label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="text-dn-mist hover:text-dn-cocoa flex h-5 w-5 items-center justify-center rounded-full transition-colors"
                              >
                                <InfoOutlinedIcon className="h-4! w-4!" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Escolha uma data dentro dos proximos 30 dias.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Popover
                          open={openDatePicker}
                          onOpenChange={setOpenDatePicker}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className={`bg-dn-cream text-dn-cocoa hover:bg-white h-auto w-full justify-between rounded-[10px] border-[1.5px] px-3.5 py-3 text-[15px] font-semibold transition-all ${
                                erros.dataEntrega
                                  ? "border-dn-rose-strong shadow-[0_0_0_3px_rgba(181,73,106,0.12)]"
                                  : "border-dn-cream-border focus-visible:border-dn-caramel focus-visible:shadow-[0_0_0_3px_rgba(244,166,53,0.18)]"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <CalendarMonthRoundedIcon className="text-dn-mocha h-5! w-5!" />
                                <span className="truncate">{deliveryDateLabel}</span>
                              </span>
                              <ArrowDropDownRoundedIcon className="text-dn-mist h-5! w-5!" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={selectedDeliveryDate}
                              defaultMonth={
                                selectedDeliveryDate ??
                                minDeliveryDateObj ??
                                new Date()
                              }
                              startMonth={minDeliveryDateObj}
                              endMonth={maxDeliveryDateObj}
                              onSelect={(date) => {
                                if (!date) return;
                                const nextDate = toLocalDateString(date);
                                setDataEntrega(nextDate);
                                setOpenDatePicker(false);
                                if (
                                  erros.dataEntrega &&
                                  isDateInAllowedWindow(
                                    nextDate,
                                    minDeliveryDate,
                                    maxDeliveryDate,
                                  )
                                ) {
                                  setErros((prev) => ({
                                    ...prev,
                                    dataEntrega: false,
                                  }));
                                }
                              }}
                              disabled={(date) => {
                                if (minDeliveryDateObj && date < minDeliveryDateObj)
                                  return true;
                                if (maxDeliveryDateObj && date > maxDeliveryDateObj)
                                  return true;
                                return false;
                              }}
                              captionLayout="dropdown"
                              locale={ptBR}
                            />
                          </PopoverContent>
                        </Popover>
                        {erros.dataEntrega && (
                          <span className="text-dn-rose-strong text-[11px] font-bold">
                            Escolha uma data entre hoje e os proximos 30 dias.
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                            Hora
                          </label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="text-dn-mist hover:text-dn-cocoa flex h-5 w-5 items-center justify-center rounded-full transition-colors"
                              >
                                <InfoOutlinedIcon className="h-4! w-4!" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Escolha um horario aproximado para entrega.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="relative">
                          <AccessTimeRoundedIcon className="text-dn-mocha absolute left-3 top-1/2 h-5! w-5! -translate-y-1/2" />
                          <Input
                            type="time"
                            value={horaEntrega}
                            onChange={(e) => {
                              setHoraEntrega(e.target.value);
                              if (erros.horaEntrega && e.target.value) {
                                setErros((prev) => ({
                                  ...prev,
                                  horaEntrega: false,
                                }));
                              }
                            }}
                            className={`bg-dn-cream text-dn-cocoa h-auto w-full rounded-[10px] border-[1.5px] px-3.5 py-3 pl-10 text-[15px] font-semibold transition-all appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${
                              erros.horaEntrega
                                ? "border-dn-rose-strong shadow-[0_0_0_3px_rgba(181,73,106,0.12)]"
                                : "border-dn-cream-border focus:border-dn-caramel focus:bg-white"
                            }`}
                          />
                        </div>
                        {erros.horaEntrega && (
                          <span className="text-dn-rose-strong text-[11px] font-bold">
                            Informe um horario valido.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-dn-mocha text-xs font-bold tracking-wide uppercase">
                        Forma de pagamento
                      </label>
                      <Select
                        value={formaPagamento || undefined}
                        onValueChange={(value) => {
                          setFormaPagamento(
                            value as
                              | ""
                              | "pix"
                              | "dinheiro"
                              | "cartao credito"
                              | "cartao debito",
                          );
                          if (erros.formaPagamento && value) {
                            setErros((prev) => ({
                              ...prev,
                              formaPagamento: false,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger
                          className={`bg-dn-cream text-dn-cocoa h-auto w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[15px] font-semibold transition-all ${
                            erros.formaPagamento
                              ? "border-dn-rose-strong shadow-[0_0_0_3px_rgba(181,73,106,0.12)]"
                              : "border-dn-cream-border focus:border-dn-caramel focus:bg-white"
                          }`}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pix">Pix</SelectItem>
                          <SelectItem value="dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="cartao credito">
                            Cartao de credito
                          </SelectItem>
                          <SelectItem value="cartao debito">
                            Cartao de debito
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {erros.formaPagamento && (
                        <span className="text-dn-rose-strong text-[11px] font-bold">
                          Selecione uma forma de pagamento.
                        </span>
                      )}
                    </div>

                    <div className="border-dn-cream-border rounded-2xl border bg-dn-cream/70 p-3">
                      <p className="text-dn-cocoa text-sm font-semibold">
                        Preferências
                      </p>
                      <p className="text-dn-mist text-xs font-medium">
                        Informe detalhes como portaria, alergias ou pedidos
                        especiais no campo de observações.
                      </p>
                    </div>
                  </div>
                </TooltipProvider>
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
            </div>

            <div className="order-1 flex flex-col gap-4 lg:sticky lg:top-24 lg:order-2">
              <CardItensPedido
                itens={itens}
                subtotal={subtotal}
                taxaEntrega={taxaEntrega}
                total={total}
                onEditar={handleEditar}
                onQuantidade={onQuantidade}
                formatPrice={formatPrice}
                editavel={false}
                mostrarEditar={true}
              />
              <div className="border-dn-cream-border rounded-2xl border bg-white px-4 py-3 shadow-[0_2px_10px_rgba(59,42,20,0.07)]">
                <p className="text-dn-cocoa text-sm font-semibold">
                  Tudo pronto para adoçar seu dia
                </p>
                <p className="text-dn-mist text-xs font-medium">
                  Revise os dados e finalize quando quiser.
                </p>
              </div>
            </div>
          </div>
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

