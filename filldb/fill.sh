#!/bin/sh
address="82.146.47.91:5000"

# === fill category (max 4)
# for i in 1 2 3 4
# do
#     curl -v "$address/categories" \
#         -X POST \
#         -H "Content-Type: application/json" \
#         -d @categories/category_$i.json \
#         | jq
# done

# === fill products (max 16)
# for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
# do
#     curl -v "$address/products" \
#         -X POST \
#         -H "Content-Type: application/json" \
#         -d @products/product_$i.json \
#         | jq
# done
