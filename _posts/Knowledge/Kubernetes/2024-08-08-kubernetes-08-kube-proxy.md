---
layout: post
title: "[Core] - kube-proxy"
subtitle: "How virtual Service addresses reach Pod endpoints"
author: "nabang1010"
date: 2024-08-08 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 8
course-icon: /img/kubernetes-course/icons/08-page-icon.png
seo-keywords: [kubernetes, kube-proxy, service, endpointslice, networking]
tags: [Kubernetes, Networking]
---

A Kubernetes Service provides a stable virtual address for a changing set of Pod endpoints. `kube-proxy` is the traditional node component that programs packet forwarding rules for that abstraction.

{% include course-figures.html lesson="08" from=1 to=1 topic="Kubernetes Service traffic" %}

## From selector to EndpointSlice

A Service selector matches Pods by label. Kubernetes controllers maintain one or more EndpointSlice objects containing the ready backend IP addresses and ports. kube-proxy watches Services and EndpointSlices, then updates the node dataplane.

```bash
kubectl get service web
kubectl get endpointslice -l kubernetes.io/service-name=web -o wide
```

When a client sends traffic to the Service's ClusterIP, node rules choose an eligible endpoint and forward the connection. The ClusterIP is virtual; it is not normally assigned to a physical interface.

{% include course-figures.html lesson="08" from=2 to=3 topic="Service and endpoint packet flow" %}

## Dataplane modes

The exact implementation depends on Kubernetes version and cluster configuration. kube-proxy can program Linux packet filtering and NAT facilities, including iptables or nftables-based modes. Some networking solutions replace kube-proxy entirely and implement Service forwarding with eBPF or another dataplane.

Do not assume that kube-proxy creates overlay networking. Pod-to-Pod connectivity is provided by the cluster's network implementation; kube-proxy focuses on Service traffic.

{% include course-figures.html lesson="08" from=4 to=5 topic="kube-proxy forwarding rules" %}

## Debugging Service connectivity

Check each layer in order:

```bash
kubectl get service web -o yaml
kubectl get endpointslice -l kubernetes.io/service-name=web -o yaml
kubectl get pods -l app=web -o wide
kubectl logs -n kube-system -l k8s-app=kube-proxy --tail=100
```

If EndpointSlices are empty, inspect selectors and Pod readiness. If endpoints exist but traffic fails, inspect NetworkPolicy, kube-proxy health, the CNI dataplane, node firewall rules, and whether the application listens on the expected target port.

```bash
kubectl run netcheck --rm -it --restart=Never \
  --image=curlimages/curl -- curl -sv http://web
```

## References

- [kube-proxy reference](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/)
- [Virtual IPs and Service proxies](https://kubernetes.io/docs/reference/networking/virtual-ips/)
- [EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/)
