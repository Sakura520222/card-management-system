# 卡密管理系统使用教程

本教程将详细介绍如何启动卡密管理系统以及如何使用其API接口。

## 目录

1. [系统启动](#系统启动)
2. [API接口使用](#api接口使用)
3. [用户上下文功能](#用户上下文功能)
4. [常见问题](#常见问题)

## 系统启动

### 启动开发环境

1. 确保已安装 Docker 和 Docker Compose
2. 进入项目根目录：
   ```bash
   cd cardkey-manager
   ```
3. 启动所有服务：
   ```bash
   ./start.sh
   ```
   或者手动启动：
   ```bash
   docker-compose up -d
   ```

4. 验证服务启动：
   - 前端界面：http://localhost
   - 后端 API：http://localhost:3000
   - 数据库：localhost:3306

### 启动生产环境

1. 使用生产环境配置启动：
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. 生产环境配置文件：
   - `backend/.env.prod`：后端生产环境变量
   - `frontend/.env.prod`：前端生产环境变量

## API接口使用

### 基本API调用示例

系统提供了一个示例脚本 `api_examples.sh` 来演示如何调用API：

```bash
chmod +x api_examples.sh
./api_examples.sh
```

### 手动调用API

#### 1. 健康检查

检查服务是否正常运行：

```bash
curl -X GET http://localhost:3000/health
```

响应示例：
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

#### 2. 生成新卡密

生成一个新的卡密：

```bash
curl -X POST http://localhost:3000/api/cards/generate
```

响应示例：
```json
{
  "message": "Card generated successfully",
  "card": {
    "id": 1,
    "card_code": "ABCDEFGHIJKLMNOPQRSTUVWXYZ-2025-09-21",
    "generated_date": "2025-09-21"
  }
}
```

#### 3. 查询特定卡密

根据卡密代码查询特定卡密：

```bash
curl -X GET http://localhost:3000/api/cards/ABCDEFGHIJKLMNOPQRSTUVWXYZ-2025-09-21
```

响应示例：
```json
{
  "card": {
    "id": 1,
    "card_code": "ABCDEFGHIJKLMNOPQRSTUVWXYZ-2025-09-21",
    "generated_date": "2025-09-21",
    "is_used": 0,
    "created_at": "2025-09-21T10:00:00.000Z"
  }
}
```

#### 4. 查询所有卡密

获取所有卡密列表，支持分页：

```bash
curl -X GET "http://localhost:3000/api/cards?page=1&limit=10"
```

响应示例：
```json
{
  "cards": [
    {
      "id": 1,
      "card_code": "ABCDEFGHIJKLMNOPQRSTUVWXYZ-2025-09-21",
      "generated_date": "2025-09-21",
      "is_used": 0,
      "created_at": "2025-09-21T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

## 用户上下文功能

系统集成了用户上下文功能，在前端界面中显示当前用户的信息。

### 前端用户上下文

在界面的顶部导航栏中，会显示当前用户的用户名 "Sakura520222"。

在卡密生成和列表页面中，也会显示当前用户的用户名，以确保用户知道自己正在操作的是哪个账户的数据。

### API中的用户上下文

虽然当前 API 实现主要在前端界面中显示用户上下文信息，但在实际应用中，后端可以扩展以支持用户关联的卡密管理。

#### 生成关联用户的卡密

```bash
curl -X POST http://localhost:3000/api/cards/generate \
     -H "Content-Type: application/json" \
     -d '{"username": "Sakura520222"}'
```

#### 查询特定用户的卡密

```bash
curl -X GET "http://localhost:3000/api/cards?username=Sakura520222"
```

## 常见问题

### 1. 服务启动失败

检查以下几点：
- Docker 和 Docker Compose 是否正确安装
- 端口是否被占用
- 环境变量配置是否正确

### 2. 无法访问前端界面

检查以下几点：
- 前端容器是否正常运行：`docker-compose logs frontend`
- 网络连接是否正常
- 防火墙设置是否正确

### 3. API 调用失败

检查以下几点：
- 后端容器是否正常运行：`docker-compose logs backend`
- 数据库连接是否正常
- API 地址是否正确

### 4. 数据库连接问题

检查以下几点：
- 数据库容器是否正常运行：`docker-compose logs mysql`
- 数据库配置是否正确
- 数据库用户权限是否正确

通过以上步骤，您应该能够成功启动和使用卡密管理系统。如果遇到其他问题，请查看各服务的日志文件以获取更多信息。