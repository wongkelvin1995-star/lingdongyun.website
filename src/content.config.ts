import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 教程文章：src/content/guides/<slug>.md
 * 新增文章：复制一篇现有 .md，改文件名（即 URL slug）与 frontmatter。
 * draft: true 的文章不会生成页面，也不会进入 sitemap 和目录。
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    /** 卡片与目录显示的短标题 */
    shortTitle: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    order: z.number(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** 相关文章 slug（文末「相关教程」） */
    related: z.array(z.string()).default([]),
    /** 是否在文中插入由 plans.ts 生成的套餐对照表 */
    showPlanTable: z.boolean().default(false),
  }),
});

export const collections = { guides };
