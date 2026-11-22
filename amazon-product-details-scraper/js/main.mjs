// Amazon Product Details Scraper: Amazon.com product data for any list of ASINs or product URLs: price, list price, availability, rating, reviews, units bought last month, Best Sellers Rank and specs.
//
// Actor: https://apify.com/tablewise/amazon-product-details-scraper
// Pricing: $4 per 1,000 products, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "asins": [
    "B09Y8C185M",
    "0735211299"
  ],
  "includeDescription": false
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/amazon-product-details-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  if (item.status !== "ok") {
    console.log(`${item.input}: ${item.status} (${item.status_message})`);
    continue;
  }
  const bsr = item.best_sellers_rank?.[0];
  const rank = bsr ? `#${bsr.rank.toLocaleString("en-US")} in ${bsr.category}` : "-";
  console.log(`${item.asin} | ${item.price ?? "-"} ${item.currency ?? ""} | ${item.availability ?? "-"} | ${rank} | ${item.title.slice(0, 60)}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
