---
layout: post
title: "10-11. Caching"
author: "nabang1010"
date: 2024-07-06 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: system-design-course
lesson: "10-11"
source-url: https://app.notion.com/p/nabang1010/10-11-Caching-391859593c3480eeae79d418ad51b41a
seo-keywords: [system-design, caching, cache-aside, cache-invalidation, distributed-cache]
tags: [System Design, Caching]
---

### Why Cache?

Hitting disk is slow and expensive. A cache stores frequently accessed data **in memory**, much faster than disk reads. Goal: avoid hitting the database as much as possible.

Systems must meet **SLAs** (Service Level Agreements) — often responses within milliseconds. Caching is a key tool to achieve this alongside scalability.

---

### Architecture: Without vs. With Cache

**Without cache** — all app servers hit one database → bottleneck:

```text
Clients → Load Balancer → App Servers (fleet)
                                │
                           Database (disk) ← bottleneck
```

**With cache** — cache layer sits between app servers and database:

```text
Clients → Load Balancer → App Servers (fleet)
                                │
                          Cache Fleet (in-memory)
                                │
                           Database (disk) ← hit only on cache miss
```

- Cache fleet can be **scaled independently** of app servers

- Can be **co-located** with app servers (simpler) or a **separate fleet** (more flexible)

- App servers hash a request key → maps to a specific cache server → that server owns that slice of data

---

### How Caching Works

- Each cache server is responsible for a **subset of the data** (via hash function on the key)

- On a **cache hit** → return data from memory (fast)

- On a **cache miss** → fetch from database, store in cache, return to client

- **Best for read-heavy workloads** — writes invalidate cached data, so high write rates reduce cache effectiveness

---

### Key Challenges

#### 1. Expiration Policy

How long should data stay cached before being considered stale?

| Too long | Too short |
| --- | --- |
| Data goes stale, out of date | Cache becomes ineffective |
| Unacceptable in strict systems (e.g. banking) | Barely reduces DB hits |

- Smart caches monitor writes and **invalidate cache entries** automatically as data changes

- Ask in interviews: *"How long can data be stale before it's a problem?"*

#### 2. Hotspots (Celebrity Problem)

Naive key hashing sends all traffic for a popular key (e.g. Brad Pitt on IMDb) to one cache server → that server gets overwhelmed.

Solutions:

- Monitor traffic per cache server from the router

- **Distribute hot keys** across multiple cache servers

- Dedicate a server to extremely hot keys

#### 3. Cold-Start Problem

When a cache restarts or is first turned on, it's empty → **every request falls through to the database** → sudden traffic spike can crash the DB.

```text
Cache restarts → Cache empty → All traffic hits DB → DB crashes
```

Solution: **Warm up the cache first** before exposing it to live traffic:

- Replay previous day's request logs against the cache

- Run simulated traffic artificially

- Only open to real traffic once cache is sufficiently primed

---

### When Caching Helps (and Doesn't)

| Situation | Caching Useful? |
| --- | --- |
| Read-heavy (Wikipedia, e-commerce browse) | ✅ Yes — big wins |
| Write-heavy (frequent updates) | ❌ Limited — constant invalidation |
| Strict consistency required (banking) | ❌ No — always hit DB |
| Large scale with hotspots | ⚠️ Yes, but needs smart distribution |

---

### Key Takeaways

- Caching = in-memory layer between app servers and database; avoids expensive disk reads.

- Best for **read-heavy** workloads; less useful when writes are frequent.

- Scale cache fleet independently of app servers for flexibility.

- Three problems to address: **expiration policy** (stale data), **hotspots** (celebrity problem), **cold-start** (empty cache on restart).

- Always ask about staleness tolerance in interviews before proposing a caching strategy.
