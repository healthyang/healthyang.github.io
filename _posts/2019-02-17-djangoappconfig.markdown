---
layout: post
title: "在django的admin界面中实现应用名称显示中文"
date: "2019-02-17 19:43:34 +0800"
---

修改app.py中设置：

```
from django.apps import AppConfig
#设置常量
VERBOSE_APP_NAME = "博客管理"

class BlogConfig(AppConfig):
    name = 'blog'
#在类中定义verbose_name
    verbose_name =VERBOSE_APP_NAME
```

setting.py中设置：
```
INSTALLED_APPS = [
...
#修改为类的路径
    'blog.apps.BlogConfig',
...
]
```
