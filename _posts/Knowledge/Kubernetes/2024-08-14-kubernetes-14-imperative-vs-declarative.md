---
layout: post
title: "Imperative vs Declarative"
subtitle: "Choosing commands or version-controlled desired state"
author: "nabang1010"
date: 2024-08-14 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 14
course-icon: /img/kubernetes-course/icons/14-page-icon.png
seo-keywords: [kubernetes, imperative, declarative, kubectl, gitops]
tags: [Kubernetes, kubectl]
---

Kubernetes objects can be managed imperatively with commands or declaratively with configuration files. Both methods use the Kubernetes API, but they differ in how intent is recorded and maintained.

{% include course-figures.html lesson="14" from=1 to=1 topic="Kubernetes object management approaches" %}

## Imperative commands

An imperative command describes an immediate operation:

```bash
kubectl create deployment web --image=nginx:1.27
kubectl scale deployment web --replicas=3
kubectl delete deployment web
```

This style is fast for learning, investigation, and controlled operational actions. Its weakness is reproducibility: the final state may not be represented in version control, and a sequence of commands is harder to review.

{% include course-figures.html lesson="14" from=2 to=3 topic="Imperative Kubernetes commands" %}

## Declarative configuration

A declarative file records the desired state:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
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
          image: nginx:1.27
```

```bash
kubectl diff -f deployment.yaml
kubectl apply -f deployment.yaml
```

Configuration can be reviewed, tested, and promoted through environments. Applying it repeatedly reconciles the managed fields toward the same declared intent.

{% include course-figures.html lesson="14" from=4 to=6 topic="Declarative configuration workflow" %}

## A practical workflow

Use imperative generation to scaffold YAML, then review and store it:

```bash
kubectl create deployment web \
  --image=nginx:1.27 \
  --dry-run=client \
  -o yaml > deployment.yaml
```

Do not casually mix multiple management approaches on the same fields. For example, repeatedly scaling by command while Git declares another replica count creates drift that the next deployment will overwrite.

For production, prefer declarative resources in version control and automate their reconciliation. Keep imperative commands for inspection, debugging, and explicitly documented operational changes.

## References

- [Kubernetes object management](https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/)
- [Declarative management with configuration files](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/)
