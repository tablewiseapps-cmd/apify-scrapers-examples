# Amazon Product Details Scraper

Amazon.com product data for any list of ASINs or product URLs: price, list price, availability, rating, reviews, units bought last month, Best Sellers Rank and specs.

**Use it for:** Monitor the price and stock of your catalog or your competitors', and check the Best Sellers Rank of a list of ASINs.

- Actor page: [apify.com/tablewise/amazon-product-details-scraper](https://apify.com/tablewise/amazon-product-details-scraper)
- Pricing: $4 per 1,000 products, plus $0.0005 per run. ASINs that are not found or not valid return a status row and are free. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd amazon-product-details-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "asins": [
    "B09Y8C185M",
    "0735211299"
  ],
  "includeDescription": false
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `asin`, `title`, `brand` | the product |
| `price`, `list_price`, `price_source` | current price, the struck-through price and where the price came from |
| `availability` | stock text, for instance `In Stock` or `Only 3 left in stock` |
| `rating`, `reviews_count` | stars and number of ratings |
| `bought_past_month_min` | units bought last month, as a number |
| `best_sellers_rank` | rank in each category |
| `features`, `details`, `images` | bullet points, specs table and images |
| `status` | `ok`, or why an ASIN has no data (`status_message`) |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
