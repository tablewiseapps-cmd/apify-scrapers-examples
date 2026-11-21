# Tennis Results & Odds Scraper

ATP, WTA, Challenger and ITF results and fixtures with scores by set and pre-match odds.

**Use it for:** Build a results database for models and analysis, or check the latest scores and odds every day.

- Actor page: [apify.com/tablewise/tennis-results-scraper](https://apify.com/tablewise/tennis-results-scraper)
- Pricing: $5 per 1,000 matches, plus $0.0005 per run. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd tennis-results-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "mode": "results",
  "tour": "atp-single",
  "maxMatches": 10
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `date`, `time_cet` | when it was played |
| `tournament`, `category` | tournament and draw |
| `player1_name`, `player2_name` | players (with seed and profile link) |
| `score`, `set_scores` | final score |
| `winner` | 1 or 2 |
| `status` | `completed`, `retired`, `walkover`... |
| `odds_player1`, `odds_player2` | pre-match odds |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
