---
layout: post
title: "在ubnutu上架设ipsec"
date: "2018-10-09 17:07:13 +0800"
---

#### 安装strongswan软件

     sudo apt update
     sudo apt install strongswan


#### 配置/etc/ipsec.conf

```
     conn net-net
             left=192.168.183.131
             leftsubnet=10.1.0.0/16
     #       leftid=@moon.strongswan.org
             leftfirewall=yes
             right=192.168.183.132
             rightsubnet=10.2.0.0/16
     #       rightid=@sun.strongswan.org
             auto=route
             authby=psk
```

#### 配置/etc/ipsec.secrets

    %any %any : PSK "yourPassword123"

#### 启动

    ipsec restart
    ipsec up net-net

参考链接：
https://www.strongswan.org
