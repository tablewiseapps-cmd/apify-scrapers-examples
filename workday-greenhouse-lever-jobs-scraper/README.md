# Workday, Greenhouse, Lever & Ashby Jobs Scraper

Every open job from company careers sites on Workday, Greenhouse, Lever and Ashby: title, department, location, remote, salary, posting date and description.

**Use it for:** Track who is hiring and for what at a list of companies, feed a job board or a recruiting pipeline, and watch competitors' hiring.

- Actor page: [apify.com/tablewise/workday-greenhouse-lever-jobs-scraper](https://apify.com/tablewise/workday-greenhouse-lever-jobs-scraper)
- Pricing: $1.50 per 1,000 jobs, plus $0.0005 per run. Sites that give no jobs return a status row and are free. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd workday-greenhouse-lever-jobs-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "careerSiteUrls": [
    "https://jobs.lever.co/sonatype",
    "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite"
  ],
  "maxJobs": 20,
  "includeDescription": false
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `platform`, `company` | `workday`, `greenhouse`, `lever` or `ashby`, and the company slug |
| `title`, `department`, `team` | the job |
| `location`, `all_locations` | main location and every location listed |
| `remote`, `workplace_type` | remote flag and `remote`, `hybrid` or `onsite` when the site says it |
| `salary` | salary text when the posting has one |
| `posted_date` | posting date (YYYY-MM-DD) |
| `url`, `apply_url` | job page and application page |
| `description` | full description, with `includeDescription: true` |
| `status` | `ok`, or why a site gave no jobs (`status_message`) |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
