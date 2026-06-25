/** Formatadores reutilizáveis (moeda BRL, porcentagem, datas). */

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um número como moeda brasileira: 1234.5 -> "R$ 1.234,50". */
export function formatarBRL(valor: number): string {
  if (!Number.isFinite(valor)) return "—";
  return brl.format(valor);
}

/** Formata uma taxa decimal como porcentagem: 0.0125 -> "1,25%". */
export function formatarPorcentagem(taxa: number, casas = 2): string {
  if (!Number.isFinite(taxa)) return "—";
  return `${(taxa * 100).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  })}%`;
}

/** Converte "1.234,56" (digitado) em número 1234.56. */
export function parseNumeroBR(texto: string): number {
  if (!texto) return 0;
  const limpo = texto
    .replace(/\s/g, "")
    .replace(/R\$/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const n = Number(limpo);
  return Number.isFinite(n) ? n : 0;
}
