---
layout: post
title: "[Core] - etcd"
subtitle: "The consistent key-value store behind the Kubernetes API"
author: "nabang1010"
date: 2024-08-03 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 3
course-icon: /img/kubernetes-course/icons/03-page-icon.png
seo-keywords: [kubernetes, etcd, raft, key-value-store, backup]
tags: [Kubernetes, etcd]
---

etcd is a distributed, strongly consistent key-value store. Kubernetes uses it as the backing store for API objects and cluster state.

{% include course-figures.html lesson="03" from=1 to=1 topic="etcd overview" %}

## Why a key-value store?

Relational databases organize records into schemas, tables, and relationships. Document stores keep flexible records. A key-value store offers a simpler interface: a unique key maps to a value. etcd adds ordered revisions, watches, transactions, leases, and consensus to that model.

Kubernetes API data is persisted by the API server. Other components should communicate through the API rather than connect to etcd directly.

{% include course-figures.html lesson="03" from=2 to=4 topic="Database and key-value-store comparison" %}

## Consistency and quorum

An etcd cluster uses the Raft consensus algorithm. A write must be accepted by a majority of members before it is committed. This means:

- Three members tolerate one failed member.
- Five members tolerate two failed members.
- An even member count does not improve failure tolerance over the preceding odd count.

Run members across independent failure domains and keep latency low. Losing quorum makes the cluster unable to commit new state even if some members are still running.

{% include course-figures.html lesson="03" from=5 to=6 topic="etcd cluster consistency" %}

## Local etcd practice

With a test server running on `localhost:2379`:

```bash
etcdctl --endpoints=http://127.0.0.1:2379 put course kubernetes
etcdctl --endpoints=http://127.0.0.1:2379 get course
etcdctl --endpoints=http://127.0.0.1:2379 del course
etcdctl --endpoints=http://127.0.0.1:2379 endpoint health
```

Production Kubernetes etcd endpoints normally require TLS client credentials. Do not expose port `2379` publicly.

{% include course-figures.html lesson="03" from=7 to=7 topic="etcd cluster operation" %}

## Backups are mandatory

An etcd snapshot is the recovery point for the Kubernetes API state. Take regular snapshots and test restoration away from production.

```bash
ETCDCTL_API=3 etcdctl snapshot save snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key

etcdutl snapshot status snapshot.db --write-out=table
```

{% include course-figures.html lesson="03" from=8 to=8 topic="etcd data and backup workflow" %}

## References

- [etcd documentation](https://etcd.io/docs/)
- [Operating etcd clusters for Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/)
- [Kubernetes components](https://kubernetes.io/docs/concepts/overview/components/)
