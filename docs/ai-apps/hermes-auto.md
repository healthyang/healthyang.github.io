---
title: Hermes 自动化实战
description: 定时任务、子代理、多平台协作 — 让 AI 真正自动化
---

# Hermes 自动化实战

## 为什么需要自动化？

AI Agent 不应该只是"问一句答一句"。真正的价值在于：

- **定时执行**：每天早上自动汇总新闻
- **后台监控**：服务器异常自动告警
- **多平台协作**：飞书收到消息，自动处理并回复
- **任务分解**：复杂任务拆分成子任务并行执行

## 定时任务（Cron）

### 创建定时任务

```bash
# 通过 CLI 创建
hermes cron create "每天早上9点发送天气预报" --schedule "0 9 * * *"

# 通过对话创建
你：每天早上9点给我发送今天的天气预报
Hermes：[创建定时任务] 已创建，任务 ID: cron_abc123
```

### 任务配置

定时任务的配置存储在 `~/.hermes/profiles/<profile>/cron/` 目录下。

### 常见调度表达式

| 表达式 | 含义 |
|--------|------|
| `0 9 * * *` | 每天早上 9 点 |
| `*/30 * * * *` | 每 30 分钟 |
| `0 9 * * 1-5` | 工作日早上 9 点 |
| `0 0 1 * *` | 每月 1 号 |

### 管理任务

```bash
hermes cron list           # 列出所有任务
hermes cron status <id>    # 查看任务状态
hermes cron pause <id>     # 暂停任务
hermes cron resume <id>    # 恢复任务
hermes cron delete <id>    # 删除任务
```

### 示例：每日新闻摘要

```
你：创建一个定时任务，每天早上8点抓取 Hacker News 热门文章，生成中文摘要发给我

Hermes：[创建定时任务]
- 调度：0 8 * * *
- 执行：抓取 https://news.ycombinator.com，提取前10条，翻译并摘要
- 投递：发送到当前会话
```

## 子代理（Subagent）

### 什么是子代理？

子代理是 Hermes 可以派生的独立工作进程。复杂任务可以分解成多个子任务，并行执行。

### 使用场景

- 大规模代码审查
- 多文件并行修改
- 复杂研究任务
- 批量数据处理

### 示例：并行代码审查

```
你：审查以下三个文件的代码质量：
1. src/api/handler.go
2. src/models/user.go
3. src/utils/helper.go

Hermes：[派生3个子代理并行审查]
- 子代理1：审查 handler.go
- 子代理2：审查 user.go
- 子代理3：审查 helper.go
[汇总结果] 三个文件的审查报告...
```

### 子代理配置

```yaml
delegation:
  max_concurrent_children: 3    # 最大并行数
  max_spawn_depth: 1            # 最大嵌套深度
  child_timeout_seconds: 600    # 子任务超时时间
  orchestrator_enabled: true    # 启用编排器
```

## 多平台协作

### 飞书集成

配置飞书 Bot 后，Hermes 可以：
- 接收飞书消息并自动回复
- 在飞书群里执行命令
- 发送富文本消息

```yaml
# config.yaml
feishu:
  app_id: "cli_xxx"
  app_secret: "xxx"
```

### Discord 集成

```yaml
discord:
  token: "xxx"
  guild_id: "xxx"
```

### Telegram 集成

```yaml
telegram:
  token: "xxx"
```

## 实战案例

### 案例 1：自动日报生成

**目标**：每天下班前自动生成今日工作总结

**配置**：

```bash
hermes cron create "每日日报" \
  --schedule "0 18 * * 1-5" \
  --prompt "查看今天的 Git 提交记录和终端命令历史，生成工作日报"
```

**执行流程**：

1. 触发定时任务
2. 读取 Git 日志：`git log --since="today"`
3. 读取终端历史
4. 生成结构化日报
5. 发送到指定频道

### 案例 2：服务器监控告警

**目标**：每 5 分钟检查服务器状态，异常时告警

**配置**：

```bash
hermes cron create "服务器监控" \
  --schedule "*/5 * * * *" \
  --script "scripts/check_server.sh" \
  --no-agent  # 纯脚本模式，不调用 LLM
```

**脚本示例**：

```bash
#!/bin/bash
# scripts/check_server.sh
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
MEM=$(free -m | awk 'NR==2{printf "%.1f%%", $3*100/$2}')
DISK=$(df -h / | awk 'NR==2{print $5}')

# 阈值检查
if (( $(echo "$CPU > 80" | bc -l) )); then
    echo "⚠️ CPU 使用率过高: $CPU%"
fi

if (( $(echo "${MEM%%%} > 80" | bc -l) )); then
    echo "⚠️ 内存使用率过高: $MEM"
fi

if (( ${DISK%%%} > 85 )); then
    echo "⚠️ 磁盘使用率过高: $DISK"
fi
```

### 案例 3：文档自动同步

**目标**：Obsidian 笔记自动同步到 GitHub Pages

```bash
hermes cron create "文档同步" \
  --schedule "0 */2 * * *" \
  --prompt "检查 Obsidian vault 是否有更新，如果有，同步到 GitHub Pages 仓库并触发部署"
```

## 高级技巧

### 1. 链式任务

任务 A 的输出作为任务 B 的输入：

```bash
hermes cron create "数据采集" --schedule "0 9 * * *" --prompt "采集今日数据"
hermes cron create "数据分析" --schedule "30 9 * * *" --prompt "分析昨日采集的数据"
```

### 2. 条件执行

```bash
hermes cron create "条件任务" \
  --schedule "0 9 * * *" \
  --prompt "如果昨天有代码提交，生成代码审查报告；否则只记录状态"
```

### 3. 错误重试

```yaml
# cron 配置
retry:
  max_attempts: 3
  delay_seconds: 60
  backoff: exponential
```

### 4. 通知策略

```yaml
notify:
  on_success: false      # 成功不通知
  on_failure: true       # 失败通知
  on_timeout: true       # 超时通知
```

## 监控与调试

### 查看任务日志

```bash
hermes cron logs <task_id> --tail 50
```

### 手动触发

```bash
hermes cron run <task_id>
```

### 调试模式

```bash
hermes cron run <task_id> --debug
```

## 总结

| 功能 | 场景 | 价值 |
|------|------|------|
| 定时任务 | 新闻摘要、日报生成 | 节省重复劳动 |
| 子代理 | 代码审查、批量处理 | 并行提效 |
| 多平台 | 飞书/Discord/Telegram | 随时随地交互 |
| 监控告警 | 服务器状态、服务可用性 | 及时发现问题 |
| 链式任务 | 数据采集 -> 分析 -> 报告 | 复杂工作流 |

**核心原则**：让 AI 做重复性工作，人做创造性工作。

---

*上一篇：[Hermes Agent 入门](/ai-apps/hermes-intro)*
*返回：[AI 应用实战](/ai-apps/)*
