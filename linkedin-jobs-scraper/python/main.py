"""LinkedIn Jobs Scraper: Job postings from LinkedIn search, without logging in.

Actor: https://apify.com/tablewise/linkedin-jobs-scraper
Pricing: $1 per 1,000 job postings, plus $0.0005 per run.

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
    "keywords": [
        "data analyst"
    ],
    "locations": [
        "London"
    ],
    "datePosted": "past24Hours",
    "maxJobs": 10
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/linkedin-jobs-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    print(f"{item.get('title')} | {item.get('company')} | {item.get('location')} | {item.get('salary') or '-'}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
