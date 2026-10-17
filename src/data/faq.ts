/**
 * 常见问题。answer 为受信任的站内 HTML 片段（可含站内链接），
 * 支持 {{price:id}} 等套餐占位符，价格统一读取 plans.ts。
 * 「{{action}}」会被替换为官方入口链接。
 */
import { ACTION_URL } from '../config/site';
import { fillPlanTokens } from './plans';

export interface FaqItem {
  q: string;
  a: string[];
}

const RAW: FaqItem[] = [
  {
    q: '灵动云是什么？注册和订购从哪里开始？',
    a: [
      '灵动云（Lingdongyun）是提供网络连接订阅服务的品牌，常被称为灵动云机场或灵动云VPN，目前提供月付、年付与一次性流量包三类、共 {{plancount}} 档套餐。本站是灵动云官网，整理套餐价格、订阅导入与客户端使用说明。',
      '注册、订购、续费和查看订阅都在{{action}}完成：注册账号后在用户中心选择套餐并付款，再按教程把订阅导入客户端。',
    ],
  },
  {
    q: '灵动云机场、灵动云VPN 和灵动云是同一个服务吗？',
    a: [
      '是同一个品牌。“机场”是中文网络中对代理订阅服务的俗称，“VPN”“梯子”“加速器”也是用户常用的叫法，指的都是灵动云提供的订阅服务。英文或拼音写作 Lingdongyun。',
      '从技术上说，灵动云通过订阅链接向 Clash、小火箭等代理客户端提供节点，与传统企业 VPN 的工作方式不同，入门概念见<a href="/guides/network-basics/">科学上网入门</a>。',
    ],
  },
  {
    q: '灵动云官网网址是什么？',
    a: [
      '灵动云官网域名为 lingdongyun.website，用于介绍套餐、客户端和使用教程。注册、购买与用户中心请使用官网上的{{action}}。',
      '请认准官网域名与官方入口，不要在来历不明的页面输入账号密码或订阅链接。',
    ],
  },
  {
    q: '月付、年付与一次性流量包有什么区别？',
    a: [
      '月付方案（拂风、驭浪、破晓、凌霄）按月付费，每月获得对应额度，例如{{name:fufeng}}为{{price:fufeng}}、{{traffic:fufeng}}。',
      '年付方案{{name:chuanyun}}一次付清全年，流量按月发放。一次性流量包（闲云、惊云、飞云）只付一次款，获得一笔总流量，用完为止。详细对比见<a href="/guides/plan-selection/">套餐选择指南</a>。',
    ],
  },
  {
    q: '灵动·穿云 99 元年付，是每月都有 70GB 吗？',
    a: [
      '是的。{{name:chuanyun}}价格为{{price:chuanyun}}，一次付清全年；流量为{{traffic:chuanyun}}，不是全年总共 70GB，也不是 99 元一个月。折算下来约 8.25 元/月。',
    ],
  },
  {
    q: '一次性 150GB / 400GB / 800GB 流量包怎样理解？',
    a: [
      '{{name:xianyun}}、{{name:jingyun}}、{{name:feiyun}}都是一次性付款，分别为{{price:xianyun}}（{{traffic:xianyun}}）、{{price:jingyun}}（{{traffic:jingyun}}）、{{price:feiyun}}（{{traffic:feiyun}}）。流量是一笔总量，不是每月 150/400/800GB。',
      '这类流量包属于不限时使用的类型，适合用量时多时少、不想按月续费的用户。',
    ],
  },
  {
    q: '怎样根据预算和使用量选择套餐？',
    a: [
      '先估算自己的月用量：以网页、通讯、文档为主时用量通常较低；经常看高清视频或下载大文件时用量会成倍增加。用量稳定的选月付或年付，用量时多时少的可考虑一次性流量包。',
      '<a href="/guides/traffic-budget/">流量估算指南</a>给出了按用途估算的方法和示例。',
    ],
  },
  {
    q: '去哪里获取客户端和适配的订阅配置？',
    a: [
      '通过{{action}}登录用户中心，在订阅区域获取与设备适配的客户端信息和订阅链接。',
      'Windows、macOS、Android、iOS 的选择思路见首页<a href="/#clients">客户端与快速开始</a>。',
    ],
  },
  {
    q: 'Clash 或小火箭导入订阅前需要检查什么？',
    a: [
      '确认四件事：套餐已生效且有剩余流量；客户端是最新的正式版本；复制的是“订阅链接”而不是注册链接或单个节点链接；客户端支持所选的订阅格式。',
      '分步骤说明见<a href="/guides/clash-subscription/">Clash 订阅导入教程</a>与<a href="/guides/shadowrocket/">小火箭使用教程</a>。',
    ],
  },
  {
    q: '订阅更新失败或节点超时怎样排查？',
    a: [
      '按顺序检查：套餐是否到期或流量用尽 → 本地网络是否正常 → 客户端版本与订阅格式是否匹配 → 换几个节点测试 → 系统代理与 DNS 设置 → 是否有其他代理或安全软件冲突。',
      '完整清单见<a href="/guides/troubleshooting/">订阅更新失败与节点超时排查</a>。订阅链接相当于账号凭证，不要公开发送给他人。',
    ],
  },
  {
    q: '有没有免费试用或优惠码？',
    a: [
      '官网目前没有公布免费试用或优惠码。想先体验的话，可以从{{name:fufeng}}（{{price:fufeng}}）或一次性流量包开始，用一段时间后再决定档位。',
    ],
  },
  {
    q: 'AI 工具、Netflix 等服务能否使用？',
    a: [
      '这类服务会按地区和 IP 调整访问策略，不同节点、不同时间的结果可能不同，官网不对具体服务的可用性作保证。建议先选小额度方案，在自己的设备上实际测试。',
    ],
  },
];

const actionLink = `<a href="${ACTION_URL}" target="_blank" rel="noopener noreferrer">灵动云官方入口</a>`;

export const FAQS: FaqItem[] = RAW.map((item) => ({
  q: item.q,
  a: item.a.map((p) => fillPlanTokens(p).replace(/\{\{action\}\}/g, actionLink)),
}));

export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '');
