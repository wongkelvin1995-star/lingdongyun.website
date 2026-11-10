/**
 * 站点统一配置 —— 修改站点名称、域名、注册入口只改这里。
 *
 * lingdongyun.website 是灵动云官方「使用指南」站点：按设备整理客户端与订阅导入教程。
 * 本站是独立站点，不链接、不提及其他灵动云域名；文案、标题、结构化数据都不得自称官网。
 *
 * ACTION_URL：所有「注册 / 登录用户中心 / 购买」按钮唯一读取的地址。
 * 务必完整保留 https、/#/ 与 ?code=HHoxxHGa。
 */
export const SITE = {
  /** 站点名称（标题后缀、og:site_name、WebSite.name） */
  name: '灵动云使用指南',
  brand: '灵动云',
  /** 站点角色标签（页眉 Logo 旁显示） */
  role: '使用指南',
  url: 'https://lingdongyun.website',
  domain: 'lingdongyun.website',
  lang: 'zh-CN',
  locale: 'zh_CN',
  timezone: 'Asia/Shanghai',
  /** 英文 / 拼音名 */
  latinName: 'Lingdongyun',
  defaultTitle: '灵动云使用指南｜Clash、小火箭、v2rayN 订阅导入教程',
  defaultDescription:
    '灵动云官方使用指南：按设备分步讲解订阅导入、节点切换与常用设置，覆盖 Windows、macOS、Android、iPhone 上的 Clash、Clash Party、小火箭与 v2rayN。',
  ogImage: '/og-default.png',
  ogImageAlt: '灵动云使用指南：按设备整理的客户端与订阅导入教程',
  /** 本次内容整理日期（文章「更新于」、sitemap lastmod、页脚） */
  dataUpdated: '2026-11-01',
} as const;

/** 唯一注册 / 登录入口（用户中心） */
export const ACTION_URL = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';

/** 灵动云组织实体 @id：本站自己的 JSON-LD 节点，不引用任何其他域名 */
export const ORG_ID = `${SITE.url}/#org`;

/**
 * 主导航。href 以 "/#" 开头的项在首页会被转换为短锚点（#devices），
 * 在其他页面保持 /#devices，保证从文章页能回到首页对应区域。
 */
export const NAV = [
  { label: '首页', href: '/' },
  { label: '选择设备', href: '/#devices' },
  { label: '导入步骤', href: '/#import' },
  { label: '全部教程', href: '/guides/' },
  { label: '常见问题', href: '/#faq' },
] as const;

export const abs = (path: string) => new URL(path, SITE.url).toString();
