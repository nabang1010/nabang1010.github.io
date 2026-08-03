---
layout: post
title: "[Networking] - Namespace"
subtitle: "The isolation primitive behind Pod networking"
author: "nabang1010"
date: 2024-08-22 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 22
course-icon: /img/kubernetes-course/icons/22-page-icon.png
seo-keywords: [linux, network-namespace, veth, container, kubernetes]
tags: [Kubernetes, Linux, Networking]
---

A Linux network namespace provides an isolated network stack. It has its own interfaces, addresses, routes, neighbor tables, firewall state, and port space.

Processes in different network namespaces can use the same TCP port without conflict because they do not share the same stack.

{% include course-figures.html lesson="22" from=1 to=1 topic="Linux namespace overview" %}

{% include course-figures.html lesson="22" from=2 to=8 topic="Linux namespace isolation types" %}

## A small namespace lab

Create two namespaces and connect them with a virtual Ethernet pair:

```bash
sudo ip netns add red
sudo ip netns add blue
sudo ip link add veth-red type veth peer name veth-blue
sudo ip link set veth-red netns red
sudo ip link set veth-blue netns blue
```

Assign addresses and enable the interfaces:

```bash
sudo ip -n red addr add 10.10.0.1/24 dev veth-red
sudo ip -n blue addr add 10.10.0.2/24 dev veth-blue
sudo ip -n red link set lo up
sudo ip -n blue link set lo up
sudo ip -n red link set veth-red up
sudo ip -n blue link set veth-blue up
sudo ip netns exec red ping -c 2 10.10.0.2
```

Clean up when finished:

```bash
sudo ip netns delete red
sudo ip netns delete blue
```

Deleting a namespace also removes interfaces that exist only inside it.

{% include course-figures.html lesson="22" from=9 to=22 topic="Building network namespaces with veth pairs" %}

## From namespaces to Pods

Container runtimes use Linux namespaces to isolate processes. In Kubernetes, containers in the same Pod normally share one network namespace. They therefore share the Pod IP and can reach each other through `localhost`, while retaining separate filesystem and process isolation according to runtime configuration.

The networking implementation connects the Pod's namespace to the node network, typically with virtual interfaces and CNI plugins. A pause or sandbox container commonly holds the Pod-level namespaces for the Pod lifetime.

Network namespaces provide isolation, but they do not create connectivity by themselves. Interfaces, addresses, routes, DNS configuration, and policy must still be configured.

{% include course-figures.html lesson="22" from=23 to=28 topic="Connecting container namespaces to host networking" %}

## References

- [Linux network namespace reference](https://man7.org/linux/man-pages/man8/ip-netns.8.html)
- [Pod networking](https://kubernetes.io/docs/concepts/workloads/pods/)
