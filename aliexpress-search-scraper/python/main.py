"""AliExpress Search Scraper: AliExpress search results for any keyword: price, original price, discount, rating, units sold, free shipping, Choice and sponsored flags.

Actor: https://apify.com/tablewise/aliexpress-search-scraper
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
    "searchQueries": [
        "wireless earbuds"
    ],
    "sort": "orders",
    "maxResults": 10
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/aliexpress-search-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    if item.get("status") != "ok":
        print(f"{item.get('search_query')}: {item.get('status')} ({item.get('status_message')})")
        continue
    print(f"{item['price']} {item['currency']} | {item.get('sold_text') or '-'} | rating {item.get('rating') or '-'} | {item['title'][:70]}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
