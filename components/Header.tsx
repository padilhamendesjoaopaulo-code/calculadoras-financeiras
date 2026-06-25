import Link from "next/link";
import { SITE_NOME, CALCULADORAS } from "@/lib/site";

/** Cabeçalho com nome do site, navegação e um espaço de anúncio no topo. */
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🧮
          </span>
          <span className="text-base font-bold text-slate-800 sm:text-lg">
            {SITE_NOME}
          </span>
        </Link>
        {/* Navegação em telas médias e grandes */}
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
      {/* Navegação rolável horizontalmente no celular */}
      <nav className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {CALCULADORAS.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 active:bg-emerald-100 active:text-emerald-700"
          >
            {c.titulo.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
