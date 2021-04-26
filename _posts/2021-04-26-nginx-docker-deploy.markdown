---
layout: post
title: "nginx docker deploy"
date: "2021-04-26 14:57:11 +0800"
---
#### 配置nginx.conf文件
```
vi nginx.conf
```
nginx.conf 中配置server,示例如下：

```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    server {
        listen 80;
        server_name vuetest;

        location / {
             root /www;
        }
    }
    include /etc/nginx/conf.d/*.conf;
}
```
#### 将DIST压缩文件拷入docker服务器进行解压：
```
unzip dist.zip
```
#### 运行容器
在docker服务器中启动容器，将解压的dist目录挂到容器www目录下：
```
docker run -it -v /root/dist:/www -p:10086:80 nginx /bin/bash
```
#### 向容器中拷贝nginx配置文件
```
docker cp nginx.conf 容器ID:/etc/nginx/cd /etc/nginx/
```
#### 进入容器中启动nginx
```
nginx -c nginx.conf
nginx -s reload
```
