/**
 * Espaço reservado para anúncio (Google AdSense).
 *
 * O site ainda NÃO tem conta no AdSense. Este componente apenas
 * desenha um placeholder discreto e marca, com o comentário abaixo,
 * exatamente onde o código do anúncio deve ser inserido no futuro.
 */
export default function AdSlot({ rotulo = "Publicidade" }: { rotulo?: string }) {
  return (
    <div
      className="my-6 flex min-h-[90px] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs uppercase tracking-wide text-slate-400"
      aria-hidden="true"
    >
      {/* AD SLOT - substituir pelo código do Google AdSense */}
      <span>{rotulo}</span>
    </div>
  );
}
