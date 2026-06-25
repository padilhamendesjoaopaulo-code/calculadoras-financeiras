import { ReactNode } from "react";
import AdSlot from "./AdSlot";

/**
 * Layout padrão de uma página de calculadora:
 * título + introdução, AD SLOT no topo, a calculadora (form + resultado),
 * AD SLOT entre a calculadora e o texto, e o texto explicativo (SEO).
 */
export default function CalculatorLayout({
  titulo,
  introducao,
  calculadora,
  explicacao,
}: {
  titulo: string;
  introducao: string;
  calculadora: ReactNode;
  explicacao: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {titulo}
        </h1>
        <p className="mt-2 text-slate-600">{introducao}</p>
      </header>

      {/* AD SLOT - topo da página */}
      <AdSlot rotulo="Publicidade" />

      <section aria-label="Calculadora">{calculadora}</section>

      {/* AD SLOT - entre o formulário e o texto explicativo */}
      <AdSlot rotulo="Publicidade" />

      <section className="prose-custom mt-2">{explicacao}</section>
    </article>
  );
}
