# SearXNG 隐私搜索引擎

SearXNG 是一个隐私保护的元搜索引擎，可以聚合多个搜索引擎的结果。

## 为什么选择 SearXNG？

- 🔒 **隐私保护**：不追踪用户，不存储搜索记录
- 🔍 **多引擎聚合**：支持 70+ 搜索引擎
- 🌐 **自托管**：完全掌控数据
- ⚡ **轻量级**：资源占用小

## 环境要求

- Docker + Docker Compose
- 1GB+ 内存
- 网络访问（用于搜索）

## 部署步骤

### 1. 创建项目目录

```bash
mkdir -p ~/searxng
cd ~/searxng
```

### 2. 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  searxng:
    image: searxng/searxng:latest
    container_name: searxng
    ports:
      - "8090:8080"
    volumes:
      - ./settings.yml:/etc/searxng/settings.yml
    environment:
      - SEARXNG_BASE_URL=http://localhost:8090/
    restart: unless-stopped
```

### 3. 创建配置文件 settings.yml

```yaml
use_default_settings: true

general:
  instance_name: "AI 学习搜索"
  debug: false

search:
  safe_search: 0
  autocomplete: "google"
  default_lang: "zh-CN"

server:
  secret_key: "your-secret-key-here"
  bind_address: "0.0.0.0"
  port: 8080

engines:
  - name: baidu
    engine: baidu
    shortcut: bd
    disabled: false
    
  - name: bing
    engine: bing
    shortcut: bi
    disabled: false
    
  - name: sogou
    engine: sogou
    shortcut: sg
    disabled: false
```

### 4. 启动服务

```bash
docker compose up -d

# 查看日志
docker compose logs -f
```

### 5. 访问测试

打开浏览器访问：`http://your-server:8090`

## 配置优化

### 启用更多引擎

在 `settings.yml` 中添加更多引擎：

```yaml
engines:
  - name: bilibili
    engine: bilibili
    shortcut: bl
    disabled: false
    
  - name: zhihu
    engine: zhihu
    shortcut: zh
    disabled: false
```

### 配置代理（可选）

如果需要通过代理访问某些引擎：

```yaml
outgoing:
  proxies:
    all://:
      - socks5h://proxy:port
```

## 使用技巧

### 1. 快捷搜索

在浏览器地址栏设置快捷搜索：

```
http://your-server:8090/search?q=%s
```

### 2. API 调用

```bash
curl "http://your-server:8090/search?q=AI&format=json"
```

### 3. 与 AI 助手集成

SearXNG 可以作为 AI 助手的搜索后端，提供实时信息检索能力。

## 常见问题

### Q: 搜索结果为空？

检查网络连接和引擎配置，确保引擎未被禁用。

### Q: 访问速度慢？

- 选择响应快的引擎
- 减少同时启用的引擎数量
- 配置缓存

### Q: 如何更新？

```bash
docker compose pull
docker compose up -d
```

## 相关资源

- [SearXNG 官方文档](https://docs.searxng.org/)
- [SearXNG GitHub](https://github.com/searxng/searxng)
