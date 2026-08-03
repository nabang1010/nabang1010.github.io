---
layout: post
title: "5. Failover Strategies"
author: "nabang1010"
date: 2024-07-01 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: system-design-course
lesson: "5"
source-url: https://app.notion.com/p/nabang1010/5-Failover-Strategies-38f859593c34809a984ecd0309656a27
seo-keywords: [system-design, failover, rto, rpo, high-availability]
tags: [System Design, Reliability]
---

### Where Do Servers Come From?

Two main options for hosting your servers:

- **On-premise data centers** — used by large companies (Amazon, Google); requires working with ops teams, budget approval, and physical space

- **Cloud providers** (AWS EC2, Google Compute Engine, Azure VMs) — rent VMs on demand, pay per use, provider handles hardware; supports **availability zones** for geographic redundancy

- **Serverless** (AWS Lambda, Kinesis, Athena) — no server management at all; billed per transaction; provider handles all provisioning

---

### Database Failover Strategies

The database is a critical **single point of failure**. Four strategies exist, ordered weakest to strongest:

### 1. Cold Standby

Server is **powered off** until failure occurs.

```text
Primary DB ──(periodic backup)──► Backup Storage
                                        │
               On failure:              ▼
                              Power on → Restore → Redirect
```

- **RTO:** 30 min to hours | **RPO:** Since last backup | **Cost:** Low

- **Use when:** Non-critical apps, dev environments

### 2. Warm Standby

Server is **running but idle**; kept in sync via replication.

```text
Primary DB ──(replication)──► Standby DB (running, no traffic)
                                        │
               On failure:              ▼
                                  Promote to Primary
```

- **RTO:** 30 sec to minutes | **RPO:** Minimal | **Cost:** Medium

- **Use when:** Enterprise apps requiring moderate availability

### 3. Hot Standby

Server is **fully live** with real-time replication; standby can serve **reads** immediately.

```text
         App Server
         /        \
        ▼          ▼
   Primary DB ──(real-time)──► Standby DB
   (Read/Write)                (Read only)
```

- **RTO:** Seconds | **RPO:** Near zero | **Cost:** High

- **Use when:** Mission-critical systems — banking, payments, healthcare

### 4. Multi-Primary (Active-Active)

**All nodes** accept reads and writes simultaneously; no promotion needed on failure.

```text
            Load Balancer
           /      |      \
          ▼       ▼       ▼
      Primary A  Primary B  Primary C
      (R/W)      (R/W)      (R/W)
          \       |       /
           Real-time Sync
```

- **RTO:** Near zero | **RPO:** Near zero | **Cost:** Very High

- **Use when:** Global deployments, high write throughput, zero-downtime requirements

---

### Failover Strategy Comparison

| Feature | Cold Standby | Warm Standby | Hot Standby | Multi-Primary |
| --- | --- | --- | --- | --- |
| Server state | Powered off | Running, idle | Fully running | All active |
| Accepts writes | ❌ | Primary only | Primary only | ✅ All nodes |
| Accepts reads | ❌ | Limited | Standby can read | ✅ All nodes |
| Data sync | Periodic backup | Replication | Real-time replication | Multi-master replication |
| Failover | Manual | Promotion needed | Automatic | No promotion needed |
| Typical RTO | Minutes–hours | Seconds–minutes | Seconds | Near zero |
| Typical RPO | Backup interval | Minimal | Near zero | Near zero |
| Complexity | Low | Medium | High | Very High |
| Cost | Low | Medium | High | Very High |
| Best for | Dev / non-critical | Most enterprise apps | Banking, payments | Global distributed systems |

---

### Key Takeaway

Match your failover strategy to your **availability and budget requirements**. For system design interviews, at minimum discuss **warm or hot standby** — and bring up **multi-primary** when the system demands global scale or zero downtime.
