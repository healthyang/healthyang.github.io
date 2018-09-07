---
layout: post
title: "本地项目上传到github"
date: "2018-08-24 16:10:02 +0800"
---

#### 在本地项目目录下运行

    git init

#### 编辑 .gitignore 文件
#### 本地项目添加到本地GIT库中

    git add .
    git commit -m 'init'

#### 在github上新建一个repository
#### 将本地仓库和远程仓库进行关联

    git remote add origin

#### 将本地仓库推送到github

    git push -u origin master


- 参考链接：

https://blog.csdn.net/zamamiro/article/details/70172900
