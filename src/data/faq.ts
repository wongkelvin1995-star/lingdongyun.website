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
    q: '灵动云是什么？灵动云机场和灵动云VPN 是同一个服务吗？',
    a: [
      '灵动云（Lingdongyun）是一个提供网络连接订阅服务的机场品牌。“机场”是中文网络中对代理订阅服务的俗称，用户也常把它叫作灵动云VPN、灵动云梯子或灵动云加速器，指的都是同一个服务。',
      '购买套餐后，你会获得一条专属订阅链接，导入 Clash、小火箭等客户端即可获取节点并连接。它和企业内网使用的传统 VPN 原理不同，入门概念可以阅读<a href="/guides/network-basics/">灵动云新手入门</a>。',
    ],
  },
  {
    q: '灵动云官网网址是什么？怎么注册灵动云？',
    a: [
      '灵动云官网域名是 lingdongyun.website，官网介绍全部套餐、客户端与使用教程。点击官网上的“立即注册”按钮即可进入{{action}}。',
      '注册流程很简单：按页面提示完成注册，登录用户中心后选择套餐付款，再复制订阅链接导入客户端。请认准官网与官方入口，不要在来历不明的页面输入账号密码。',
    ],
  },
  {
    q: '灵动云机场多少钱？一共有哪些套餐？',
    a: [
      '灵动云共有 {{plancount}} 档套餐。月付 4 档：{{name:fufeng}} {{price:fufeng}}（{{traffic:fufeng}}）、{{name:yulang}} {{price:yulang}}（{{traffic:yulang}}）、{{name:poxiao}} {{price:poxiao}}（{{traffic:poxiao}}）、{{name:lingxiao}} {{price:lingxiao}}（{{traffic:lingxiao}}）。',
      '年付 1 档：{{name:chuanyun}} {{price:chuanyun}}（{{traffic:chuanyun}}）。不限时流量包 3 档：{{name:xianyun}} {{price:xianyun}}（{{traffic:xianyun}}）、{{name:jingyun}} {{price:jingyun}}（{{traffic:jingyun}}）、{{name:feiyun}} {{price:feiyun}}（{{traffic:feiyun}}）。所有套餐都可以在首页<a href="#plans">套餐区</a>直接对比。',
    ],
  },
  {
    q: '灵动云月付、年付和不限时流量包有什么区别？',
    a: [
      '月付套餐按月付费，每月获得固定额度，可以随时根据用量升档或降档，适合刚开始使用、还不确定用量的用户。',
      '年付套餐{{name:chuanyun}}一次付清全年，流量每月发放 70GB，不是全年共 70GB，折合约 8.25 元/月，适合长期轻量使用。不限时流量包只付一次款，获得一笔总流量，用完为止，不需要每月续费，适合出差、偶尔使用或用量不规律的用户。详细对比见<a href="/guides/plan-selection/">灵动云套餐怎么选</a>。',
    ],
  },
  {
    q: '学生党或预算有限，选哪个灵动云套餐最划算？',
    a: [
      '如果主要用于查资料、通讯和轻度办公，每月用量通常在几十 GB 以内。想先试一个月，选{{name:fufeng}}（{{price:fufeng}}，{{traffic:fufeng}}）；确定长期使用，选年付{{name:chuanyun}}（{{price:chuanyun}}，{{traffic:chuanyun}}），单月成本在全部套餐中最低。',
      '如果经常看高清视频，建议从{{name:yulang}}起步。不知道自己用多少流量，可以参考<a href="/guides/traffic-budget/">按用途估算流量需求</a>里的计算方法。',
    ],
  },
  {
    q: '灵动云支持哪些设备和客户端？',
    a: [
      '灵动云支持 Windows、macOS、Android 和 iOS 四大平台。常用客户端包括 Clash 系客户端（如 Clash Verge、Clash Party）、iOS 的小火箭 Shadowrocket、Windows 的 v2rayN 以及 Android 的 v2rayNG。',
      '登录用户中心后，可以找到不同客户端对应的订阅链接。各平台的获取方式与操作要点见首页<a href="#clients">客户端下载与订阅导入</a>，Windows 与 Android 的客户端对比见<a href="/guides/windows-android-clients/">客户端选择指南</a>。',
    ],
  },
  {
    q: '灵动云怎么导入 Clash 或小火箭订阅？',
    a: [
      'Clash：在用户中心复制 Clash 订阅链接，打开客户端的“订阅”或“配置”页面，粘贴链接并保存，选中该配置后开启系统代理，再到“代理”页测速选择节点。',
      '小火箭：复制订阅链接，点右上角加号，类型选 Subscribe，粘贴到 URL 栏保存，更新后选择节点并打开连接开关。完整步骤见<a href="/guides/clash-subscription/">Clash 订阅导入教程</a>与<a href="/guides/shadowrocket/">小火箭使用教程</a>。',
    ],
  },
  {
    q: '灵动云机场稳定吗？用的是什么线路和协议？',
    a: [
      '灵动云采用 BGP 接入，电信、联通、移动用户访问时，路由协议会自动选择较合适的路径，让不同运营商的连接更均衡；传输使用 Shadowsocks（SS）加密协议，轻量且客户端兼容性好。',
      '网络体验还会受所在地区、运营商和时段影响，建议在晚高峰等常用时段多测试几个节点，选择延迟稳定的节点长期使用。BGP 与专线的区别见<a href="/guides/routes-and-protocols/">灵动云的 BGP 与 SS 是什么</a>。',
    ],
  },
  {
    q: '灵动云节点超时、订阅更新失败怎么办？',
    a: [
      '按顺序排查：先在用户中心确认套餐未到期、流量没有用完；再检查本地网络是否正常；然后把客户端更新到最新版本，并确认使用的是与客户端对应的订阅链接；最后对全部节点测速，换用延迟正常的节点。',
      '如果仍然无法连接，检查系统代理是否开启、是否有其他代理软件冲突，并把系统时间设为自动同步。完整清单见<a href="/guides/troubleshooting/">订阅更新失败与节点超时排查</a>。订阅链接相当于账号凭证，请不要发给他人。',
    ],
  },
  {
    q: '灵动云有免费试用吗？怎样低成本体验？',
    a: [
      '灵动云官网目前暂未推出免费试用或优惠码活动。想低成本体验，可以先购买月付入门档{{name:fufeng}}（{{price:fufeng}}）用一个月，或选择不限时流量包{{name:xianyun}}，用多少算多少。',
      '体验时建议在自己常用的设备和网络环境下测试几天，确认速度和可用性符合需要，再决定是否升级到更高档位或改为年付。',
    ],
  },
];

const actionLink = `<a href="${ACTION_URL}" target="_blank" rel="noopener noreferrer">灵动云官方入口</a>`;

export const FAQS: FaqItem[] = RAW.map((item) => ({
  q: item.q,
  a: item.a.map((p) => fillPlanTokens(p).replace(/\{\{action\}\}/g, actionLink)),
}));

export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '');
