---
layout: post
title: "[Core] - kubectl explain command"
subtitle: "Inspecting the API schema from the command line"
author: "nabang1010"
date: 2024-08-15 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 15
course-icon: /img/kubernetes-course/icons/15-page-icon.png
seo-keywords: [kubernetes, kubectl-explain, openapi, yaml]
tags: [Kubernetes, kubectl]
---

`kubectl explain` describes Kubernetes resource types and fields using the API schema published by the cluster. It is a reliable way to answer "where does this field belong?" while writing a manifest.

## Explore a resource

```bash
kubectl explain deployment
kubectl explain deployment.spec
kubectl explain deployment.spec.strategy
kubectl explain deployment.spec.template.spec.containers
```

The output shows the field type, whether it is required, and its description. Use `--recursive` to inspect the nested field tree:

```bash
kubectl explain deployment.spec --recursive
```

For an API version supported by the cluster:

```bash
kubectl explain ingress --api-version=networking.k8s.io/v1
```

## Build manifests from the schema

Suppose a Deployment fails because `containers` was placed directly under `template`. Follow the hierarchy one segment at a time:

```text
Deployment
  spec
    template
      spec
        containers
```

Then confirm the expected container fields:

```bash
kubectl explain deployment.spec.template.spec.containers
kubectl explain deployment.spec.template.spec.containers.resources
```

This catches structural errors before relying on memory or copying an outdated example.

## Important limits

`kubectl explain` documents the API schema available to the connected cluster. It does not prove that a complete object passes admission policy, references valid dependencies, or behaves as intended.

Combine it with server-side validation:

```bash
kubectl apply --dry-run=server -f deployment.yaml
```

Also verify your current context before trusting version-specific output:

```bash
kubectl config current-context
kubectl version
```

## References

- [kubectl explain reference](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_explain/)
- [Kubernetes API overview](https://kubernetes.io/docs/reference/using-api/)
