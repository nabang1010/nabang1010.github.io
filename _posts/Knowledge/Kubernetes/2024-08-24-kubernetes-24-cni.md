---
layout: post
title: "[Networking] - CNI"
subtitle: "How runtimes configure Pod network namespaces"
author: "nabang1010"
date: 2024-08-24 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 24
course-icon: /img/kubernetes-course/icons/24-page-icon.png
seo-keywords: [kubernetes, cni, container-networking, ipam, pod-network]
tags: [Kubernetes, CNI, Networking]
---

The Container Network Interface (CNI) is a specification and a collection of conventions for configuring network interfaces in Linux containers. Kubernetes uses CNI-compatible networking implementations to connect Pod sandboxes to the cluster network.

{% include course-figures.html lesson="24" from=1 to=1 topic="Container Network Interface overview" %}

## What happens during Pod setup

At a high level:

1. The kubelet asks the CRI runtime to create a Pod sandbox.
2. The runtime creates the sandbox network namespace.
3. The configured CNI implementation receives details such as container ID, namespace path, interface name, and network configuration.
4. Plugins create interfaces, allocate addresses through IPAM, add routes, and return the result.
5. The runtime reports the sandbox network status to the kubelet.

Core CNI operations include `ADD`, `DEL`, and `CHECK`. Newer specification versions define additional operations, but support depends on the plugin and runtime.

{% include course-figures.html lesson="24" from=2 to=6 topic="CNI network setup sequence" %}

## Plugin chains and IPAM

A CNI configuration can invoke a plugin or a list of plugins. One plugin may create a bridge or virtual interface, an IPAM plugin may allocate the address, and another plugin may tune interface properties.

Kubernetes distributions commonly install networking products such as Calico, Cilium, Flannel, or cloud-specific plugins. Their routing, encapsulation, network-policy, and observability capabilities differ significantly.

Inspect node configuration carefully because paths vary by distribution:

```bash
sudo ls -la /etc/cni/net.d
sudo ls -la /opt/cni/bin
kubectl get pods -A -o wide
```

{% include course-figures.html lesson="24" from=7 to=10 topic="CNI plugins and Pod connectivity" %}

## What CNI does not define

CNI defines container network configuration, not the complete Kubernetes network architecture. It does not standardize how every plugin distributes routes, enforces NetworkPolicy, encrypts traffic, or implements Services.

Docker Engine's native networking is also not CNI. Modern Kubernetes communicates with a CRI runtime and uses CNI for Pod networking; these are distinct interfaces with distinct responsibilities.

## References

- [CNI specification](https://github.com/containernetworking/cni/blob/main/SPEC.md)
- [Kubernetes network plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/)
