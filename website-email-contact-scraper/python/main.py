"""Website Email & Contact Scraper: Emails, phone numbers, social profiles and the contact page of each website you give it.

Actor: https://apify.com/tablewise/website-email-contact-scraper
Pricing: $8 per 1,000 websites with an email or phone found (sites with nothing found are free), plus $0.0005 per run.

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
    "websites": [
        "https://apify.com/",
        "https://www.hootsuite.com/",
        "https://buffer.com/"
    ],
    "maxPagesPerSite": 3
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/website-email-contact-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    if item.get("status") != "ok":
        print(f"{item.get('input')}: {item.get('status')} ({item.get('status_message')})")
        continue
    print(f"{item['domain']} | emails: {', '.join(item['emails']) or '-'} | phones: {', '.join(item['phones']) or '-'}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
