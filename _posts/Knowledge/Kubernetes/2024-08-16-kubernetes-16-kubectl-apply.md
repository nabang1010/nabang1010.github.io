---
layout: post
title: "[Core] - kubectl apply command"
subtitle: "Reconciling manifests and managing field ownership"
author: "nabang1010"
date: 2024-08-16 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 16
course-icon: /img/kubernetes-course/icons/16-page-icon.png
seo-keywords: [kubernetes, kubectl-apply, server-side-apply, field-ownership]
tags: [Kubernetes, kubectl]
---

`kubectl apply` creates an object when it does not exist and updates managed fields when it does. This makes it suitable for maintaining resources from declarative configuration.

## Review before applying

```bash
kubectl apply --dry-run=server -f manifests/
kubectl diff -f manifests/
kubectl apply -f manifests/
```

Server-side dry-run executes API validation and admission without persisting the change. `kubectl diff` then shows how the live object would change.

## Client-side and server-side apply

Traditional client-side apply calculates a patch locally and stores the last applied configuration in an annotation. Server-side apply sends intent to the API server, which tracks field ownership in `managedFields`.

```bash
kubectl apply --server-side \
  --field-manager=platform-team \
  -f deployment.yaml
```

If another manager owns a field you are changing, server-side apply reports a conflict. Resolve the ownership or coordinate the desired value instead of routinely using `--force-conflicts`.

Inspect ownership with:

```bash
kubectl get deployment web -o yaml --show-managed-fields
```

## Operational guardrails

- Keep applied manifests in version control.
- Avoid including generated `status`, `resourceVersion`, or other server-owned metadata.
- Use stable field managers for automation systems.
- Apply directories only when every file is intended for the same target cluster and environment.
- Treat `--prune` carefully; an incomplete allowlist or label scope can delete valid objects.

Applying a manifest is reconciliation, not a release health check. Afterward, inspect rollout and events:

```bash
kubectl rollout status deployment/web
kubectl get events --sort-by=.lastTimestamp
```

## References

- [kubectl apply reference](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/)
- [Server-side apply](https://kubernetes.io/docs/reference/using-api/server-side-apply/)
