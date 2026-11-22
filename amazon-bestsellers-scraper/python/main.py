"""Amazon Best Sellers Scraper: The top 100 of any Amazon.com Best Sellers or Hot New Releases list, and of its subcategories if you want: rank, ASIN, title, price, rating, review count, author or brand.

Actor: https://apify.com/tablewise/amazon-bestsellers-scraper
Pricing: $5 per 1,000 products, plus $0.0005 per run.

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
    "categoryUrls": [
        "https://www.amazon.com/gp/bestsellers/electronics"
    ],
    "maxResults": 10
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/amazon-bestsellers-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    if item.get("status") != "ok":
        print(f"{item.get('input')}: {item.get('status')} ({item.get('status_message')})")
        continue
    print(f"#{item['rank']} | {item.get('price_text') or '-'} | rating {item.get('rating') or '-'} ({item.get('reviews_count') or 0} reviews) | {item['asin']} | {item['title'][:60]}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
