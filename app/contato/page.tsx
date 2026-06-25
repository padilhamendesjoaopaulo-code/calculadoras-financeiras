import type { Metadata } from "next";
import { SITE_NOME, EMAIL_CONTATO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe do Calculadoras Brasil: dúvidas, sugestões e correções sobre nossas calculadoras financeiras e trabalhistas.",
  alternates: { canonical: "/contato" },
};

export default function Page() {
  return (
    <article className="prose-custom mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Contato</h1>
      <p className="mt-4">
        Quer tirar uma dúvida, enviar uma sugestão ou nos avisar sobre alguma
        divergência em um cálculo? Adoramos receber feedback — ele nos ajuda a
        manter o {SITE_NOME} cada vez mais útil e preciso.
      </p>
      <p>
        Escreva para o nosso e-mail e responderemos assim que possível:
      </p>
      <p className="text-lg font-semibold">
        <a href={`mailto:${EMAIL_CONTATO}`}>{EMAIL_CONTATO}</a>
      </p>
      <h2>Sobre os cálculos</h2>
      <p>
        Caso encontre um resultado que não bata com o esperado, descreva o
        cenário (valores informados e a calculadora utilizada). Lembre-se de que
        nossos resultados são estimativas para fins informativos e podem variar
        conforme regras específicas de cada caso — consulte sempre um
        profissional habilitado para decisões oficiais.
      </p>
    </article>
  );
}
