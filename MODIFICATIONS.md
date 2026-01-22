# 修改记录

## 目标
- 保留单一工具 `perplexity_ask`，删除其他工具与相关代码
- 默认 API endpoint 指向 OpenRouter
- 默认模型为 `perplexity/sonar`
- 删除测试文件
- 更新包名与 MCP 元数据为 `@zhangyu1818/server-perplexity-ask`

## 功能与实现改动
- `perplexity_ask` 仅调用聊天完成接口
- 删除 `perplexity_search` / `perplexity_research` / `perplexity_reason` 及其实现逻辑
- 新增环境变量默认值:
  - `API_ENDPOINT=https://openrouter.ai/api/v1/chat/completions`
  - `MODEL=perplexity/sonar`
- 保持 `PERPLEXITY_API_KEY` 为必填

## 代码变更文件
- `src/server.ts`
  - 移除搜索/研究/推理工具与相关输入输出 schema
  - 聊天请求改为读取 `API_ENDPOINT` 与 `MODEL`
  - 更新 MCP server name 为 `io.github.zhangyu1818/server-perplexity-ask`
- `src/types.ts`
  - 删除搜索相关类型
- `src/validation.ts`
  - 删除搜索相关 schema

## 文档与元数据
- `README.md`
  - 仅保留 `perplexity_ask` 说明
  - 更新安装命令、示例配置、npm badge
  - 添加 `API_ENDPOINT`、`MODEL` 说明
- `package.json`
  - 包名变更为 `@zhangyu1818/server-perplexity-ask`
  - mcpName 变更为 `io.github.zhangyu1818/server-perplexity-ask`
- `server.json`
  - 更新 name/title/description 与 npm identifier
- `.claude-plugin/marketplace.json`
  - 更新描述与安装 args

## 删除文件
- `src/index.test.ts`
- `src/server.test.ts`
- `src/transport.test.ts`
