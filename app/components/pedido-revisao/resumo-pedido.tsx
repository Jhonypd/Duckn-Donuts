interface ResumoPedidoProps {
  subtotal: number;
  taxaEntrega: number;
  total: number;
  formatPrice: (value: number) => string;
}

export function ResumoPedido({
  subtotal,
  taxaEntrega,
  total,
  formatPrice,
}: ResumoPedidoProps) {
  return (
    <div className="px-4 py-3 pb-4">
      <div className="flex items-center justify-between py-1.5">
        <span className="text-sm text-[#7A6040] font-semibold">Subtotal</span>
        <span className="text-sm text-[#3B2A14] font-bold">
          {formatPrice(subtotal)}
        </span>
      </div>
      <div className="flex items-center justify-between py-1.5">
        <span className="text-sm text-[#7A6040] font-semibold">
          Taxa de entrega
        </span>
        <span className="text-sm text-[#3B2A14] font-bold">
          {taxaEntrega > 0 ? formatPrice(taxaEntrega) : "Gratis"}
        </span>
      </div>
      <hr className="border-none border-t border-dashed border-[#FDE8C5] my-2" />
      <div className="flex items-center justify-between pt-2">
        <span
          className="text-lg font-bold text-[#3B2A14]"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Total
        </span>
        <span
          className="text-[22px] font-bold text-[#7A4A00]"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
