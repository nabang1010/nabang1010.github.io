---
layout: post
title: "kube-scheduler"
subtitle: "Filtering and scoring nodes for pending Pods"
author: "nabang1010"
date: 2024-08-06 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 6
course-icon: /img/kubernetes-course/icons/06-page-icon.png
seo-keywords: [kubernetes, kube-scheduler, scheduling, node-selection]
tags: [Kubernetes, Scheduling]
---

`kube-scheduler` watches for Pods that do not yet have a node assignment. It selects a feasible node and records the binding through the Kubernetes API. It does not start containers; kubelet performs that work after observing the assignment.

{% include course-figures.html lesson="06" from=1 to=1 topic="Kubernetes scheduling overview" %}

## Scheduling cycle

The default scheduler broadly follows two phases:

1. **Filtering** removes nodes that cannot run the Pod.
2. **Scoring** ranks the remaining nodes and selects one of the best candidates.

Filters consider resource requests, node readiness, ports, volume constraints, node selectors and affinity, taints and tolerations, topology rules, and other policies. Scores can favor balanced resource use, requested affinity, image locality, and topology distribution.

The scheduler evaluates **requests**, not current CPU or memory utilization. A Pod without realistic requests gives the scheduler poor placement information.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api
spec:
  containers:
    - name: api
      image: nginx:1.27
      resources:
        requests:
          cpu: 100m
          memory: 128Mi
        limits:
          memory: 256Mi
```

{% include course-figures.html lesson="06" from=2 to=3 topic="Scheduler filtering and scoring" %}

## Constraints and preferences

Use hard constraints sparingly. `nodeSelector`, required node affinity, and untolerated taints can leave a Pod permanently Pending. Preferred affinity and topology spread constraints often provide better resilience without over-constraining placement.

Debug a pending Pod with:

```bash
kubectl describe pod <pod-name>
kubectl get events --field-selector involvedObject.name=<pod-name> \
  --sort-by=.metadata.creationTimestamp
kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints
```

Typical messages include insufficient resources, untolerated taints, node affinity mismatch, or unbound PersistentVolumeClaims.

{% include course-figures.html lesson="06" from=4 to=5 topic="Pod placement decisions" %}

## Scheduler availability

Multiple scheduler instances can run in a highly available control plane. Leader election keeps one active default scheduler. Kubernetes also supports additional scheduler profiles or custom schedulers for specialized workloads.

## References

- [Kubernetes scheduler](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/)
- [Scheduling framework](https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/)
- [Assigning Pods to nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)
