// LinkedIn Jobs Scraper: Job postings from LinkedIn search, without logging in.
//
// Actor: https://apify.com/tablewise/linkedin-jobs-scraper
// Pricing: $1 per 1,000 job postings, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "keywords": [
    "data analyst"
  ],
  "locations": [
    "London"
  ],
  "datePosted": "past24Hours",
  "maxJobs": 10
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/linkedin-jobs-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  console.log(`${item.title} | ${item.company} | ${item.location} | ${item.salary ?? "-"}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
