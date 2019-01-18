---
layout: post
title: "django更改为使用mysql"
date: "2018-08-08 16:59:05 +0800"
---

#### 环境准备

    sudo apt-get install mysql-server
    sudo apt-get install libmysqlclient-dev
    pip3 install mysqlclient --user

保证mysql访问正常。可创建数据库和用户，命令如下：

    mysql> CREATE DATABASE IF NOT EXISTS mysite DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
    mysql> CREATE USER 'username'@'host' IDENTIFIED BY 'password';
    mysql> grant all privileges on mq.* to test@localhost identified by '1234';
    

#### 修改django 数据库配置

```
DATABASES = {
    'slave': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mysite',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    },
}
```

#### 使用命令在mysql中创建空的数据库结构

    python3 manage.py makemigrations
    python3 manage.py migrate

#### 用python脚本进行内容迁移

```
# -*- coding:utf-8 -*-
from __future__ import unicode_literals

from django.contrib.contenttypes.models import ContentType

def run():
    failed_list = []

    def do(table):
        if table is not None:
            try:
                table_objects = table.objects.all()
                for i in table_objects:
                    i.save(using='slave')
            except:
                failed_list.append(table)

    ContentType.objects.using('slave').all().delete()

    for i in ContentType.objects.all():
        do(i.model_class())

    while failed_list:
        table = failed_list.pop(0)
        do(table)
```
最后，将mysql切换为主数据库，大功告成。

#### 参考链接：

- [基本方法][voidcn]
- [对基本方法进行了更新改进][cnblogs]


[voidcn]:http://www.voidcn.com/article/p-hesvaooz-ru.html
[cnblogs]:https://www.cnblogs.com/rkfeng/p/7800730.html
