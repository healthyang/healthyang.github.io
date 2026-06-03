---
title: MCP Server 实战
description: 从零写一个 MCP Fetch Server，掌握 MCP Server 开发全流程
---

# MCP Server 实战

## 目标

本文带你从零搭建一个可用的 MCP Fetch Server，掌握 MCP Server 的开发、调试和部署全流程。

## 环境准备

```bash
# 确保有 Python 3.10+
python3 --version

# 安装 uv（Python 包管理器）
curl -LsSf https://astral.sh/uv/install.sh | sh

# 验证
uvx --version
```

## 方式一：用现成的 Fetch Server

最快的方式，一行命令启动：

```bash
# 安装并运行
uvx mcp-server-fetch

# 带参数：忽略 robots.txt
uvx mcp-server-fetch --ignore-robots-txt
```

### 手动测试

用 JSON-RPC 消息和 Server 通信：

```python
import subprocess, json

proc = subprocess.Popen(
    ['uvx', 'mcp-server-fetch'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# 1. 初始化握手
init = json.dumps({
    'jsonrpc': '2.0',
    'method': 'initialize',
    'params': {
        'protocolVersion': '2025-03-26',
        'capabilities': {},
        'clientInfo': {'name': 'test', 'version': '1.0'}
    },
    'id': 1
})
proc.stdin.write((init + '\n').encode())
proc.stdin.flush()

response = proc.stdout.readline()
print('Server 响应:', json.loads(response.decode())['result']['serverInfo'])

# 2. 发送 initialized 通知
proc.stdin.write((json.dumps({
    'jsonrpc': '2.0',
    'method': 'notifications/initialized'
}) + '\n').encode())
proc.stdin.flush()

# 3. 列出可用工具
proc.stdin.write((json.dumps({
    'jsonrpc': '2.0',
    'method': 'tools/list',
    'id': 2
}) + '\n').encode())
proc.stdin.flush()

tools = json.loads(proc.stdout.readline().decode())
for tool in tools['result']['tools']:
    print(f"工具: {tool['name']} — {tool['description']}")

proc.terminate()
```

输出：

```
Server 响应: {'name': 'mcp-fetch', 'version': '1.27.2'}
工具: fetch — Fetches a URL from the internet...
```

## 方式二：从零写一个 MCP Server

### 使用 Python SDK

```bash
pip install mcp
```

### 最小示例：天气查询 Server

```python
# weather_server.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather-server")

@mcp.tool()
def get_weather(city: str) -> str:
    """获取指定城市的天气信息
    
    Args:
        city: 城市名称
    """
    # 实际项目中调用真实天气 API
    return f"{city} 今天晴天，温度 25°C"

@mcp.resource("weather://forecast")
def weather_forecast() -> str:
    """返回未来一周天气预报"""
    return "未来七天：晴转多云，20-30°C"

if __name__ == "__main__":
    mcp.run()
```

### 运行

```bash
# 用 uvx 直接运行
uvx run --with mcp weather_server.py

# 或者用 Python 直接运行
python weather_server.py
```

## 配置到客户端

### Claude Desktop

```json
{
  "mcpServers": {
    "weather": {
      "command": "uvx",
      "args": ["run", "--with", "mcp", "/path/to/weather_server.py"]
    }
  }
}
```

### Hermes Agent

```yaml
mcp_servers:
  weather:
    command: "uvx"
    args: ["run", "--with", "mcp", "/path/to/weather_server.py"]
    timeout: 30
```

## 调试工具：MCP Inspector

```bash
npx @modelcontextprotocol/inspector uvx run --with mcp weather_server.py
```

浏览器打开后可以：
- 查看 Server 初始化是否成功
- 测试工具调用
- 检查参数校验
- 查看返回结果

## 开发注意事项

### 1. 工具描述要写好

```python
# 不好
@mcp.tool()
def query(sql: str) -> str:
    """查询数据库"""

# 好
@mcp.tool()
def get_user_by_id(user_id: int) -> str:
    """根据用户 ID 查询用户信息
    
    Args:
        user_id: 用户 ID（正整数）
    
    Returns:
        用户信息 JSON 字符串
    
    注意：仅支持查询，不支持写入
    """
```

### 2. 不要往 stdout 打日志

stdio 模式下，stdout 是 JSON-RPC 消息通道。`print()` 会污染消息流。

```python
# 错误
print("debug info")  # 会破坏协议

# 正确
import sys
print("debug info", file=sys.stderr)  # 日志走 stderr
```

### 3. 大文件要分块

```python
@mcp.tool()
def read_large_file(path: str, offset: int = 0, limit: int = 1000) -> str:
    """分块读取大文件
    
    Args:
        path: 文件路径
        offset: 起始行号
        limit: 最大行数
    """
    # 先返回元数据，再按需加载
```

### 4. 权限要限制

```python
# 允许任意路径（不安全）
@mcp.tool()
def read_file(path: str) -> str:
    """读取文件"""

# 限制目录（推荐）
ALLOWED_DIRS = ["/home/user/projects", "/tmp"]

@mcp.tool()
def read_file(path: str) -> str:
    """读取文件（仅允许特定目录）"""
    if not any(path.startswith(d) for d in ALLOWED_DIRS):
        return "Error: 访问被拒绝"
```

## 完整项目结构

```
my-mcp-server/
├── server.py          # Server 主文件
├── tools/             # 工具模块
│   ├── __init__.py
│   ├── weather.py
│   └── database.py
├── resources/         # 资源模块
├── requirements.txt
└── README.md
```

## 总结

| 步骤 | 工具 | 说明 |
|------|------|------|
| 开发 | FastMCP | Python SDK，快速搭建 |
| 调试 | MCP Inspector | 可视化测试工具 |
| 部署 | stdio / HTTP | 本地或远程运行 |
| 集成 | config.yaml | 配置到 Host |

---

*上一篇：[MCP 协议入门](/ai-apps/mcp-intro)*
*下一篇：[Hermes Agent 入门](/ai-apps/hermes-intro)*
