---
layout: post
title: "7. Data Lakes"
author: "nabang1010"
date: 2024-07-03 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: system-design-course
lesson: "7"
source-url: https://app.notion.com/p/nabang1010/7-Data-Lakes-38f859593c348027bd41e0cee9af0c8c
seo-keywords: [system-design, data-lake, amazon-s3, aws-glue, athena, redshift]
tags: [System Design, Data Engineering]
---

## The Core Idea

A **data lake** = dump raw data (logs, CSV, JSON — any format, any structure) into a big distributed file store, instead of a formal database. On AWS this is typically **S3** — effectively infinite, pay-as-you-go storage.

```text
Raw logs / CSV / JSON ──► S3 (one big bucket, no schema)
```

Something else has to **impart structure** afterward — that's where Glue comes in.

### Architecture: S3 + Glue + Athena/Redshift

```text
   S3 (data lake, partitioned by year/month/day)
            │
        AWS Glue  ──► crawls data, infers/defines schema
            │
    ┌───────┴────────┐
    ▼                 ▼
Amazon Athena    Amazon Redshift
(serverless SQL)  (Redshift Spectrum:
                   queries S3 directly)
```

- **AWS Glue** — crawls unstructured S3 data, extracts/lets you define a schema, so files can be queried like a database table.

- **Amazon Athena** — serverless, SQL interface directly over S3 data (via the Glue schema).

- **Amazon Redshift** — a real distributed data warehouse; **Redshift Spectrum** lets it query S3 directly too, so it's a hybrid between a warehouse and a data-lake query engine.

**Key difference vs. MongoDB-style databases:** data isn't actively distributed/managed by a database engine — it just sits as files in S3, with Glue mapping a schema on top. S3 itself handles redundancy (multi-region copies) automatically.

### Why Use This (Interview Framing)

- Off-the-shelf, scalable, reliable — AWS handles the internals, you don't design storage/replication yourself.

- Worth mentioning in interviews even if not used, to show awareness of the option. Interviewer may still push for a lower-level design — that's fine, follow their lead.

### Partitioning Still Matters

Don't dump everything into one flat bucket — partition based on **expected query patterns** (work backwards from the customer).

```text
S3/
 └── year=2026/
      └── month=06/
           └── day=30/
                └── log files...
```

- Querying "last day's logs" → partition by date (year/month/day hierarchy).

- Querying "by store" → partition by store. Can combine multiple partition keys.

- Good partitioning = faster, cheaper Athena/Redshift Spectrum queries (less data scanned).

### Key Takeaways

- Data lake = raw data dumped into distributed storage (S3), no upfront schema.

- AWS Glue imparts schema after the fact; Athena/Redshift (Spectrum) query it via SQL.

- Different from MongoDB-style DBs: no active data distribution/management by a DB engine — just files + a schema layer.

- Partition data (e.g., year/month/day) based on real query patterns to keep performance reasonable.

- Mentioning these managed AWS services in interviews shows tool awareness, even if you're asked to design something more custom.
