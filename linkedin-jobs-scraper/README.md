# LinkedIn Jobs Scraper

Job postings from LinkedIn search, without logging in.

**Use it for:** Daily job alerts, salary research and hiring signals: which companies are hiring for a role, where, and for how much.

- Actor page: [apify.com/tablewise/linkedin-jobs-scraper](https://apify.com/tablewise/linkedin-jobs-scraper)
- Pricing: $1 per 1,000 job postings, plus $0.0005 per run. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd linkedin-jobs-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "keywords": [
    "data analyst"
  ],
  "locations": [
    "London"
  ],
  "datePosted": "past24Hours",
  "maxJobs": 10
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `title` | job title |
| `company` | company name |
| `location` | city or region |
| `workplace_type` | remote, hybrid or on-site |
| `salary` | salary text, when the posting has one (also `salary_min`, `salary_max`, `salary_currency`) |
| `posted_date` | date it was posted |
| `applicants_count` | number of applicants |
| `description` | full description |
| `url` | link to the posting |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
