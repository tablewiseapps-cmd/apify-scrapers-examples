"""YouTube Transcript & Subtitles Scraper: Transcripts and subtitles of YouTube videos as plain text, timed segments, SRT or VTT, with the video details.

Actor: https://apify.com/tablewise/youtube-transcript-scraper
Pricing: $5 per 1,000 videos, plus $0.0005 per run.

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
    "urls": [
        "https://www.youtube.com/watch?v=4qxROUatTzk"
    ],
    "languages": [
        "en"
    ],
    "outputFormats": [
        "text"
    ]
}

# max_total_charge_usd caps what this run can cost, whatever the input.
run = client.actor("tablewise/youtube-transcript-scraper").call(run_input=run_input, max_total_charge_usd=Decimal("1.00"))
print(f"Run {run.id}: {run.status}")

items = client.dataset(run.default_dataset_id).list_items().items
for item in items:
    text = item.get("transcript") or ""
    print(f"{item.get('title')} | {item.get('channel_name')} | {item.get('language')} | {len(text)} characters")
    print(text[:300] + "...")

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
print(f"Saved {len(items)} rows to output.json")
