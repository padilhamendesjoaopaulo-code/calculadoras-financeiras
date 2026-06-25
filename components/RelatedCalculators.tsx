import Link from "next/link";
import { CALCULADORAS } from "@/lib/site";

/**
 * Bloco "Veja também": mostra as demais calculadoras (exceto a atual).
 * Melhora a navegação interna e o SEO (links entre páginas).
 */
export default function RelatedCalculators({ slugAtual }: { slugAtual: string }) {
  const outras = CALCULADORAS.filter((c) => c.slug !== slugAtual);

  return (
    <section className="mt-12" aria-label="Outras calculadoras">
      <h2 className="mb-4 text-xl font-bold text-slate-800">Veja também</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {outras.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden="true">
              {c.icone}
            </span>
            <span>
              <span className="block font-semibold text-slate-800 group-hover:text-emerald-700">
                {c.titulo}
              </span>
              <span className="mt-0.5 block text-sm text-slate-500">
                {c.descricao}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
