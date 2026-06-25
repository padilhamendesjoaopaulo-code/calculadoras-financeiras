import type { Fonte } from "@/lib/conteudo";
import { ULTIMA_ATUALIZACAO } from "@/lib/site";

/**
 * Seção de fontes oficiais + data de atualização. Reforça a confiabilidade
 * do conteúdo (E-E-A-T), importante para temas financeiros e trabalhistas.
 */
export default function Fontes({ fontes }: { fontes: Fonte[] }) {
  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="mb-3 text-base font-semibold text-slate-800">
        Fontes e referências
      </h2>
      <ul className="space-y-2 text-sm">
        {fontes.map((f) => (
          <li key={f.url}>
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline hover:text-emerald-800"
            >
              {f.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-400">
        Conteúdo revisado em {ULTIMA_ATUALIZACAO}. As tabelas de INSS e IRRF
        utilizadas têm como referência o ano de 2025. Os resultados são
        estimativas para fins informativos e não substituem orientação
        profissional.
      </p>
    </section>
  );
}
