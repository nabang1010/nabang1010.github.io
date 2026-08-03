---
layout: post
title: "Gateway"
subtitle: "Understanding next hops, default routes, and the Gateway API"
author: "nabang1010"
date: 2024-08-19 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 19
course-icon: /img/kubernetes-course/icons/19-page-icon.png
seo-keywords: [networking, gateway, default-route, gateway-api, kubernetes]
tags: [Kubernetes, Networking]
---

In IP networking, a gateway is a router used as the next hop toward another network. A host sends off-subnet traffic to a gateway selected by its route table.

{% include course-figures.html lesson="19" from=1 to=1 topic="Network gateway overview" %}

```bash
ip route show default
ip route get 8.8.8.8
```

A default gateway is not automatically a NAT device, firewall, or load balancer. One system may perform several of those roles, but they are separate functions.

## How a host uses a gateway

For a destination outside the local subnet, the host:

1. Selects a matching route.
2. Resolves the next-hop gateway's MAC address on the local link.
3. Sends a frame to that MAC while preserving the remote IP destination.
4. Lets each router repeat the route decision until the packet reaches its destination.

If the gateway is unreachable, check the local address and prefix, neighbor table, route table, and Layer 2 connectivity before investigating higher layers.

{% include course-figures.html lesson="19" from=2 to=3 topic="Gateway routing between networks" %}

## Gateways in Kubernetes environments

The term appears in several contexts:

- A node's default gateway reaches the surrounding network.
- A CNI plugin may configure Pod gateways or virtual next hops.
- An egress gateway centralizes selected outbound traffic.
- A cloud or edge gateway may connect clusters, VPCs, or on-premises networks.

Do not assume these are the same component.

{% include course-figures.html lesson="19" from=4 to=4 topic="Gateway traffic flow" %}

## Kubernetes Gateway API

Gateway API is a Kubernetes resource model for service networking. It defines objects such as `GatewayClass`, `Gateway`, and route resources for HTTP, gRPC, TCP, TLS, and UDP traffic.

It is conceptually different from an IP default gateway. Gateway API configures application traffic handling through an implementation such as a proxy or cloud load balancer.

Use precise language in architecture diagrams: say "default router," "egress gateway," or "Gateway API controller" rather than using "gateway" for every network boundary.

## References

- [Linux ip-route reference](https://man7.org/linux/man-pages/man8/ip-route.8.html)
- [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/)
