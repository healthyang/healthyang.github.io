# Dify 工作流平台

Dify 是一个开源的 AI 应用开发平台，支持 RAG、Agent、工作流编排等功能。

## Dify 的核心能力

- 🤖 **AI Agent**：构建智能助手
- 📚 **知识库管理**：上传文档，构建私有知识库
- 🔄 **工作流编排**：可视化编排 AI 流程
- 🌐 **API 服务**：快速构建 AI 应用 API

## 部署 Dify

### 环境要求

- Docker + Docker Compose
- 4GB+ 内存
- 20GB+ 磁盘空间

### 部署步骤

```bash
# 克隆仓库
git clone https://github.com/langgenius/dify.git
cd dify/docker

# 复制环境配置
cp .env.example .env

# 启动服务
docker compose up -d

# 查看状态
docker compose ps
```

### 访问 Dify

打开浏览器访问：`http://your-server`

首次访问需要设置管理员账号。

## 基础配置

### 1. 配置模型

在 Dify 控制台中配置 LLM 模型：

- OpenAI API
- 本地模型（通过 API）
- 其他兼容 API

### 2. 创建知识库

1. 进入「知识库」页面
2. 上传文档（支持 PDF、Word、Markdown 等）
3. 等待索引完成
4. 测试检索效果

### 3. 构建应用

#### 聊天助手
```
用户输入 → LLM 处理 → 生成回答
```

#### 知识库问答
```
用户问题 → 知识库检索 → 上下文增强 → LLM 回答
```

#### 工作流
```
触发条件 → 多步骤处理 → 最终输出
```

## 实用技巧

### 1. 提示词优化

```
# 好的提示词结构
1. 角色定义：你是一个专业的...
2. 任务描述：请帮我...
3. 输出格式：请以...格式输出
4. 约束条件：注意...
```

### 2. 知识库优化

- 文档分块不要太小（建议 500-1000 字）
- 添加元数据提高检索精度
- 定期更新知识库内容

### 3. 工作流设计

- 保持流程简洁
- 添加错误处理
- 记录关键节点日志

## 常见问题

### Q: 如何接入本地 LLM？

在 Dify 中配置 OpenAI 兼容 API：

```
API Base URL: http://localhost:8000/v1
API Key: your-api-key
```

### Q: 知识库检索效果不好？

- 调整分块大小
- 优化文档内容结构
- 尝试不同的检索策略

### Q: 如何备份数据？

```bash
# 备份数据库
docker compose exec db pg_dump -U postgres dify > backup.sql

# 备份上传文件
tar -czf dify-files.tar.gz volumes/app/storage
```

## 相关资源

- [Dify 官方文档](https://docs.dify.ai/)
- [Dify GitHub](https://github.com/langgenius/dify)
