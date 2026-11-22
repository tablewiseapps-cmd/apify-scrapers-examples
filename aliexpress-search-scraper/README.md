# AliExpress Search Scraper

AliExpress search results for any keyword: price, original price, discount, rating, units sold, free shipping, Choice and sponsored flags.

**Use it for:** Find best-selling products for dropshipping, compare prices and discounts, and track a product category over time.

- Actor page: [apify.com/tablewise/aliexpress-search-scraper](https://apify.com/tablewise/aliexpress-search-scraper)
- Pricing: $5 per 1,000 products, plus $0.0005 per run. Products without a price and searches with no results are free. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd aliexpress-search-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "searchQueries": [
    "wireless earbuds"
  ],
  "sort": "orders",
  "maxResults": 10
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `search_query`, `position` | the search and the product's place in the results |
| `product_id`, `title`, `url` | the product |
| `price`, `original_price`, `discount_percent`, `currency` | price in the currency you chose (`currency`, default USD) |
| `rating`, `sold_count` | stars and units sold |
| `free_shipping`, `is_choice`, `is_sponsored` | flags shown in the results |
| `image_url`, `images` | product images |
| `status` | `ok`, or why a search gave no products (`status_message`) |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
