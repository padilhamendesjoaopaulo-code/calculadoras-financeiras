import type { Metadata } from "next";
import { SITE_NOME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o propósito do Calculadoras Brasil: oferecer calculadoras financeiras e trabalhistas gratuitas, simples e em português.",
  alternates: { canonical: "/sobre" },
};

export default function Page() {
  return (
    <article className="prose-custom mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Sobre o {SITE_NOME}
      </h1>
      <p className="mt-4">
        O {SITE_NOME} nasceu com um objetivo simples: ajudar o trabalhador e o
        investidor brasileiro a entender seus direitos e suas finanças por meio
        de calculadoras gratuitas, rápidas e fáceis de usar.
      </p>
      <p>
        Reunimos em um só lugar as calculadoras mais procuradas no dia a dia —
        rescisão trabalhista, férias, 13º salário, juros compostos e
        financiamento — sempre com uma explicação em linguagem clara sobre como
        cada cálculo funciona. Todos os cálculos são feitos diretamente no seu
        navegador, de forma instantânea e sem coletar seus dados.
      </p>
      <h2>Aviso importante</h2>
      <p>
        Os resultados apresentados são <strong>estimativas para fins
        informativos e educativos</strong>. Regras trabalhistas e tributárias
        possuem particularidades que podem alterar os valores em casos
        específicos. Para decisões oficiais, consulte um contador, advogado ou
        profissional habilitado.
      </p>
      <p>
        Trabalhamos para manter as tabelas e as regras sempre atualizadas. Se
        você notar alguma divergência, sua sugestão é bem-vinda.
      </p>
    </article>
  );
}
