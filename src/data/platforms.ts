/** 客户端与快速开始：四个平台选项卡的内容 */
export interface Platform {
  id: string;
  label: string;
  intro: string;
  steps: string[];
  note: string;
  guide?: { href: string; label: string };
}

export const QUICK_STEPS = [
  { title: '前往官方入口', text: '通过官方入口注册或登录用户中心。' },
  { title: '查看账号与套餐', text: '确认套餐已生效、到期时间和剩余流量。' },
  { title: '获取客户端与订阅', text: '按设备获取适配的客户端信息和订阅链接。' },
  { title: '导入订阅', text: '在客户端中添加订阅并完成更新。' },
  { title: '选择节点', text: '测试延迟后选择响应正常的节点。' },
  { title: '验证实际使用', text: '打开常用网站或应用，确认连接正常。' },
];

export const PLATFORMS: Platform[] = [
  {
    id: 'windows',
    label: 'Windows',
    intro:
      'Windows 上常见的是 Clash 系图形客户端与 v2rayN 一类客户端，它们支持的订阅格式和内核不同。先在用户中心确认推荐的客户端与订阅类型，再下载对应的正式版本。',
    steps: ['从用户中心或客户端官方发布页获取安装程序', '复制订阅链接并在客户端中添加订阅', '开启系统代理或按需使用规则模式'],
    note: '安装包请从用户中心说明或客户端官方发布页获取，本站不提供下载文件。',
    guide: { href: '/guides/windows-android-clients/', label: '阅读 Windows 与 Android 客户端指南' },
  },
  {
    id: 'macos',
    label: 'macOS',
    intro:
      'macOS 同样有 Clash 系等图形客户端可选。不同客户端对 Apple 芯片与 Intel 芯片的支持、所需系统版本各不相同，请先确认自己的芯片类型与系统版本。',
    steps: ['在用户中心查看 macOS 适配说明', '安装后按系统提示允许网络扩展或代理权限', '导入订阅并更新，再选择节点测试'],
    note: 'macOS 暂无独立教程，导入流程与 Clash 教程基本一致；具体客户端以用户中心说明为准。',
    guide: { href: '/guides/clash-subscription/', label: '参考 Clash 订阅导入教程' },
  },
  {
    id: 'android',
    label: 'Android',
    intro:
      'Android 上常用 Clash 系客户端或 v2rayNG 等应用。请注意辨别仿冒应用，只从客户端项目的官方发布渠道或用户中心指引获取安装包。',
    steps: ['确认 Android 版本与处理器架构', '安装客户端并允许创建 VPN 连接', '添加订阅、更新节点列表后连接'],
    note: '不同应用支持的订阅格式不同，导入失败时先核对格式。',
    guide: { href: '/guides/windows-android-clients/', label: '阅读 Windows 与 Android 客户端指南' },
  },
  {
    id: 'ios',
    label: 'iOS',
    intro:
      'iOS 客户端多数需要使用非中国大陆地区的 Apple ID 在 App Store 购买或下载。小火箭（Shadowrocket）是较常见的一款，下面的教程以它为例说明导入步骤。',
    steps: ['在 App Store 获取客户端（部分为付费应用）', '复制订阅链接并在客户端中添加订阅', '允许添加 VPN 配置后连接'],
    note: '以小火箭为例的教程仅说明操作方法，不代表所有套餐和订阅格式均已验证适配。',
    guide: { href: '/guides/shadowrocket/', label: '阅读小火箭使用教程' },
  },
];
