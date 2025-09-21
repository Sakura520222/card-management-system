#!/bin/bash

# CardKey Manager 系统测试脚本
# 这个脚本将测试整个系统的功能

set -e  # 遇到错误时退出

echo "正在测试 CardKey Manager 系统..."

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

# 检查是否安装了 curl
if ! command -v curl &> /dev/null; then
  echo "错误: 未安装 curl。请先安装 curl。"
  exit 1
fi

# 启动服务
echo "正在启动服务..."
docker-compose up -d

# 等待服务启动
echo "正在等待服务启动..."
sleep 30

# 检查服务状态
echo "检查服务状态:"
docker-compose ps

# 测试 API
echo "测试 API..."
API_BASE_URL="http://localhost:3000"

# 1. 健康检查
echo "1. 健康检查:"
curl -s -X GET "$API_BASE_URL/health" | jq '.'

# 2. 生成新卡密
echo "2. 生成新卡密:"
GENERATE_RESPONSE=$(curl -s -X POST "$API_BASE_URL/api/cards/generate")
echo "$GENERATE_RESPONSE" | jq '.'

# 3. 查询所有卡密
echo "3. 查询所有卡密:"
curl -s -X GET "$API_BASE_URL/api/cards" | jq '.'

echo "系统测试完成。"
