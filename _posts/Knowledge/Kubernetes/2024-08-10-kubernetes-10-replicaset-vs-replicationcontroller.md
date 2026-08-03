---
layout: post
title: "[Core] - ReplicaSets vs Replication Controller"
subtitle: "Why Deployments and ReplicaSets replaced the older controller"
author: "nabang1010"
date: 2024-08-10 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 10
course-icon: /img/kubernetes-course/icons/10-page-icon.png
seo-keywords: [kubernetes, replicaset, replicationcontroller, deployment]
tags: [Kubernetes, Workloads]
---

ReplicaSet and ReplicationController both maintain a requested number of matching Pod replicas. ReplicaSet is the newer API and supports richer label selectors.

{% include course-figures.html lesson="10" from=1 to=1 topic="ReplicaSet reconciliation" %}

## The practical difference

A ReplicationController supports equality-based selectors such as `app=web`. A ReplicaSet also supports set-based expressions such as `environment in (production, qa)`.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27.5
```

`spec.selector` must match labels in `spec.template.metadata.labels`. The controller counts matching Pods and creates or deletes Pods to reach `spec.replicas`.

{% include course-figures.html lesson="10" from=2 to=2 topic="ReplicaSet and ReplicationController comparison" %}

## Use a Deployment in normal applications

You rarely create ReplicaSets directly. A Deployment owns ReplicaSets and adds rollout history, controlled updates, pause/resume, and rollback behavior.

```text
Deployment -> ReplicaSet -> Pods
```

ReplicationController remains documented for compatibility but is not the recommended choice for new workloads.

## Selector ownership matters

A ReplicaSet can adopt an unmanaged Pod whose labels match its selector. Overlapping selectors therefore create ambiguous ownership and must be avoided.

Inspect the ownership chain:

```bash
kubectl get deployment,replicaset,pod --show-labels
kubectl get pod <pod-name> -o jsonpath='{.metadata.ownerReferences}'
kubectl describe replicaset <replicaset-name>
```

Deleting a Pod managed by a ReplicaSet is temporary: the controller observes the replica deficit and creates a replacement.

## References

- [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [ReplicationController](https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/)
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
