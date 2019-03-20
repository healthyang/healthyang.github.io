---
layout: post
title: "github 删除commit"
date: "2019-03-20 11:02:21 +0800"
---


查到前一个commit ID，然后编辑文件修改为drop，命令如下：
```
git log
git rebase -i (commit id)
git push origin (branch-name) --force
```
