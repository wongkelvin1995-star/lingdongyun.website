/**
 * 首页「常见问题」：只回答使用层面的问题（订阅、格式、设备、更新、模式、连接）。
 * 套餐价格、购买与品牌类问题分别由官网、套餐选择站回答，这里不重复。
 *
 * answer 为受信任的站内 HTML 片段（可含链接），支持 {{plancount}} 等套餐占位符；
 * 「{{action}}」会被替换为用户中心（注册 / 登录）链接。
 */
import { ACTION_URL, LINKS } from '../config/site';
import { fillPlanTokens } from './plans';

export interface FaqItem {
  q: string;
  a: string[];
}

const RAW: FaqItem[] = [
  {
    q: '订阅链接从哪里获取？可以发给别人吗？',
    a: [
      `开通套餐后，在<a href="${LINKS.helpCenter}">帮助中心</a>联系在线客服，或在用户中心提交工单，说明你的设备和客户端，客服会发来对应的订阅链接：Clash Party、Clash Verge Rev、Clash Meta for Android 等 Clash 系客户端用 Clash 订阅链接，v2rayN、v2rayNG 用通用订阅链接，小火箭用小火箭订阅链接。`,
      '订阅链接里带有与账号绑定的令牌，作用相当于账号凭证，不要发到群里，截图求助时也要打码。万一泄露，可以重置订阅链接，旧链接随之失效；之后向客服领取新链接，每台设备都要换上。',
    ],
  },
  {
    q: 'Clash 订阅和通用订阅有什么区别？该用哪一个？',
    a: [
      'Clash 订阅是一整份配置，节点、代理组和分流规则都在里面，供 Clash Party、Clash Verge Rev、Clash Meta for Android 读取；通用订阅只是一串编码后的节点清单，供 v2rayN、v2rayNG 读取，分流在客户端里设置。',
      '把 Clash 订阅填进 v2rayN，或把通用订阅导进 Clash，多半会报错或显示空列表，所以先确定客户端，再向客服要对应的那一条。各设备的对照表见<a href="/guides/choose-client/">按设备选客户端</a>。',
    ],
  },
  {
    q: '一个账号可以在几台设备上使用？',
    a: [
      '灵动云套餐不限设备数量，电脑、手机和平板可以分别导入同一个账号的订阅。需要注意两点：所有设备共用同一份套餐流量，设备越多消耗越快；节点调整后，每台设备都要各自更新一次订阅。',
    ],
  },
  {
    q: '订阅多久需要更新一次？',
    a: [
      '节点地址或数量调整后，客户端里的旧配置可能失效，所以订阅需要定期更新。省事的做法是在客户端里开启自动更新，间隔设为一天左右；遇到大面积节点超时，先手动更新一次再判断。',
      'Clash Party、Clash Verge Rev 在订阅条目的编辑选项里设置更新间隔；小火箭在设置的「订阅」中有自动更新相关选项；v2rayN、v2rayNG 在订阅分组菜单里执行更新。按钮名称以当前版本为准。',
    ],
  },
  {
    q: '规则模式和全局模式怎么选？',
    a: [
      '日常使用选规则模式（小火箭里叫「配置」）：国内网站和应用直接连接，其他访问按规则走代理，既不拖慢国内访问，也更省套餐流量。全局模式让所有访问都经过节点，适合临时判断「是不是规则没有命中」；直连模式等于暂时关闭代理。',
      '某个网站在规则模式下打不开、切到全局后正常，多半是规则没有覆盖它。先更新一次订阅，再在规则模式下重试。',
    ],
  },
  {
    q: '小火箭在 App Store 里搜不到怎么办？',
    a: [
      '因为小火箭（Shadowrocket）没有在中国大陆地区的 App Store 上架。在 App Store 的账户页换成其他国家或地区的 Apple ID，再搜索购买即可，价格以商店页面为准。',
      '换账号只在 App Store 里进行，别改系统设置里的 iCloud 登录；网上的共享账号和来路不明的安装方式都不要用。<a href="/guides/shadowrocket/">小火箭教程</a>里有完整步骤和辨认正版的方法。',
    ],
  },
  {
    q: '导入成功了，但节点全部超时或网页打不开怎么办？',
    a: [
      `先做三件事：在用户中心确认套餐有效、流量没有用完；手动更新一次订阅；把系统时间设为自动同步。仍然不行，按帮助中心的<a href="${LINKS.troubleshooting}#timeout">排查步骤</a>逐项检查，也可以在<a href="${LINKS.helpCenter}">帮助中心</a>联系在线客服，或在用户中心提交工单。`,
    ],
  },
];

const actionLink = `<a href="${ACTION_URL}" target="_blank" rel="noopener">登录用户中心</a>`;

export const FAQS: FaqItem[] = RAW.map((item) => ({
  q: item.q,
  a: item.a.map((p) => fillPlanTokens(p).replace(/\{\{action\}\}/g, actionLink)),
}));

export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '');
