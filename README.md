## Welcome to Akla.top

Building...

### mysql

# mysql安装方法
[https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/)

### Jekyll

[repository settings](https://github.com/healthyang/healthyang.github.io/settings). 

### django
There is django.

### linux

#### 新装 ubuntu

    sudo passwd
    sudo apt-get install openssh-server
#### pip 离线安装方法

**1. 在联网的机器上下载打包安装包：**


    pip list #查看安装的包  
    pip freeze > requirements.txt 
    pip download 

**2. 将whl格式的安装包** *requirements.txt* **拷到离线机器上**


    pip install --no-index --find-links=[whl包所在文件夹] -r requirements.txt