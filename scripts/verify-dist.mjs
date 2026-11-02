// 构建产物静态检查：npm run build && npm run verify
// 对应 2026-11-01 v2 规范：本站是灵动云官方「使用指南」站点，不得自称官网。
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://lingdongyun.website';
const ACTION_URL = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';
const OFFICIAL_HOME = 'https://lingdongyun.site/';
const OFFICIAL_PAGE = 'https://lingdongyun.site/guides/lingdongyun-official/';
const LASTMOD = '2026-11-01';
const EXPECTED_PAGES = [
  '/',
  '/guides/',
  '/guides/clash-subscription/',
  '/guides/shadowrocket/',
  '/guides/windows-android-clients/',
  '/guides/network-basics/',
  '/guides/clash-party/',
  '/guides/choose-client/',
];
const REDIRECTS = {
  '/guides/plan-selection/': 'https://lingdongyun.best/guides/choose-plan',
  '/guides/traffic-budget/': 'https://lingdongyun.best/guides/estimate-traffic',
  '/guides/troubleshooting/': 'https://lingdongyun.sbs/guides/troubleshooting/',
  '/guides/routes-and-protocols/': 'https://lingdongyun.sbs/guides/stable-network/',
};
const SISTER_HOMES = ['https://lingdongyun.site/', 'https://lingdongyun.best/', 'https://lingdongyun.sbs/', 'https://lingdongyun.lol/'];

let fails = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) fails++;
};
const fileFor = (p) => join(DIST, p, 'index.html');
const html = (p) => readFileSync(fileFor(p), 'utf8');
const text = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

const allHtml = [];
const walk = (d) =>
  readdirSync(d).forEach((f) => {
    const fp = join(d, f);
    statSync(fp).isDirectory() ? walk(fp) : f.endsWith('.html') && allHtml.push(fp);
  });
walk(DIST);

// 1. 页面存在，已迁出的页面不再生成
for (const p of EXPECTED_PAGES) ok(existsSync(fileFor(p)), `页面存在 ${p}`);
for (const p of Object.keys(REDIRECTS)) ok(!existsSync(fileFor(p)), `已迁出页面不再生成 ${p}`);
ok(existsSync(join(DIST, '404.html')), '404.html 存在');

