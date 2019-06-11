#!/bin/bash

curl 'https://api.netlify.com/api/v1/sites/b75510a9-302c-4ceb-848c-c9f517ae0152/builds' \
  -H 'Origin: https://app.netlify.com' \
  -H "Authorization: Bearer $NETLIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  --data-binary "{\"clear_cache\":false}" \
  | jq .
