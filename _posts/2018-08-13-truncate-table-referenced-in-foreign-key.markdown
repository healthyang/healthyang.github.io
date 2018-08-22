---
layout: post
title: "mysql清空带外键的表"
date: "2018-08-13 15:38:41 +0800"
---

关闭外键约束后，然后清空表：

    set foreign_key_checks=0;
    truncate table ...;
    set foreign_key_checks=1;
