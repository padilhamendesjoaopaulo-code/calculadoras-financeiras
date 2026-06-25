"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Field, NumberInput, Select } from "@/components/Field";
import ResultCard from "@/components/ResultCard";
import { formatarBRL } from "@/lib/format";
import {
  calcularJurosCompostos,
  taxaAnualParaMensal,
  type JurosResultado,
} from "@/lib/calculos";

export default function JurosCompostosCalculator() {
  const [inicial, setInicial] = useState("1000");
  const [aporte, setAporte] = useState("200");
  const [taxa, setTaxa] = useState("1");
  const [periodoTipo, setPeriodoTipo] = useState<"mensal" | "anual">("mensal");
  const [tempo, setTempo] = useState("10");
  const [tempoUnidade, setTempoUnidade] = useState<"meses" | "anos">("anos");

  function limpar() {
    setInicial("");
    setAporte("");
    setTaxa("");
    setPeriodoTipo("mensal");
    setTempo("");
    setTempoUnidade("anos");
  }

  const resultado: JurosResultado | null = useMemo(() => {
    const taxaDecimal = (Number(taxa) || 0) / 100;
    const taxaMensal =
      periodoTipo === "anual" ? taxaAnualParaMensal(taxaDecimal) : taxaDecimal;
    const meses =
      tempoUnidade === "anos"
        ? (Number(tempo) || 0) * 12
        : Number(tempo) || 0;
    if (meses <= 0) return null;
    return calcularJurosCompostos({
      valorInicial: Number(inicial) || 0,
      aporteMensal: Number(aporte) || 0,
      taxaMensal,
      meses,
    });
  }, [inicial, aporte, taxa, periodoTipo, tempo, tempoUnidade]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <Field label="Valor inicial (R$)">
            <NumberInput
              value={inicial}
              min={0}
              onChange={(e) => setInicial(e.target.value)}
            />
          </Field>
          <Field label="Aporte mensal (R$)">
            <NumberInput
              value={aporte}
              min={0}
              onChange={(e) => setAporte(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Taxa de juros (%)">
              <NumberInput
                value={taxa}
                min={0}
                step="0.01"
                onChange={(e) => setTaxa(e.target.value)}
              />
            </Field>
            <Field label="Período da taxa">
              <Select
                value={periodoTipo}
                onChange={(e) =>
                  setPeriodoTipo(e.target.value as "mensal" | "anual")
                }
              >
                <option value="mensal">ao mês</option>
                <option value="anual">ao ano</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tempo">
              <NumberInput
                value={tempo}
                min={1}
                onChange={(e) => setTempo(e.target.value)}
              />
            </Field>
            <Field label="Unidade">
              <Select
                value={tempoUnidade}
                onChange={(e) =>
                  setTempoUnidade(e.target.value as "meses" | "anos")
                }
              >
                <option value="anos">anos</option>
                <option value="meses">meses</option>
              </Select>
            </Field>
          </div>
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
              titulo="Resultado da simulação"
              linhas={[
                { rotulo: "Total investido", valor: resultado.totalInvestido },
                { rotulo: "Total em juros", valor: resultado.totalJuros },
                {
                  rotulo: "Montante final",
                  valor: resultado.montanteFinal,
                  destaque: true,
                },
              ]}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
              Informe um período válido para simular.
            </div>
          )}
        </div>
      </div>

      {resultado && resultado.evolucao.length > 1 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Evolução do patrimônio
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={resultado.evolucao}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gInvestido" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  tickFormatter={(m) => `${m}m`}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  width={70}
                  tickFormatter={(v) =>
                    `R$ ${Number(v).toLocaleString("pt-BR", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    })}`
                  }
                />
                <Tooltip
                  formatter={(v, nome) => [
                    formatarBRL(Number(v)),
                    nome === "total" ? "Montante" : "Investido",
                  ]}
                  labelFormatter={(m) => `Mês ${m}`}
                />
                <Area
                  type="monotone"
                  dataKey="investido"
                  stroke="#64748b"
                  fill="url(#gInvestido)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#059669"
                  fill="url(#gTotal)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            Verde: montante total · Cinza: total investido
          </p>
        </div>
      )}
    </div>
  );
}
