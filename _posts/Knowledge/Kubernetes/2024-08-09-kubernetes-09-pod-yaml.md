---
layout: post
title: "Pod with YAML"
subtitle: "Read, write, validate, and troubleshoot a Pod manifest"
author: "nabang1010"
date: 2024-08-09 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 9
course-icon: /img/kubernetes-course/icons/09-page-icon.png
seo-keywords: [kubernetes, pod, yaml, manifest, kubectl]
tags: [Kubernetes, YAML]
---

A Pod is the smallest deployable Kubernetes object. Its manifest describes metadata and the desired container configuration that kubelet should realize on a node.

## Minimal production-minded manifest

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web
  labels:
    app: web
spec:
  containers:
    - name: nginx
      image: nginx:1.27.5
      ports:
        - name: http
          containerPort: 80
      resources:
        requests:
          cpu: 100m
          memory: 64Mi
        limits:
          memory: 128Mi
      readinessProbe:
        httpGet:
          path: /
          port: http
        initialDelaySeconds: 2
        periodSeconds: 5
```

The four top-level fields appear on most Kubernetes objects:

- `apiVersion` selects the API group and version.
- `kind` selects the resource type.
- `metadata` contains identity, labels, annotations, and ownership data.
- `spec` expresses the desired state.

The API server and controllers populate `status`; do not declare it in a desired-state manifest.

## Validate before changing the cluster

```bash
kubectl apply --dry-run=server -f pod.yaml
kubectl diff -f pod.yaml
kubectl apply -f pod.yaml
```

Server-side dry run performs API validation and admission without persisting the object. `kubectl diff` shows the expected change.

## Inspect the result

```bash
kubectl get pod web -o wide
kubectl describe pod web
kubectl logs web -c nginx
kubectl get pod web -o yaml
```

A standalone Pod is useful for learning and one-off diagnostics, but production applications should normally use a controller such as a Deployment, StatefulSet, Job, or DaemonSet. A controller replaces failed Pods and manages updates; a bare Pod is not recreated after deletion.

## References

- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Kubernetes objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/)
- [Configure Pods and containers](https://kubernetes.io/docs/tasks/configure-pod-container/)
