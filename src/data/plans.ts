/**
 * 灵动云 9 档套餐 —— 本站唯一套餐数据源（运营方面板，2026-11-01）。
 *
 * 使用指南站点不展示套餐表；这里的数据只用于正文占位符（{{plancount}} 等）
 * 与少量提及套餐数量的文案，保证与官网、套餐选择站口径一致。
 * 价格为面板的「起」价；月付套餐不自行推算季付 / 半年付 / 年付价格。
 * 价格与套餐规则以用户中心实时显示为准。
 */
export type PlanType = 'month' | 'year' | 'once' | 'custom';

export interface Plan {
  id: string;
  /** 套餐名称 */
  name: string;
  /** 名称后的类别说明（流量包档次等），可选 */
  label?: string;
  type: PlanType;
  /** 价格写法，例如「¥20/月起」「¥99/年」「¥199 一次性」 */
  price: string;
  /** 流量写法，例如「每月 100GB」「共 150GB」 */
  traffic: string;
  /** 有效期 / 重置规则 */
  validity: string;
}

export const PLANS: Plan[] = [
  { id: 'fufeng', name: '灵动·拂风', type: 'month', price: '¥20/月起', traffic: '每月 100GB', validity: '可选月付、季付、半年付、年付' },
  { id: 'yulang', name: '灵动·驭浪', type: 'month', price: '¥50/月起', traffic: '每月 300GB', validity: '可选月付、季付、半年付、年付' },
  { id: 'poxiao', name: '灵动·破晓', type: 'month', price: '¥100/月起', traffic: '每月 700GB', validity: '可选月付、季付、半年付、年付' },
  { id: 'lingxiao', name: '灵动·凌霄', type: 'month', price: '¥180/月起', traffic: '每月 1.5TB（1500GB）', validity: '可选月付、季付、半年付、年付' },
  { id: 'chuanyun', name: '灵动·穿云', type: 'year', price: '¥99/年', traffic: '每月 70GB', validity: '每 30 天自动重置' },
  { id: 'xianyun', name: '灵动·闲云', label: '小流量包', type: 'once', price: '¥199 一次性', traffic: '共 150GB', validity: '永久有效，用完为止，不按月清零' },
  { id: 'jingyun', name: '灵动·惊云', label: '标准流量包', type: 'once', price: '¥499 一次性', traffic: '共 400GB', validity: '永久有效，用完为止' },
  { id: 'feiyun', name: '灵动·飞云', label: '精英流量包', type: 'once', price: '¥899 一次性', traffic: '共 800GB', validity: '永久有效，用完为止' },
  { id: 'zhizun', name: '灵动云·至尊私人定制', type: 'custom', price: '¥680/月', traffic: '每月 500GB（专线独享流量）', validity: '确认需求后约 2–3 个工作日交付' },
];

export const getPlan = (id: string): Plan => {
  const p = PLANS.find((x) => x.id === id);
  if (!p) throw new Error(`未知套餐 id: ${id}`);
  return p;
};

/**
 * 文本占位符替换：{{name:id}} {{price:id}} {{traffic:id}} {{plancount}}
 * 用于 Markdown 文章与 FAQ；未知 id 会让构建直接失败，避免发布错误价格。
 */
export function fillPlanTokens(text: string): string {
  return text
    .replace(/\{\{plancount\}\}/g, String(PLANS.length))
    .replace(/\{\{(name|price|traffic):([a-z]+)\}\}/g, (_m, kind: string, id: string) => {
      const p = getPlan(id);
      if (kind === 'name') return p.name;
      if (kind === 'price') return p.price;
      return p.traffic;
    });
}
