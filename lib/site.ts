/** Configuração central do site (nome, URL, lista de calculadoras). */

export const SITE_NOME = "Calculadoras Brasil";

/**
 * E-mail de contato exibido nas páginas de Contato e Política de Privacidade.
 * ALTERE para o seu e-mail real antes de publicar (o Google AdSense costuma
 * exigir um canal de contato funcional).
 */
export const EMAIL_CONTATO = "contato@calculadorasbrasil.com.br";

/** Data da última revisão do conteúdo (exibida nas páginas para transparência). */
export const ULTIMA_ATUALIZACAO = "junho de 2025";

/**
 * URL base do site (usada em sitemap, robots e metadados Open Graph).
 * Após o deploy, substitua pelo seu subdomínio da Vercel, ex.:
 *   "https://calculadoras-financeiras.vercel.app"
 */
export const BASE_URL = "https://calculadoras-financeiras-psi.vercel.app";

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
