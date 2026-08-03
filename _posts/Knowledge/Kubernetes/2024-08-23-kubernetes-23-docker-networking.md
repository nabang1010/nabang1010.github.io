---
layout: post
title: "[Networking] - Docker Networking"
subtitle: "Bridge, host, overlay, and published-port behavior"
author: "nabang1010"
date: 2024-08-23 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 23
course-icon: /img/kubernetes-course/icons/23-page-icon.png
seo-keywords: [kubernetes, docker, networking, bridge, overlay, port-publishing]
tags: [Kubernetes, Networking]
---

Docker Engine connects containers through network drivers. Understanding these drivers is useful for local container work, but Kubernetes networking is configured through CRI and CNI rather than Docker's networking model.

{% include course-figures.html lesson="23" from=1 to=1 topic="Docker networking overview" %}

## Common network drivers

- `bridge`: container networking on one Docker host. This is the default driver.
- `host`: the container shares the host network namespace.
- `none`: only loopback is configured.
- `overlay`: connects supported Docker workloads across hosts.
- `macvlan` or `ipvlan`: integrates containers more directly with an existing Layer 2 or Layer 3 network.

A user-defined bridge is usually preferable to the default `bridge` network because it provides automatic DNS between containers and clearer application isolation.

```bash
docker network create application
docker run -d --name database --network application postgres:16
docker run --rm --network application busybox nslookup database
docker network inspect application
```

{% include course-figures.html lesson="23" from=2 to=8 topic="Docker network drivers and bridge connectivity" %}

## Publishing ports

A container port is not automatically reachable from outside the Docker host. Publish it explicitly:

```bash
docker run --rm -p 127.0.0.1:8080:80 nginx:1.27
```

Binding to `127.0.0.1` restricts access to the host. Using `-p 8080:80` commonly binds on all host addresses, which can expose the service beyond the local machine depending on firewall and routing.

Docker configures host forwarding and packet filtering for published ports. Treat port publishing as a security decision, not only a convenience.

{% include course-figures.html lesson="23" from=9 to=15 topic="Docker container networking and published ports" %}

## Docker versus Kubernetes

Docker Engine follows its own container networking model. Kubernetes defines a Pod network model and delegates network setup to CNI-compatible plugins. Kubernetes no longer depends on dockershim, although OCI images built with Docker remain usable through CRI runtimes such as containerd or CRI-O.

Do not copy Docker bridge or `-p` assumptions directly into Kubernetes. Pod networking and Service exposure use different APIs and data paths.

## References

- [Docker networking overview](https://docs.docker.com/engine/network/)
- [Docker port publishing](https://docs.docker.com/engine/network/port-publishing/)
