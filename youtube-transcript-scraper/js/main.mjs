// YouTube Transcript & Subtitles Scraper: Transcripts and subtitles of YouTube videos as plain text, timed segments, SRT or VTT, with the video details.
//
// Actor: https://apify.com/tablewise/youtube-transcript-scraper
// Pricing: $5 per 1,000 videos, plus $0.0005 per run.
//
//   npm install                          (once, in the examples folder)
//   export APIFY_TOKEN=<your token>      (PowerShell: $env:APIFY_TOKEN = "<your token>")
//   node main.mjs
import { writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const input = {
  "urls": [
    "https://www.youtube.com/watch?v=4qxROUatTzk"
  ],
  "languages": [
    "en"
  ],
  "outputFormats": [
    "text"
  ]
};

// maxTotalChargeUsd caps what this run can cost, whatever the input.
// log: null keeps the Actor's own log out of your terminal.
const run = await client.actor("tablewise/youtube-transcript-scraper").call(input, { maxTotalChargeUsd: 1, log: null });
console.log(`Run ${run.id}: ${run.status}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
  const text = item.transcript ?? "";
  console.log(`${item.title} | ${item.channel_name} | ${item.language} | ${text.length} characters`);
  console.log(text.slice(0, 300) + "...");
}

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} rows to output.json`);
