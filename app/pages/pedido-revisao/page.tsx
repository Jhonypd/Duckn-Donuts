import { PedidoRevisao } from "../../components/pedido-revisao";
import { useCarrinho } from "../../context/carrinho-contexto";

export default function PedidoRevisaoPage() {
  const { itens, setQuantidadePorId } = useCarrinho();

  return <PedidoRevisao itens={itens} onQuantidade={setQuantidadePorId} />;
}
