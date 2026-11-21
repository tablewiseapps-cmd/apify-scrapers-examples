# Website Email & Contact Scraper

Emails, phone numbers, social profiles and the contact page of each website you give it.

**Use it for:** Enrich a list of company websites (from a directory, a CRM export or Google Maps) with the contact details they publish.

- Actor page: [apify.com/tablewise/website-email-contact-scraper](https://apify.com/tablewise/website-email-contact-scraper)
- Pricing: $8 per 1,000 websites with an email or phone found (sites with nothing found are free), plus $0.0005 per run. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd website-email-contact-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "websites": [
    "https://apify.com/",
    "https://www.hootsuite.com/",
    "https://buffer.com/"
  ],
  "maxPagesPerSite": 3
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `domain` | the website |
| `status` | `ok`, or why the site could not be read (`status_message`) |
| `emails` | emails found, without duplicates (details in `email_details`) |
| `phones` | phone numbers found |
| `linkedin`, `facebook`, `instagram`, `twitter`, `youtube`, `tiktok` | social profiles |
| `contact_page_url` | the contact page |
| `company_name` | company name, when the site states it |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
