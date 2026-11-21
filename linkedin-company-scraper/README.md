# LinkedIn Company Scraper

Public LinkedIn company pages: industry, size, employees on LinkedIn, headquarters and website.

**Use it for:** Firmographics for a list of companies: qualify leads by size and industry, or map a market.

- Actor page: [apify.com/tablewise/linkedin-company-scraper](https://apify.com/tablewise/linkedin-company-scraper)
- Pricing: $4 per 1,000 companies, plus $0.0005 per run. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd linkedin-company-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "companies": [
    "stripe",
    "airbnb",
    "https://www.linkedin.com/company/netflix/"
  ],
  "maxCompanies": 3
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `name` | company name |
| `industry` | industry |
| `company_size` | size range (also `company_size_min` and `company_size_max`) |
| `employees_on_linkedin` | employees with a LinkedIn profile |
| `followers` | page followers |
| `website` | company website |
| `headquarters` | HQ city (also street, postal code and country) |
| `founded_year` | year founded |
| `linkedin_url` | the company page |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
