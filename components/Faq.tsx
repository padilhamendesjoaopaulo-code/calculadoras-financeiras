import type { ItemFaq } from "@/lib/conteudo";

/**
 * Lista de perguntas frequentes usando <details>/<summary> nativos —
 * acessível, sem JavaScript e ótimo no mobile.
 */
export default function Faq({ itens }: { itens: ItemFaq[] }) {
  return (
    <section className="mt-10" aria-label="Perguntas frequentes">
      <h2 className="mb-4 text-xl font-bold text-slate-800">
        Perguntas frequentes
      </h2>
      <div className="space-y-3">
        {itens.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-slate-800 marker:content-['']">
              {item.pergunta}
              <span
                className="shrink-0 text-emerald-600 transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.resposta}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
