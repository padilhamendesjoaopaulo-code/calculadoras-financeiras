"use client";

import { useMemo, useState } from "react";
import { Field, NumberInput } from "@/components/Field";
import ResultCard from "@/components/ResultCard";
import { calcularFerias, type FeriasResultado } from "@/lib/calculos";

export default function FeriasCalculator() {
  const [salario, setSalario] = useState("3000");
  const [dias, setDias] = useState("30");
  const [venderUmTerco, setVenderUmTerco] = useState(false);
  const [dependentes, setDependentes] = useState("0");

  const resultado: FeriasResultado | null = useMemo(() => {
    const s = Number(salario);
    if (!s) return null;
    return calcularFerias({
      salario: s,
      diasFerias: Number(dias) || 0,
      venderUmTerco,
      dependentes: Number(dependentes) || 0,
    });
  }, [salario, dias, venderUmTerco, dependentes]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Field label="Salário bruto mensal (R$)">
          <NumberInput
            value={salario}
            min={0}
            onChange={(e) => setSalario(e.target.value)}
          />
        </Field>
        <Field label="Dias de férias" hint="De 1 a 30 dias.">
          <NumberInput
            value={dias}
            min={1}
            max={30}
            onChange={(e) => setDias(e.target.value)}
          />
        </Field>
        <Field label="Número de dependentes (IRRF)">
          <NumberInput
            value={dependentes}
            min={0}
            onChange={(e) => setDependentes(e.target.value)}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            checked={venderUmTerco}
            onChange={(e) => setVenderUmTerco(e.target.checked)}
          />
          Vender 1/3 das férias (abono pecuniário)
        </label>
      </div>

      <div>
        {resultado ? (
          <ResultCard
            titulo="Valor das férias (estimativa)"
            linhas={[
              { rotulo: "Férias", valor: resultado.valorFerias },
              {
                rotulo: "1/3 constitucional",
                valor: resultado.umTercoConstitucional,
              },
              ...(resultado.abonoPecuniario > 0
                ? [
                    {
                      rotulo: "Abono pecuniário (venda 1/3)",
                      valor: resultado.abonoPecuniario,
                    },
                    { rotulo: "1/3 sobre o abono", valor: resultado.umTercoAbono },
                  ]
                : []),
              { rotulo: "INSS", valor: resultado.inss, desconto: true },
              { rotulo: "IRRF", valor: resultado.irrf, desconto: true },
              {
                rotulo: "Total líquido a receber",
                valor: resultado.totalLiquido,
                destaque: true,
              },
            ]}
          />
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
            Preencha os campos para ver o resultado.
          </div>
        )}
      </div>
    </div>
  );
}
