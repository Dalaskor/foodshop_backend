#!/bin/sh
address="localhost:5000"

# === fill category
# curl -v "$address/categories" \
#     -X POST \
#     -H "Content-Type: application/json" \
#     -d @categories/category_4.json \
#     | jq

# === fill products
curl -v "$address/products" \
    -X POST \
    -H "Content-Type: application/json" \
    -d @products/product_16.json \
    | jq
