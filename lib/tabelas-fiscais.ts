/**
 * Tabelas fiscais — INSS e IRRF
 * ================================================================
 * FONTE ÚNICA DE VERDADE para alíquotas usadas em todo o site.
 *
 * Valores vigentes em 2025 (referência). Quando o governo publicar
 * novas faixas (geralmente no início de cada ano), basta atualizar
 * as constantes abaixo — nenhum outro arquivo precisa mudar.
 *
 * INSS: contribuição progressiva por faixas (cada parte do salário
 *       é tributada pela alíquota da sua faixa). Há um teto.
 * IRRF: imposto de renda retido na fonte, calculado pelo método da
 *       "parcela a dedudir" sobre a base (salário - INSS - dependentes).
 * ================================================================
 */

/** Faixa de contribuição progressiva do INSS. */
export interface FaixaINSS {
  /** Limite superior da faixa (em R$). */
  ate: number;
  /** Alíquota aplicada à parcela dentro desta faixa (ex.: 0.075 = 7,5%). */
  aliquota: number;
}

/**
 * Tabela INSS 2025 (empregado CLT) — contribuição progressiva.
 * Teto de contribuição: salário-base até R$ 8.157,41.
 */
export const TABELA_INSS_2025: FaixaINSS[] = [
  { ate: 1518.0, aliquota: 0.075 },
  { ate: 2793.88, aliquota: 0.09 },
  { ate: 4190.83, aliquota: 0.12 },
  { ate: 8157.41, aliquota: 0.14 },
];

/** Teto do salário de contribuição do INSS em 2025. */
export const TETO_INSS_2025 = 8157.41;

/** Faixa de tributação mensal do IRRF. */
export interface FaixaIRRF {
  /** Limite superior da base de cálculo (em R$). Use Infinity na última. */
  ate: number;
  /** Alíquota da faixa (ex.: 0.275 = 27,5%). */
  aliquota: number;
  /** Parcela a deduzir do imposto (em R$). */
  deduzir: number;
}

/**
 * Tabela IRRF 2025 (mensal) — método da parcela a deduzir.
 * Base = salário bruto - INSS - (dependentes * DEDUCAO_POR_DEPENDENTE).
 */
export const TABELA_IRRF_2025: FaixaIRRF[] = [
  { ate: 2428.8, aliquota: 0, deduzir: 0 },
  { ate: 2826.65, aliquota: 0.075, deduzir: 182.16 },
  { ate: 3751.05, aliquota: 0.15, deduzir: 394.16 },
  { ate: 4664.68, aliquota: 0.225, deduzir: 675.49 },
  { ate: Infinity, aliquota: 0.275, deduzir: 908.73 },
];

/** Dedução mensal por dependente no IRRF (2025). */
export const DEDUCAO_POR_DEPENDENTE_2025 = 189.59;
