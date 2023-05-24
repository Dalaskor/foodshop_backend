#!/bin/sh
address="82.146.47.91:5000"

# === fill category (max 4)
# curl -v "$address/categories" \
#     -X POST \
#     -H "Content-Type: application/json" \
#     -d @categories/category_4.json \
#     | jq

# === fill products (max 16)
# curl -v "$address/products" \
#     -X POST \
#     -H "Content-Type: application/json" \
#     -d @products/product_16.json \
#     | jq
