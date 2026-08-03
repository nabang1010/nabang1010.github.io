---
layout: post
title: "CoreDNS"
subtitle: "How Kubernetes provides cluster DNS"
author: "nabang1010"
date: 2024-08-21 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 21
course-icon: /img/kubernetes-course/icons/21-page-icon.png
seo-keywords: [kubernetes, coredns, kube-dns, corefile, service-discovery]
tags: [Kubernetes, Networking, DNS]
---

CoreDNS is the standard DNS server deployed by many Kubernetes clusters. Pods query a stable Service, conventionally named `kube-dns`, and that Service sends requests to CoreDNS replicas.

The Service keeps the historical `kube-dns` name for compatibility even when CoreDNS is the implementation.

## CoreDNS configuration

CoreDNS behavior is defined by a `Corefile`, commonly stored in the `coredns` ConfigMap in `kube-system`. A simplified configuration looks like:

```text
.:53 {
    errors
    health
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}
```

Important plugins include:

- `kubernetes` for Kubernetes Service and Pod records.
- `forward` for names outside the cluster domain.
- `cache` to reduce repeated upstream queries.
- `loop` to detect simple forwarding loops.
- `health`, `ready`, and `prometheus` for operations.

## Inspect the deployment

```bash
kubectl -n kube-system get deployment,service,endpointslice -l k8s-app=kube-dns
kubectl -n kube-system get configmap coredns -o yaml
kubectl -n kube-system logs deployment/coredns
```

Labels and object names can vary by distribution, so list the namespace if the selector returns nothing.

Create a disposable test Pod:

```bash
kubectl run dns-test --image=registry.k8s.io/e2e-test-images/dnsutils:1.3 \
  --restart=Never -- sleep 3600
kubectl exec dns-test -- nslookup kubernetes.default
kubectl delete pod dns-test
```

## Common failure modes

- CoreDNS Pods are unavailable or cannot reach the API server.
- The `kube-dns` Service has no ready endpoints.
- A malformed Corefile prevents startup or reload.
- Upstream resolvers are unreachable.
- A forwarding loop is created by host resolver configuration.
- Network policy blocks UDP or TCP port 53.

Check both UDP and TCP DNS paths; large responses and retries may use TCP.

## References

- [Using CoreDNS for Service Discovery](https://kubernetes.io/docs/tasks/administer-cluster/coredns/)
- [CoreDNS manual](https://coredns.io/manual/toc/)
