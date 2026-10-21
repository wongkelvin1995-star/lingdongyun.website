# 灵动云官网 · lingdongyun.website

Astro 7 + TypeScript 静态站点。白色主题品牌落地页 + 8 档套餐 + 8 篇教程 + 基础 SEO。
无客户端框架，页面正文与套餐信息全部在初始 HTML 中；仅菜单、平台选项卡使用少量原生 JS。

## 运行

需要 Node.js ≥ 22.22。

```bash
npm ci              # 按锁文件安装
npm run dev         # 本地开发 http://localhost:4321
npm run check       # Astro / TypeScript 类型检查
npm run build       # 生产构建，输出到 dist/
npm run verify      # 对 dist/ 做静态验收（入口链接、套餐、canonical、sitemap 等）
npm run preview     # 本地预览构建产物
```

## 目录结构

```
src/
  config/site.ts          站点配置：域名、ACTION_URL、导航、客服（待填）
  data/plans.ts           8 档套餐唯一数据源 + 文本占位符替换
  data/faq.ts             常见问题（12 题）
  data/platforms.ts       客户端区四个平台内容与快速开始步骤
  data/reviews.ts         真实用户评价（当前为空 → 评价列表不显示）
  content/guides/*.md     8 篇教程文章（文件名 = URL slug）
  content.config.ts       文章 frontmatter 结构
  layouts/BaseLayout.astro  通用 <head>/SEO/页眉页脚
  components/             Header、Footer、ActionLink、PlanTable、GuideCard 等
  components/home/        首页各区块
  pages/                  路由：首页、/guides/、/guides/[slug]/、404、robots.txt、sitemap.xml
  styles/global.css       颜色、按钮等设计变量
public/                   favicon、OG 分享图
scripts/verify-dist.mjs   构建产物验收脚本
scripts/make-images.py    重新生成 OG 图与图标（需 Python playwright）
```

## 常见修改

**修改统一入口**：只改 `src/config/site.ts` 中的 `ACTION_URL`。所有「立即注册 / 购买套餐 / 前往官网 / 前往官网获取客户端」按钮都通过 `ActionLink` 组件读取它。修改后同步更新 `scripts/verify-dist.mjs` 顶部的同名常量。

**修改套餐**：只改 `src/data/plans.ts`。首页卡片、文章对照表、场景建议、FAQ 都从这里读取。
文章和 FAQ 中的价格用占位符书写，构建时自动替换：
- `{{name:chuanyun}}` → 灵动·穿云
- `{{price:chuanyun}}` → ¥99/年
- `{{traffic:chuanyun}}` → 每月发放 70GB
- `{{plancount}}` → 8

未知 id 会让构建直接失败，避免发布错误价格。
注意：`traffic-budget.md` 中的“折合约 8.25 元/月”和用量示例是手写的估算，改价后需人工复核；`scripts/verify-dist.mjs` 中的 `PLANS` 期望值也需同步。

**品牌词 SEO（灵动云 / 灵动云机场 / 灵动云VPN / Lingdongyun）**：品牌别名集中在 `src/config/site.ts` 的 `BRAND_ALIASES`（结构化数据 alternateName、首页「关于灵动云」常见叫法）与 `BRAND_KEYWORDS`（首页 meta keywords）。首页 title/description 在同文件的 `defaultTitle` / `defaultDescription`。品牌信息块在 `src/components/home/BrandFacts.astro`，品牌 FAQ 在 `src/data/faq.ts` 前三题。新增别名时只改 site.ts，避免在正文里堆砌关键词。

**修改首页文案**：Hero 在 `src/components/home/Hero.astro`；各区块在 `src/components/home/`；title/description 默认值在 `src/config/site.ts`。

**新增文章**：在 `src/content/guides/` 新建 `<slug>.md`，复制现有文章的 frontmatter 并修改 `title / description / shortTitle / category / pubDate / order / related`。正文中站内链接使用完整路径（`/guides/xxx/`、`/#plans`）。保存后自动出现在首页教程区、/guides/ 目录与 sitemap。`draft: true` 的文章不会发布。

**添加真实评价**：在 `src/data/reviews.ts` 中填入运营方提供并获授权的评价（含日期与来源），首页会自动显示评价区。不要填写编造内容；不生成评分结构化数据。

**填写客服 / TG / 邮箱**：`src/config/site.ts` 的 `CONTACTS`，为 null 时不显示。

## 部署（Cloudflare Pages 等静态托管）

- 构建命令 `npm run build`，输出目录 `dist`，Node 版本 22.22+。
- URL 统一以 `/` 结尾（`trailingSlash: 'always'`）；canonical、sitemap、站内链接一致。
- `dist/404.html` 会被 Cloudflare Pages 自动用作 404 页面并返回 404 状态码（已在本地 `astro preview` 验证为 404）。
- Cloudflare Pages 默认会把 `/guides` 重定向到 `/guides/`；`astro preview` 本地不做这个重定向，访问 `/guides` 会显示 404，属正常现象。
- 正式域名绑定、仓库与发布权限尚未提供，本项目只完成了本地构建，**未部署**。
