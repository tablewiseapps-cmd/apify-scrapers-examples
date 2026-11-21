# Semrush Domain Metrics Scraper

Semrush Authority Score, backlinks, referring domains and monthly visits for a list of domains, without a Semrush account.

**Use it for:** Check the authority and traffic of many domains at once: link prospecting, competitor research, domain due diligence.

- Actor page: [apify.com/tablewise/semrush-domain-metrics-scraper](https://apify.com/tablewise/semrush-domain-metrics-scraper)
- Pricing: $5 per 1,000 domains, plus $0.0005 per run. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd semrush-domain-metrics-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "domains": [
    "github.com",
    "notion.so",
    "shopify.com"
  ],
  "maxResults": 3
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `domain` | the domain |
| `status` | `ok`, or why there is no data (`status_message`) |
| `authority_score` | Semrush Authority Score, 0 to 100 |
| `backlinks`, `referring_domains` | link profile |
| `monthly_visits`, `pages_per_visit`, `bounce_rate` | traffic estimates |
| `data_date` | month the data refers to |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
