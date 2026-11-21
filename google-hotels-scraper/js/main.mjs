// Google Hotels Scraper: Hotels and rentals from Google Hotels for a destination and dates: price per night, total with taxes, rating and deals.
//
// Actor: https://apify.com/tablewise/google-hotels-scraper
// Pricing: $4 per 1,000 properties, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "searches": [
    "Lisbon"
  ],
  "nights": 2,
  "adults": 2,
  "maxProperties": 10
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/google-hotels-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  console.log(`#${item.position} ${item.name} | rating ${item.rating ?? "-"} | ${item.price_per_night} ${item.currency}/night | total ${item.total_with_taxes}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
