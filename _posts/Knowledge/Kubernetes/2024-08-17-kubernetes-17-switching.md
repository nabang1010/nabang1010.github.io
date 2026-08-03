---
layout: post
title: "Switching"
subtitle: "How Layer 2 forwarding supports container networks"
author: "nabang1010"
date: 2024-08-17 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 17
course-icon: /img/kubernetes-course/icons/17-page-icon.png
seo-keywords: [networking, ethernet, switching, linux-bridge, kubernetes]
tags: [Kubernetes, Networking]
---

An Ethernet switch connects interfaces in the same Layer 2 network. It forwards frames by destination MAC address, while a router moves packets between IP networks.

This distinction matters in container networking because Linux bridges often provide switch-like behavior between virtual Ethernet interfaces on one host.

{% include course-figures.html lesson="17" from=1 to=1 topic="Layer 2 switching" %}

## MAC learning and forwarding

A switch learns which source MAC addresses appear on each port. For a known destination, it forwards the frame only to the matching port. Unknown unicast, broadcast, and relevant multicast traffic is flooded within the broadcast domain.

ARP for IPv4 and Neighbor Discovery for IPv6 map network-layer addresses to link-layer addresses. They do not replace routing; they help a host deliver a packet to the next hop on the local link.

Inspect a Linux host with:

```bash
ip link show
ip neigh show
bridge link show
bridge fdb show
```

`bridge fdb show` displays the forwarding database learned by Linux bridges.

## Linux bridge example

```bash
sudo ip link add br0 type bridge
sudo ip link set br0 up
sudo ip link set eth1 master br0
```

After an interface becomes a bridge port, IP configuration normally belongs on the bridge device rather than that port. Changing a live management interface this way can disconnect the host, so practice in network namespaces or a disposable VM.

## Relevance to Kubernetes

Pod networking implementations may use bridges, virtual Ethernet pairs, overlays, direct routing, or eBPF. The exact data path depends on the CNI plugin.

Kubernetes Services are not Ethernet switches. A Service is a virtual network abstraction implemented by components such as kube-proxy or a CNI data plane. Keep Layer 2 forwarding, Layer 3 routing, and Service load balancing as separate concepts when troubleshooting.

## References

- [Linux bridge command reference](https://man7.org/linux/man-pages/man8/bridge.8.html)
- [Kubernetes cluster networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
