---
title: Hermes Agent 入门
description: 开源 AI Agent 框架 Hermes 安装、配置与基本使用指南
---

# Hermes Agent 入门

## 什么是 Hermes？

Hermes 是一个开源的 AI Agent 框架，让你可以用自然语言和 AI 交互，完成复杂任务。它的核心特点：

- **多平台支持**：CLI、Telegram、Discord、飞书、Slack 等
- **持久记忆**：跨会话记住你的偏好和上下文
- **工具集成**：终端、文件操作、浏览器、代码执行
- **MCP 支持**：通过 MCP 协议接入外部工具
- **定时任务**：自动化工作流
- **子代理**：任务分解和并行执行

## 安装

### 前置要求

- Python 3.10+
- Node.js 18+（用于 MCP 工具）
- uv（Python 包管理器）

### 安装步骤

```bash
# 1. 安装 uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. 安装 Hermes
uv tool install hermes-agent

# 3. 验证安装
hermes --version
```

### 首次启动

```bash
hermes
```

首次启动会引导你配置 API Key 和基本设置。

## 核心概念

### Profile（配置文件）

Hermes 用 Profile 管理不同场景的配置：

```
~/.hermes/profiles/
├── default/          # 默认配置
├── work/             # 工作配置
└── personal/         # 个人配置
```

每个 Profile 有独立的：
- `config.yaml` — 主配置
- `.env` — API Key 等敏感信息
- `skills/` — 技能文件
- `memories/` — 持久记忆

### 切换 Profile

```bash
# 使用特定 profile
hermes --profile work

# 或设置环境变量
export HERMES_PROFILE=work
hermes
```

## 基本使用

### 命令行交互

```bash
# 直接启动
hermes

# 带 prompt 启动
hermes "帮我查看当前目录的文件"

# 执行单个命令
hermes -e "列出所有 Python 文件"
```

### 常用命令

```bash
hermes config show          # 查看当前配置
hermes config set KEY VALUE # 设置配置项
hermes skills list          # 列出可用技能
hermes skills search KEYWORD # 搜索技能
```

## 工具能力

Hermes 内置了丰富的工具：

| 工具 | 功能 |
|------|------|
| `terminal` | 执行 shell 命令 |
| `read_file` | 读取文件内容 |
| `write_file` | 写入文件 |
| `search_files` | 搜索文件 |
| `browser_*` | 浏览器操作 |
| `code_exec` | 执行 Python 代码 |
| `web_search` | 网络搜索 |
| `mcp_fetch` | MCP 工具调用 |

### 示例：读取文件

```
你：读取 README.md 的内容
Hermes：[调用 read_file] [返回文件内容并总结]
```

### 示例：执行代码

```
你：用 Python 计算斐波那契数列前 20 项
Hermes：[调用 code_exec] [返回计算结果]
```

## 记忆系统

Hermes 会记住跨会话的信息：

### 自动记忆

- 你的偏好和习惯
- 项目相关信息
- 常用命令和配置

### 手动记忆

```
你：记住我的 GitHub 用户名是 healthyang
Hermes：[保存到记忆] 已记住你的 GitHub 用户名。
```

### 查看记忆

```
你：我之前告诉过你什么？
Hermes：[读取记忆] 你之前提到过...
```

## MCP 集成

Hermes 原生支持 MCP 协议，可以接入外部工具：

### 配置 MCP Server

编辑 `~/.hermes/profiles/<profile>/config.yaml`：

```yaml
mcp_servers:
  # 文件系统访问
  filesystem:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    timeout: 30

  # GitHub 操作
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"
    timeout: 60

  # 网页抓取
  fetch:
    command: "uvx"
    args: ["mcp-server-fetch", "--ignore-robots-txt"]
    timeout: 30
```

### 使用 MCP 工具

配置完成后，重启 Hermes，MCP 工具会自动注册：

```
你：帮我抓取 https://example.com 的内容
Hermes：[调用 mcp_fetch_fetch] [返回网页内容]
```

## 配置文件详解

### config.yaml 主要配置项

```yaml
# 模型配置
model:
  default: gpt-4
  provider: openai

# 终端配置
terminal:
  backend: local
  timeout: 180

# Web 配置
web:
  search_backend: searxng
  search_url: http://localhost:8080

# 工具集配置
toolsets:
  - hermes-cli

# MCP 服务器
mcp_servers:
  fetch:
    command: "uvx"
    args: ["mcp-server-fetch"]
    timeout: 30
```

## 下一步

- [Hermes 自动化实战](/ai-apps/hermes-auto) — 定时任务、子代理、多平台协作
- [Hermes 官方文档](https://hermes.nousresearch.com)
- [Hermes GitHub](https://github.com/NousResearch/hermes-agent)

---

*上一篇：[MCP Server 实战](/ai-apps/mcp-server)*
*下一篇：[Hermes 自动化实战](/ai-apps/hermes-auto)*
