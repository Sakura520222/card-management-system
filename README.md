# 卡密生成与管理系统

这是一套完整的卡密生成与管理系统，包含前端、后端和 MySQL 数据库，并支持 Docker 部署。

## 系统特性

- 生成格式为 `xxxxxxxxxxxx-xxx` 的卡密（前部分为26位随机大写字母，后部分为当前日期）
- 提供 API 接口用于卡密的生成与查询
- 支持 Docker 容器化部署
- 前后端分离架构
- 响应式设计，支持移动端访问
- 用户上下文功能，显示当前用户信息（用户名：Sakura520222）

## 技术栈

- 前端：React
- 后端：Node.js + Express
- 数据库：MySQL
- 部署：Docker & Docker Compose

## 项目结构

```
cardkey-manager/
├── backend/          # 后端服务
│   ├── routes/       # API 路由
│   ├── tests/        # 测试文件
│   ├── cardGenerator.js  # 卡密生成逻辑
│   ├── database.js   # 数据库连接
│   ├── server.js     # 服务入口
│   ├── package.json  # 后端依赖
│   └── Dockerfile    # 后端 Docker 配置
├── frontend/         # 前端应用
│   ├── public/       # 静态资源
│   ├── src/          # 源代码
│   ├── package.json  # 前端依赖
│   └── Dockerfile    # 前端 Docker 配置
├── database/         # 数据库相关文件
│   ├── init.sql      # 数据库初始化脚本
│   ├── schema.sql    # 数据库表结构
│   └── .env          # 数据库环境变量
├── docker-compose.yml # Docker 编排文件
└── README.md         # 项目说明文档
```

## 部署指南

### 环境要求

- Docker 18.09 或更高版本
- Docker Compose 1.24 或更高版本
- Ubuntu 18.04 或更高版本（推荐）

### 部署步骤

1. 确保已安装 Docker 和 Docker Compose：
   ```bash
   docker --version
   docker-compose --version
   ```

2. 克隆本项目：
   ```bash
   git clone <项目地址>
   cd cardkey-manager
   ```

3. （可选）根据需要修改环境变量：
   - `database/.env`：数据库配置
   - `backend/.env`：后端配置
   - `frontend/.env`：前端配置

4. 启动所有服务：
   ```bash
   # 方法一：使用 docker-compose 命令
   docker-compose up -d
   
   # 方法二：使用启动脚本
   ./start.sh
   ```

5. 等待服务启动完成（首次启动可能需要几分钟）：
   ```bash
   docker-compose logs -f
   ```

6. 访问应用：
   - 前端界面：`http://localhost`
   - 后端 API：`http://localhost:3000`
   - 数据库：`localhost:3306`（仅限容器内部访问）

### 用户上下文功能

部署完成后，前端界面将显示用户上下文信息，包括当前登录用户的用户名 "Sakura520222"。该用户名会显示在界面顶部导航栏中，并在卡密生成和列表页面中显示，以确保用户知道自己正在操作的是哪个账户的数据。

### 停止服务

```bash
# 方法一：使用 docker-compose 命令
docker-compose down

# 方法二：使用停止脚本
./stop.sh
```

### 停止服务

```bash
docker-compose down
```

### 查看服务状态

```bash
docker-compose ps
```

## API 接口

### 生成新卡密

- **URL**: `POST /api/cards/generate`
- **描述**: 生成一个新的卡密
- **响应示例**:
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

### 获取所有卡密

- **URL**: `GET /api/cards`
- **参数**:
  - `page` (可选): 页码，默认为 1
  - `limit` (可选): 每页数量，默认为 10
- **描述**: 获取所有卡密列表，支持分页
- **响应示例**:
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

### 根据代码查询特定卡密

- **URL**: `GET /api/cards/:code`
- **描述**: 根据卡密代码查询特定卡密
- **响应示例**:
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

### 健康检查

- **URL**: `GET /health`
- **描述**: 检查服务健康状态
- **响应示例**:
  ```json
  {
    "status": "OK",
    "message": "Server is running"
  }
  ```

### 用户上下文 API

虽然用户上下文功能主要在前端界面中显示，但系统设计允许在后端 API 中关联用户信息。在实际应用中，可以通过以下方式扩展 API 以支持用户上下文：

