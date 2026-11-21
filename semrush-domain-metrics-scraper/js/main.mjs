// Semrush Domain Metrics Scraper: Semrush Authority Score, backlinks, referring domains and monthly visits for a list of domains, without a Semrush account.
//
// Actor: https://apify.com/tablewise/semrush-domain-metrics-scraper
// Pricing: $5 per 1,000 domains, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "domains": [
    "github.com",
    "notion.so",
    "shopify.com"
  ],
  "maxResults": 3
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/semrush-domain-metrics-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  if (item.status !== "ok") {
    console.log(`${item.input}: ${item.status} (${item.status_message})`);
    continue;
  }
  console.log(`${item.domain} | AS ${item.authority_score} | ${item.monthly_visits.toLocaleString("en-US")} visits/month | ${item.backlinks.toLocaleString("en-US")} backlinks`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
