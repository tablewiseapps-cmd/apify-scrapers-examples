"""LinkedIn Company Scraper: Public LinkedIn company pages: industry, size, employees on LinkedIn, headquarters and website.

Actor: https://apify.com/tablewise/linkedin-company-scraper
Pricing: $4 per 1,000 companies, plus $0.0005 per run.

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
    "companies": [
        "stripe",
        "airbnb",
        "https://www.linkedin.com/company/netflix/"
    ],
    "maxCompanies": 3
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/linkedin-company-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    print(f"{item.get('name')} | {item.get('industry')} | {item.get('company_size')} | {item.get('headquarters')} | {item.get('website')}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
