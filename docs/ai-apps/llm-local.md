# LLM 本地部署

本地部署大语言模型可以保护隐私、降低延迟，还能离线使用。

## 常见部署方案

| 方案 | 适用场景 | 硬件要求 |
|------|----------|----------|
| llama.cpp | CPU 推理 | 8GB+ RAM |
| vLLM | 高并发服务 | GPU 服务器 |
| Ollama | 个人使用 | 8GB+ RAM |
| text-generation-webui | 图形界面 | GPU 推荐 |

## Ollama 快速部署

Ollama 是最简单的本地 LLM 部署方案。

### 安装 Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 下载模型

```bash
# 下载 Qwen 2.5（中文优化）
ollama pull qwen2.5:7b

# 下载 Llama 3
ollama pull llama3:8b

# 查看已下载模型
ollama list
```

### 运行模型

```bash
# 交互模式
ollama run qwen2.5:7b

# API 模式（默认端口 11434）
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "你好，请介绍一下自己"
}'
```

## llama.cpp 部署

适合 CPU 推理，资源占用低。

### 编译安装

```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make -j$(nproc)
```

### 下载 GGUF 模型

```bash
# 从 HuggingFace 下载量化模型
# 推荐 Q4_K_M 量化版本，平衡性能和质量
```

### 运行推理

```bash
./main -m models/model.gguf -p "你好" -n 100
```

## vLLM 部署

适合 GPU 服务器，高并发场景。

### 环境要求

- NVIDIA GPU（16GB+ 显存）
- CUDA 11.8+
- Python 3.10+

### 安装 vLLM

```bash
pip install vllm
```

### 启动服务

```bash
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-7B-Instruct \
  --host 0.0.0.0 \
  --port 8000
```

### API 调用

```bash
curl http://localhost:8000/v1/chat/completions -H "Content-Type: application/json" -d '{
  "model": "Qwen/Qwen2.5-7B-Instruct",
  "messages": [{"role": "user", "content": "你好"}]
}'
```

## 模型选择建议

### 中文场景
- **Qwen 2.5**：中文能力强，推荐首选
- **DeepSeek**：性价比高

### 英文场景
- **Llama 3**：Meta 出品，社区活跃
- **Mistral**：轻量高效

### 代码生成
- **DeepSeek Coder**：代码专用
- **CodeLlama**：代码补全

## 性能优化

### 1. 量化压缩

使用量化模型减少内存占用：

```
FP16 → Q8 → Q4 → Q2（质量递减，速度递增）
推荐：Q4_K_M 平衡点
```

### 2. 批处理优化

```python
# vLLM 批处理配置
--max-num-seqs 16  # 最大并发数
--max-model-len 4096  # 最大上下文长度
```

### 3. 缓存加速

启用 KV Cache 减少重复计算。

## 常见问题

### Q: 显存不足？

- 使用更小的模型
- 启用量化
- 减小上下文长度

### Q: 推理速度慢？

- 使用 GPU 加速
- 选择更小的模型
- 优化批处理大小

### Q: 如何评估模型质量？

- 使用标准基准测试
- 实际场景测试
- A/B 对比测试

## 相关资源

- [Ollama 官网](https://ollama.com/)
- [llama.cpp GitHub](https://github.com/ggerganov/llama.cpp)
- [vLLM GitHub](https://github.com/vllm-project/vllm)
