---
layout: post
title: "[Core] - K8s Architecture"
subtitle: "How the control plane and worker nodes cooperate"
author: "nabang1010"
date: 2024-08-01 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 1
course-icon: /img/kubernetes-course/icons/01-page-icon.png
seo-keywords: [kubernetes, cluster-architecture, control-plane, worker-node]
tags: [Kubernetes, Architecture]
---

A Kubernetes cluster is a set of machines that cooperate to run containerized workloads. The architecture separates cluster-wide decision making from the node-level work of running Pods.

{% include course-figures.html lesson="01" from=1 to=1 topic="Kubernetes cluster architecture" %}

## Control plane and worker nodes

The **control plane** maintains the desired state of the cluster:

- `kube-apiserver` exposes the Kubernetes API and is the entry point for clients and components.
- `etcd` stores API data as a consistent key-value database.
- `kube-scheduler` assigns unscheduled Pods to suitable nodes.
- `kube-controller-manager` runs reconciliation loops that move actual state toward desired state.
- `cloud-controller-manager`, when used, integrates the cluster with cloud provider APIs.

A **worker node** runs the workload:

- `kubelet` watches Pod assignments for its node and asks the runtime to create containers.
- A CRI-compatible container runtime, commonly containerd or CRI-O, manages images and containers.
- `kube-proxy`, or an equivalent dataplane implementation, provides Service traffic forwarding.

Modern documentation uses *control plane* rather than *master* and *worker node* rather than *minion*.

{% include course-figures.html lesson="01" from=2 to=5 topic="Control plane and worker node components" %}

## The reconciliation flow

When a Deployment is submitted, the API server validates and persists it. Controllers create the required ReplicaSet and Pod records. The scheduler chooses nodes for pending Pods. Kubelets on those nodes observe the assignments and start the containers through the runtime.

```text
kubectl -> API server -> etcd
                    -> controllers -> desired Pods
                    -> scheduler -> node assignment
                    -> kubelet -> container runtime
```

Components communicate through the API server instead of writing directly to each other or to etcd. This keeps validation, authorization, auditing, and state transitions centralized.

{% include course-figures.html lesson="01" from=6 to=8 topic="Kubernetes component communication" %}

## Pods are the deployment unit

Kubernetes schedules Pods, not standalone containers. A Pod normally holds one application container, but it can include tightly coupled helper containers that share networking and storage. Scaling an application usually means creating more Pod replicas, not adding duplicate application containers to one Pod.

Useful first checks:

```bash
kubectl cluster-info
kubectl get nodes -o wide
kubectl get pods --all-namespaces -o wide
```

## References

- [Kubernetes cluster architecture](https://kubernetes.io/docs/concepts/architecture/)
- [Kubernetes components](https://kubernetes.io/docs/concepts/overview/components/)
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
