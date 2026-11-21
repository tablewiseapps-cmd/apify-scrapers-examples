"""Tennis Results & Odds Scraper: ATP, WTA, Challenger and ITF results and fixtures with scores by set and pre-match odds.

Actor: https://apify.com/tablewise/tennis-results-scraper
Pricing: $5 per 1,000 matches, plus $0.0005 per run.

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
    "mode": "results",
    "tour": "atp-single",
    "maxMatches": 10
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/tennis-results-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    print(f"{item.get('date')} {item.get('tournament')}: {item.get('player1_name')} vs {item.get('player2_name')} {item.get('score')} (odds {item.get('odds_player1')} / {item.get('odds_player2')})")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
