import type { MetadataRoute } from "next";
import { BASE_URL, CALCULADORAS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const estaticas = ["", "/sobre", "/politica-de-privacidade"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: agora,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.5,
  }));

  const calculadoras = CALCULADORAS.map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    lastModified: agora,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...estaticas, ...calculadoras];
}
