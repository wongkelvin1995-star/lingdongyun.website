/**
 * 按设备整理的教程入口：首页「按设备选教程」卡片与 /guides/ 目录的分组都读取这里。
 * guides[].slug 必须是 src/content/guides/ 中已发布文章的文件名。
 * 客户端名称只写第三方软件本身。Clash / 通用 / 小火箭三种订阅链接都由客服发放，不要写成在用户中心复制。
 */
export interface DeviceGuide {
  slug: string;
  /** 卡片里的短链接文字 */
  label: string;
  /** 目录页里说明「这台设备为什么看这篇」 */
  note: string;
}

export interface Device {
  id: string;
  /** 卡片标题 */
  label: string;
  /** 目录页分组标题 */
  title: string;
  /** 常用客户端 */
  clients: string;
  /** 一句话选择提示 */
  hint: string;
  /** 24×24 线条图标 path */
  icon: string;
  guides: DeviceGuide[];
}

export const DEVICES: Device[] = [
  {
    id: 'windows',
    label: 'Windows',
    title: 'Windows 电脑',
    clients: 'Clash Party、Clash Verge Rev、v2rayN',
    hint: '多数人用 Clash Party，配 Clash 订阅链接；习惯节点列表界面的，可以用 v2rayN 配通用订阅链接。',
    icon: 'M3 4.5h18v11.5H3zM8.5 20h7M12 16v4',
    guides: [
      { slug: 'clash-party', label: 'Clash Party 教程', note: '推荐先用它：界面直观，系统代理、TUN 和自动更新都集中在侧边栏。' },
      { slug: 'clash-subscription', label: 'Clash 订阅通用步骤', note: '用 Clash Verge Rev 等其他 mihomo 内核客户端时，按这篇的通用步骤操作。' },
      { slug: 'windows-android-clients', label: 'v2rayN 教程', note: '偏好节点列表界面、使用通用订阅链接时看这篇。' },
    ],
  },
  {
    id: 'macos',
    label: 'macOS',
    title: 'Mac 电脑',
    clients: 'Clash Party、Clash Verge Rev',
    hint: '下载前先在「关于本机」确认是 Apple 芯片还是 Intel 芯片，两者的安装包不同。',
    icon: 'M5 5h14v10H5zM2.5 18.5h19',
    guides: [
      { slug: 'clash-party', label: 'Clash Party 教程', note: '含 Apple 芯片与 Intel 芯片安装包的区别，以及首次打开时的系统提示。' },
      { slug: 'clash-subscription', label: 'Clash 订阅通用步骤', note: '使用 Clash Verge Rev 时参照这篇导入、更新和选择代理组。' },
    ],
  },
  {
    id: 'android',
    label: 'Android',
    title: 'Android 手机与平板',
    clients: 'v2rayNG、Clash Meta for Android',
    hint: '两种都可以：v2rayNG 读取通用订阅，Clash Meta for Android 读取 Clash 订阅。',
    icon: 'M7.5 3h9v18h-9zM11 18h2',
    guides: [
      { slug: 'windows-android-clients', label: 'v2rayNG 教程', note: '添加订阅、更新、测延迟、开启 VPN 与后台保活的完整步骤。' },
      { slug: 'clash-subscription', label: 'Clash Meta for Android', note: '想用规则分流的 Clash 订阅时看这篇，文中有 Android 小节。' },
    ],
  },
  {
    id: 'ios',
    label: 'iPhone / iPad',
    title: 'iPhone 与 iPad',
    clients: '小火箭 Shadowrocket',
    hint: '小火箭是 App Store 付费应用，需要用非中国大陆地区的 Apple ID 购买下载。',
    icon: 'M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5zM10.5 5h3',
    guides: [
      { slug: 'shadowrocket', label: '小火箭教程', note: '添加 Subscribe 订阅、更新节点、连通性测试与全局路由设置。' },
    ],
  },
];

/** 不分设备、建议先读的两篇 */
export const GENERAL_GUIDES: DeviceGuide[] = [
  { slug: 'choose-client', label: '按设备选客户端', note: '还没装客户端时先看：每种设备用什么、配哪种订阅链接。' },
  { slug: 'network-basics', label: '客户端、订阅链接和节点', note: '先弄懂三个概念，再看具体教程会顺畅很多。' },
];
