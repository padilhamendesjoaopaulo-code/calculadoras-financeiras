/**
 * Funções de cálculo puras (sem React) — fonte única da lógica do site.
 * Todos os valores trabalhistas/fiscais são ESTIMATIVAS para fins
 * informativos. Casos reais podem ter particularidades (ex.: adicionais,
 * pensão, faltas) que não são tratadas aqui.
 */

import {
  TABELA_INSS_2025,
  TABELA_IRRF_2025,
  DEDUCAO_POR_DEPENDENTE_2025,
} from "./tabelas-fiscais";

/* ------------------------------------------------------------------ */
/* Descontos: INSS e IRRF                                              */
/* ------------------------------------------------------------------ */

/** Calcula o INSS (contribuição progressiva por faixas) sobre uma base. */
export function calcularINSS(base: number): number {
  if (base <= 0) return 0;
  let inss = 0;
  let limiteAnterior = 0;
  for (const faixa of TABELA_INSS_2025) {
    if (base > faixa.ate) {
      inss += (faixa.ate - limiteAnterior) * faixa.aliquota;
      limiteAnterior = faixa.ate;
    } else {
      inss += (base - limiteAnterior) * faixa.aliquota;
      return arred(inss);
    }
  }
  // base acima do teto: usa o último limite como base máxima
  return arred(inss);
}

/** Calcula o IRRF sobre uma base já líquida de INSS, considerando dependentes. */
export function calcularIRRF(baseAposINSS: number, dependentes = 0): number {
  const base = baseAposINSS - dependentes * DEDUCAO_POR_DEPENDENTE_2025;
  if (base <= 0) return 0;
  for (const faixa of TABELA_IRRF_2025) {
    if (base <= faixa.ate) {
      const imposto = base * faixa.aliquota - faixa.deduzir;
      return arred(Math.max(0, imposto));
    }
  }
  return 0;
}

/* ------------------------------------------------------------------ */
/* Rescisão trabalhista (CLT)                                         */
/* ------------------------------------------------------------------ */

export type TipoRescisao =
  | "sem-justa-causa"
  | "pedido"
  | "justa-causa"
  | "acordo";

export interface RescisaoInput {
  salario: number;
  admissao: string; // YYYY-MM-DD
  demissao: string; // YYYY-MM-DD
  tipo: TipoRescisao;
  /** Saldo de FGTS depositado (opcional) — base da multa rescisória. */
  saldoFgts?: number;
}

export interface RescisaoResultado {
  saldoSalario: number;
  avisoPrevio: number;
  feriasProporcionais: number;
  umTercoFerias: number;
  decimoProporcional: number;
  multaFgts: number;
  total: number;
  diasTrabalhadosNoMes: number;
  avos13: number;
  avosFerias: number;
}

/** Calcula a rescisão de forma simplificada conforme o tipo. */
export function calcularRescisao(input: RescisaoInput): RescisaoResultado {
  const { salario, tipo } = input;
  const admissao = new Date(input.admissao + "T00:00:00");
  const demissao = new Date(input.demissao + "T00:00:00");

  const salarioDia = salario / 30;

  // Saldo de salário: dias trabalhados no mês da demissão (limitado a 30).
  const diasTrabalhadosNoMes = Math.min(demissao.getDate(), 30);
  const saldoSalario = arred(salarioDia * diasTrabalhadosNoMes);

  // Avos proporcionais (fração com 15+ dias conta como mês inteiro):
  // - 13º: meses trabalhados no ANO CIVIL da rescisão (a partir de 1º/jan);
  // - férias: meses desde o último aniversário do contrato (período aquisitivo).
  const inicioAno = new Date(demissao.getFullYear(), 0, 1);
  const inicio13 = inicioAno > admissao ? inicioAno : admissao;
  const avos13 = contarAvos(inicio13, demissao);
  const avosFerias = contarAvos(ultimoAniversario(admissao, demissao), demissao);

  // Aviso prévio indenizado: devido quando o empregador encerra o vínculo.
  // sem-justa-causa -> 1 salário; acordo -> metade; pedido/justa-causa -> 0.
  let avisoPrevio = 0;
  if (tipo === "sem-justa-causa") avisoPrevio = salario;
  else if (tipo === "acordo") avisoPrevio = arred(salario / 2);

  // Férias proporcionais + 1/3 (devidas em todos os casos, exceto justa causa).
  let feriasProporcionais = 0;
  if (tipo !== "justa-causa") {
    feriasProporcionais = arred((salario / 12) * avosFerias);
  }
  const umTercoFerias = arred(feriasProporcionais / 3);

  // 13º proporcional (devido, exceto justa causa).
  const decimoProporcional =
    tipo === "justa-causa" ? 0 : arred((salario / 12) * avos13);

  // Multa do FGTS sobre o saldo depositado:
  // 40% (sem justa causa), 20% (acordo), 0% (pedido / justa causa).
  // Se o saldo de FGTS não for informado, estima-se 8% por mês trabalhado.
  const mesesTotais = mesesEntre(admissao, demissao);
  const saldoFgts =
    input.saldoFgts && input.saldoFgts > 0
      ? input.saldoFgts
      : arred(salario * 0.08 * mesesTotais);

  let percentualMulta = 0;
  if (tipo === "sem-justa-causa") percentualMulta = 0.4;
  else if (tipo === "acordo") percentualMulta = 0.2;
  const multaFgts = arred(saldoFgts * percentualMulta);

  const total = arred(
    saldoSalario +
      avisoPrevio +
      feriasProporcionais +
      umTercoFerias +
      decimoProporcional +
      multaFgts,
  );

  return {
    saldoSalario,
    avisoPrevio,
    feriasProporcionais,
    umTercoFerias,
    decimoProporcional,
    multaFgts,
    total,
    diasTrabalhadosNoMes,
    avos13,
    avosFerias,
  };
}

