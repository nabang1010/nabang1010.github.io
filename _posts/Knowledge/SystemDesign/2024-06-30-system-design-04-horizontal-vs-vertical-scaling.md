---
layout: post
title: "4. Horizontal vs. Vertical Scaling"
author: "nabang1010"
date: 2024-06-30 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: system-design-course
lesson: "4"
source-url: https://app.notion.com/p/nabang1010/4-Horizontal-vs-Vertical-Scaling-38f859593c3480689a3bed59e6a60570
seo-keywords: [system-design, horizontal-scaling, vertical-scaling, load-balancing]
tags: [System Design, Scalability]
---

---

## The Core Problem

Modern systems must handle massive traffic — think tens of thousands of transactions per second. The goal is designing systems that **scale gracefully** as demand grows.

---

### Evolution of Server Architecture

### 1. Single-Server Design

Everything (web server + database) lives on one machine.

- Simple and cheap to maintain

- Acceptable only for low-traffic, low-importance sites

- **Fatal flaw:** single point of failure — if it goes down, everything goes down

### 2. Separated Web + Database

Web server and database run on separate machines.

- Scale each component independently (e.g., beef up DB without touching web server)

- Still two single points of failure — not meaningfully more resilient

### 3. Vertical Scaling ("Scale Up")

Replace servers with bigger, more powerful machines.

- Easy to manage (fewer servers = fewer things to break)

- Works as a short-term fix for traffic surges

- **Hard limit:** machines only come so large; eventually you hit a ceiling

- Still has single points of failure

Add more servers and distribute traffic with a **load balancer**.

- Load balancer strategies: round robin, capacity-aware routing, partitioning

- If one server goes down, traffic reroutes automatically — **zero downtime**

- Add servers as traffic grows → practically **infinite scalability**

- Downside: more servers = more infrastructure to maintain

---

### Key Concept: Stateless Web Servers

Horizontal scaling **only works** if web servers are stateless:

- Any server can handle any request at any time

- No server assumes it knows anything about a user's previous requests

- Persistent data (sessions, history) must live in the **database**, not the server

---

### How to Choose an Architecture

> *"Always choose the simplest architecture that meets your projected requirements — but no simpler."*

| Situation | Recommended Approach |
| --- | --- |
| Small internal tool, low traffic | Single server or vertical scaling |
| Medium app, some growth expected | Separated DB + light vertical scaling |
| Large-scale commercial system | Horizontal scaling with load balancer |
| System design interview (big company) | Almost always horizontal scaling |

---

### 4. Horizontal Scaling ("Scale Out") ✅ Preferred

### TL;DR

- **Vertical scaling** = bigger machines

- **Horizontal scaling** = more machines + load balancer

- For real production systems at scale, **horizontal scaling is the standard answer**
