#!/bin/bash

# CardKey Manager API 调用示例脚本
# 这个脚本演示了如何使用系统的 API 接口

set -e  # 遇到错误时退出

# 默认 API 地址
API_BASE_URL="http://localhost:3000"
USERNAME="Sakura520222"

echo "CardKey Manager API 调用示例"
echo "=============================="

# 检查是否安装了 curl
if ! command -v curl &> /dev/null; then
  echo "错误: 未安装 curl。请先安装 curl。"
  exit 1
fi

# 1. 健康检查
echo "1. 健康检查:"
curl -s -X GET "$API_BASE_URL/health" | jq '.'
echo ""

# 2. 生成新卡密（无用户上下文）
echo "2. 生成新卡密（无用户上下文）:"
GENERATE_RESPONSE=$(curl -s -X POST "$API_BASE_URL/api/cards/generate")
echo "$GENERATE_RESPONSE" | jq '.'
echo ""

# 提取生成的卡密代码用于后续查询
CARD_CODE=$(echo "$GENERATE_RESPONSE" | jq -r '.card.card_code')

# 3. 查询特定卡密
echo "3. 查询特定卡密 ($CARD_CODE):"
curl -s -X GET "$API_BASE_URL/api/cards/$CARD_CODE" | jq '.'
echo ""

# 4. 查询所有卡密
echo "4. 查询所有卡密 (第1页，每页10条):"
curl -s -X GET "$API_BASE_URL/api/cards?page=1&limit=10" | jq '.'
echo ""

# 5. 生成新卡密（带用户上下文）
echo "5. 生成新卡密（带用户上下文 - 用户: $USERNAME）:"
GENERATE_RESPONSE_USER=$(curl -s -X POST "$API_BASE_URL/api/cards/generate" \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\"}")
echo "$GENERATE_RESPONSE_USER" | jq '.'
echo ""

# 6. 查询特定用户的卡密
echo "6. 查询特定用户的卡密 (用户: $USERNAME):"
curl -s -X GET "$API_BASE_URL/api/cards?username=$USERNAME" | jq '.'
echo ""

echo "API 调用示例完成。"
echo ""
echo "用户上下文功能说明："
echo "虽然当前 API 实现主要在前端界面中显示用户上下文信息，"
echo "但在实际应用中，后端可以扩展以支持用户关联的卡密管理。"
echo "这将允许按用户查询和管理卡密，提供更个性化的服务体验。"
