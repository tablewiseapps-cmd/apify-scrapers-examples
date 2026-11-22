// Amazon Best Sellers Scraper: The top 100 of any Amazon.com Best Sellers or Hot New Releases list, and of its subcategories if you want: rank, ASIN, title, price, rating, review count, author or brand.
//
// Actor: https://apify.com/tablewise/amazon-bestsellers-scraper
// Pricing: $5 per 1,000 products, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "categoryUrls": [
    "https://www.amazon.com/gp/bestsellers/electronics"
  ],
  "maxResults": 10
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/amazon-bestsellers-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  if (item.status !== "ok") {
    console.log(`${item.input}: ${item.status} (${item.status_message})`);
    continue;
  }
  console.log(`#${item.rank} | ${item.price_text ?? "-"} | rating ${item.rating ?? "-"} (${item.reviews_count ?? 0} reviews) | ${item.asin} | ${item.title.slice(0, 60)}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
