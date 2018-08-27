---
layout: post
title: "安装mysqlclient报错处理方法"
date: "2018-08-27 12:07:52 +0800"
---

python3安装mysqlclient时 报无法找到mysql_config文件，经安装两个软件包解决：

```
sudo apt install libmysqlclient-dev python3-dev
pip install mysqlclient
```
问题解决。
