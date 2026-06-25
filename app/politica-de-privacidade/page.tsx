import type { Metadata } from "next";
import { SITE_NOME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade do Calculadoras Brasil: como tratamos dados, uso de cookies e anúncios de terceiros (Google AdSense).",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function Page() {
  return (
    <article className="prose-custom mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-sm text-slate-400">
        Última atualização: junho de 2025.
      </p>

      <h2>1. Informações que coletamos</h2>
      <p>
        O {SITE_NOME} foi projetado para respeitar a sua privacidade. Todas as
        calculadoras funcionam inteiramente no seu navegador (client-side): os
        valores que você digita <strong>não são enviados nem armazenados</strong>{" "}
        em nossos servidores. Não exigimos cadastro nem coletamos dados pessoais
        identificáveis para o uso das calculadoras.
      </p>

      <h2>2. Cookies e tecnologias semelhantes</h2>
      <p>
        Atualmente o site não utiliza cookies de identificação. No futuro,
        poderemos utilizar cookies para fins de medição de audiência e exibição
        de anúncios, conforme descrito abaixo.
      </p>

      <h2>3. Anúncios de terceiros (Google AdSense)</h2>
      <p>
        Este site poderá, futuramente, exibir anúncios fornecidos por empresas
        de publicidade terceirizadas, como o <strong>Google AdSense</strong>.
        Essas empresas podem utilizar cookies e tecnologias semelhantes para
        veicular anúncios com base nas suas visitas a este e a outros sites na
        internet.
      </p>
      <p>
        O Google, como fornecedor terceirizado, utiliza cookies (incluindo o
        cookie DART) para exibir anúncios. Você pode desativar a publicidade
        personalizada visitando as{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Configurações de anúncios do Google
        </a>{" "}
        e saber mais na{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidade do Google
        </a>
        . Também é possível gerenciar cookies diretamente nas configurações do
        seu navegador.
      </p>

      <h2>4. Links para outros sites</h2>
      <p>
        Nossas páginas podem conter links para sites externos. Não nos
        responsabilizamos pelas práticas de privacidade desses sites e
        recomendamos a leitura das respectivas políticas.
      </p>

      <h2>5. Alterações nesta política</h2>
      <p>
        Esta política poderá ser atualizada a qualquer momento, especialmente
        quando a monetização por anúncios for ativada. Recomendamos revisá-la
        periodicamente.
      </p>

      <h2>6. Contato</h2>
      <p>
        Em caso de dúvidas sobre esta Política de Privacidade, entre em contato
        através da nossa página de <a href="/contato">Contato</a>.
      </p>
    </article>
  );
}
