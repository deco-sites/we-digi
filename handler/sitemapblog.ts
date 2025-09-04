import { BlogPost } from "apps/blog/types.ts";

type UrlEntry = {
  loc: string;
  lastmod?: string;     // YYYY-MM-DD
  changefreq?: string;  // opcional
  priority?: number;    // opcional (0.0 - 1.0)
};

interface Props {
  /** Lista de posts do blog */
  posts?: BlogPost[];
}

const today = () => new Date().toISOString().substring(0, 10);
const sanitizePath = (url: string) => (url.startsWith("/") ? url : `/${url}`);

/** Normaliza date do post para YYYY-MM-DD se existir, senão "hoje" */
const toLastMod = (date?: string) =>
  date ? new Date(date).toISOString().substring(0, 10) : today();

/** Converte entries para XML <urlset> */
const toXml = (entries: UrlEntry[]) => {
  const lines: string[] = [];
  for (const e of entries) {
    lines.push(
      [
        "  <url>",
        `    <loc>${e.loc}</loc>`,
        `    <lastmod>${e.lastmod ?? today()}</lastmod>`,
        `    <changefreq>${e.changefreq ?? "weekly"}</changefreq>`,
        e.priority != null ? `    <priority>${e.priority.toFixed(1)}</priority>` : undefined,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join(
    "\n",
  )}\n</urlset>`;
};

export default function BlogSitemap({ posts = [] }: Props) {
  return function (req: Request) {
    const { origin } = new URL(req.url);

    // Apenas posts com slug válido
    const validPosts = posts.filter((p) => (p as any)?.slug);

    const entries: UrlEntry[] = validPosts.map((post) => {
      const slug = (post as unknown as { slug: string }).slug;
      const path = `/insights/post/${slug}`;
      return {
        loc: `${origin}${sanitizePath(path)}`,
        lastmod: toLastMod((post as any)?.date),
        changefreq: "weekly",
      };
    });

    const xml = toXml(entries);

    return new Response(xml, {
      status: 200,
      headers: { "content-type": "text/xml; charset=utf-8" },
    });
  };
}
