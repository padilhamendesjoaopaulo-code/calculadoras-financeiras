# Calculadoras Brasil

Site de calculadoras financeiras e trabalhistas em português (Brasil), focado em
SEO e preparado para monetização futura via Google AdSense. Projeto estático e
leve, construído com **Next.js (App Router)**, **React**, **TypeScript** e
**Tailwind CSS**. Todos os cálculos rodam no navegador (client-side) — sem
backend e sem banco de dados.

## Calculadoras incluídas

- **Rescisão Trabalhista (CLT)** — `/rescisao`
- **Férias** — `/ferias`
- **13º Salário** — `/13-salario`
- **Juros Compostos** (com gráfico) — `/juros-compostos`
- **Financiamento (Tabela Price)** (com tabela de amortização) — `/financiamento`

Páginas institucionais: `/sobre` e `/politica-de-privacidade`. SEO via
`metadata` por página, `sitemap.xml` e `robots.txt` gerados automaticamente.

## Rodando localmente

Pré-requisitos: **Node.js 18.18+** (recomendado 20+) e npm.

```bash
npm install      # instala as dependências
npm run dev      # inicia o servidor de desenvolvimento
```

Abra <http://localhost:3000> no navegador. As alterações são recarregadas
automaticamente.

Outros comandos:

```bash
npm run build    # gera o build de produção
npm run start    # serve o build de produção localmente
npm run lint     # checa o código com o ESLint
```

## Estrutura

```
app/                  # rotas (App Router), layout, sitemap e robots
components/           # Header, Footer, AdSlot, layout e calculadoras
lib/
  calculos.ts         # funções de cálculo puras (lógica central)
  tabelas-fiscais.ts  # tabelas de INSS e IRRF (atualize aqui a cada ano)
  format.ts           # formatadores de moeda/porcentagem
  site.ts             # nome do site, BASE_URL e lista de calculadoras
```

## Configuração antes do deploy

1. Em `lib/site.ts`, ajuste a constante `BASE_URL` para a URL pública do site
   (ex.: o subdomínio gerado pela Vercel). Ela é usada no `sitemap.xml`, no
   `robots.txt` e nos metadados.
2. As tabelas de **INSS** e **IRRF** ficam em `lib/tabelas-fiscais.ts`.
   Atualize-as quando o governo publicar novas faixas.

## Espaços para anúncios (Google AdSense)

O código já contém espaços reservados marcados com o comentário
`{/* AD SLOT - substituir pelo código do Google AdSense */}` no componente
`components/AdSlot.tsx`, posicionados no topo das páginas, entre o formulário e o
texto explicativo, e no rodapé. Quando você tiver uma conta aprovada no AdSense,
basta substituir o conteúdo desse componente pelo script de anúncio.

## Deploy na Vercel

A forma mais simples é conectar o repositório do GitHub à Vercel:

1. Suba este projeto para um repositório no GitHub (veja os comandos abaixo).
2. Acesse <https://vercel.com>, faça login (pode usar a conta do GitHub).
3. Clique em **Add New… → Project** e **importe** o repositório.
4. A Vercel detecta o Next.js automaticamente — mantenha as configurações
   padrão e clique em **Deploy**.
5. Ao final, você recebe uma URL pública (ex.:
   `https://calculadoras-financeiras.vercel.app`). Copie-a e atualize a
   constante `BASE_URL` em `lib/site.ts`, depois faça commit/push — a Vercel
   refaz o deploy automaticamente a cada push na branch principal.

> Dica: o deploy automático já fica ativo após a importação. Cada `git push`
> para a branch `main` publica uma nova versão.
