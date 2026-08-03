---
layout: post
title: "9. Using CAP to Choose a Database"
author: "nabang1010"
date: 2024-07-05 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: system-design-course
lesson: "9"
source-url: https://app.notion.com/p/nabang1010/9-Using-CAP-to-Choose-a-Database-391859593c34802f8bddf00a542303fa
seo-keywords: [system-design, cap-theorem, mongodb, cassandra, database-selection]
tags: [System Design, Databases]
---

### MongoDB — Trades Away Availability (CP)

MongoDB has **two potential single points of failure**:

- The **primary config server** (stores partition/routing map)

- The **primary app server** (routes writes to replica sets)

Both have hot standbys, but there's still a brief downtime window during failover:

```text
Primary goes down
      │
   System detects outage  (seconds)
      │
   Remaining nodes elect new primary  (seconds)
      │
   System back online
```

Those few seconds of potential downtime = giving up **Availability**.

What MongoDB keeps:

- ✅ **Consistency** — data written to a replica set is consistent within that set

- ✅ **Partition Tolerance** — add replica sets as needed to scale horizontally

---

### Cassandra — Trades Away Consistency (AP)

No single master → no single point of failure → near-zero downtime risk.

But because any node can receive a write, that data must replicate to backup nodes — and that takes time.

```text
Write hits Node A
      │
   ... propagates to Node B, C, D over time ...
      │
   Read from Node B (before propagation) → stale data
```

What Cassandra keeps:

- ✅ **Availability** — no master to go down, ring stays up

- ✅ **Partition Tolerance** — nodes can be added to the ring freely

What it gives up:

- ❌ **Consistency** — reads may return stale data shortly after a write (eventual consistency)

---

### How to Choose in an Interview

Before proposing a database, ask about the requirements:

| Question to Ask | Drives Decision On |
| --- | --- |
| How much scale do we need? | Partition Tolerance |
| Can we tolerate stale reads? | Consistency |
| Is brief downtime (seconds) acceptable? | Availability |

**Decision flow:**

```text
Need massive scale?
   └── Yes → need Partition Tolerance (P)
         └── Can tolerate stale reads?
               ├── Yes → AP → Cassandra
               └── No  → CP → MongoDB / DynamoDB / HBase
Need small scale, strict consistency?
   └── CA → MySQL / Oracle
```

> 💡 **Interview tip:** Choosing MongoDB or DynamoDB is a safe general-purpose answer for most large-scale systems. What earns points is *explaining the trade-offs you're making* — not just naming the technology.

---

### Key Takeaways

- MongoDB = **CP**: brief downtime risk during failover, but consistent and scalable.

- Cassandra = **AP**: always available, but reads may be stale (eventual consistency).

- Always clarify requirements before picking a DB: scale needs, consistency tolerance, acceptable downtime.

- A few seconds of downtime may be acceptable → CP (MongoDB/DynamoDB) is fine.

- No tolerance for stale reads → don't choose AP (Cassandra).

- Demonstrating *why* you picked a DB matters more than the pick itself.
