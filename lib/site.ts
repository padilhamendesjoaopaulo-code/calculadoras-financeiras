/** Configuração central do site (nome, URL, lista de calculadoras). */

export const SITE_NOME = "Calculadoras Brasil";

/**
 * URL base do site (usada em sitemap, robots e metadados Open Graph).
 * Após o deploy, substitua pelo seu subdomínio da Vercel, ex.:
 *   "https://calculadoras-financeiras.vercel.app"
 */
export const BASE_URL = "https://calculadoras-financeiras.vercel.app";

export interface Calculadora {
  slug: string;
  titulo: string;
  descricao: string;
  /** Emoji simples usado no card (evita dependência de biblioteca de ícones). */
  icone: string;
}

/** Lista única das calculadoras — usada na home, no rodapé e no sitemap. */
export const CALCULADORAS: Calculadora[] = [
  {
    slug: "rescisao",
    titulo: "Rescisão Trabalhista (CLT)",
    descricao:
      "Calcule saldo de salário, aviso prévio, férias, 13º e multa do FGTS.",
    icone: "📄",
  },
  {
    slug: "ferias",
    titulo: "Férias",
    descricao:
      "Calcule suas férias com o 1/3 constitucional, abono e descontos.",
    icone: "🏖️",
  },
  {
    slug: "13-salario",
    titulo: "13º Salário",
    descricao: "Calcule a 1ª e a 2ª parcela do 13º, já com INSS e IRRF.",
    icone: "🎁",
  },
  {
    slug: "juros-compostos",
    titulo: "Juros Compostos",
    descricao:
      "Simule o crescimento do seu dinheiro com aportes mensais e gráfico.",
    icone: "📈",
  },
  {
    slug: "financiamento",
    titulo: "Financiamento (Tabela Price)",
    descricao: "Descubra a parcela fixa e veja a tabela de amortização.",
    icone: "🏠",
  },
];
