# 环境搭建

本指南帮助你从零开始搭建 AI 开发环境。

## 基础环境

### 1. Node.js 安装

VitePress 需要 Node.js 18+：

```bash
# 使用 nvm 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22

# 验证
node --version  # 应该显示 v22.x.x
npm --version
```

### 2. Git 配置

```bash
# 配置用户信息
git config --global user.name "healthyang"
git config --global user.email "healthyang@users.noreply.github.com"

# 配置凭证存储
git config --global credential.helper store
```

### 3. GitHub CLI (可选)

```bash
# 安装 gh CLI
# Linux
sudo apt install gh

# 登录
gh auth login
```

## AI 开发环境

### Python 环境

```bash
# 安装 Python 3.10+
sudo apt install python3 python3-pip

# 创建虚拟环境
python3 -m venv ai-env
source ai-env/bin/activate
```

### Docker 环境

许多 AI 应用需要 Docker：

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 将用户添加到 docker 组
sudo usermod -aG docker $USER
newgrp docker

# 验证
docker --version
docker compose version
```

## 下一步

环境准备好后，可以开始 [基础概念](/guide/concepts) 学习，或者直接进入 [AI 应用实战](/ai-apps/)。
