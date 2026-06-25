/**
 * Insere dados estruturados (JSON-LD) na página. Ajuda o Google a entender o
 * conteúdo e pode gerar resultados ricos (ex.: perguntas frequentes na busca).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é gerado no servidor a partir de dados próprios (não há
      // entrada de usuário), então a serialização é segura.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
