/**
 * 站点统一配置 —— 修改品牌、域名、统一操作入口只改这里。
 *
 * ACTION_URL：所有「立即注册 / 注册并订购 / 购买套餐 / 前往官网 / 进入用户中心 /
 * 前往官网获取客户端」按钮唯一读取的地址。务必完整保留 https、/#/ 与 ?code=HHoxxHGa。
 */
export const SITE = {
  name: '灵动云官网',
  brand: '灵动云',
  url: 'https://lingdongyun.website',
  lang: 'zh-CN',
  locale: 'zh_CN',
  timezone: 'Asia/Shanghai',
  defaultTitle: '灵动云官网｜套餐价格、订阅入口与客户端教程',
  defaultDescription:
    '灵动云官网提供月付、年付与一次性流量方案介绍，整理套餐价格、订阅导入和客户端使用教程，帮助你按预算与流量需求选择计划，并前往官方入口注册订购。',
  ogImage: '/og-default.png',
  /** 套餐与页面资料的整理日期（显示在套餐区与页脚） */
  dataUpdated: '2026-10-17',
} as const;

/** 唯一官方操作入口 */
export const ACTION_URL = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';

/**
 * 独立客服、TG、邮箱、客户端安装包地址：本次未提供。
 * 拿到运营方确认的地址后填入；为 null 时对应入口不会渲染。
 */
export const CONTACTS: {
  telegram: string | null;
  email: string | null;
  support: string | null;
} = {
  telegram: null,
  email: null,
  support: null,
};

/**
 * 主导航。href 以 "/#" 开头的项在首页会被转换为短锚点（#plans），
 * 在其他页面保持 /#plans，保证从文章页能回到首页对应区域。
 */
export const NAV = [
  { label: '首页', href: '/' },
  { label: '套餐方案', href: '/#plans' },
  { label: '客户端下载', href: '/#clients' },
  { label: '使用教程', href: '/guides/' },
  { label: '常见问题', href: '/#faq' },
] as const;

export const abs = (path: string) => new URL(path, SITE.url).toString();
