---
layout: post
title: "linux配置成路由器"
date: "2018-08-09 16:27:40 +0800"
---

#### 开启ip转发

配置两个网卡，一个接内网，一个接外网。
编辑/etc/sysctl.conf文件，取消#net.ipv4.ip_forward = 1 的注释符号。

    sudo sysctl -p

#### 用route命令查看修改路由

#### 用iptables 配置nat

```
iptables -F
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```
注：在nat规则表中添加一个规则，该规则将所有外发的数据的源伪装成eth0接口的ip地址。

#### 参考链接：

https://blog.csdn.net/csfreebird/article/details/4560642
