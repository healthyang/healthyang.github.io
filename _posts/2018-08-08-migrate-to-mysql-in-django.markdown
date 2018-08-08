---
layout: post
title: "django更改为使用mysql"
date: "2018-08-08 16:59:05 +0800"
---
#### 环境准备

    sudo apt-get install mysql-server
    sudo apt-get install libmysqlclient-dev
    pip3 install mysqlclient --user

保证mysql访问正常。

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
