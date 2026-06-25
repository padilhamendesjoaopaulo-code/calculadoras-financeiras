"use client";

import { useMemo, useState } from "react";
import { Field, NumberInput } from "@/components/Field";
import ResultCard from "@/components/ResultCard";
import { formatarBRL } from "@/lib/format";
import {
  calcularFinanciamentoPrice,
  type FinanciamentoResultado,
} from "@/lib/calculos";

export default function FinanciamentoCalculator() {
  const [valor, setValor] = useState("100000");
  const [taxa, setTaxa] = useState("1.2");
  const [parcelas, setParcelas] = useState("120");

  const resultado: FinanciamentoResultado | null = useMemo(() => {
    const v = Number(valor);
    const n = Number(parcelas);
    if (!v || !n) return null;
    return calcularFinanciamentoPrice({
      valorFinanciado: v,
      taxaMensal: (Number(taxa) || 0) / 100,
      parcelas: n,
    });
  }, [valor, taxa, parcelas]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <Field label="Valor financiado (R$)">
            <NumberInput
              value={valor}
              min={0}
              onChange={(e) => setValor(e.target.value)}
            />
          </Field>
          <Field label="Taxa de juros mensal (%)">
            <NumberInput
              value={taxa}
              min={0}
              step="0.01"
              onChange={(e) => setTaxa(e.target.value)}
            />
          </Field>
          <Field label="Número de parcelas">
            <NumberInput
              value={parcelas}
              min={1}
              onChange={(e) => setParcelas(e.target.value)}
            />
          </Field>
        </div>

        <div>
          {resultado ? (
            <ResultCard
              titulo="Resumo do financiamento"
              linhas={[
                {
                  rotulo: "Parcela fixa mensal",
                  valor: resultado.valorParcela,
                  destaque: true,
                },
                { rotulo: "Total pago", valor: resultado.totalPago },
                { rotulo: "Total de juros", valor: resultado.totalJuros },
              ]}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
              Preencha os campos para ver o resultado.
            </div>
          )}
        </div>
      </div>

      {resultado && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Tabela de amortização
          </h3>
          <div className="max-h-96 overflow-auto rounded-lg border border-slate-100">
            <table className="w-full min-w-[520px] border-collapse text-right text-sm">
              <thead className="sticky top-0 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2 text-left">Parcela</th>
                  <th className="px-3 py-2">Prestação</th>
                  <th className="px-3 py-2">Juros</th>
                  <th className="px-3 py-2">Amortização</th>
                  <th className="px-3 py-2">Saldo devedor</th>
                </tr>
              </thead>
              <tbody>
                {resultado.tabela.map((l) => (
                  <tr
                    key={l.numero}
                    className="border-t border-slate-100 text-slate-600 odd:bg-white even:bg-slate-50/50"
                  >
                    <td className="px-3 py-2 text-left font-medium text-slate-700">
                      {l.numero}
                    </td>
                    <td className="px-3 py-2">{formatarBRL(l.prestacao)}</td>
                    <td className="px-3 py-2 text-red-600">
                      {formatarBRL(l.juros)}
                    </td>
                    <td className="px-3 py-2">{formatarBRL(l.amortizacao)}</td>
                    <td className="px-3 py-2">{formatarBRL(l.saldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
