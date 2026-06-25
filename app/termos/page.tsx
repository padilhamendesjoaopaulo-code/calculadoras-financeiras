import type { Metadata } from "next";
import { SITE_NOME, ULTIMA_ATUALIZACAO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso e aviso legal do Calculadoras Brasil. Saiba como utilizar nossas calculadoras e os limites de responsabilidade.",
  alternates: { canonical: "/termos" },
};

export default function Page() {
  return (
    <article className="prose-custom mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Termos de Uso
      </h1>
      <p className="mt-4 text-sm text-slate-400">
        Última atualização: {ULTIMA_ATUALIZACAO}.
      </p>

      <h2>1. Aceitação dos termos</h2>
      <p>
        Ao acessar e utilizar o {SITE_NOME}, você concorda com estes Termos de
        Uso. Caso não concorde, recomendamos que não utilize o site.
      </p>

      <h2>2. Finalidade do serviço</h2>
      <p>
        O {SITE_NOME} oferece calculadoras financeiras e trabalhistas
        gratuitas. Todas as informações e resultados têm caráter{" "}
        <strong>meramente informativo e educativo</strong>. As calculadoras
        funcionam no seu navegador e não armazenamos os valores informados.
      </p>

      <h2>3. Aviso legal e limitação de responsabilidade</h2>
      <p>
        Os cálculos são <strong>estimativas</strong> baseadas em regras gerais e
        nas tabelas vigentes na data da última atualização. Eles não consideram
        todas as particularidades de cada caso (acordos, convenções coletivas,
        adicionais, pensões, entre outros) e <strong>não constituem
        aconselhamento jurídico, contábil ou financeiro</strong>. O {SITE_NOME}{" "}
        não se responsabiliza por decisões tomadas com base nos resultados
        apresentados. Para situações oficiais, consulte um profissional
        habilitado (advogado, contador ou o sindicato da categoria).
      </p>

      <h2>4. Propriedade intelectual</h2>
      <p>
        O conteúdo, a marca e o layout do site são protegidos. É permitido o uso
        pessoal das calculadoras, mas a reprodução do conteúdo sem autorização
        não é permitida.
      </p>

      <h2>5. Publicidade de terceiros</h2>
      <p>
        Este site poderá exibir anúncios de terceiros. O conteúdo desses
        anúncios é de responsabilidade dos respectivos anunciantes. Consulte
        nossa{" "}
        <a href="/politica-de-privacidade">Política de Privacidade</a> para
        entender o uso de cookies.
      </p>

      <h2>6. Alterações nos termos</h2>
      <p>
        Estes Termos podem ser atualizados a qualquer momento. Recomendamos
        revisá-los periodicamente.
      </p>
    </article>
  );
}
