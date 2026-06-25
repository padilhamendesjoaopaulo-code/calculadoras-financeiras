import Link from "next/link";
import { CALCULADORAS, SITE_NOME } from "@/lib/site";
import AdSlot from "@/components/AdSlot";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          {SITE_NOME}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Calculadoras financeiras e trabalhistas gratuitas, simples e em
          português. Faça simulações de rescisão, férias, 13º salário, juros
          compostos e financiamento direto no seu navegador — sem cadastro.
        </p>
      </section>

      {/* AD SLOT - topo da home */}
      <AdSlot rotulo="Publicidade" />

      <section className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CALCULADORAS.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <span className="text-3xl" aria-hidden="true">
              {c.icone}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-slate-800 group-hover:text-emerald-700">
              {c.titulo}
            </h2>
            <p className="mt-1 flex-1 text-sm text-slate-500">{c.descricao}</p>
            <span className="mt-4 text-sm font-medium text-emerald-600">
              Calcular agora →
            </span>
          </Link>
        ))}
      </section>

      <section className="prose-custom mx-auto mt-12 max-w-3xl">
        <h2>Por que usar nossas calculadoras?</h2>
        <p>
          Entender quanto você tem a receber em uma rescisão, quanto renderá um
          investimento ou qual será o valor da parcela de um financiamento não
          deveria ser complicado. Reunimos as principais calculadoras
          financeiras e trabalhistas em um só lugar, com explicações claras em
          linguagem simples.
        </p>
        <p>
          Todos os cálculos são feitos no seu próprio navegador, de forma
          instantânea e sem enviar seus dados para nenhum servidor. Os
          resultados são estimativas para fins informativos e podem variar
          conforme regras específicas de cada caso.
        </p>
      </section>
    </div>
  );
}
