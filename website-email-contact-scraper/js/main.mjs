// Website Email & Contact Scraper: Emails, phone numbers, social profiles and the contact page of each website you give it.
//
// Actor: https://apify.com/tablewise/website-email-contact-scraper
// Pricing: $8 per 1,000 websites with an email or phone found (sites with nothing found are free), plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "websites": [
    "https://apify.com/",
    "https://www.hootsuite.com/",
    "https://buffer.com/"
  ],
  "maxPagesPerSite": 3
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/website-email-contact-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  if (item.status !== "ok") {
    console.log(`${item.input}: ${item.status} (${item.status_message})`);
    continue;
  }
  console.log(`${item.domain} | emails: ${item.emails.join(", ") || "-"} | phones: ${item.phones.join(", ") || "-"}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
