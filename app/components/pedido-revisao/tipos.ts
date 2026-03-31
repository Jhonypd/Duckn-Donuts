export type TipoEntrega = "delivery" | "pickup";

export interface ErrosCliente {
  nome: boolean;
  whatsapp: boolean;
  endereco: boolean;
  formaPagamento: boolean;
  dataEntrega: boolean;
  horaEntrega: boolean;
}
