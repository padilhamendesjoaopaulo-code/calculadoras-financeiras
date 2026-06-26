import { BASE_URL, CALCULADORAS } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = [
    { loc: BASE_URL, priority: "1.0" },
    { loc: `${BASE_URL}/sobre`, priority: "0.5" },
    { loc: `${BASE_URL}/contato`, priority: "0.5" },
    { loc: `${BASE_URL}/politica-de-privacidade`, priority: "0.5" },
    { loc: `${BASE_URL}/termos`, priority: "0.5" },
    ...CALCULADORAS.map((c) => ({ loc: `${BASE_URL}/${c.slug}`, priority: "0.8" })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
