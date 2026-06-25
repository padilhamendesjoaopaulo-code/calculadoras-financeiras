import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import FeriasCalculator from "@/components/calculadoras/FeriasCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Férias CLT — calcule férias + 1/3 com descontos",
  description:
    "Calcule o valor das suas férias CLT com o 1/3 constitucional, abono pecuniário (venda de 1/3) e descontos de INSS e IRRF. Rápido e grátis.",
  alternates: { canonical: "/ferias" },
};

export default function Page() {
  return (
    <CalculatorLayout
      slug="ferias"
      titulo="Calculadora de Férias"
      introducao="Calcule quanto você vai receber de férias, com o terço constitucional e os descontos de INSS e IRRF."
      calculadora={<FeriasCalculator />}
      explicacao={
        <>
          <h2>Direito a férias no Brasil</h2>
          <p>
            Todo trabalhador com carteira assinada tem direito a 30 dias de
            férias remuneradas após cada período de 12 meses de trabalho
            (período aquisitivo). Além do salário do período, a Constituição
            garante um adicional de um terço — o conhecido{" "}
            <strong>1/3 constitucional de férias</strong>.
          </p>
          <p>
            O trabalhador pode optar por vender 1/3 das férias, recebendo em
            dinheiro o equivalente a 10 dias e descansando os outros 20. Isso é
            chamado de <strong>abono pecuniário</strong>. O valor do abono é
            isento de INSS e Imposto de Renda, enquanto as férias gozadas e o
            terço constitucional sofrem os descontos normais.
          </p>
          <p>
            Os descontos de INSS e IRRF seguem as tabelas progressivas
            vigentes. Esta calculadora usa as faixas atuais para estimar o valor
            líquido, mas o resultado é apenas uma referência — o valor final
            pode variar conforme dependentes, pensão e outras particularidades
            da folha de pagamento.
          </p>
        </>
      }
    />
  );
}
