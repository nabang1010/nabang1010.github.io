---
layout: post
title: "[Networking] - Cluster Networking"
subtitle: "Addressing, ports, and an end-to-end troubleshooting model"
author: "nabang1010"
date: 2024-08-25 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 25
course-icon: /img/kubernetes-course/icons/25-page-icon.png
seo-keywords: [kubernetes, cluster-networking, ports, pod-network, service-network]
tags: [Kubernetes, Networking]
---

Kubernetes networking combines several related paths: Pod-to-Pod, Pod-to-Service, node-to-control-plane, ingress, and egress. Troubleshooting becomes easier when each path is checked independently.

{% include course-figures.html lesson="25" from=1 to=1 topic="Kubernetes cluster network requirements" %}

## Address domains

A cluster typically has several non-overlapping address ranges:

- Node addresses from the infrastructure network.
- Pod addresses assigned by the CNI implementation.
- Service ClusterIPs from a virtual Service CIDR.
- External load balancer, ingress, or egress addresses.

The Pod and Service CIDRs must not conflict with node, VPN, or upstream networks. Each node also needs a unique hostname, MAC address, and product UUID where Kubernetes uses those values for node identity.

## Core ports

Common default ports include:

| Traffic | Default port | Purpose |
| --- | ---: | --- |
| Clients and nodes to API server | TCP 6443 | Kubernetes API |
| API server to etcd | TCP 2379-2380 | etcd client and peer traffic |
| Control plane to kubelet | TCP 10250 | Kubelet API |
| NodePort Services | TCP/UDP 30000-32767 | Default NodePort range |

Controller-manager and scheduler secure ports commonly use `10257` and `10259`, but these health and metrics endpoints should not be treated as blanket external inbound requirements. Firewall rules must follow the actual topology and bind addresses.

CNI plugins, ingress controllers, service meshes, and observability agents may require additional ports and protocols. Consult the selected implementation rather than using a generic allow-all rule.

## End-to-end checks

```bash
kubectl get nodes -o wide
kubectl get pods -A -o wide
kubectl get services,endpointslices -A
kubectl get networkpolicies -A
```

For a failing request:

1. Confirm DNS returns the expected Service or external address.
2. Check Service selectors and EndpointSlices.
3. Test the application directly from another Pod.
4. Inspect node routes, forwarding, firewall, and CNI state.
5. Verify the return path.
6. Check NetworkPolicy and infrastructure security rules.

This prevents a Service selector problem from being misdiagnosed as a routing failure.

## References

- [Kubernetes networking concepts](https://kubernetes.io/docs/concepts/services-networking/)
- [Ports and protocols](https://kubernetes.io/docs/reference/networking/ports-and-protocols/)
