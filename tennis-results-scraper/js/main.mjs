// Tennis Results & Odds Scraper: ATP, WTA, Challenger and ITF results and fixtures with scores by set and pre-match odds.
//
// Actor: https://apify.com/tablewise/tennis-results-scraper
// Pricing: $5 per 1,000 matches, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "mode": "results",
  "tour": "atp-single",
  "maxMatches": 10
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/tennis-results-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  console.log(`${item.date} ${item.tournament}: ${item.player1_name} vs ${item.player2_name} ${item.score} (odds ${item.odds_player1} / ${item.odds_player2})`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
