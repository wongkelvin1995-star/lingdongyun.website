/**
 * 站点统一配置 —— 修改站点名称、域名、注册入口、官方站点列表只改这里。
 *
 * lingdongyun.website 是灵动云官方「使用指南」站点：按设备整理客户端与订阅导入教程。
 * 只有 lingdongyun.site 可以称为「官网 / 官方网站」，本站文案、标题、结构化数据都不得自称官网。
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

/** 灵动云组织实体：五个官方站点的 JSON-LD 统一引用这个 @id */
export const ORG_ID = 'https://lingdongyun.site/#org';

/** 官网首页与「官方站点说明」页（页脚每页链接这两个地址） */
export const OFFICIAL_HOME = 'https://lingdongyun.site/';
export const OFFICIAL_PAGE = 'https://lingdongyun.site/guides/lingdongyun-official/';

/**
 * 正文里用到的姊妹站地址（只使用各站最终 URL，不经过跳转）。
 * 页面级的上下文链接用这些常量；页眉页脚只链接官网。
 */
export const LINKS = {
  troubleshooting: 'https://lingdongyun.sbs/guides/troubleshooting/',
  helpCenter: 'https://lingdongyun.sbs/',
  planPicker: 'https://lingdongyun.best/',
  beginner: 'https://lingdongyun.lol/',
} as const;

/**
 * 灵动云五个官方站点（顺序固定，与「官方站点说明」一致）。
 * 首页「灵动云官方站点」区块读取这里；current 为本站。
 */
export const FAMILY = [
  { key: 'site', name: '灵动云官网', domain: 'lingdongyun.site', url: 'https://lingdongyun.site/', desc: '品牌介绍、9 档套餐与注册入口' },
  { key: 'website', name: '灵动云使用指南', domain: 'lingdongyun.website', url: 'https://lingdongyun.website/', desc: '按设备整理的客户端与订阅导入教程' },
  { key: 'best', name: '灵动云套餐选择', domain: 'lingdongyun.best', url: 'https://lingdongyun.best/', desc: '9 档套餐对比与每月流量估算' },
  { key: 'sbs', name: '灵动云帮助中心', domain: 'lingdongyun.sbs', url: 'https://lingdongyun.sbs/', desc: '连接问题排查、网络知识与在线客服' },
  { key: 'lol', name: '灵动云新手入门', domain: 'lingdongyun.lol', url: 'https://lingdongyun.lol/', desc: '注册、选套餐、导入订阅、连接，4 步上手' },
] as const;
export const CURRENT_SITE_KEY = 'website';

/**
 * 主导航。href 以 "/#" 开头的项在首页会被转换为短锚点（#devices），
 * 在其他页面保持 /#devices，保证从文章页能回到首页对应区域。
 * 子站导航只放一个跨站链接：「官网」→ lingdongyun.site。
 */
export const NAV = [
  { label: '首页', href: '/' },
  { label: '选择设备', href: '/#devices' },
  { label: '导入步骤', href: '/#import' },
  { label: '全部教程', href: '/guides/' },
  { label: '常见问题', href: '/#faq' },
  { label: '官网', href: OFFICIAL_HOME },
] as const;

export const abs = (path: string) => new URL(path, SITE.url).toString();
