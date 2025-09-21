#!/bin/bash

# CardKey Manager 启动脚本
# 这个脚本将启动整个卡密生成与管理系统

set -e  # 遇到错误时退出

echo "正在启动 CardKey Manager 系统..."

# 检查是否在正确的目录
if [ ! -f "docker-compose.yml" ]; then
  echo "错误: 未找到 docker-compose.yml 文件。请在项目根目录运行此脚本。"
  exit 1
fi

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
  echo "错误: 未安装 Docker。请先安装 Docker。"
  exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
  echo "错误: 未安装 Docker Compose。请先安装 Docker Compose。"
  exit 1
fi

# 构建并启动所有服务
echo "正在构建并启动服务..."
docker-compose up -d

# 等待服务启动
echo "正在等待服务启动..."
sleep 10

# 检查服务状态
echo "检查服务状态:"
docker-compose ps

echo ""
echo "系统启动完成！"
echo "前端界面: http://localhost"
echo "后端 API: http://localhost:3000"
echo "数据库: localhost:3306 (仅容器内部可访问)"
echo ""
echo "如需查看详细日志，请运行: docker-compose logs -f"