for (const fp of allHtml) {
  const s = readFileSync(fp, 'utf8');
  const t = text(s);
  const rel = fp.replace(DIST, '/');
  // 2. 注册入口完整、统一，新标签页打开
  const actionTags = [...s.matchAll(/<a\b[^>]*href="(https:\/\/varnexa[^"]*)"[^>]*>/g)];
  ok(actionTags.length > 0 && actionTags.every((m) => m[1].replace(/&amp;/g, '&') === ACTION_URL), `${rel} 注册入口 ${actionTags.length} 处，全部为完整 ACTION_URL`);
  ok(actionTags.every((m) => /target="_blank"/.test(m[0]) && /rel="noopener"/.test(m[0])), `${rel} 注册入口新标签页打开并带 rel="noopener"`);
  ok(!/lingdongaff\.com(?!\/#\/\?code=HHoxxHGa)/.test(s), `${rel} 无其他 lingdongaff 变体`);
  ok(!/href="#"/.test(s), `${rel} 无 href="#" 占位`);
  ok(!/\sdownload[\s=>]/.test(s), `${rel} 无 download 属性`);
  ok(!s.includes('{{'), `${rel} 无未替换占位符`);
  ok(!/name="keywords"/.test(s), `${rel} 无 meta keywords`);
  ok(!/AggregateRating|"@type":"Review"|SearchAction/.test(s), `${rel} 无评分/评论/站内搜索结构化数据`);
  ok((s.match(/<footer/g) || []).length === 1, `${rel} 恰好一个 footer`);
  ok((s.match(/<h1[\s>]/g) || []).length === 1, `${rel} 恰好一个 H1`);
  // 3. 角色与措辞
  ok(!/<title>[^<]*官网/.test(s) && !/<h1[^>]*>[^<]*官网/.test(s), `${rel} 标题与 H1 不含「官网」`);
  ok(!/本站(为|是)灵动云(的)?官方网站/.test(t) && !/(官方网站|官网)[:：\s]*(https?:\/\/)?lingdongyun\.(website|best|lol|sbs)/.test(t), `${rel} 不自称官网`);
  ok(!/BGP/.test(t), `${rel} 不出现 BGP 线路说法`);
  ok(!/(?<![0-9.])(8|八)\s*(档|款)/.test(t), `${rel} 套餐数量统一为 9 档`);
  ok(t.includes('本站是灵动云官方「使用指南」站点。官网：') && s.includes(`href="${OFFICIAL_HOME}"`) && s.includes(`href="${OFFICIAL_PAGE}"`), `${rel} 页脚官方站点声明与两个链接`);
  // 4. 站内链接可解析
  const internal = [...s.matchAll(/href="(\/[^"#?]*)(\?[^"#]*)?(#[^"]*)?"/g)].map((m) => m[1]);
  const broken = internal.filter((h) => {
    if (/\.(svg|ico|png|css|js|xml|txt)$/.test(h)) return !existsSync(join(DIST, h));
    return !existsSync(join(DIST, h, 'index.html'));
  });
  ok(broken.length === 0, `${rel} 站内链接 ${internal.length} 条全部有效${broken.length ? ' → ' + broken.join(',') : ''}`);
}

// 5. canonical / OG / 语言
for (const p of EXPECTED_PAGES) {
  const s = html(p);
  ok(s.includes(`<link rel="canonical" href="${SITE}${p}">`), `canonical ${p}`);
  ok(s.includes(`<meta property="og:url" content="${SITE}${p}">`), `og:url ${p}`);
  ok(s.includes('<html lang="zh-CN"'), `lang=zh-CN ${p}`);
  ok(s.includes('"@id":"https://lingdongyun.site/#org"') && !/"@type":"Organization","@id":"(?!https:\/\/lingdongyun\.site\/#org)/.test(s), `JSON-LD 组织 @id 统一 ${p}`);
}
ok(/name="robots" content="noindex/.test(readFileSync(join(DIST, '404.html'), 'utf8')), '404 noindex 且无 canonical');
ok(existsSync(join(DIST, 'og-default.png')), 'og:image 文件存在');

// 6. 首页结构
const home = html('/');
ok(/data-ldy-family/.test(home), '首页有「灵动云官方站点」区块（data-ldy-family）');
ok(home.includes('当前站点'), '官方站点区块标出当前站点');
for (const u of SISTER_HOMES) ok(home.includes(`href="${u}"`), `首页链接姊妹站首页 ${u}`);
for (const id of ['devices', 'import', 'guides', 'faq', 'official-sites']) ok(home.includes(`id="${id}"`), `首页锚点 #${id}`);
const faqVisible = (home.match(/<li class="faq-item"/g) || []).length;
const faqLd = (home.match(/"@type":"Question"/g) || []).length;
ok(faqVisible > 0 && faqVisible === faqLd, `FAQPage 结构化数据与可见问答一致（${faqVisible} 题）`);
ok(!/data-plan-id=|class="plan-table"/.test(home), '首页不含套餐表');

// 7. robots / sitemap / 重定向
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
ok(robots.includes(`Sitemap: ${SITE}/sitemap.xml`) && !/Disallow:\s*\/\s*$/m.test(robots), 'robots.txt 允许抓取并指向 sitemap');
const sm = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(locs.length === EXPECTED_PAGES.length && EXPECTED_PAGES.every((p) => locs.includes(SITE + p)), `sitemap 精确列出 ${EXPECTED_PAGES.length} 个可索引页面`);
ok([...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].every((m) => m[1] === LASTMOD), `sitemap lastmod 均为 ${LASTMOD}`);
const redirects = readFileSync(join(DIST, '_redirects'), 'utf8');
for (const [src, dst] of Object.entries(REDIRECTS)) {
  for (const v of [src, src.replace(/\/$/, '')]) {
    ok(new RegExp(`^${v.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}\\s+${dst.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}\\s+301\\s*$`, 'm').test(redirects), `_redirects ${v} → ${dst} 301`);
  }
}

console.log(`\n${fails === 0 ? '全部通过' : `失败 ${fails} 项`}`);
process.exit(fails ? 1 : 0);
