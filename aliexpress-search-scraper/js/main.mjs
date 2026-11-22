// AliExpress Search Scraper: AliExpress search results for any keyword: price, original price, discount, rating, units sold, free shipping, Choice and sponsored flags.
//
// Actor: https://apify.com/tablewise/aliexpress-search-scraper
// Pricing: $5 per 1,000 products, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "searchQueries": [
    "wireless earbuds"
  ],
  "sort": "orders",
  "maxResults": 10
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/aliexpress-search-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  if (item.status !== "ok") {
    console.log(`${item.search_query}: ${item.status} (${item.status_message})`);
    continue;
  }
  console.log(`${item.price} ${item.currency} | ${item.sold_text ?? "-"} | rating ${item.rating ?? "-"} | ${item.title.slice(0, 70)}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
