// LinkedIn Company Scraper: Public LinkedIn company pages: industry, size, employees on LinkedIn, headquarters and website.
//
// Actor: https://apify.com/tablewise/linkedin-company-scraper
// Pricing: $4 per 1,000 companies, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "companies": [
    "stripe",
    "airbnb",
    "https://www.linkedin.com/company/netflix/"
  ],
  "maxCompanies": 3
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/linkedin-company-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  console.log(`${item.name} | ${item.industry} | ${item.company_size} | ${item.headquarters} | ${item.website}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
