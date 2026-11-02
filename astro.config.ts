import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkPlanTokens from './src/lib/remark-plan-tokens';
import rehypeTableWrap from './src/lib/rehype-table-wrap';

export default defineConfig({
  site: 'https://lingdongyun.website',
  // 统一 URL 结尾：所有页面以 / 结尾，canonical、目录、sitemap 一致
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // CSS 直接写进页面，少一次阻塞渲染的请求（跨境访问时每次往返都慢）
    inlineStylesheets: 'always',
  },
  markdown: {
    // remark 处理器：GFM 表格 + 套餐占位符替换（{{price:id}} 等读取 src/data/plans.ts）
    // rehype：表格外包一层可横向滚动的容器（只改结构，不改文字）
    processor: unified({
      remarkPlugins: [remarkPlanTokens],
      rehypePlugins: [rehypeTableWrap],
      gfm: true,
      smartypants: false,
    }),
  },
  devToolbar: { enabled: false },
});
