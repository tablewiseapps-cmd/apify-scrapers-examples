"""Google Trends Scraper: Google Trends interest over time, by region and related queries for any keyword, or for up to 5 keywords compared, in any country and time range.

Actor: https://apify.com/tablewise/google-trends-scraper
Pricing: $5 per 1,000 searches, plus $0.0005 per run.

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
    "searchTerms": [
        "chatgpt, gemini, claude",
        "air fryer"
    ],
    "geo": "US",
    "timeRange": "today 12-m"
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/google-trends-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    if item.get("status") != "ok":
        print(f"{item.get('input')}: {item.get('status')} ({item.get('status_message')})")
        continue
    latest = ", ".join(f"{term} {value}" for term, value in item["timeline"][-1]["values"].items())
    # Google gives averages only when you compare terms.
    averages = ", ".join(f"{term} {value}" for term, value in (item["averages"] or {}).items()) or "-"
    print(f"{' vs '.join(item['terms'])} | {item['geo']} | {item['time_range_resolved']} | latest: {latest} | average: {averages}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
