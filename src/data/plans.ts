/**
 * 八档套餐 —— 全站唯一数据源。
 * 首页卡片、文章正文中的 {{price:id}} 等占位符、FAQ 都读取这里。
 * 修改价格 / 流量 / 名称只改本文件，然后重新构建。
 *
 * sourceType: 'user-screenshot' 表示数据来自用户本次提供的套餐截图与确认表，
 * 尚未在线核对结算页，不代表已核实的实时结算价。
 */
import { ACTION_URL } from '../config/site';

export type PaymentCycle = 'month' | 'year' | 'once';
export type TrafficPeriod = 'monthly' | 'monthly-grant' | 'total';

export interface Plan {
  id: string;
  name: string;
  currency: 'CNY';
  priceAmount: number;
  /** 价格是否为「起」价（截图标注 起） */
  priceFrom: boolean;
  paymentCycle: PaymentCycle;
  /** 一次付款覆盖的月数；一次性包为 null（不折算月均） */
  paymentMonths: number | null;
  trafficAmount: number;
  trafficUnit: 'GB' | 'TB';
  /** 以 GB 计（十进制口径：1TB = 1000GB） */
  trafficGB: number;
  trafficPeriod: TrafficPeriod;
  /** 价格展示：主数字 + 周期后缀 */
  displayPrice: string;
  displayPriceSuffix: string;
  /** 付款方式说明（与流量周期分开展示） */
  paymentLabel: string;
  displayTraffic: string;
  trafficLabel: string;
  /** 卡片角标：表达用途或编辑建议，不是销量统计 */
  tag: string;
  highlight?: boolean;
  /** 一句话用途说明（编辑建议） */
  summary: string;
  features: string[];
  /** 价格补充说明（如年付折算） */
  priceNote?: string;
  purchaseUrl: string;
  sourceType: 'user-screenshot';
}

const base = { currency: 'CNY' as const, purchaseUrl: ACTION_URL, sourceType: 'user-screenshot' as const };

