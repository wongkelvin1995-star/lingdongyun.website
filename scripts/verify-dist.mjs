// 构建产物静态检查：npm run build && npm run verify
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://lingdongyun.website';
const ACTION_URL = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';
const EXPECTED_PAGES = [
  '/',
  '/guides/',
  '/guides/plan-selection/',
  '/guides/clash-subscription/',
  '/guides/shadowrocket/',
  '/guides/windows-android-clients/',
  '/guides/traffic-budget/',
  '/guides/routes-and-protocols/',
  '/guides/network-basics/',
  '/guides/troubleshooting/',
];
const PLANS = [
  ['灵动·拂风', '¥20', '/月起', '100GB/月', '每月额度'],
  ['灵动·驭浪', '¥50', '/月起', '300GB/月', '每月额度'],
  ['灵动·破晓', '¥100', '/月起', '700GB/月', '每月额度'],
  ['灵动·凌霄', '¥180', '/月起', '1.5TB/月', '每月额度（1500GB）'],
  ['灵动·穿云', '¥99', '/年', '70GB/月', '每月发放'],
  ['灵动·闲云', '¥199', '一次性', '150GB', '总流量包（非每月）'],
  ['灵动·惊云', '¥499', '一次性', '400GB', '总流量包（非每月）'],
  ['灵动·飞云', '¥899', '一次性', '800GB', '总流量包（非每月）'],
];

let fails = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) fails++;
};
const fileFor = (p) => join(DIST, p, 'index.html');
const html = (p) => readFileSync(fileFor(p), 'utf8');

const allHtml = [];
const walk = (d) =>
  readdirSync(d).forEach((f) => {
    const fp = join(d, f);
    statSync(fp).isDirectory() ? walk(fp) : f.endsWith('.html') && allHtml.push(fp);
  });
walk(DIST);

// 1. 页面存在
for (const p of EXPECTED_PAGES) ok(existsSync(fileFor(p)), `页面存在 ${p}`);
ok(existsSync(join(DIST, '404.html')), '404.html 存在');

for (const fp of allHtml) {
  const s = readFileSync(fp, 'utf8');
  const rel = fp.replace(DIST, '/');
  // 2. 外部业务链接完整、统一
  const actionHrefs = [...s.matchAll(/href="(https:\/\/varnexa[^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  ok(actionHrefs.length > 0 && actionHrefs.every((h) => h === ACTION_URL), `${rel} 官方入口 ${actionHrefs.length} 处，全部为完整 ACTION_URL`);
  ok(!/lingdongaff\.com(?!\/#\/\?code=HHoxxHGa)/.test(s), `${rel} 无其他 lingdongaff 变体`);
  ok(!/href="#"/.test(s), `${rel} 无 href="#" 占位`);
  ok(!/\sdownload[\s=>]/.test(s), `${rel} 无 download 属性`);
  ok(!s.includes('{{'), `${rel} 无未替换占位符`);
  ok(!/jichangshice|机场测试/.test(s), `${rel} 无旧站残留`);
  ok(!/AggregateRating|"@type":"Review"/.test(s), `${rel} 无评分/评论结构化数据`);
  ok((s.match(/<footer/g) || []).length === 1, `${rel} 恰好一个 footer`);
  ok(!/jichangreview|jichangguide|资源链接/.test(s), `${rel} 无资源链接区`);
  ok((s.match(/<h1[\s>]/g) || []).length === 1, `${rel} 恰好一个 H1`);
  // 3. 站内链接可解析
  const internal = [...s.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)].map((m) => m[1]);
  const broken = internal.filter((h) => {
    if (/\.(svg|ico|png|css|js|xml|txt)$/.test(h)) return !existsSync(join(DIST, h));
    return !existsSync(join(DIST, h, 'index.html'));
  });
  ok(broken.length === 0, `${rel} 站内链接 ${internal.length} 条全部有效${broken.length ? ' → ' + broken.join(',') : ''}`);
}

// 4. canonical / OG
for (const p of EXPECTED_PAGES) {
  const s = html(p);
  ok(s.includes(`<link rel="canonical" href="${SITE}${p}">`), `canonical ${p}`);
  ok(s.includes(`<meta property="og:url" content="${SITE}${p}">`), `og:url ${p}`);
  ok(s.includes('<html lang="zh-CN"'), `lang=zh-CN ${p}`);
}
ok(/name="robots" content="noindex/.test(readFileSync(join(DIST, '404.html'), 'utf8')), '404 noindex 且无 canonical');

// 5. 套餐数据
const home = html('/');
for (const [name, price, suffix, traffic, period] of PLANS) {
  const block = home.split(`>${name}</h3>`)[1]?.split('</article>')[0] ?? '';
  ok(
    block.includes(`>${price}<`) && block.includes(`>${suffix}<`) && block.includes(`>${traffic}<`) && block.includes(`>${period}<`),
    `套餐卡片 ${name} ${price}${suffix} ${traffic} ${period}`
  );
}
ok((home.match(/class="plan /g) || []).length === 8 || (home.match(/data-plan-id=/g) || []).length === 8, '首页 8 张套餐卡片');
ok(home.includes('折合约 ¥8.25/月，实际需一次支付 ¥99/年'), '穿云年付说明正确');
for (const id of ['plans', 'clients', 'guides', 'faq']) ok(home.includes(`id="${id}"`), `首页锚点 #${id}`);
ok(home.includes('前往官网获取客户端'), '客户端按钮文案为“前往官网获取客户端”');
ok(!/id="reviews"/.test(home), '无真实评价时评价列表隐藏');
ok((home.match(/<li class="faq-item"/g) || []).length === 10, 'FAQ 恰好 10 题');
ok([...home.matchAll(/<li class="faq-item"[^>]*>([\s\S]*?)<\/li>\s*(?=<li class="faq-item"|<\/ol>)/g)].every((m) => /<div class="faq-a"[^>]*>\s*<p[^>]*>[^<]{20,}/.test(m[1])), 'FAQ 每题都有可见答案');
ok(!/<details[^>]*faq/.test(home), 'FAQ 答案不折叠');

// 6. robots / sitemap
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
ok(robots.includes(`Sitemap: ${SITE}/sitemap.xml`) && !/Disallow:\s*\/\s*$/m.test(robots), 'robots.txt 允许抓取并指向 sitemap');
const sm = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(locs.length === EXPECTED_PAGES.length && EXPECTED_PAGES.every((p) => locs.includes(SITE + p)), `sitemap 精确列出 ${EXPECTED_PAGES.length} 个可索引页面`);

// 7. 品牌词
for (const kw of ['灵动云官网', '灵动云机场', '灵动云VPN', 'Lingdongyun']) {
  ok(home.includes(kw), `首页可见内容/元信息含品牌词「${kw}」`);
}
ok(/<meta name="keywords" content="[^"]*lingdongyun/.test(home), '首页 meta keywords 含 lingdongyun');
ok(/"alternateName":\[[^\]]*灵动云机场[^\]]*灵动云VPN/.test(home), 'Organization/WebSite alternateName 含品牌别名');
ok(home.includes('id="about"'), '首页有「关于灵动云」品牌信息块');
for (const p of EXPECTED_PAGES) ok(/<h1[^>]*>[^<]*灵动云/.test(html(p)), `H1 含品牌名 ${p}`);

console.log(`\n${fails === 0 ? '全部通过' : `失败 ${fails} 项`}`);
process.exit(fails ? 1 : 0);
