---
layout: post
title: "Create GPU Kubernetes Cluster using Kubeadm"
subtitle: "Create GPU Kubernetes Cluster using Kubeadm"
author: "nabang1010"
header-img: "img/in-post/2022/Dec/nvidia_wallpaper.jpg"
# header-style: text
header-mask: 0.4
lang: vi
catalog: true
# hidden: false
section: Knowledge
seo-keywords:
  - kubernetes-cluster-gpu
  - kubernetes-cluster
  - cluster-gpu
  - deepops
tags:
  - Kubernetes
---


## Step 1: Install CRI (Container Runtime Interface)

### Using `containerd` as CRI

**Install some pre-requisites for `containerd`:**

```bash 
sudo apt-get update \
    && sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
```

**The `overlay` and `br_netfilter` modules are required to be loaded:**

```bash
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF
```

```bash
sudo modprobe overlay \
   && sudo modprobe br_netfilter
```
**Setup the required `sysctl` parameters and make them persistent:**


```bash
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF
```
  
```bash
sudo sysctl --system
```
**Now proceed to setup the Docker repository:**

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key --keyring /etc/apt/trusted.gpg.d/docker.gpg add -
```

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

**Install `containerd`:**

```bash
sudo apt-get update \
   && sudo apt-get install -y containerd.io
```

**Create a default `config.toml`:**

```bash
sudo mkdir -p /etc/containerd \
   && sudo containerd config default | sudo tee /etc/containerd/config.toml
```

**Configure `containerd` to use the `systemd` cgroup driver with `runc` by editing the configuration file and adding this line:**


```bash
sudo nano /etc/containerd/config.toml
```

```txt
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
   SystemdCgroup = true
```

**Now restart the daemon:**

```bash
sudo systemctl restart containerd
```

## Step 2: Install Kubernetes Components

**First, install some dependencies:**

```bash
sudo apt-get update \
   && sudo apt-get install -y apt-transport-https curl
```
**Add the package repository keys:**

```bash
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```
**And the repository:**

```bash
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
```
**Update the package listing and install kubelet:**

```bash
sudo apt-get update \
   && sudo apt-get install -y -q kubelet kubectl kubeadm
```
> **Note:** If you’re using containerd as the CRI runtime, then follow these steps:
> 
> **Configure the cgroup driver for kubelet:**
> ```bash
> sudo mkdir -p  /etc/systemd/system/kubelet.service.d/
> ```
> 
> ```bash
> sudo cat << EOF | sudo tee  /etc/systemd/system/kubelet.service.d/0-containerd.conf
> [Service]
> Environment="KUBELET_EXTRA_ARGS= --runtime-request-timeout=15m --container-runtime-endpoint=unix:///var/run/containerd/containerd.sock --cgroup-driver='systemd'"
> EOF
> ```
> **Restart kubelet:**
> ```bash
> sudo systemctl daemon-reload \
>    && sudo systemctl restart kubelet
> ```

**Disable swap**

```bash
sudo swapoff -a
```

**And `init` using `kubeadm`:**
```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16
```

**Finish the configuration setup with Kubeadm:**

```bash
mkdir -p $HOME/.kube \
   && sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config \
   && sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## Step 3: Configure Networking

**Install the Tigera Calico operator and custom resource definitions.**

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.1/manifests/tigera-operator.yaml
```
**Install Calico by creating the necessary custom resource. For more information on configuration options available in this manifest.**

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.1/manifests/custom-resources.yaml
```
**Remove the taints on the control plane so that you can schedule pods on it.**

```bash
kubectl taint nodes --all node-role.kubernetes.io/control-plane-
kubectl taint nodes --all node-role.kubernetes.io/master-
```

## Step 4: Install NVIDIA Drivers



```bash

```

```bash

```

```bash

```

```bash

```