1. 在生成卡密时关联用户：
   ```bash
   curl -X POST http://localhost:3000/api/cards/generate \
        -H "Content-Type: application/json" \
        -d '{"username": "Sakura520222"}'
   ```

2. 查询特定用户的卡密：
   ```bash
   curl -X GET "http://localhost:3000/api/cards?username=Sakura520222"
   ```

## 开发指南

### 后端开发

```bash
cd backend
npm install
npm run dev
```

后端服务将在 `http://localhost:3000` 启动。

### 前端开发

```bash
cd frontend
npm install
npm start
```

前端服务将在 `http://localhost:3000` 启动（开发模式下会代理 API 请求到后端）。

### 数据库

MySQL 数据库在 Docker 容器中运行，默认配置为：
- 主机: localhost
- 端口: 3306
- 数据库名: cardkey_db
- 用户名: cardkey_user
- 密码: cardkey_password

## 测试

### 后端测试

```bash
cd backend
npm test
```

### 前端测试

```bash
cd frontend
npm test
```

## 用户上下文功能

本系统在前端界面中集成了用户上下文功能，用于显示当前登录用户的信息。在界面的顶部导航栏中，会显示当前用户的用户名 "Sakura520222"。

在卡密生成和列表页面中，也会显示当前用户的用户名，以确保用户知道自己正在操作的是哪个账户的数据。

## 部署指南

### Ubuntu 系统部署步骤

1. **安装 Docker 和 Docker Compose**
   ```bash
   # 更新包索引
   sudo apt update
   
   # 安装必要的包
   sudo apt install apt-transport-https ca-certificates curl software-properties-common
   
   # 添加 Docker 官方 GPG 密钥
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   
   # 添加 Docker 官方仓库
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   
   # 更新包索引
   sudo apt update
   
   # 安装 Docker
   sudo apt install docker-ce
   
   # 安装 Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   
   # 添加执行权限
   sudo chmod +x /usr/local/bin/docker-compose
   
   # 验证安装
   docker --version
   docker-compose --version
   ```

2. **克隆项目代码**
   ```bash
   git clone <repository-url>
   cd cardkey-manager
   ```

3. **配置环境变量**
   根据需要修改以下环境变量文件：
   - `database/.env`：数据库配置
   - `backend/.env`：后端服务配置
   - `frontend/.env`：前端配置

4. **启动服务**
   ```bash
   # 给启动脚本添加执行权限
   chmod +x start.sh
   
   # 启动所有服务
   ./start.sh
   ```
   
   或者手动启动：
   ```bash
   docker-compose up -d
   ```

5. **验证部署**
   - 前端界面：http://localhost:80
   - 后端 API：http://localhost:3000
   - 数据库：localhost:3306

6. **停止服务**
   ```bash
   # 使用停止脚本
   chmod +x stop.sh
   ./stop.sh
   
   # 或者手动停止
   docker-compose down
   ```

### 生产环境注意事项

1. 修改默认密码和敏感配置
2. 配置 HTTPS 证书
3. 设置防火墙规则
4. 定期备份数据库
5. 监控系统性能和日志

### 生产环境配置

系统提供了专门的生产环境配置文件：

- `backend/.env.prod`：后端生产环境变量配置
- `frontend/.env.prod`：前端生产环境变量配置
- `docker-compose.prod.yml`：生产环境 Docker Compose 配置

使用生产环境配置启动服务：

```bash
# 使用生产环境配置启动
docker-compose -f docker-compose.prod.yml up -d
```

生产环境配置文件中包含了更适合生产环境的设置，如不同的环境变量、安全配置等。

## 使用教程

有关如何启动系统以及如何调用API的详细教程，请参阅 [USAGE_TUTORIAL.md](USAGE_TUTORIAL.md) 文件。

## 故障排除

1. 如果服务启动失败，请检查：
   - Docker 和 Docker Compose 是否正确安装
   - 端口是否被占用
   - 环境变量配置是否正确

2. 如果无法访问前端界面：
   - 检查前端容器是否正常运行
   - 检查网络连接
   - 查看容器日志：`docker-compose logs frontend`

3. 如果 API 调用失败：
   - 检查后端容器是否正常运行
   - 检查数据库连接
   - 查看容器日志：`docker-compose logs backend`

