---
layout: post
title: "[Networking] - DNS"
subtitle: "Resolving names before debugging cluster discovery"
author: "nabang1010"
date: 2024-08-20 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 20
course-icon: /img/kubernetes-course/icons/20-page-icon.png
seo-keywords: [dns, kubernetes, service-discovery, resolv-conf]
tags: [Kubernetes, Networking, DNS]
---

The Domain Name System maps names to data through a distributed hierarchy. In everyday troubleshooting, the important distinction is between the client-side resolver, recursive resolvers, and authoritative name servers.

{% include course-figures.html lesson="20" from=1 to=1 topic="DNS resolution overview" %}

## Common record types

- `A` maps a name to an IPv4 address.
- `AAAA` maps a name to an IPv6 address.
- `CNAME` aliases one name to another.
- `SRV` publishes a service endpoint with port and priority information.
- `PTR` supports reverse lookup from an address to a name.

DNS responses have a time to live (TTL). Resolvers and applications may cache the result until that TTL expires, so a changed record is not necessarily visible everywhere immediately.

{% include course-figures.html lesson="20" from=2 to=3 topic="DNS hierarchy and record lookup" %}

## Inspect resolution

```bash
cat /etc/resolv.conf
getent hosts kubernetes.io
dig kubernetes.io A
dig +trace kubernetes.io
```

`/etc/resolv.conf` usually identifies name servers, search suffixes, and resolver options. `getent` tests the operating system's configured name service path, while `dig` provides direct DNS diagnostics.

{% include course-figures.html lesson="20" from=4 to=7 topic="DNS resolution sequence" %}

## DNS inside Kubernetes

Pods normally receive a cluster DNS server and search domains such as:

```text
<namespace>.svc.cluster.local
svc.cluster.local
cluster.local
```

This allows a Pod in namespace `shop` to resolve Service `api` using `api`, while a Pod in another namespace can use `api.shop` or `api.shop.svc.cluster.local`.

Kubernetes also creates DNS records for headless Services and, under defined conditions, Pods. The exact cluster domain can differ from `cluster.local`.

{% include course-figures.html lesson="20" from=8 to=9 topic="Kubernetes DNS names and search domains" %}

## Debugging order

1. Query the fully qualified name to avoid search-path ambiguity.
2. Inspect the Pod's `/etc/resolv.conf`.
3. Test the cluster DNS Service IP directly.
4. Check DNS Pods, Service, EndpointSlices, logs, and configuration.
5. Verify the requested Service and namespace exist.

DNS may resolve correctly while the target application is unhealthy, so test connectivity separately after name resolution succeeds.

## References

- [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- [Debugging DNS resolution](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/)
