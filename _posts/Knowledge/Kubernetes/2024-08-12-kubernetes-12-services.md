---
layout: post
title: "Service"
subtitle: "Stable discovery and traffic routing for changing Pods"
author: "nabang1010"
date: 2024-08-12 20:00:00 +0700
lang: en
catalog: true
section: Knowledge
series: kubernetes-course
lesson: 12
course-icon: /img/kubernetes-course/icons/12-page-icon.png
seo-keywords: [kubernetes, service, clusterip, nodeport, loadbalancer, endpointslice]
tags: [Kubernetes, Networking]
---

Pod IPs are replaceable. A Service gives clients a stable name and virtual IP for a logical group of backends.

{% include course-figures.html lesson="12" from=1 to=1 topic="Kubernetes Service overview" %}

## Service and backend selection

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - name: http
      port: 80
      targetPort: http
  type: ClusterIP
```

`port` is the Service port. `targetPort` is the port on each backend Pod and may reference a named container port. The selector identifies Pods; controllers publish ready addresses in EndpointSlices.

{% include course-figures.html lesson="12" from=2 to=4 topic="Service selectors and backend Pods" %}

## Service types

- `ClusterIP` exposes a virtual IP inside the cluster and is the default.
- `NodePort` allocates a port on each node, normally from `30000-32767` unless configured otherwise.
- `LoadBalancer` asks a supported infrastructure provider to provision an external load balancer.
- `ExternalName` returns a DNS CNAME and does not proxy traffic.

A headless Service uses `clusterIP: None`; DNS returns backend addresses directly rather than one virtual IP.

{% include course-figures.html lesson="12" from=5 to=6 topic="Kubernetes Service exposure types" %}

## Discovery

Within the same namespace, clients can use `http://web`. The fully qualified name is normally:

```text
web.<namespace>.svc.cluster.local
```

The cluster domain can be configured differently, so avoid hardcoding `cluster.local` when short or namespace-qualified names are sufficient.

{% include course-figures.html lesson="12" from=7 to=8 topic="Service discovery and traffic flow" %}

## Debugging

```bash
kubectl get service web -o wide
kubectl get endpointslice -l kubernetes.io/service-name=web -o wide
kubectl get pods -l app=web --show-labels
kubectl describe service web
```

If a Service has no endpoints, verify its selector and Pod readiness. If endpoints exist, test the Pod IP directly, then the Service IP, then DNS. This isolates application, Service dataplane, and DNS failures.

## References

- [Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/)
- [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- [EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/)
