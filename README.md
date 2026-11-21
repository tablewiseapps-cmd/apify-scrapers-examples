# Apify scrapers: code examples

Ready-to-run Python and JavaScript examples for the [tablewise](https://apify.com/tablewise)
scrapers on Apify. Each one calls the Actor through the official
`apify-client`, waits for the run and saves the results as JSON.

| Use case | Actor | What you get | Price | Apify page |
| --- | --- | --- | --- | --- |
| Jobs | [LinkedIn Jobs Scraper](linkedin-jobs-scraper/) | Job postings from LinkedIn search, without logging in. | $1 per 1,000 job postings | [Open](https://apify.com/tablewise/linkedin-jobs-scraper) |
| Leads | [Website Email & Contact Scraper](website-email-contact-scraper/) | Emails, phone numbers, social profiles and the contact page of each website you give it. | $8 per 1,000 websites with an email or phone found | [Open](https://apify.com/tablewise/website-email-contact-scraper) |
| Leads | [LinkedIn Company Scraper](linkedin-company-scraper/) | Public LinkedIn company pages: industry, size, employees on LinkedIn, headquarters and website. | $4 per 1,000 companies | [Open](https://apify.com/tablewise/linkedin-company-scraper) |
| Content | [YouTube Transcript & Subtitles Scraper](youtube-transcript-scraper/) | Transcripts and subtitles of YouTube videos as plain text, timed segments, SRT or VTT, with the video details. | $5 per 1,000 videos | [Open](https://apify.com/tablewise/youtube-transcript-scraper) |
| Travel | [Google Hotels Scraper](google-hotels-scraper/) | Hotels and rentals from Google Hotels for a destination and dates: price per night, total with taxes, rating and deals. | $4 per 1,000 properties | [Open](https://apify.com/tablewise/google-hotels-scraper) |
| Sports | [Tennis Results & Odds Scraper](tennis-results-scraper/) | ATP, WTA, Challenger and ITF results and fixtures with scores by set and pre-match odds. | $5 per 1,000 matches | [Open](https://apify.com/tablewise/tennis-results-scraper) |
| SEO | [Semrush Domain Metrics Scraper](semrush-domain-metrics-scraper/) | Semrush Authority Score, backlinks, referring domains and monthly visits for a list of domains, without a Semrush account. | $5 per 1,000 domains | [Open](https://apify.com/tablewise/semrush-domain-metrics-scraper) |

All of them are pay per result: you pay for the rows you get, plus $0.0005
per run, and nothing for empty or failed results. New Apify accounts get
free monthly credit to try them.

## Setup

1. Create an Apify account and copy your API token from
   **Console > Settings > API & Integrations**.
2. Set it as an environment variable:
   ```bash
   export APIFY_TOKEN=<your token>        # macOS / Linux
   $env:APIFY_TOKEN = "<your token>"      # Windows PowerShell
   ```
3. Install the client for your language, from this folder:
   ```bash
   pip install -r requirements.txt        # Python 3.9+
   npm install                            # Node 18+
   ```
4. Run any example, for instance:
   ```bash
   python linkedin-jobs-scraper/python/main.py
   node linkedin-jobs-scraper/js/main.mjs
   ```

Every example caps the cost of its run at $1 (`max_total_charge_usd` in
Python, `maxTotalChargeUsd` in JavaScript). Raise it when you scale up the
input.

## Use them from other tools

The same Actors work without code from [n8n](https://docs.apify.com/integrations/n8n),
Make and Zapier, and from AI agents through the
[Apify MCP server](https://docs.apify.com/mcp). Each Actor page has the
details.
