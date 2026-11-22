# Google Trends Scraper

Google Trends interest over time, by region and related queries for any keyword, or for up to 5 keywords compared, in any country and time range.

**Use it for:** Compare keywords before you write content or launch a product, spot seasonal demand and track a topic over time.

- Actor page: [apify.com/tablewise/google-trends-scraper](https://apify.com/tablewise/google-trends-scraper)
- Pricing: $5 per 1,000 searches, plus $0.0005 per run. A search is one line of `searchTerms`: a keyword, or up to 5 separated by commas to compare them. Searches without data are free. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd google-trends-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "searchTerms": [
    "chatgpt, gemini, claude",
    "air fryer"
  ],
  "geo": "US",
  "timeRange": "today 12-m"
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `terms`, `is_comparison` | the keywords of the search, and whether they were compared |
| `geo`, `time_range_resolved`, `resolution` | country, exact dates and point size (day, week, month) |
| `averages` | average interest of each keyword in the period, 0 to 100 (comparisons only) |
| `timeline` | one point per day, week or month, with the value of each keyword |
| `regions` | interest by country or region |
| `related_queries` | top and rising related searches of each keyword |
| `status` | `ok`, or why there is no data (`status_message`) |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
