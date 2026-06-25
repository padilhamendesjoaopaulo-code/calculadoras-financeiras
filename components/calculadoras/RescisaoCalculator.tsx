"use client";

import { useMemo, useState } from "react";
import { Field, NumberInput, TextInput, Select } from "@/components/Field";
import ResultCard from "@/components/ResultCard";
import {
  calcularRescisao,
  type TipoRescisao,
  type RescisaoResultado,
} from "@/lib/calculos";

export default function RescisaoCalculator() {
  const [salario, setSalario] = useState("3000");
  const [admissao, setAdmissao] = useState("2023-02-01");
  const [demissao, setDemissao] = useState("2025-08-20");
  const [tipo, setTipo] = useState<TipoRescisao>("sem-justa-causa");
  const [saldoFgts, setSaldoFgts] = useState("");

  function limpar() {
    setSalario("");
    setAdmissao("");
    setDemissao("");
    setTipo("sem-justa-causa");
    setSaldoFgts("");
  }

  const resultado: RescisaoResultado | null = useMemo(() => {
    const s = Number(salario);
    if (!s || !admissao || !demissao) return null;
    if (new Date(demissao) < new Date(admissao)) return null;
    return calcularRescisao({
      salario: s,
      admissao,
      demissao,
      tipo,
      saldoFgts: saldoFgts ? Number(saldoFgts) : undefined,
    });
  }, [salario, admissao, demissao, tipo, saldoFgts]);

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
        <Field label="Data de admissão">
          <TextInput
            type="date"
            value={admissao}
            onChange={(e) => setAdmissao(e.target.value)}
          />
        </Field>
        <Field label="Data de demissão">
          <TextInput
            type="date"
            value={demissao}
            onChange={(e) => setDemissao(e.target.value)}
          />
        </Field>
        <Field label="Tipo de rescisão">
          <Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoRescisao)}
          >
            <option value="sem-justa-causa">Demissão sem justa causa</option>
            <option value="pedido">Pedido de demissão</option>
            <option value="justa-causa">Demissão por justa causa</option>
            <option value="acordo">Acordo (comum acordo)</option>
          </Select>
        </Field>
        <Field
          label="Saldo de FGTS (opcional)"
          hint="Se não informar, estimamos 8% do salário por mês trabalhado."
        >
          <NumberInput
            value={saldoFgts}
            min={0}
            placeholder="Ex.: 5000"
            onChange={(e) => setSaldoFgts(e.target.value)}
          />
        </Field>
        <button
          type="button"
          onClick={limpar}
          className="text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          Limpar campos
        </button>
      </div>

      <div>
        {resultado ? (
          <ResultCard
            titulo="Verbas rescisórias (estimativa)"
            linhas={[
              { rotulo: "Saldo de salário", valor: resultado.saldoSalario },
              { rotulo: "Aviso prévio indenizado", valor: resultado.avisoPrevio },
              {
                rotulo: "Férias proporcionais",
                valor: resultado.feriasProporcionais,
              },
              { rotulo: "1/3 sobre férias", valor: resultado.umTercoFerias },
              {
                rotulo: "13º proporcional",
                valor: resultado.decimoProporcional,
              },
              { rotulo: "Multa do FGTS", valor: resultado.multaFgts },
              { rotulo: "Total estimado", valor: resultado.total, destaque: true },
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
