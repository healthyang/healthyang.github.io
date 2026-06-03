---
title: MCP 协议入门
description: Model Context Protocol 全面解析 — 从问题到架构到实战
---

# MCP 协议入门

## 为什么需要 MCP？

假设你做了一个 AI Agent，需要让它读文件、查 GitHub、连数据库。你用 Claude Desktop 配了一套工具，换到 Cursor 又要重新配，自己写 Agent 时还得再封装一层。

**工具少的时候能忍，工具一多，维护成本爆炸**：参数变了要改，鉴权变了要改，宿主换了还要改。

MCP（Model Context Protocol）解决的就是**工具接入的碎片化问题**。

> 💡 **类比**：没有 USB-C 之前，每个设备一种充电线。没有 MCP 之前，每个 AI 应用一种工具接入方式。

## MCP、Function Calling、Agent 的关系

这三个概念经常一起出现，但不在同一层：

| 概念 | 解决什么 | 类比 |
|------|----------|------|
| Function Calling | 模型"想调什么工具" | 命令官下指令 |
| MCP | 工具"从哪里来、怎么连" | 标准化通信线路 |
| Agent | 任务"一步步怎么做" | 项目经理调度资源 |

**一句话总结**：Function Calling 让模型"会使用工具"，MCP 让模型"能接入整个工具箱"，Agent 让模型"知道什么时候用哪把工具"。

## MCP 架构

```
┌──────────┐     JSON-RPC 2.0     ┌──────────┐     ┌─────────────┐
│          │ ◄──────────────────► │          │     │             │
│   Host   │      (stdio /        │  Server  │────►│ Data Source │
│  (AI应用) │     Streamable HTTP) │ (工具方)  │     │  (数据源)    │
│          │                      │          │     │             │
└──────────┘                      └──────────┘     └─────────────┘
```

### 三个角色

1. **Host（宿主）**：AI 应用本身（Claude Desktop、Cursor、VS Code AI 插件）
2. **Client（客户端）**：Host 内部负责和 Server 通信的一层
3. **Server（服务端）**：封装具体能力（文件读取、API 调用等）

### Server 暴露的三种能力

- **Resources**：只读上下文（文件、日志、Schema）
- **Tools**：可执行动作（查询数据库、发消息）
- **Prompts**：可复用的提示词模板

## 通信协议：JSON-RPC

MCP 底层用 JSON-RPC 2.0，不是 REST。因为 AI 工具调用天然是"执行某个动作"，JSON-RPC 更贴合。

### 一次完整的调用流程

```
用户提问 → Host 接收 → LLM 判断需要工具 → 输出调用意图
     → Client 包装成 JSON-RPC → Server 执行 → 返回结果
     → LLM 组织回答 → 用户看到结果
```

### 初始化握手

Client 和 Server 正式调用工具前，会先完成初始化握手：

```json
// Client → Server
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-03-26",
    "capabilities": {},
    "clientInfo": { "name": "my-app", "version": "1.0" }
  },
  "id": 1
}
```

很多"Server 配好了但工具没出现"的问题，都是握手阶段失败了。

## 两种传输方式

| | stdio | Streamable HTTP |
|--|-------|-----------------|
| 配置 | `command` + `args` | `url` + `headers` |
| 运行位置 | 本地子进程 | 远程服务器 |
| 适合场景 | 个人本地工具 | 团队共享服务 |

**简单选型**：本地用 stdio，远程用 HTTP。

## 参考资料

- [MCP 官方文档](https://modelcontextprotocol.io/introduction)
- [MCP GitHub 仓库](https://github.com/modelcontextprotocol/servers)
- [JavaGuide MCP 详解](https://javaguide.cn/ai/agent/mcp.html)

---

*下一篇：[MCP Server 实战 — 从零写一个 Fetch Server](/ai-apps/mcp-server)*
