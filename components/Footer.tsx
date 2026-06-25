import Link from "next/link";
import { SITE_NOME, CALCULADORAS } from "@/lib/site";
import AdSlot from "./AdSlot";

/** Rodapé global com links institucionais, lista de calculadoras e AD SLOT. */
export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* AD SLOT - rodapé */}
        <AdSlot rotulo="Publicidade" />

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              {SITE_NOME}
            </h3>
            <p className="text-sm text-slate-500">
              Calculadoras financeiras e trabalhistas gratuitas, em português.
              Resultados meramente informativos.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Calculadoras
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {CALCULADORAS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="hover:text-emerald-700 hover:underline"
                  >
                    {c.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/sobre" className="hover:text-emerald-700 hover:underline">
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="hover:text-emerald-700 hover:underline"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {ano} {SITE_NOME}. Todos os cálculos são estimativas para fins
          informativos e não substituem orientação profissional.
        </p>
      </div>
    </footer>
  );
}
