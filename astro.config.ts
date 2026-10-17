import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkPlanTokens from './src/lib/remark-plan-tokens';

export default defineConfig({
  site: 'https://lingdongyun.website',
  // 统一 URL 结尾：所有页面以 / 结尾，canonical、目录、sitemap 一致
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  markdown: {
    // remark 处理器：GFM 表格 + 套餐占位符替换（{{price:id}} 等读取 src/data/plans.ts）
    processor: unified({ remarkPlugins: [remarkPlanTokens], gfm: true, smartypants: false }),
  },
  devToolbar: { enabled: false },
});
