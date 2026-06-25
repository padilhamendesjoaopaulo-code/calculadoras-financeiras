"use client";

import { useState } from "react";

/** Botão que copia um texto para a área de transferência, com feedback. */
export default function CopyButton({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Área de transferência indisponível — silenciosamente ignora.
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="text-xs font-medium text-emerald-700 underline-offset-2 hover:underline"
    >
      {copiado ? "✓ Copiado!" : "Copiar resultado"}
    </button>
  );
}
