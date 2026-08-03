---
layout: post
title: "[Core] - kube-controller-manager"
subtitle: "Reconciliation loops that keep desired and actual state aligned"
author: "nabang1010"
date: 2024-08-05 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 5
course-icon: /img/kubernetes-course/icons/05-page-icon.png
seo-keywords: [kubernetes, controller-manager, reconciliation, control-loop]
tags: [Kubernetes, Control Plane]
---

A Kubernetes controller is a control loop. It watches API objects, compares actual state with desired state, and submits changes that move the cluster toward the desired result.

{% include course-figures.html lesson="05" from=1 to=1 topic="Controller reconciliation overview" %}

## Reconciliation, not scripts

Suppose a Deployment requests three replicas but only two Pods are running. The responsible controllers do not execute a one-time deployment script. They continuously observe state and create the missing objects. If a Pod disappears later, the same loop converges the system again.

This pattern is **level-based**: controllers care about the current difference between desired and observed state, not only the event that caused the difference.

{% include course-figures.html lesson="05" from=2 to=4 topic="Controller reconciliation sequence" %}

## Controllers in the process

`kube-controller-manager` packages many controllers into one binary, including controllers for nodes, ReplicaSets, Deployments, Jobs, endpoints, namespaces, service accounts, and garbage collection.

A few examples:

- The node controller monitors Node health and reacts when nodes become unavailable.
- ReplicaSet and Deployment controllers maintain workload replica and rollout state.
- The endpoint slice controller maintains Service backend membership.
- The namespace controller finalizes resources when a namespace is deleted.

Cloud-specific control loops belong in `cloud-controller-manager`, keeping provider dependencies outside the core controller manager.

{% include course-figures.html lesson="05" from=5 to=7 topic="Controller manager components and availability" %}

## Leader election and availability

Highly available control planes can run multiple controller-manager instances, but leader election ensures only one active leader performs a given set of controller actions at a time.

Inspect a kubeadm cluster:

```bash
kubectl get pods -n kube-system -l component=kube-controller-manager -o wide
kubectl logs -n kube-system -l component=kube-controller-manager --tail=100
kubectl get lease -n kube-system
```

For static Pods, configuration is normally stored on each control-plane node:

```bash
sudo cat /etc/kubernetes/manifests/kube-controller-manager.yaml
```

When debugging a stuck object, inspect its status, conditions, owner references, events, and the logs of the controller responsible for that object type.

## References

- [kube-controller-manager reference](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/)
- [Kubernetes controllers](https://kubernetes.io/docs/concepts/architecture/controller/)
- [Leases](https://kubernetes.io/docs/concepts/architecture/leases/)
