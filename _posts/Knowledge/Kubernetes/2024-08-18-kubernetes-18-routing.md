---
layout: post
title: "Routing"
subtitle: "Moving packets between Pod, node, and external networks"
author: "nabang1010"
date: 2024-08-18 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 18
course-icon: /img/kubernetes-course/icons/18-page-icon.png
seo-keywords: [networking, routing, pod-cidr, linux, kubernetes]
tags: [Kubernetes, Networking]
---

Routing decides the next hop for an IP packet. Each route contains a destination prefix, an outgoing interface or next-hop address, and optionally a metric or policy attributes.

{% include course-figures.html lesson="18" from=1 to=1 topic="Layer 3 routing" %}

## Route selection

Linux normally chooses the most specific matching prefix, called longest-prefix match. A default route such as `default via 192.168.1.1` is used only when no more specific route matches.

```bash
ip address show
ip route show
ip route get 10.244.2.15
```

`ip route get` is especially useful because it shows the route Linux would select for one destination, including source address and interface.

To route through a host, IP forwarding must be enabled and firewall policy must allow the traffic:

```bash
sysctl net.ipv4.ip_forward
```

The return path matters too. A request can leave successfully and still fail if the remote network has no route back or a firewall drops the response.

## Routing in a cluster

Kubernetes expects Pods to communicate across nodes without requiring Pods to know about address translation. A common design assigns each node a Pod CIDR. The network implementation then makes those CIDRs reachable using one of several approaches:

- Native routes in the host or physical network.
- An overlay that encapsulates packets between nodes.
- BGP route distribution.
- An eBPF-based data plane.

The implementation is owned by the cluster networking solution, not by Kubernetes core alone.

## Troubleshooting sequence

1. Confirm source and destination addresses.
2. Inspect the selected route on the source node.
3. Check neighbor resolution for the next hop.
4. Verify forwarding and firewall rules.
5. Test the reverse route from the destination.
6. Inspect CNI-specific routes, tunnels, or eBPF state.

This sequence separates route failures from DNS, Service, and application problems.

## References

- [Linux ip-route reference](https://man7.org/linux/man-pages/man8/ip-route.8.html)
- [Kubernetes networking model](https://kubernetes.io/docs/concepts/services-networking/)
