---
layout: post
title: "Namespace"
subtitle: "Organizing namespaced resources without assuming complete isolation"
author: "nabang1010"
date: 2024-08-13 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 13
course-icon: /img/kubernetes-course/icons/13-page-icon.png
seo-keywords: [kubernetes, namespace, resource-quota, rbac]
tags: [Kubernetes, Namespace]
---

A Kubernetes namespace is a logical scope for namespaced API objects. It lets teams reuse names such as `api` or `database` without collisions and provides a boundary for policy and resource management.

Namespaces are not virtual clusters. They do not automatically isolate network traffic, CPU, memory, or permissions. Those controls require NetworkPolicies, ResourceQuotas, LimitRanges, and RBAC rules.

{% include course-figures.html lesson="13" from=1 to=1 topic="Kubernetes namespace organization" %}

## Built-in namespaces

A new cluster normally includes:

- `default` for objects created without an explicit namespace.
- `kube-system` for components installed by Kubernetes.
- `kube-public`, a readable namespace commonly used for public cluster information.
- `kube-node-lease` for per-node Lease objects used as heartbeats.

Most application resources are namespaced. Nodes, PersistentVolumes, StorageClasses, and Namespace objects are cluster-scoped.

Inspect the scope of a resource with:

```bash
kubectl api-resources --namespaced=true
kubectl api-resources --namespaced=false
```

{% include course-figures.html lesson="13" from=2 to=5 topic="Namespace isolation and built-in namespaces" %}

## Working with namespaces

```bash
kubectl create namespace staging
kubectl get pods --namespace staging
kubectl config set-context --current --namespace=staging
```

Declare the namespace in manifests so the target is explicit:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: staging
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-config
  namespace: staging
data:
  LOG_LEVEL: info
```

Within one namespace, a Service can be resolved by its short name, such as `database`. From another namespace, use `database.staging` or the full name `database.staging.svc.cluster.local`.

{% include course-figures.html lesson="13" from=6 to=10 topic="Namespace commands and cross-namespace access" %}

## Practical boundaries

Use namespaces for teams, environments, or lifecycle boundaries. Apply policy deliberately:

- ResourceQuota to cap aggregate consumption.
- LimitRange to define default and allowed container resources.
- RBAC to control who can read or modify objects.
- NetworkPolicy to restrict Pod traffic when the CNI implementation supports it.

Avoid treating a namespace as a security boundary by itself. Workloads with strong isolation requirements may need separate clusters or additional runtime controls.

## References

- [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
