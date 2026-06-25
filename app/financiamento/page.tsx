import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import FinanciamentoCalculator from "@/components/calculadoras/FinanciamentoCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Financiamento (Tabela Price) — parcela e amortização",
  description:
    "Calcule a parcela fixa de um financiamento pela Tabela Price, o total pago e os juros. Veja a tabela de amortização parcela a parcela.",
  alternates: { canonical: "/financiamento" },
};

export default function Page() {
  return (
    <CalculatorLayout
      titulo="Calculadora de Financiamento (Tabela Price)"
      introducao="Calcule o valor da parcela fixa, o total pago e os juros de um financiamento, com a tabela de amortização completa."
      calculadora={<FinanciamentoCalculator />}
      explicacao={
        <>
          <h2>Tabela Price x SAC</h2>
          <p>
            A <strong>Tabela Price</strong> é o sistema de amortização mais
            comum em financiamentos de veículos e empréstimos. Sua principal
            característica é a <strong>parcela fixa</strong>: você paga sempre o
            mesmo valor do início ao fim. No começo, a maior parte da parcela é
            composta por juros e uma pequena parte amortiza a dívida; com o
            tempo, essa proporção se inverte.
          </p>
          <p>
            Já no sistema <strong>SAC</strong> (Sistema de Amortização
            Constante), muito usado em financiamentos imobiliários, a
            amortização é fixa e as parcelas começam mais altas e vão
            diminuindo ao longo do tempo. Em geral, o SAC resulta em menos juros
            totais, enquanto a Price oferece previsibilidade com a parcela
            constante.
          </p>
          <p>
            Na tabela de amortização acima você consegue ver, parcela a parcela,
            quanto está pagando de juros, quanto está amortizando do saldo
            devedor e quanto ainda falta quitar. Lembre-se de que financiamentos
            reais costumam incluir seguros, taxas administrativas e IOF, que não
            entram nesta estimativa.
          </p>
        </>
      }
    />
  );
}
