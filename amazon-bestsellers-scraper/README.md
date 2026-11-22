# Amazon Best Sellers Scraper

The top 100 of any Amazon.com Best Sellers or Hot New Releases list, and of its subcategories if you want: rank, ASIN, title, price, rating, review count, author or brand.

**Use it for:** Track category rankings on a schedule, spot rising products and research a niche before you sell in it.

- Actor page: [apify.com/tablewise/amazon-bestsellers-scraper](https://apify.com/tablewise/amazon-bestsellers-scraper)
- Pricing: $5 per 1,000 products, plus $0.0005 per run. Lists that fail or come back empty return a status row and are free. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd amazon-bestsellers-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "categoryUrls": [
    "https://www.amazon.com/gp/bestsellers/electronics"
  ],
  "maxResults": 10
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `rank`, `list_type`, `category_name` | position in the list, Best Sellers or New Releases, and the category |
| `asin`, `title`, `url` | the product |
| `price`, `price_max`, `price_text` | price, or the top of a price range |
| `rating`, `reviews_count` | stars and number of reviews |
| `author_or_brand`, `format` | for books and media |
| `status` | `ok`, or why a list gave no products (`status_message`) |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
