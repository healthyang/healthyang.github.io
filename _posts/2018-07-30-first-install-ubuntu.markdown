---
layout: post
title:  "新装ubuntu系统"
date:   2018-07-30 16:16:16 +0800
categories: linux
---

#### 新装 ubuntu时设置root密码并安装SSH

    sudo passwd
    sudo apt-get install openssh-server

#### pip 离线安装方法

**1. 在联网的机器上下载打包安装包：**


    pip list #查看安装的包  
    pip freeze > requirements.txt
    pip download

**2. 将whl格式的安装包** *requirements.txt* **拷到离线机器上**


    pip install --no-index --find-links=[whl包所在文件夹] -r requirements.txt

#### mysql安装方法
[https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/)
