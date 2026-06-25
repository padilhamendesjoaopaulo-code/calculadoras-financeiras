import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import DecimoTerceiroCalculator from "@/components/calculadoras/DecimoTerceiroCalculator";

export const metadata: Metadata = {
  title: "Calculadora de 13º Salário 2026 — 1ª e 2ª parcela",
  description:
    "Calcule o 13º salário proporcional 2026: valor da 1ª e 2ª parcela, com descontos de INSS e IRRF. Simples, grátis e em português.",
  alternates: { canonical: "/13-salario" },
};

export default function Page() {
  return (
    <CalculatorLayout
      titulo="Calculadora de 13º Salário"
      introducao="Descubra o valor do seu 13º salário, dividido em primeira e segunda parcela, já considerando os descontos."
      calculadora={<DecimoTerceiroCalculator />}
      explicacao={
        <>
          <h2>Regras do 13º salário</h2>
          <p>
            O 13º salário, ou gratificação natalina, é um direito de todo
            trabalhador com carteira assinada. Ele corresponde a 1/12 do salário
            por mês trabalhado no ano. Quem trabalhou o ano inteiro recebe um
            salário cheio; quem foi admitido durante o ano recebe de forma
            proporcional. Cada mês com 15 dias ou mais de trabalho conta como
            mês completo.
          </p>
          <p>
            O pagamento costuma ser feito em <strong>duas parcelas</strong>. A
            primeira, paga até 30 de novembro, corresponde à metade do valor e
            não tem descontos. A segunda, paga até 20 de dezembro, é onde
            incidem os descontos de INSS e Imposto de Renda, calculados sobre o
            valor total do 13º.
          </p>
          <p>
            Esta calculadora estima o valor bruto e líquido com base nas tabelas
            de INSS e IRRF vigentes. Lembre-se de que adicionais, horas extras e
            comissões habituais também integram a base do 13º, podendo elevar o
            valor final.
          </p>
        </>
      }
    />
  );
}
