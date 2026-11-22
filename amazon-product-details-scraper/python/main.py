"""Amazon Product Details Scraper: Amazon.com product data for any list of ASINs or product URLs: price, list price, availability, rating, reviews, units bought last month, Best Sellers Rank and specs.

Actor: https://apify.com/tablewise/amazon-product-details-scraper
Pricing: $4 per 1,000 products, plus $0.0005 per run.

    pip install -r ../../requirements.txt
    export APIFY_TOKEN=<your token>    # PowerShell: $env:APIFY_TOKEN = "<your token>"
    python main.py
"""
import json
import os
from decimal import Decimal

from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run_input = {
    "asins": [
        "B09Y8C185M",
        "0735211299"
    ],
    "includeDescription": False
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/amazon-product-details-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    if item.get("status") != "ok":
        print(f"{item.get('input')}: {item.get('status')} ({item.get('status_message')})")
        continue
    bsr = item["best_sellers_rank"][0] if item.get("best_sellers_rank") else None
    rank = f"#{bsr['rank']:,} in {bsr['category']}" if bsr else "-"
    print(f"{item['asin']} | {item.get('price') or '-'} {item.get('currency') or ''} | {item.get('availability') or '-'} | {rank} | {item['title'][:60]}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
