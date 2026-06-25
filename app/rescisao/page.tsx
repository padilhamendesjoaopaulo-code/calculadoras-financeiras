import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import RescisaoCalculator from "@/components/calculadoras/RescisaoCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Rescisão CLT 2026 — calcule sua rescisão trabalhista",
  description:
    "Calculadora de rescisão trabalhista CLT 2026: calcule saldo de salário, aviso prévio, férias proporcionais + 1/3, 13º proporcional e multa do FGTS.",
  alternates: { canonical: "/rescisao" },
};

export default function Page() {
  return (
    <CalculatorLayout
      titulo="Calculadora de Rescisão Trabalhista (CLT)"
      introducao="Informe os dados do contrato e o tipo de rescisão para estimar todas as verbas rescisórias a que você tem direito."
      calculadora={<RescisaoCalculator />}
      explicacao={
        <>
          <h2>Como funciona a rescisão de contrato na CLT</h2>
          <p>
            Quando um contrato de trabalho regido pela CLT é encerrado, o
            trabalhador pode ter direito a um conjunto de verbas chamadas de
            verbas rescisórias. As principais são o saldo de salário (os dias
            efetivamente trabalhados no mês da saída), o aviso prévio, as férias
            proporcionais acrescidas de um terço, o 13º salário proporcional e,
            em alguns casos, a multa de 40% sobre o saldo do FGTS.
          </p>
          <p>
            O que o trabalhador recebe depende diretamente do{" "}
            <strong>tipo de rescisão</strong>. Na demissão sem justa causa, o
            empregado tem direito a todas as verbas, incluindo o aviso prévio
            indenizado e a multa de 40% do FGTS. No pedido de demissão, não há
            multa do FGTS nem aviso prévio indenizado pelo empregador. Na justa
            causa, o trabalhador perde o direito às férias e ao 13º
            proporcionais e à multa. Já no acordo entre as partes (previsto na
            Reforma Trabalhista), o aviso prévio e a multa do FGTS são reduzidos
            pela metade (multa de 20%).
          </p>
          <p>
            Esta calculadora oferece uma <strong>estimativa</strong> com base
            nas regras gerais. Situações específicas — como adicionais,
            horas extras habituais, faltas, pensão alimentícia ou verbas de
            convenção coletiva — podem alterar os valores. Para o cálculo
            oficial, consulte o sindicato da categoria ou um advogado
            trabalhista.
          </p>
        </>
      }
    />
  );
}
