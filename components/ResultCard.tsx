import { formatarBRL } from "@/lib/format";

interface Linha {
  rotulo: string;
  valor: number;
  /** Destaca a linha (ex.: total). */
  destaque?: boolean;
  /** Exibe o valor como desconto (em vermelho, com sinal de menos). */
  desconto?: boolean;
}

/** Card padronizado para exibir um conjunto de resultados em R$. */
export default function ResultCard({
  titulo,
  linhas,
}: {
  titulo: string;
  linhas: Linha[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-slate-800">{titulo}</h3>
      <dl className="space-y-1">
        {linhas.map((l, i) => (
          <div
            key={i}
            className={`flex items-center justify-between gap-4 py-2 ${
              l.destaque
                ? "mt-2 border-t border-slate-200 pt-3 text-lg font-bold text-emerald-700"
                : "text-sm text-slate-600"
            }`}
          >
            <dt>{l.rotulo}</dt>
            <dd
              className={
                l.desconto && !l.destaque ? "font-medium text-red-600" : ""
              }
            >
              {l.desconto && !l.destaque ? "− " : ""}
              {formatarBRL(Math.abs(l.valor))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
