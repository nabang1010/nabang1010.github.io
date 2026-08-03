---
layout: post
title: "[Core] - Docker vs containerd"
subtitle: "Separate image building, runtime execution, and orchestration"
author: "nabang1010"
date: 2024-08-02 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 2
course-icon: /img/kubernetes-course/icons/02-page-icon.png
seo-keywords: [kubernetes, docker, containerd, cri, oci, dockershim]
tags: [Kubernetes, Docker]
---

Docker, containerd, CRI, and OCI solve related but different problems. Understanding the boundaries prevents a common mistake: assuming that Kubernetes no longer supports images built with Docker.

{% include course-figures.html lesson="02" from=1 to=3 topic="Historical Kubernetes runtime integration" %}

## The layers

**Docker Engine** is a developer-facing container platform. It includes image build and distribution workflows, a daemon, an API, networking, storage integration, and a CLI.

**containerd** is a container runtime used by Docker Engine and directly by many Kubernetes nodes. It manages image transfer, container lifecycle, storage, and runtime execution. It normally delegates low-level process creation to an OCI runtime such as `runc`.

**OCI** publishes specifications for image formats and container runtimes. An OCI-compatible image is portable across compatible runtimes.

**CRI**, the Container Runtime Interface, is the gRPC contract between kubelet and a container runtime. containerd and CRI-O implement CRI; Docker Engine does not expose CRI directly.

{% include course-figures.html lesson="02" from=4 to=7 topic="Docker and containerd runtime layers" %}

## What happened to dockershim?

Kubernetes originally included `dockershim`, an adapter that let kubelet use Docker Engine despite the missing CRI interface. Dockershim was deprecated in Kubernetes 1.20 and removed in **Kubernetes 1.24**.

This removal did not invalidate Docker-built images. Docker images follow OCI image standards and continue to run with containerd and CRI-O. What changed was the node runtime integration, not the image format.

Check the runtime reported by each node:

```bash
kubectl get nodes -o wide
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.nodeInfo.containerRuntimeVersion}{"\n"}{end}'
```

{% include course-figures.html lesson="02" from=8 to=11 topic="Container runtime command-line tools" %}

## Runtime troubleshooting with crictl

`crictl` is the Kubernetes community's CLI for inspecting CRI runtimes. It is intended for node troubleshooting, while kubelet remains responsible for managed workload lifecycle.

```bash
sudo crictl info
sudo crictl pods
sudo crictl ps -a
sudo crictl images
sudo crictl logs <container-id>
sudo crictl inspectp <pod-sandbox-id>
```

Use `ctr` or `nerdctl` for containerd-specific operations, and use `crictl` when you need the kubelet/CRI view.

## References

- [Kubernetes container runtimes](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)
- [Dockershim historical context](https://kubernetes.io/blog/2022/05/03/dockershim-historical-context/)
- [Debugging Kubernetes nodes with crictl](https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/)
