import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import JurosCompostosCalculator from "@/components/calculadoras/JurosCompostosCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos — simule investimentos com aportes",
  description:
    "Calculadora de juros compostos com aportes mensais e gráfico de evolução. Veja o montante final, o total investido e quanto rendeu em juros.",
  alternates: { canonical: "/juros-compostos" },
};

export default function Page() {
  return (
    <CalculatorLayout
      slug="juros-compostos"
      titulo="Calculadora de Juros Compostos"
      introducao="Simule o crescimento do seu dinheiro ao longo do tempo, com aportes mensais e visualização em gráfico."
      calculadora={<JurosCompostosCalculator />}
      explicacao={
        <>
          <h2>Como funcionam os juros compostos</h2>
          <p>
            Juros compostos são os “juros sobre juros”. Diferente dos juros
            simples, em que o rendimento incide sempre sobre o valor inicial, no
            regime composto o rendimento de cada período passa a fazer parte do
            capital, e nos períodos seguintes ele também rende. É esse efeito
            que faz o dinheiro crescer de forma acelerada ao longo do tempo.
          </p>
          <p>
            Dois fatores potencializam esse crescimento: o <strong>tempo</strong>{" "}
            e a <strong>consistência dos aportes</strong>. Quanto mais cedo você
            começa e quanto mais regularmente investe, maior é a parcela do
            patrimônio final que vem dos juros, e não do dinheiro que você
            depositou. Por isso os juros compostos são chamados de a “oitava
            maravilha do mundo” quando estão a seu favor.
          </p>
          <p>
            Use a simulação acima para comparar cenários: experimente aumentar o
            aporte mensal, esticar o prazo ou variar a taxa de juros e observe
            no gráfico como o montante total (verde) se distancia do total
            investido (cinza). Os rendimentos passados não garantem resultados
            futuros — a calculadora serve para projeções e planejamento.
          </p>
        </>
      }
    />
  );
}
