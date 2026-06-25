/**
 * Conteúdo editorial por calculadora: perguntas frequentes (FAQ) e fontes
 * oficiais. Centralizado aqui para alimentar o texto das páginas, os dados
 * estruturados (JSON-LD FAQPage) e a seção de fontes (E-E-A-T).
 */

export interface ItemFaq {
  pergunta: string;
  resposta: string;
}

export interface Fonte {
  label: string;
  url: string;
}

export interface ConteudoCalculadora {
  faq: ItemFaq[];
  fontes: Fonte[];
}

export const CONTEUDO: Record<string, ConteudoCalculadora> = {
  rescisao: {
    faq: [
      {
        pergunta: "Quem tem direito à multa de 40% do FGTS?",
        resposta:
          "A multa de 40% sobre o saldo do FGTS é devida na demissão sem justa causa. No acordo entre empregado e empregador, a multa é de 20%. Em pedido de demissão e justa causa não há multa rescisória.",
      },
      {
        pergunta: "Como funciona o aviso prévio na rescisão?",
        resposta:
          "Na demissão sem justa causa, o trabalhador tem direito ao aviso prévio de no mínimo 30 dias, acrescido de 3 dias por ano trabalhado (até 90 dias). Pode ser trabalhado ou indenizado. No pedido de demissão, é o empregado quem deve cumprir o aviso.",
      },
      {
        pergunta: "O que recebo se pedir demissão?",
        resposta:
          "Em pedido de demissão você recebe saldo de salário, férias vencidas e proporcionais com 1/3 e 13º proporcional. Não há aviso prévio indenizado pelo empregador nem multa do FGTS, e o saque do FGTS não é liberado.",
      },
      {
        pergunta: "Quando o pagamento da rescisão deve ser feito?",
        resposta:
          "O prazo legal é de até 10 dias corridos contados do término do contrato, independentemente do tipo de aviso prévio. O atraso gera multa em favor do trabalhador.",
      },
    ],
    fontes: [
      {
        label: "CLT — Decreto-Lei nº 5.452/1943 (Planalto)",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm",
      },
      {
        label: "FGTS — Caixa Econômica Federal",
        url: "https://www.caixa.gov.br/beneficios-trabalhador/fgts/Paginas/default.aspx",
      },
      {
        label: "Trabalho e Emprego — gov.br",
        url: "https://www.gov.br/trabalho-e-emprego/pt-br",
      },
    ],
  },
  ferias: {
    faq: [
      {
        pergunta: "O que é o abono pecuniário (vender 1/3 das férias)?",
        resposta:
          "É a conversão de até 1/3 do período de férias (10 dias, num período de 30) em dinheiro. O trabalhador descansa 20 dias e recebe os 10 dias restantes em valor. O abono é isento de INSS e Imposto de Renda.",
      },
      {
        pergunta: "As férias têm desconto de INSS e Imposto de Renda?",
        resposta:
          "Sim. As férias gozadas mais o 1/3 constitucional integram a base de cálculo do INSS e do IRRF, seguindo as tabelas progressivas vigentes. Apenas o abono pecuniário é isento.",
      },
      {
        pergunta: "Quando as férias devem ser pagas?",
        resposta:
          "O pagamento das férias deve ser feito até 2 dias antes do início do período de descanso. O atraso pode obrigar o empregador a pagar o valor em dobro.",
      },
      {
        pergunta: "Posso dividir minhas férias?",
        resposta:
          "Sim. Desde a Reforma Trabalhista, as férias podem ser fracionadas em até 3 períodos, sendo um deles de no mínimo 14 dias e os demais com pelo menos 5 dias cada.",
      },
    ],
    fontes: [
      {
        label: "CLT — Capítulo das Férias (Planalto)",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm",
      },
      {
        label: "Tabela de IRRF — Receita Federal",
        url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas",
      },
    ],
  },
  "13-salario": {
    faq: [
      {
        pergunta: "Quando o 13º salário é pago?",
        resposta:
          "A primeira parcela é paga entre 1º de fevereiro e 30 de novembro, e a segunda até 20 de dezembro. A primeira parcela não tem descontos; o INSS e o IRRF incidem na segunda parcela, sobre o valor total.",
      },
      {
        pergunta: "Quem trabalhou menos de um ano recebe 13º?",
        resposta:
          "Sim, de forma proporcional. A cada mês com 15 dias ou mais de trabalho, o empregado tem direito a 1/12 do 13º salário.",
      },
      {
        pergunta: "Férias e horas extras entram no 13º?",
        resposta:
          "Sim. Médias de horas extras, comissões, adicionais noturno e de insalubridade habituais integram a base do 13º salário, podendo aumentar o valor final.",
      },
    ],
    fontes: [
      {
        label: "Lei nº 4.090/1962 — Gratificação de Natal (Planalto)",
        url: "https://www.planalto.gov.br/ccivil_03/leis/l4090.htm",
      },
      {
        label: "Tabela de IRRF — Receita Federal",
        url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas",
      },
    ],
  },
  "juros-compostos": {
    faq: [
      {
        pergunta: "Qual a diferença entre juros simples e compostos?",
        resposta:
          "Nos juros simples, o rendimento incide sempre sobre o valor inicial. Nos juros compostos, os juros de cada período passam a render também — é o efeito 'juros sobre juros', que acelera o crescimento ao longo do tempo.",
      },
      {
        pergunta: "Como transformar uma taxa anual em mensal?",
        resposta:
          "Não basta dividir por 12. Usa-se a taxa equivalente composta: taxa mensal = (1 + taxa anual)^(1/12) − 1. A calculadora faz essa conversão automaticamente quando você escolhe a taxa 'ao ano'.",
      },
      {
        pergunta: "Os resultados consideram impostos e inflação?",
        resposta:
          "Não. A simulação mostra o rendimento bruto nominal. Investimentos como CDB e Tesouro Direto têm Imposto de Renda sobre os rendimentos, e a inflação reduz o poder de compra ao longo do tempo.",
      },
    ],
    fontes: [
      {
        label: "Cidadania Financeira — Banco Central do Brasil",
        url: "https://www.bcb.gov.br/cidadaniafinanceira",
      },
      {
        label: "Investidor — Comissão de Valores Mobiliários (CVM)",
        url: "https://www.investidor.gov.br/",
      },
    ],
  },
  financiamento: {
    faq: [
      {
        pergunta: "Qual a diferença entre Tabela Price e SAC?",
        resposta:
          "Na Tabela Price as parcelas são fixas do início ao fim. No SAC a amortização é constante e as parcelas começam mais altas e diminuem com o tempo. O SAC costuma gerar menos juros totais; a Price oferece previsibilidade.",
      },
      {
        pergunta: "O que é amortização?",
        resposta:
          "É a parte da parcela que efetivamente abate o saldo devedor. A outra parte são os juros. Na Tabela Price, no começo paga-se mais juros e menos amortização; essa proporção se inverte ao longo do tempo.",
      },
      {
        pergunta: "A calculadora inclui seguros e taxas?",
        resposta:
          "Não. O cálculo considera apenas o valor financiado e os juros. Financiamentos reais costumam incluir seguros (MIP/DFI), taxa de administração e IOF, que aumentam o custo efetivo total (CET).",
      },
    ],
    fontes: [
      {
        label: "Calculadora do Cidadão — Banco Central do Brasil",
        url: "https://www3.bcb.gov.br/CALCIDADAO/publico/exibirMenuFinanciamentos.do",
      },
      {
        label: "Cidadania Financeira — Banco Central do Brasil",
        url: "https://www.bcb.gov.br/cidadaniafinanceira",
      },
    ],
  },
};
