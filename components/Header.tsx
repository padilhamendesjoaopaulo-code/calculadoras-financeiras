import Link from "next/link";
import { SITE_NOME, CALCULADORAS } from "@/lib/site";

/** Cabeçalho com nome do site, navegação e um espaço de anúncio no topo. */
export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🧮
          </span>
          <span className="text-lg font-bold text-slate-800">{SITE_NOME}</span>
        </Link>
        <nav className="hidden gap-5 text-sm font-medium text-slate-600 md:flex">
          {CALCULADORAS.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="transition-colors hover:text-emerald-700"
            >
              {c.titulo.split(" ")[0]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
