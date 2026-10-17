import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, abs } from '../config/site';

/** 只列出真实可索引页面：首页、文章目录、已发布文章（不含草稿、404） */
export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort((a, b) => a.data.order - b.data.order);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const latest = guides.reduce((m, g) => {
    const d = iso(g.data.updatedDate ?? g.data.pubDate);
    return d > m ? d : m;
  }, SITE.dataUpdated as string);

  const urls = [
    { loc: abs('/'), lastmod: latest },
    { loc: abs('/guides/'), lastmod: latest },
    ...guides.map((g) => ({ loc: abs(`/guides/${g.id}/`), lastmod: iso(g.data.updatedDate ?? g.data.pubDate) })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
