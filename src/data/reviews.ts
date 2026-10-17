/**
 * 真实用户评价。
 *
 * 只能填入运营方提供、获准展示、可追溯的真实评价。
 * 禁止编造姓名、头像、星级、订单或体验；不生成 AggregateRating。
 * 数组为空时，首页不渲染评价列表，由「使用场景与选择建议」模块承接。
 */
export interface Review {
  /** 运营方提供的展示名（可匿名化，如「W 先生」） */
  displayName: string;
  /** 评价原文 */
  content: string;
  /** 评价日期 YYYY-MM-DD */
  date: string;
  /** 来源说明，例如「运营方工单系统，2026-10 获授权展示」 */
  source: string;
  /** 使用的套餐 id（可选，必须是 plans.ts 中的 id） */
  planId?: string;
}

export const REVIEWS: Review[] = [];
