interface ResumoPedidoProps {
  subtotal: number;
  taxaEntrega?: number;
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
    <div className="px-4 py-3">
      {taxaEntrega && taxaEntrega > 0 && (
        <div className="flex items-center justify-between py-1.5">
          <span className="text-dn-cocoa text-sm font-semibold">Subtotal</span>
          <span className="text-dn-cocoa text-sm font-bold">
            {formatPrice(subtotal)}
          </span>
        </div>
      )}

      {taxaEntrega && taxaEntrega > 0 && (
        <div className="flex items-center justify-between py-1.5">
          <span className="text-dn-cocoa text-sm font-semibold">
            Taxa de entrega
          </span>
          <span className="text-dn-cocoa text-sm font-bold">
            {taxaEntrega > 0 ? formatPrice(taxaEntrega) : "Gratis"}
          </span>
        </div>
      )}
      <hr className="border-dn-cream-border my-2 border-t border-dashed" />
      <div className="flex items-center justify-between pt-2">
        <span
          className="text-dn-cocoa text-lg font-bold"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Total
        </span>
        <span
          className="text-dn-caramel-deep text-[22px] font-bold"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
