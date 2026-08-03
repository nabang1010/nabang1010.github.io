---
layout: post
title: "Deployments"
subtitle: "Declarative updates for stateless applications"
author: "nabang1010"
date: 2024-08-11 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 11
course-icon: /img/kubernetes-course/icons/11-page-icon.png
seo-keywords: [kubernetes, deployment, rollout, rolling-update, rollback]
tags: [Kubernetes, Workloads]
---

A Deployment manages ReplicaSets and provides declarative rollout behavior for stateless workloads. You describe the desired image, configuration, and replica count; the Deployment controller reconciles the transition.

{% include course-figures.html lesson="11" from=1 to=1 topic="Kubernetes Deployment rollout" %}

## Deployment manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27.5
          ports:
            - containerPort: 80
          readinessProbe:
            httpGet:
              path: /
              port: 80
```

A rollout occurs when the Pod template changes. Scaling `replicas` alone does not create a new revision.

## Update and observe

Prefer editing version-controlled YAML and applying it. For a quick image update:

```bash
kubectl set image deployment/web web=nginx:1.28
kubectl rollout status deployment/web --timeout=2m
kubectl rollout history deployment/web
```

Readiness probes are essential: a Pod should not receive Service traffic until it can serve requests. `maxUnavailable` and `maxSurge` control rollout capacity and availability.

## Roll back safely

```bash
kubectl rollout undo deployment/web
kubectl rollout undo deployment/web --to-revision=2
kubectl rollout status deployment/web
```

A rollback restores an earlier Pod template. It does not automatically reverse database migrations or external state changes, so application releases still need compatible migration design.

## Troubleshooting

```bash
kubectl describe deployment web
kubectl get replicaset -l app=web
kubectl get pods -l app=web -o wide
kubectl get events --sort-by=.metadata.creationTimestamp
```

Typical failures include readiness probes, image pulls, quota limits, insufficient resources, scheduling constraints, and an insufficient progress deadline.

## References

- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Update a Deployment without downtime](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/)