/* ------------------------------------------------------------------ */
/* Férias                                                             */
/* ------------------------------------------------------------------ */

export interface FeriasInput {
  salario: number;
  diasFerias: number; // 1..30
  /** Vender 1/3 das férias (abono pecuniário). */
  venderUmTerco: boolean;
  dependentes?: number;
}

export interface FeriasResultado {
  valorFerias: number;
  umTercoConstitucional: number;
  abonoPecuniario: number;
  umTercoAbono: number;
  inss: number;
  irrf: number;
  totalBruto: number;
  totalLiquido: number;
}

/** Calcula férias + 1/3, abono pecuniário e descontos. */
export function calcularFerias(input: FeriasInput): FeriasResultado {
  const { salario, venderUmTerco, dependentes = 0 } = input;
  const salarioDia = salario / 30;

  // O período de férias é de 30 dias. Ao vender 1/3 (abono pecuniário), o
  // trabalhador converte 10 dias em dinheiro e descansa no máximo 20 dias —
  // por isso os dias gozados são limitados a (30 - dias vendidos).
  const diasAbono = venderUmTerco ? 10 : 0;
  const diasGozo = clamp(input.diasFerias, 0, 30 - diasAbono);

  const valorFerias = arred(salarioDia * diasGozo);
  const umTercoConstitucional = arred(valorFerias / 3);

  // Abono pecuniário (10 dias) + 1/3 sobre o abono. Isento de INSS/IRRF.
  const abonoPecuniario = arred(salarioDia * diasAbono);
  const umTercoAbono = arred(abonoPecuniario / 3);

  // O abono pecuniário é isento de INSS/IRRF; os descontos incidem
  // apenas sobre as férias gozadas + 1/3.
  const baseDescontos = valorFerias + umTercoConstitucional;
  const inss = calcularINSS(baseDescontos);
  const irrf = calcularIRRF(baseDescontos - inss, dependentes);

  const totalBruto = arred(
    valorFerias + umTercoConstitucional + abonoPecuniario + umTercoAbono,
  );
  const totalLiquido = arred(totalBruto - inss - irrf);

  return {
    valorFerias,
    umTercoConstitucional,
    abonoPecuniario,
    umTercoAbono,
    inss,
    irrf,
    totalBruto,
    totalLiquido,
  };
}

/* ------------------------------------------------------------------ */
/* 13º salário                                                        */
/* ------------------------------------------------------------------ */

export interface DecimoInput {
  salario: number;
  mesesTrabalhados: number; // 1..12
  dependentes?: number;
}

export interface DecimoResultado {
  valorBruto: number;
  primeiraParcela: number;
  segundaParcelaBruta: number;
  inss: number;
  irrf: number;
  segundaParcelaLiquida: number;
  totalLiquido: number;
}

/** Calcula o 13º salário proporcional, com 1ª e 2ª parcelas. */
export function calcularDecimoTerceiro(input: DecimoInput): DecimoResultado {
  const { salario, dependentes = 0 } = input;
  const meses = clamp(input.mesesTrabalhados, 0, 12);

  const valorBruto = arred((salario / 12) * meses);

  // 1ª parcela: metade do 13º, paga sem descontos.
  const primeiraParcela = arred(valorBruto / 2);

  // INSS e IRRF incidem sobre o valor TOTAL do 13º (recolhidos na 2ª parcela).
  const inss = calcularINSS(valorBruto);
  const irrf = calcularIRRF(valorBruto - inss, dependentes);

  const segundaParcelaBruta = arred(valorBruto - primeiraParcela);
  const segundaParcelaLiquida = arred(segundaParcelaBruta - inss - irrf);
  const totalLiquido = arred(primeiraParcela + segundaParcelaLiquida);

  return {
    valorBruto,
    primeiraParcela,
    segundaParcelaBruta,
    inss,
    irrf,
    segundaParcelaLiquida,
    totalLiquido,
  };
}

/* ------------------------------------------------------------------ */
/* Juros compostos                                                    */
/* ------------------------------------------------------------------ */

export interface JurosInput {
  valorInicial: number;
  aporteMensal: number;
  /** Taxa de juros já em forma decimal e mensal (ex.: 0.01 = 1% a.m.). */
  taxaMensal: number;
  /** Período total em meses. */
  meses: number;
}

export interface PontoEvolucao {
  mes: number;
  investido: number;
  juros: number;
  total: number;
}

