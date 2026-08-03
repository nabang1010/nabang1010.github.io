---
layout: post
title: "Kubelet"
subtitle: "The node agent that turns Pod specifications into running containers"
author: "nabang1010"
date: 2024-08-07 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 7
course-icon: /img/kubernetes-course/icons/07-page-icon.png
seo-keywords: [kubernetes, kubelet, node-agent, cri, pod-lifecycle]
tags: [Kubernetes, Node]
---

`kubelet` is the primary Kubernetes agent on each node. It watches Pod specifications assigned to that node and works with the container runtime to make those Pods run.

{% include course-figures.html lesson="07" from=1 to=1 topic="Kubelet and node workload management" %}

## Responsibilities

The kubelet:

- Registers the node and updates Node status and leases.
- Watches Pod assignments from the API server.
- Calls the CRI runtime to pull images and manage Pod sandboxes and containers.
- Mounts declared volumes through the relevant storage integrations.
- Executes startup, liveness, and readiness probes.
- Reports Pod and container status back to the API server.
- Collects container and node statistics used by the resource metrics pipeline.

The kubelet does not manage arbitrary containers. Its responsibility is Pods delivered through the API server or local static Pod manifests.

{% include course-figures.html lesson="07" from=2 to=2 topic="Kubelet node responsibilities" %}

## Node configuration

For production, configure kubelet through a `KubeletConfiguration` file rather than accumulating command-line flags. With kubeadm, useful locations include:

```bash
sudo systemctl status kubelet
sudo systemctl cat kubelet
sudo cat /var/lib/kubelet/config.yaml
sudo cat /var/lib/kubelet/kubeadm-flags.env
```

The kubelet and runtime should use compatible cgroup drivers. On systemd-based Linux hosts, `systemd` is the common choice.

## Debugging an unhealthy node

Start from the API view, then inspect the host:

```bash
kubectl get nodes
kubectl describe node <node-name>
kubectl get pods --all-namespaces --field-selector spec.nodeName=<node-name>

sudo journalctl -u kubelet --since '15 min ago'
sudo crictl info
sudo crictl ps -a
```

Common causes include expired certificates, an unreachable API server, runtime or CNI failure, disk pressure, memory pressure, incorrect cgroups, and image pull errors.

## Security boundary

The kubelet API can expose logs, exec, and container information. Keep anonymous authentication disabled, use webhook authorization, restrict TCP `10250`, and never expose the kubelet API directly to untrusted networks.

## References

- [kubelet reference](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)
- [Set kubelet parameters using a configuration file](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)
- [Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/)
