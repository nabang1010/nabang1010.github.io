---
layout: post
title: "kube-apiserver"
subtitle: "The authenticated and validated front door to cluster state"
author: "nabang1010"
date: 2024-08-04 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 4
course-icon: /img/kubernetes-course/icons/04-page-icon.png
seo-keywords: [kubernetes, kube-apiserver, admission, authentication, authorization]
tags: [Kubernetes, Control Plane]
---

`kube-apiserver` exposes the Kubernetes HTTP API. `kubectl`, controllers, schedulers, kubelets, and automation all use this API to read or change cluster state.

{% include course-figures.html lesson="04" from=1 to=1 topic="Kubernetes API server request flow" %}

## Request path

A mutating API request passes through several stages:

1. **Authentication** identifies the caller.
2. **Authorization** determines whether the caller may perform the requested action.
3. **Mutating admission** may modify the object.
4. **Schema validation** and **validating admission** reject invalid or disallowed objects.
5. The API server persists accepted state to etcd and returns a response.

The API server is the only core component that communicates directly with etcd. Controllers and node components observe API objects and submit updates through the API.

{% include course-figures.html lesson="04" from=2 to=3 topic="API server request processing" %}

## From Deployment to running Pod

When you apply a Deployment, the API server stores its desired state. A Deployment controller creates a ReplicaSet, which creates Pod objects. The scheduler assigns each pending Pod by updating its binding. The node's kubelet then starts containers and reports status back through the API.

```bash
kubectl apply -f deployment.yaml
kubectl get deployment,replicaset,pod
kubectl get events --sort-by=.metadata.creationTimestamp
```

{% include course-figures.html lesson="04" from=4 to=4 topic="Control plane API communication" %}

## Inspecting a kubeadm control plane

kubeadm normally runs the API server as a static Pod. The manifest is on the control-plane node:

```bash
sudo cat /etc/kubernetes/manifests/kube-apiserver.yaml
kubectl get pod -n kube-system -l component=kube-apiserver -o wide
kubectl logs -n kube-system -l component=kube-apiserver --tail=100
```

The secure API port is normally TCP `6443`. Protect it with TLS, least-privilege RBAC, admission controls, audit logging, and network restrictions. Avoid anonymous access in production.

{% include course-figures.html lesson="04" from=5 to=5 topic="API server deployment and health" %}

## Health checks

```bash
kubectl get --raw='/readyz?verbose'
kubectl get --raw='/livez?verbose'
```

Readiness indicates whether the server can safely handle traffic; liveness indicates whether it should be restarted.

## References

- [kube-apiserver reference](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)
- [Controlling access to the Kubernetes API](https://kubernetes.io/docs/concepts/security/controlling-access/)
- [Admission controllers](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
