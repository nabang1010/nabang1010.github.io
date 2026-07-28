---
layout: post
title: "Install DeepStream 6.0"
subtitle: "Install DeepStream 6.0"
author: "NAB"
header-img: "img/in-post/2022/Dec/nvidia_wallpaper.jpg"
# header-style: text
header-mask: 0.4
lang: vi
catalog: true
# hidden: false
section: Knowledge
seo-keywords:
  - deepstream
  - install-deepstream
tags:
  - NVIDIA
  - DeepStream
---

# Hardware

| Device | Model | GPU | CPU | RAM |
|--------|-------|-----|-----|-----|
| Laptop | Lenovo Legion 5 15ARH05H | NVIDIA GeForce GTX 1660 Ti 6GB GDDR6 | AMD Ryzen™ 7 4800H 2.90GHz upto 4.20GHz, 8 cores 16 threads | 16GB LPDDR4 |

# Requirements

- Ubuntu 18.04.6 LTS
- GStreamer Versiom 1.14.5
- NVIDIA Driver Version 470.57.02
- NVIDIA CUDA Toolkit Version 11.4
- TensorRT Version 8.2.5-1+cuda11.4

# Install

## Remove all previous DeepStream installations
  
```bash
sudo rm -rf /usr/local/deepstream /usr/lib/x86_64-linux-gnu/gstreamer-1.0/libgstnv* /usr/bin/deepstream* /usr/lib/x86_64-linux-gnu/gstreamer-1.0/libnvdsgst* /usr/lib/x86_64-linux-gnu/gstreamer-1.0/deepstream* /opt/nvidia/deepstream/deepstream*
```
```bash
sudo rm -rf /usr/lib/x86_64-linux-gnu/libv41/plugins/libcuvidv4l2_plugin.so
```
## Install Dependencies

Install the necessary packages before installing the DeepStream SDK

```bash
sudo apt install \
          libssl1.0.0 \
          libgstreamer1.0-0 \
          gstreamer1.0-tools \
          gstreamer1.0-plugins-good \
          gstreamer1.0-plugins-bad \
          gstreamer1.0-plugins-ugly \
          gstreamer1.0-libav \
          libgstrtspserver-1.0-0 \
          libjansson4 \
          gcc \
          make \
          git \
          python3
```

## Install NVIDIA Driver 470.x.x

- Search all versions

```bash
sudo apt-cache search nvidia-utils
```

- Install NVIDIA Driver 470

```bash
sudo apt install nvidia-utils-470
```

## Install NVIDIA CUDA Toolkit 11.4

```bash 
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin
```
```bash 
sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600
```
```bash
wget https://developer.download.nvidia.com/compute/cuda/11.4.1/local_installers/cuda-repo-ubuntu1804-11-4-local_11.4.1-470.57.02-1_amd64.deb
```
```bash
sudo dpkg -i cuda-repo-ubuntu1804-11-4-local_11.4.1-470.57.02-1_amd64.deb
```
```bash
sudo apt-key add /var/cuda-repo-ubuntu1804-11-4-local/7fa2af80.pub
```
```bash
sudo apt-get update
```

```bash
sudo apt-get -y install cuda
```

## Install TensorRT 8.2.5

1. Download TensorRT 8.2 GA Update 4 for x86_64 Architecture
Debian, RPM, and TAR Install Packages for Linux from  https://developer.nvidia.com/compute/machine-learning/tensorrt/secure/8.2.5.1/local_repos/nv-tensorrt-repo-ubuntu2004-cuda11.4-trt8.2.5.1-ga-20220505_1-1_amd64.deb

2. Install TensorRT from the Debian local repo package.
```bash
os="ubuntu1804"
```
```bash
tag="cuda11.4-trt8.2.5.1-ga-20220505"
```
```bash
sudo dpkg -i nv-tensorrt-repo-${os}-${tag}_1-1_amd64.deb
```
```bash
sudo apt-key add /var/nv-tensorrt-repo-${os}-${tag}/*.pub
```
```bash
sudo apt-get update
```
```bash
sudo apt-get install tensorrt
```
```bash
python3 -m pip install numpy
sudo apt-get install python3-libnvinfer-dev
```
```bash
python3 -m pip install protobuf
sudo apt-get install uff-converter-tf
```
```bash
python3 -m pip install numpy onnx
sudo apt-get install onnx-graphsurgeon
```
3. Verify the installation
```bash
dpkg -l | grep TensorRT
```

## Install DeepStream SDK 6.0

Download the DeepStream 6.0 dGPU Debian package deepstream-6.0_6.0.0-1_amd64.deb : https://developer.nvidia.com/deepstream-6.0_6.0.0-1_amd64deb

```bash
sudo apt-get install ./deepstream-6.0_6.0.0-1_amd64.deb
```
----

# References
- [Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/6.0/dev-guide/text/DS_Quickstart.html#dgpu-setup-for-ubuntu)
- [Install Guide TensorRT](https://docs.nvidia.com/deeplearning/tensorrt/archives/tensorrt-825/install-guide/index.html)