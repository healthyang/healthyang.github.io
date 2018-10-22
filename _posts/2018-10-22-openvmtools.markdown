---
layout: post
title: "open-vm-tools"
date: "2018-10-22 09:52:29 +0800"
---

    sudo apt update
    sudo apt install open-vm-tools
    sudo apt install open-vm-tools-desktop
    sudo apt install open-vm-tools-dkms
    sudo apt install open-vm-tools-dev
    reboot

使用vmhgfs-fuse命令，比如在虚拟机里有个目录 ~/share,终端中切换到家目录，然后：

    vmhgfs-fuse share

此方法适合不是每次都使用共享文件的状况，可以编写一个脚本share.sh放到家目录

    #!/bin/bash
    vmhgfs-fuse share

参考链接：
https://jingyan.baidu.com/article/54b6b9c0982f2f2d593b4762.html
