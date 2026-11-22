"""Workday, Greenhouse, Lever & Ashby Jobs Scraper: Every open job from company careers sites on Workday, Greenhouse, Lever and Ashby: title, department, location, remote, salary, posting date and description.

Actor: https://apify.com/tablewise/workday-greenhouse-lever-jobs-scraper
Pricing: $1.50 per 1,000 jobs, plus $0.0005 per run.

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
    "careerSiteUrls": [
        "https://jobs.lever.co/sonatype",
        "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite"
    ],
    "maxJobs": 20,
    "includeDescription": False
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/workday-greenhouse-lever-jobs-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    if item.get("status") != "ok":
        print(f"{item.get('input')}: {item.get('status')} ({item.get('status_message')})")
        continue
    print(f"{item['company']} | {item['title']} | {item['location']} | {item.get('salary') or '-'} | {item.get('posted_date') or item.get('posted_text') or '-'}")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
