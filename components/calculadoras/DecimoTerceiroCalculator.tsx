"use client";

import { useMemo, useState } from "react";
import { Field, NumberInput } from "@/components/Field";
import ResultCard from "@/components/ResultCard";
import {
  calcularDecimoTerceiro,
  type DecimoResultado,
} from "@/lib/calculos";

export default function DecimoTerceiroCalculator() {
  const [salario, setSalario] = useState("3000");
  const [meses, setMeses] = useState("12");
  const [dependentes, setDependentes] = useState("0");

  const resultado: DecimoResultado | null = useMemo(() => {
    const s = Number(salario);
    if (!s) return null;
    return calcularDecimoTerceiro({
      salario: s,
      mesesTrabalhados: Number(meses) || 0,
      dependentes: Number(dependentes) || 0,
    });
  }, [salario, meses, dependentes]);

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
        <Field
          label="Meses trabalhados no ano"
          hint="Cada mês com 15+ dias trabalhados conta como 1/12."
        >
          <NumberInput
            value={meses}
            min={1}
            max={12}
            onChange={(e) => setMeses(e.target.value)}
          />
        </Field>
        <Field label="Número de dependentes (IRRF)">
          <NumberInput
            value={dependentes}
            min={0}
            onChange={(e) => setDependentes(e.target.value)}
          />
        </Field>
      </div>

      <div>
        {resultado ? (
          <ResultCard
            titulo="13º salário (estimativa)"
            linhas={[
              { rotulo: "13º bruto proporcional", valor: resultado.valorBruto },
              {
                rotulo: "1ª parcela (até 30/11)",
                valor: resultado.primeiraParcela,
              },
              {
                rotulo: "2ª parcela bruta (até 20/12)",
                valor: resultado.segundaParcelaBruta,
              },
              { rotulo: "INSS", valor: resultado.inss, desconto: true },
              { rotulo: "IRRF", valor: resultado.irrf, desconto: true },
              {
                rotulo: "2ª parcela líquida",
                valor: resultado.segundaParcelaLiquida,
              },
              {
                rotulo: "Total líquido (1ª + 2ª)",
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
