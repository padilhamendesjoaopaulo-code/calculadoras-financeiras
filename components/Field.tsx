import { ReactNode } from "react";

/** Wrapper de campo de formulário com rótulo e dica opcional. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

const baseInput =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

/** Input numérico estilizado. */
export function NumberInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input type="number" inputMode="decimal" className={baseInput} {...props} />;
}

/** Input de texto/data estilizado. */
export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={baseInput} {...props} />;
}

/** Select estilizado. */
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={baseInput} {...props} />;
}
