// Google Trends Scraper: Google Trends interest over time, by region and related queries for any keyword, or for up to 5 keywords compared, in any country and time range.
//
// Actor: https://apify.com/tablewise/google-trends-scraper
// Pricing: $5 per 1,000 searches, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "searchTerms": [
    "chatgpt, gemini, claude",
    "air fryer"
  ],
  "geo": "US",
  "timeRange": "today 12-m"
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/google-trends-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  if (item.status !== "ok") {
    console.log(`${item.input}: ${item.status} (${item.status_message})`);
    continue;
  }
  const latest = Object.entries(item.timeline.at(-1).values).map(([term, value]) => `${term} ${value}`).join(", ");
  // Google gives averages only when you compare terms.
  const averages = Object.entries(item.averages ?? {}).map(([term, value]) => `${term} ${value}`).join(", ") || "-";
  console.log(`${item.terms.join(" vs ")} | ${item.geo} | ${item.time_range_resolved} | latest: ${latest} | average: ${averages}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
