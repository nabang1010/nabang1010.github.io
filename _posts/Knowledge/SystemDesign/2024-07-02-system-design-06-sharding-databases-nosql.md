---
layout: post
title: "6. Sharding Databases / NoSQL"
author: "nabang1010"
date: 2024-07-02 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: system-design-course
lesson: "6"
source-url: https://app.notion.com/p/nabang1010/6-Sharding-Databases-NoSQL-38f859593c348028a12bc7bd58f0bb87
seo-keywords: [system-design, database-sharding, nosql, mongodb, cassandra]
tags: [System Design, Databases]
---

## Sharding Basics

A **shard** = horizontal partition of a database. A **router** sits in front and directs each request to the correct shard. Each shard can have its own backup/replica → scalability + resiliency.

```text
         Clients
            │
         Router
        /   |   \
       ▼    ▼    ▼
   Shard1 Shard2 Shard3
     │      │      │
   Backup Backup Backup
```

Cross-shard joins are possible but painful — design data around **key-value lookups** (e.g., hash customer ID → shard) so most operations stay within one shard.

### MongoDB

`mongos` (on app servers) routes traffic to **replica sets** (= shards).

```text
   App Server
   [mongos] ──────────────► Config Servers (x3)
      │                      (stores partition map)
      ├──► Replica Set 1: Primary + Secondary + Secondary
      ├──► Replica Set 2: Primary + Secondary + Secondary
      └──► Replica Set 3: Primary + Secondary + Secondary
```

- Each replica set: 1 **primary** + multiple **secondaries**. Primary fails → secondaries **auto-elect** a new one.

- **Config servers** (x3) store the partition map; also auto-elect on failure.

- Need ≥3 nodes per group for election to work.

### Cassandra

Uses a leaderless **ring**: any node can be the primary entry point, data replicated across nodes automatically.

```text
         ┌──── Node A ────┐
         │                │
      Node D           Node B
         │                │
         └──── Node C ────┘
```

- No dedicated primary → no failover needed, but writes take time to propagate.

- Trade-off: **eventual consistency** — a read right after a write (especially from a different node) may not see it yet. Fine if a small read-after-write delay is acceptable.

|  | MongoDB | Cassandra |
| --- | --- | --- |
| Primary | Dedicated per replica set | Any node |
| Failover | Auto-election | Not needed |
| Consistency | Strong (within set) | Eventual |

### NoSQL — Key Points

"NoSQL" is a misnomer — most still support SQL and can technically join across shards, just inefficiently. Really means: horizontally scalable, often schema-flexible (some are schema-less object stores — store anything under a key, client parses it).

Examples: MongoDB, Cassandra, DynamoDB (AWS serverless), HBase (Hadoop).

**Challenges:**

- **Resharding** — adding/removing shards requires redistributing data in a fault-tolerant way.

- **Hotspots / celebrity problem** — one key (e.g., a popular actor) gets disproportionate traffic, overloading its shard. Modern systems monitor per-shard traffic and rebalance dynamically rather than relying on a static hash.

### Normalized vs. Denormalized

**Normalized** — data split across related tables (e.g., `reservations` + `customers`), linked by keys; needs a join (or 2 lookups in NoSQL) to assemble full data.

- ✅ less storage, ✅ update once, reflected everywhere

- ❌ multiple lookups per query

**Denormalized** — all data duplicated into one row/table.

- ✅ single hit per query (faster reads)

- ❌ hard to update consistently, ❌ wastes space, ❌ eventually consistent updates

**Choosing:** default to **normalized** (simpler, space-efficient). Move to denormalized only once reads are a *proven* bottleneck and you want to cut DB hits — don't over-engineer upfront. In interviews, show you understand both trade-offs rather than reflexively denormalizing because "NoSQL."

### Key Takeaways

- Sharding = horizontal partitioning + per-shard replication for scale and resilience.

- MongoDB (elected primaries) vs. Cassandra (leaderless ring) solve single-point-of-failure differently — strong vs. eventual consistency trade-off.

- Design schemas around key-value lookups to make sharding efficient.

- Resharding and hotspots are real operational challenges; modern systems rebalance dynamically.

- Normalize by default; denormalize only with evidence of a read-performance bottleneck.
