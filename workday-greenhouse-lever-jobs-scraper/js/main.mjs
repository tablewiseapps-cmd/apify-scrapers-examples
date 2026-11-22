// Workday, Greenhouse, Lever & Ashby Jobs Scraper: Every open job from company careers sites on Workday, Greenhouse, Lever and Ashby: title, department, location, remote, salary, posting date and description.
//
// Actor: https://apify.com/tablewise/workday-greenhouse-lever-jobs-scraper
// Pricing: $1.50 per 1,000 jobs, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "careerSiteUrls": [
    "https://jobs.lever.co/sonatype",
    "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite"
  ],
  "maxJobs": 20,
  "includeDescription": false
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/workday-greenhouse-lever-jobs-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  if (item.status !== "ok") {
    console.log(`${item.input}: ${item.status} (${item.status_message})`);
    continue;
  }
  console.log(`${item.company} | ${item.title} | ${item.location} | ${item.salary ?? "-"} | ${item.posted_date ?? item.posted_text ?? "-"}`);
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
