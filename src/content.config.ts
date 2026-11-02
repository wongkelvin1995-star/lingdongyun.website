import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 教程文章：src/content/guides/<slug>.md
 * 新增文章：复制一篇现有 .md，改文件名（即 URL slug）与 frontmatter，
 * 再把 slug 加进 src/data/devices.ts 对应设备，目录页才会按设备列出。
 * draft: true 的文章不会生成页面，也不会进入 sitemap 和目录。
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    /** H1 与 <title> 主体（<title> 会自动加「｜灵动云使用指南」） */
    title: z.string(),
    description: z.string().max(160),
    /** 卡片、面包屑与目录显示的短标题 */
    shortTitle: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** 结构化数据类型：操作教程用 TechArticle，概念说明用 Article */
    schemaType: z.enum(['TechArticle', 'Article']).default('TechArticle'),
    order: z.number(),
    draft: z.boolean().default(false),
    /** 相关文章 slug（文末「相关教程」） */
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { guides };
