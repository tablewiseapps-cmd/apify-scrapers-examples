# YouTube Transcript & Subtitles Scraper

Transcripts and subtitles of YouTube videos as plain text, timed segments, SRT or VTT, with the video details.

**Use it for:** Feed video content to an LLM or a RAG index, summarize talks, or turn videos into articles and subtitles.

- Actor page: [apify.com/tablewise/youtube-transcript-scraper](https://apify.com/tablewise/youtube-transcript-scraper)
- Pricing: $5 per 1,000 videos, plus $0.0005 per run. Both examples cap a run at
  $1 with `max_total_charge_usd` / `maxTotalChargeUsd`.

## Run the example

```bash
export APIFY_TOKEN=<your token>   # PowerShell: $env:APIFY_TOKEN = "<your token>"

# Python
pip install -r ../requirements.txt
python python/main.py

# JavaScript (Node 18+)
cd .. && npm install && cd youtube-transcript-scraper
node js/main.mjs
```

Both print one line per result and save every row to `output.json`.

## Input used

```json
{
  "urls": [
    "https://www.youtube.com/watch?v=4qxROUatTzk"
  ],
  "languages": [
    "en"
  ],
  "outputFormats": [
    "text"
  ]
}
```

## Fields worth knowing

| Field | What it is |
| --- | --- |
| `title`, `channel_name` | video and channel |
| `language` | transcript language |
| `is_auto_generated` | whether YouTube generated it automatically |
| `transcript` | the full text (with `outputFormats: ["text"]`) |
| `segments`, `srt`, `vtt` | the other formats, when you ask for them |
| `duration_seconds`, `view_count` | video details |
| `available_languages` | every language the video has |

`sample_output.json` has real rows from a run of this example. The Actor
page lists every input option and output field.
