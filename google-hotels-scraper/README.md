# Google Hotels Scraper

Hotels and rentals from Google Hotels for a destination and dates: price per night, total with taxes, rating and deals.

**Use it for:** Rate shopping and price monitoring: compare hotels in a city for your dates, or track how prices move.

- Actor page: [apify.com/tablewise/google-hotels-scraper](https://apify.com/tablewise/google-hotels-scraper)
- Pricing: $4 per 1,000 properties, plus $0.0005 per run. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd google-hotels-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "searches": [
    "Lisbon"
  ],
  "nights": 2,
  "adults": 2,
  "maxProperties": 10
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `position` | rank in Google's results |
| `name`, `property_type`, `hotel_class` | the property |
| `rating`, `reviews_count` | guest rating |
| `check_in_date`, `nights` | the dates priced (30 days from today unless you set `checkInDate`) |
| `price_per_night`, `total_with_taxes`, `currency` | prices |
| `deal` | Google's deal label, when there is one |
| `booking_sites` | price per booking site, with `includeBookingSitePrices: true` |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
