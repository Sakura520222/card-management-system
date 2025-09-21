#!/bin/bash

# CardKey Manager 停止脚本
# 这个脚本将停止整个卡密生成与管理系统

set -e  # 遇到错误时退出

echo "正在停止 CardKey Manager 系统..."

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

# 停止所有服务
echo "正在停止所有服务..."
docker-compose down

echo "系统已停止。"
echo "如需完全删除数据卷，请运行: docker-compose down -v"