export const PLANS: Plan[] = [
  {
    ...base,
    id: 'fufeng',
    name: '灵动·拂风',
    priceAmount: 20,
    priceFrom: true,
    paymentCycle: 'month',
    paymentMonths: 1,
    trafficAmount: 100,
    trafficUnit: 'GB',
    trafficGB: 100,
    trafficPeriod: 'monthly',
    displayPrice: '¥20',
    displayPriceSuffix: '/月起',
    paymentLabel: '按月付费',
    displayTraffic: '100GB/月',
    trafficLabel: '每月额度',
    tag: '轻量入门',
    summary: '网页浏览、通讯与文档办公为主的轻度使用。',
    features: ['月付，可按月续费', '每月 100GB 流量额度', '适合先熟悉客户端与订阅导入'],
  },
  {
    ...base,
    id: 'yulang',
    name: '灵动·驭浪',
    priceAmount: 50,
    priceFrom: true,
    paymentCycle: 'month',
    paymentMonths: 1,
    trafficAmount: 300,
    trafficUnit: 'GB',
    trafficGB: 300,
    trafficPeriod: 'monthly',
    displayPrice: '¥50',
    displayPriceSuffix: '/月起',
    paymentLabel: '按月付费',
    displayTraffic: '300GB/月',
    trafficLabel: '每月额度',
    tag: '编辑建议 · 日常之选',
    highlight: true,
    summary: '日常浏览加适量视频，单人多设备的常见用量。',
    features: ['月付，可按月续费', '每月 300GB 流量额度', '为视频与更新下载留出余量'],
  },
  {
    ...base,
    id: 'poxiao',
    name: '灵动·破晓',
    priceAmount: 100,
    priceFrom: true,
    paymentCycle: 'month',
    paymentMonths: 1,
    trafficAmount: 700,
    trafficUnit: 'GB',
    trafficGB: 700,
    trafficPeriod: 'monthly',
    displayPrice: '¥100',
    displayPriceSuffix: '/月起',
    paymentLabel: '按月付费',
    displayTraffic: '700GB/月',
    trafficLabel: '每月额度',
    tag: '高用量',
    summary: '高清视频较多，或多人、多设备共同使用。',
    features: ['月付，可按月续费', '每月 700GB 流量额度', '适合视频与大文件较多的场景'],
  },
  {
    ...base,
    id: 'lingxiao',
    name: '灵动·凌霄',
    priceAmount: 180,
    priceFrom: true,
    paymentCycle: 'month',
    paymentMonths: 1,
    trafficAmount: 1.5,
    trafficUnit: 'TB',
    trafficGB: 1500,
    trafficPeriod: 'monthly',
    displayPrice: '¥180',
    displayPriceSuffix: '/月起',
    paymentLabel: '按月付费',
    displayTraffic: '1.5TB/月',
    trafficLabel: '每月额度（1500GB）',
    tag: '大流量',
    summary: '长时间高清视频、大量下载或重度用量。',
    features: ['月付，可按月续费', '每月 1.5TB（1500GB）流量额度', '月度档位中额度最高'],
  },
  {
    ...base,
    id: 'chuanyun',
    name: '灵动·穿云',
    priceAmount: 99,
    priceFrom: false,
    paymentCycle: 'year',
    paymentMonths: 12,
    trafficAmount: 70,
    trafficUnit: 'GB',
    trafficGB: 70,
    trafficPeriod: 'monthly-grant',
    displayPrice: '¥99',
    displayPriceSuffix: '/年',
    paymentLabel: '年付 · 一次付清全年',
    displayTraffic: '70GB/月',
    trafficLabel: '每月发放',
    tag: '年付 · 每月发放',
    summary: '用量稳定偏轻、希望一次付清全年的用户。',
    features: ['一次支付 ¥99 覆盖 12 个月', '每月发放 70GB，不是全年共 70GB', '适合长期轻量使用'],
    priceNote: '折合约 ¥8.25/月，实际需一次支付 ¥99/年',
  },
  {
    ...base,
    id: 'xianyun',
    name: '灵动·闲云',
    priceAmount: 199,
    priceFrom: false,
    paymentCycle: 'once',
    paymentMonths: null,
    trafficAmount: 150,
    trafficUnit: 'GB',
    trafficGB: 150,
    trafficPeriod: 'total',
    displayPrice: '¥199',
    displayPriceSuffix: '一次性',
    paymentLabel: '一次性付款',
    displayTraffic: '150GB',
    trafficLabel: '总流量包（非每月）',
    tag: '不限时 · 流量包',
    summary: '偶尔使用、用量不固定，不想按月续费。',
    features: ['一次性付款，不按月扣费', '共 150GB 总流量，用完为止', '不限时使用，适合间歇性用量'],
  },
  {
    ...base,
    id: 'jingyun',
    name: '灵动·惊云',
    priceAmount: 499,
    priceFrom: false,
    paymentCycle: 'once',
    paymentMonths: null,
    trafficAmount: 400,
    trafficUnit: 'GB',
    trafficGB: 400,
    trafficPeriod: 'total',
    displayPrice: '¥499',
    displayPriceSuffix: '一次性',
    paymentLabel: '一次性付款',
    displayTraffic: '400GB',
    trafficLabel: '总流量包（非每月）',
    tag: '不限时 · 流量包',
    summary: '间歇性但单次用量较大，例如出差或阶段性项目。',
    features: ['一次性付款，不按月扣费', '共 400GB 总流量，用完为止', '不限时使用，适合间歇性用量'],
  },
  {
    ...base,
    id: 'feiyun',
    name: '灵动·飞云',
    priceAmount: 899,
    priceFrom: false,
    paymentCycle: 'once',
    paymentMonths: null,
    trafficAmount: 800,
    trafficUnit: 'GB',
    trafficGB: 800,
    trafficPeriod: 'total',
    displayPrice: '¥899',
    displayPriceSuffix: '一次性',
    paymentLabel: '一次性付款',
    displayTraffic: '800GB',
    trafficLabel: '总流量包（非每月）',
    tag: '不限时 · 流量包',
    summary: '用量不规律但总量较大，希望一次备足。',
    features: ['一次性付款，不按月扣费', '共 800GB 总流量，用完为止', '不限时使用，适合间歇性用量'],
  },
];

export const getPlan = (id: string): Plan => {
  const p = PLANS.find((x) => x.id === id);
  if (!p) throw new Error(`未知套餐 id: ${id}`);
  return p;
};

/** 价格完整写法，例如「¥20/月起」「¥99/年」「¥199 一次性」 */
export const priceText = (p: Plan) =>
  p.paymentCycle === 'once' ? `${p.displayPrice} 一次性付款` : `${p.displayPrice}${p.displayPriceSuffix}`;

/** 流量完整写法，例如「每月 100GB」「每月发放 70GB」「共 150GB 总流量」 */
export const trafficText = (p: Plan) => {
  if (p.trafficPeriod === 'total') return `共 ${p.displayTraffic} 总流量`;
  if (p.trafficPeriod === 'monthly-grant') return `每月发放 ${p.trafficAmount}${p.trafficUnit}`;
  return `每月 ${p.trafficAmount}${p.trafficUnit}`;
};

export const PLAN_GROUPS = [
  { key: 'month', title: '月付方案', desc: '按月付费，每月额度' },
  { key: 'year', title: '年付方案', desc: '一次付清全年，每月发放' },
  { key: 'once', title: '一次性流量包', desc: '一次性付款，总流量用完为止' },
] as const;

/**
 * 文本占位符替换：{{name:id}} {{price:id}} {{traffic:id}} {{plancount}}
 * 用于 Markdown 文章与 FAQ，保证价格只在本文件维护。
 */
export function fillPlanTokens(text: string): string {
  return text
    .replace(/\{\{plancount\}\}/g, String(PLANS.length))
    .replace(/\{\{(name|price|traffic):([a-z]+)\}\}/g, (_m, kind: string, id: string) => {
      const p = getPlan(id);
      if (kind === 'name') return p.name;
      if (kind === 'price') return priceText(p);
      return trafficText(p);
    });
}
