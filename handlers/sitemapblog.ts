import { BlogPost } from "apps/blog/types.ts";

type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

interface Props {
  posts?: BlogPost[] | null;
}

const today = () => new Date().toISOString().substring(0, 10);
const sanitizePath = (url: string) => (url.startsWith("/") ? url : `/${url}`);
const toLastMod = (date?: string) =>
  date ? new Date(date).toISOString().substring(0, 10) : today();

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
    if(!posts || posts.length === 0) return null;

    const { origin } = new URL(req.url);

    const validPosts = posts.filter((p) => p?.slug);
    const entries: UrlEntry[] = validPosts?.map((post) => {
      const slug = post.slug;
      const path = `/insights/post/${slug}`;
      return {
        loc: `${origin}${sanitizePath(path)}`,
        lastmod: toLastMod(post?.date),
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
