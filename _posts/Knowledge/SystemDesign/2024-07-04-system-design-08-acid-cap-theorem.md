---
layout: post
title: "8. ACID compliance and the CAP theorem"
author: "nabang1010"
date: 2024-07-04 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: system-design-course
lesson: "8"
source-url: https://app.notion.com/p/nabang1010/8-ACID-compliance-and-the-CAP-theorem-391859593c34802085a9f860db0cd824
seo-keywords: [system-design, acid, cap-theorem, distributed-databases]
tags: [System Design, Databases]
---

### ACID Compliance

| Letter | Property | Meaning |
| --- | --- | --- |
| **A** | Atomicity | Entire transaction succeeds or entirely rolls back — no partial writes |
| **C** | Consistency | Rules defined in the DB are always enforced (e.g. no negative values) |
| **I** | Isolation | Concurrent transactions don't interfere — one wins, others wait |
| **D** | Durability | Once committed, data survives crashes (written to durable storage) |

> ⚠️ **Consistency in ACID ≠ consistency everywhere else.**

Traditional RDBMS like **Oracle** offer full ACID compliance. But sometimes ACID has to be traded for scalability — that's where the CAP Theorem comes in.

---

### The CAP Theorem

You can only guarantee **2 of these 3** properties at once:

```text
              Consistency
              (C)
             /     \
            /       \
          CA         CP
          /           \
Availability ─────── Partition
    (A)        AP    Tolerance (P)
```

| Property | Meaning |
| --- | --- |
| **Consistency** | Read always returns the latest write (no stale data) |
| **Availability** | No single point of failure — system stays up even if nodes go down |
| **Partition Tolerance** | Can horizontally scale across many nodes/shards |

---

### Real-World Examples

#### CA — Consistency + Availability (no partition tolerance)

- Examples: **MySQL**, **Oracle**

- One or few hosts → easy to keep data consistent and available

- Hard to horizontally shard/partition at scale

- Good for: small-scale systems where scalability isn't critical (e.g. a small bank)

#### AP — Availability + Partition Tolerance (eventual consistency)

- Example: **Cassandra**

- Leaderless ring → no single point of failure → highly available

- Easy to add nodes → partition tolerant

- Trade-off: writes propagate slowly around the ring → eventual consistency

- Good for: massive scale where a small read-after-write delay is acceptable

#### CP — Consistency + Partition Tolerance (some availability risk)

- Examples: **MongoDB**, **HBase**, **DynamoDB** (strongly consistent mode)

- Can scale horizontally (partitioned/sharded) and data is strongly consistent

- Trade-off: technically has a single point of failure (primary router/node); brief downtime during failover/election — but in practice this is seconds

- Good for: most large-scale systems where a few seconds of downtime is tolerable but stale data is not

---

### Key Notes

- **Partition tolerance is almost always non-negotiable** in large-scale systems — you need to scale horizontally as traffic grows.

- So the real choice is usually: **CP vs AP** — give up availability (brief downtime on failover) or give up consistency (eventual consistency)?

- Modern databases blur the lines — many let you **tune the trade-off** (e.g. DynamoDB has a switch between strongly consistent and eventually consistent modes).

- In practical terms CAP trade-offs are less severe than they used to be, but the framework is still useful for choosing the right DB for a given requirement set.

---

### Quick Reference

| Database | CAP Position | Notes |
| --- | --- | --- |
| MySQL / Oracle | CA | Strong consistency, hard to shard |
| Cassandra | AP | Eventual consistency, leaderless ring |
| MongoDB | CP | Strong consistency, brief failover downtime |
| HBase | CP | Hadoop ecosystem |
| DynamoDB | CP or AP | Configurable per use case |

---

### Key Takeaways

- ACID = the gold standard for transactional integrity; big RDBMS support it fully.

- CAP = the framework for trade-offs when scaling distributed databases.

- Consistency means two different things — know which context you're in.

- Partition tolerance is almost always required at scale → real choice is CP vs AP.

- Most modern databases let you tune which side of the triangle you're on.
