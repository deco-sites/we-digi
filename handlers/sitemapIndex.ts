interface Props {
    /** Lista de URLs de sitemaps (ex: /sitemapblog.xml, /sitemapproducts.xml) */
    sitemaps: string[];
}
  
/**
 * @title Sitemap Index
 * @description Gera um sitemapindex a partir de um array de URLs
 */
export default function SiteMapIndex({ sitemaps = [] }: Props) {
    return function (req: Request) {
        const reqUrl = new URL(req.url);

        const entries = sitemaps
        .map(
            (path) => `
            <sitemap>
                <loc>${reqUrl.origin}${path}</loc>
                <lastmod>${new Date().toISOString().substring(0, 10)}</lastmod>
            </sitemap>`,
        )
        .join("\n");

        return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
            <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${entries}
            </sitemapindex>`,
        { headers: { "content-type": "text/xml", status: "200" } },
        );
    };
}
  