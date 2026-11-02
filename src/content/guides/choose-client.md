---
title: 按设备选客户端：Windows、macOS、Android、iPhone 分别用什么
shortTitle: 按设备选客户端
description: 灵动云订阅可以在 Windows、macOS、Android、iPhone 和 iPad 上使用。本文按设备列出常用客户端、各自读取的订阅格式和官方获取渠道，说明怎样按设备和使用习惯选择，并链接到每个客户端的导入教程。
category: 选择客户端
pubDate: 2026-11-01
updatedDate: 2026-11-01
order: 1
related: [clash-party, shadowrocket, windows-android-clients]
---

先说结论：**Windows 和 macOS 用 Clash Party**（也可以用 Clash Verge Rev），Windows 上习惯节点列表界面的也可以用 **v2rayN**；**Android 用 v2rayNG 或 Clash Meta for Android**；**iPhone 和 iPad 用小火箭（Shadowrocket）**。决定用哪个，先看它读取哪种订阅格式，再看你更习惯规则分流还是节点列表。选定之后，把设备和客户端告诉[帮助中心](https://lingdongyun.sbs/)的在线客服，就能领到对应的订阅链接。

## 设备、客户端与订阅格式对照

| 设备 | 常用客户端 | 用哪种订阅链接 | 对应教程 |
|---|---|---|---|
| Windows | Clash Party、Clash Verge Rev | Clash 订阅 | [Clash Party 教程](/guides/clash-party/) |
| Windows | v2rayN | 通用订阅 | [v2rayN 教程](/guides/windows-android-clients/) |
| macOS | Clash Party、Clash Verge Rev | Clash 订阅 | [Clash Party 教程](/guides/clash-party/) |
| Android | v2rayNG | 通用订阅 | [v2rayNG 教程](/guides/windows-android-clients/) |
| Android | Clash Meta for Android | Clash 订阅 | [Clash 订阅导入](/guides/clash-subscription/) |
| iPhone / iPad | 小火箭 Shadowrocket | 小火箭订阅 | [小火箭教程](/guides/shadowrocket/) |

这些客户端都不自带节点，需要导入你自己的灵动云订阅才能使用。灵动云节点使用 Shadowsocks（SS）协议，表中客户端的内核都支持。

## 选之前先弄清：客户端、内核与订阅格式

客户端是你看到的软件界面，真正负责连接的是它内置的“内核”。Clash Party、Clash Verge Rev 和 Clash Meta for Android 都使用 mihomo（原名 Clash Meta）内核，读取 Clash 格式的配置；v2rayN、v2rayNG 读取通用订阅；小火箭是独立开发的 iOS 应用，有自己的配置方式，同时支持导入多种订阅格式。

所以选客户端最重要的一步，是确认它能读取你要复制的那种订阅。“支持 SS 协议”不代表任何格式都能直接导入，格式不匹配时，常见的结果是解析失败或节点列表为空。各个名词的含义，可以看[客户端、订阅链接和节点分别是什么](/guides/network-basics/)。

## 按使用习惯选：规则分流还是节点列表

同一台设备往往有两种选择，区别主要在使用习惯：

- **想装好就不用多管**：选 Clash 系客户端（Clash Party、Clash Verge Rev、Clash Meta for Android）。Clash 订阅自带代理组和分流规则，导入后选好节点、保持规则模式即可；自动选择类的代理组还能在节点不可用时自己切换。
- **喜欢自己挑节点**：选 v2rayN 或 v2rayNG。界面就是一张节点列表，测完延迟手动选中即可，分流规则在客户端里用预设方案设置。
- **iPhone 和 iPad**：选择相对少，直接用小火箭，规则分流和手动选节点它都能兼顾。

拿不准的话，先按上面的对照表装一个，用顺手了再说。之后想换，向客服要一条对应格式的订阅链接重新导入即可。

## Windows 电脑

**Clash Party** 是一款开源的 mihomo 图形客户端，以 GPL-3.0 协议发布，内置 mihomo 与 Smart 内核，支持不装服务模式即可使用的 TUN 模式、配置覆写和 WebDAV 备份，常用设置集中在侧边栏，适合大多数人。从项目 GitHub 的 Releases 发布页或项目网站 clashparty.org 下载，步骤见 [Clash Party 教程](/guides/clash-party/)。

**Clash Verge Rev** 同样基于 mihomo，只是界面风格不同，导入方式与其他 Clash 系客户端一致，可以按 [Clash 订阅导入](/guides/clash-subscription/)的通用步骤操作。

**v2rayN** 以节点列表为主，规则在客户端里设置，适合习惯手动挑节点的用户，用的是通用订阅链接，步骤见 [v2rayN 教程](/guides/windows-android-clients/)。

不建议继续使用已经停止维护的 Clash for Windows：它不再获得修复，也可能读不懂新版配置。

## Mac 电脑

Mac 上推荐 **Clash Party**，也可以用 Clash Verge Rev。下载前先点左上角苹果菜单中的“关于本机”：显示 Apple M 系列芯片的，选 Apple 芯片（arm64）版本；显示 Intel 处理器的，选 Intel（x64）版本，选错会无法运行。首次打开如果被系统拦截，确认安装包来自官方渠道后，在“系统设置 → 隐私与安全性”中放行。

已经在 iPhone 上买过小火箭的用户，也可以查看 Mac 上的 App Store 是否能直接安装，兼容设备以商店页面为准。

## Android 手机与平板

**v2rayNG** 读取通用订阅，界面直观，可以从项目的 GitHub 发布页或 Google Play 获取，步骤见 [v2rayNG 教程](/guides/windows-android-clients/)。

**Clash Meta for Android** 由 mihomo 所在的 MetaCubeX 组织维护，以 GPL-3.0 协议开源。根据项目页面，它最低支持 Android 5.0，建议使用 Android 7.0 及以上版本，可以从 GitHub 发布页或 F-Droid 等渠道获取。它读取 Clash 订阅，节点、代理组和规则的概念与电脑端一致，学会一端，另一端很快就能上手，导入方法见 [Clash 订阅导入](/guides/clash-subscription/)中的 Android 小节。

Android 安装包通常按处理器架构区分，近几年的手机大多选 arm64-v8a。首次连接时系统会请求创建 VPN 连接，需要允许；部分机型还要把客户端的电池策略设为不受限制，避免后台被关闭。

## iPhone 与 iPad

iPhone 和 iPad 上常用 **小火箭（Shadowrocket）**。它在 App Store 是付费应用。根据商店页面，它支持 iPhone、iPad 和 Mac，可以按域名、IP 段、GeoIP 等条件设置规则，应用本身不提供任何服务器。

使用小火箭要注意两点：一是认准正版，商店里有名称相近的其他应用，下载前核对开发者和介绍页面；二是它没有在中国大陆地区的 App Store 上架，需要用其他地区的 Apple ID 获取，不要购买来路不明的共享账号。详细步骤见[小火箭教程](/guides/shadowrocket/)。想用其他 iOS 客户端，先问问客服它能不能用、该配哪种订阅链接。

## 多台设备一起用要注意什么

- **设备数量**：灵动云套餐不限设备数量，电脑、手机、平板可以分别导入同一个账号的订阅；
- **流量共用**：所有设备共用同一份套餐流量，设备越多消耗越快，估算用量可以参考套餐选择站的[每月流量估算](https://lingdongyun.best/guides/estimate-traffic)；
- **分别更新**：节点调整后，每台设备都要各自更新一次订阅；
- **保护链接**：每台设备导入的都是你账号专属、带令牌的链接，不要为了方便发给别人。

## 换客户端时注意什么

- 新客户端读取的格式不同（比如从 v2rayN 换到 Clash Party）时，先向客服换一条对应的订阅链接，不能直接沿用旧客户端里的配置文件；
- 先退出旧客户端，或者关闭它的系统代理，两个代理软件同时运行会互相覆盖设置；
- 旧客户端不再使用时，删除其中保存的订阅，减少订阅链接外泄的可能。

## 选好之后

装好客户端后，按首页的[订阅导入三步](/#import)操作：向客服领取订阅链接、导入客户端、选节点并连接。各客户端的按钮位置不同，具体以对应教程为准。