export interface JurosResultado {
  montanteFinal: number;
  totalInvestido: number;
  totalJuros: number;
  evolucao: PontoEvolucao[];
}

/** Calcula juros compostos com aportes mensais e série de evolução. */
export function calcularJurosCompostos(input: JurosInput): JurosResultado {
  const { valorInicial, aporteMensal, taxaMensal } = input;
  const meses = Math.max(0, Math.floor(input.meses));

  let saldo = valorInicial;
  let investido = valorInicial;
  const evolucao: PontoEvolucao[] = [
    {
      mes: 0,
      investido: arred(investido),
      juros: 0,
      total: arred(saldo),
    },
  ];

  for (let m = 1; m <= meses; m++) {
    saldo = saldo * (1 + taxaMensal) + aporteMensal;
    investido += aporteMensal;
    evolucao.push({
      mes: m,
      investido: arred(investido),
      juros: arred(saldo - investido),
      total: arred(saldo),
    });
  }

  const montanteFinal = arred(saldo);
  const totalInvestido = arred(investido);
  const totalJuros = arred(montanteFinal - totalInvestido);

  return { montanteFinal, totalInvestido, totalJuros, evolucao };
}

/** Converte uma taxa anual em mensal equivalente (juros compostos). */
export function taxaAnualParaMensal(taxaAnual: number): number {
  return Math.pow(1 + taxaAnual, 1 / 12) - 1;
}

/* ------------------------------------------------------------------ */
/* Financiamento — Tabela Price                                       */
/* ------------------------------------------------------------------ */

export interface FinanciamentoInput {
  valorFinanciado: number;
  /** Taxa de juros mensal em decimal (ex.: 0.015 = 1,5% a.m.). */
  taxaMensal: number;
  parcelas: number;
}

export interface LinhaAmortizacao {
  numero: number;
  prestacao: number;
  juros: number;
  amortizacao: number;
  saldo: number;
}

export interface FinanciamentoResultado {
  valorParcela: number;
  totalPago: number;
  totalJuros: number;
  tabela: LinhaAmortizacao[];
}

/** Calcula financiamento pela Tabela Price (parcelas fixas). */
export function calcularFinanciamentoPrice(
  input: FinanciamentoInput,
): FinanciamentoResultado {
  const { valorFinanciado, taxaMensal } = input;
  const n = Math.max(1, Math.floor(input.parcelas));

  // Parcela fixa (PMT). Se taxa = 0, é apenas a divisão.
  const parcela =
    taxaMensal === 0
      ? valorFinanciado / n
      : (valorFinanciado * taxaMensal) /
        (1 - Math.pow(1 + taxaMensal, -n));

  const valorParcela = arred(parcela);

  let saldo = valorFinanciado;
  const tabela: LinhaAmortizacao[] = [];
  for (let i = 1; i <= n; i++) {
    const juros = arred(saldo * taxaMensal);
    let amortizacao = arred(parcela - juros);
    // Ajusta a última parcela para zerar o saldo (evita resíduo de arredondamento).
    if (i === n) amortizacao = arred(saldo);
    saldo = arred(saldo - amortizacao);
    tabela.push({
      numero: i,
      prestacao: arred(amortizacao + juros),
      juros,
      amortizacao,
      saldo: Math.max(0, saldo),
    });
  }

  const totalPago = arred(tabela.reduce((s, l) => s + l.prestacao, 0));
  const totalJuros = arred(totalPago - valorFinanciado);

  return { valorParcela, totalPago, totalJuros, tabela };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Arredonda para 2 casas decimais. */
function arred(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Meses cheios entre duas datas (aproximado). */
function mesesEntre(inicio: Date, fim: Date): number {
  const anos = fim.getFullYear() - inicio.getFullYear();
  const meses = fim.getMonth() - inicio.getMonth();
  return Math.max(0, anos * 12 + meses);
}

/** Último aniversário do contrato anterior (ou igual) à data de demissão. */
function ultimoAniversario(admissao: Date, demissao: Date): Date {
  const aniv = new Date(
    demissao.getFullYear(),
    admissao.getMonth(),
    admissao.getDate(),
  );
  if (aniv > demissao) aniv.setFullYear(aniv.getFullYear() - 1);
  return aniv < admissao ? admissao : aniv;
}

/**
 * Conta os "avos" (meses para fins de proporcionalidade) entre duas datas:
 * cada mês cheio conta 1; uma fração final com 15+ dias também conta 1.
 * O resultado é limitado a 12.
 */
function contarAvos(inicio: Date, fim: Date): number {
  if (fim <= inicio) return 0;
  let meses = 0;
  const cursor = new Date(inicio);
  while (meses < 12) {
    const proximo = new Date(cursor);
    proximo.setMonth(proximo.getMonth() + 1);
    if (proximo <= fim) {
      meses += 1;
      cursor.setTime(proximo.getTime());
    } else {
      const dias = Math.floor((fim.getTime() - cursor.getTime()) / 86_400_000);
      if (dias >= 15) meses += 1;
      break;
    }
  }
  return Math.min(meses, 12);
}
