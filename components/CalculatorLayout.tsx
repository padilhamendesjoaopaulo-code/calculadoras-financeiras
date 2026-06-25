import { ReactNode } from "react";
import AdSlot from "./AdSlot";
import RelatedCalculators from "./RelatedCalculators";
import Faq from "./Faq";
import Fontes from "./Fontes";
import JsonLd from "./JsonLd";
import { CONTEUDO } from "@/lib/conteudo";
import { BASE_URL } from "@/lib/site";

/**
 * Layout padrão de uma página de calculadora:
 * título + introdução, AD SLOT no topo, a calculadora (form + resultado),
 * AD SLOT entre a calculadora e o texto, o texto explicativo (SEO), FAQ,
 * fontes oficiais, o bloco "Veja também" e os dados estruturados (JSON-LD).
 */
export default function CalculatorLayout({
  slug,
  titulo,
  introducao,
  calculadora,
  explicacao,
}: {
  slug: string;
  titulo: string;
  introducao: string;
  calculadora: ReactNode;
  explicacao: ReactNode;
}) {
  const conteudo = CONTEUDO[slug];

  // Dados estruturados de FAQ (pode gerar resultados ricos no Google).
  const faqJsonLd = conteudo && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: conteudo.faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };

  // Trilha de navegação (breadcrumb) estruturada.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: titulo,
        item: `${BASE_URL}/${slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {titulo}
        </h1>
        <p className="mt-2 text-slate-600">{introducao}</p>
      </header>

      {/* AD SLOT - topo da página */}
      <AdSlot rotulo="Publicidade" />

      <section aria-label="Calculadora">{calculadora}</section>

      {/* AD SLOT - entre o formulário e o texto explicativo */}
      <AdSlot rotulo="Publicidade" />

      <section className="prose-custom mt-2">{explicacao}</section>

      {conteudo && <Faq itens={conteudo.faq} />}
      {conteudo && <Fontes fontes={conteudo.fontes} />}

      <RelatedCalculators slugAtual={slug} />

      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
    </article>
  );
}
