---
layout: post
title: "Các câu lệnh Ubuntu cơ bản"
subtitle: "Các câu lệnh Ubuntu cơ bản, thường dùng và chức năng của nó trong Ubuntu"
author: "NAB"
header-img: "img/in-post/2022/Jan/Knowledge/Post-3/ubuntu-gb.png"
# header-style: text
header-mask: 0.4
lang: vi
catalog: true
# hidden: false
section:  Knowledge
seo-keywords:
  - Ubuntu basic command
  - Lệnh Ubuntu cơ bản
  - Lệnh ubuntu thường gặp
  - lệnh ubuntu
tags:
  - Ubuntu Command
  - Linux Command
---

> Để mở **Terminal** để gõ các câu lệnh dùng phím tắt `Ctrl+Alt+T`

## Các câu lệnh Ubuntu cơ bản

### System Management

| Lệnh | Chức năng | Cú pháp |
|----|-----------|---------|
| **`sudo`** | Được sử dụng để có thể chạy câu lệnh với quyền cao nhất root hoặc quản trị viên| **`sudo + lệnh`**|
| **`whoami`** | Cho bạn biết bạn hiện đang chạy với tư cách người dùng nào | **`whoami`**|
| **`uname`** | Cung cấp thông tin về hệ điều hành | **`uname -a`** |
| **`shutdown`** | Tắt máy tính | **`shutdown + -h + now`** |
|            | Khởi động lại máy tính | **`sudo + shutdown + -r + now`** |
| **`reboot`**  | Khởi động lại máy tính | **`sudo + reboot`** |
|**`lshw`**| Liệt kê các thiết bị phần cứng | **`lshw`**|
| **`lsusb`** | Liệt kê các thiết bị USB kết nối với máy tính | **`lsusb`** |
| **`lspci`** | Liệt kê các thiệt bị PCI kết nối với máy tính | **`lspci`** |
| **`clear`** | Xoá màn hình Terminal |**`clear`** | 
| **`man`** | Xem mô tả của ***câu lệnh*** | **`man + câu_lệnh`** |

### File and Folder

| Lệnh | Chức năng | Cú pháp |
|----|-----------|---------|
| **`pwd`**| Kiểm tra xem mình đang làm việc ở thư mục nào | **`pwd`** |
| **`ls`** | Giống với câu lệnh **`dir`**, liệt kê những gì có trong thư mục hiện tại | **`ls`** |
| **`cd`** | Di chuyển về thư mục ***home*** | **`cd`** |
|      | Di chuyển về ***thư mục*** cha (thư mục chứa thư mục hiện tại) | **`cd ..`** |
|      | Di chuyển đến 1 ***thư mục*** nằm trong thư mục đang làm việc | **`cd + thư mục`** |
| **`mv`** | Dùng để di chuyển ***tập tin*** | **`mv + /thư_mục_gốc/tên_tệp + thư_mục_đích/tên_tệp`** |
|  | Dùng để đổi ***tên tập tin*** | **`mv + tệp_tên_gốc + tệp_tên_mới`** |
| **`cp`** | Sao chép ***tệp*** | **`cp + /thư_mục_gốc/tệp_gốc + thư_mục_đích/tệp_đích`** |
| **`mkdir`** | Tạo ***thư mục*** mới | **`mkdir + thư_mục_mới`** |
| **`rm`** | Xóa ***tệp*** | **`rm + tên_tệp`** |
|  | Xóa ***thư mục*** trống | **`rmdir + tên_thư_mục`** |
|  | Xóa ***thư mục*** và tất cả tệp trong nó | **`rm + -rf + tên_thư_mục`** |
| **`find`**| Tìm ***tệp*** trong ***thư mục*** | **`find + thư_mục + -name + tên_tệp`** |
| **`cat`** | Xem nội dung của ***tệp***  |  **`cat + tên_tệp`** |
| **`head`**| Xem nội dung ***n*** dòng đầu của ***tệp*** | **`head + -n + tên_tệp`** |
| **`tail`** | Xem nội dung ***n*** dòng cuối của ***tệp*** | **`tail + -n + tên tệp`** |
| **`nano`** | Soạn tập tin dùng trình soạn thảo ***nano*** | **`nano + tên_tệp`** |
| **`gedit`** | Soạn tập tin dùng trình soạn thảo ***gedit*** | **`gedit + tên_tệp`** |
| **`grep`**| Tìm một ***chuỗi*** trong ***tệp*** | **`grep + "chuỗi" + tên_tệp `** |
|       | Tìm một ***chuỗi*** trong tất cả tệp của ***thư mục***| **`grep + -r + "chuỗi" + tên_thư_mục `**|
|**`touch`**| Tạo một ***tệp*** mới | **`touch + tên_tệp.txt`** |




### Network

| Lệnh | Chức năng | Cú pháp |
|------|---------|---------|
|**`etc/network/interfaces`**| Chứa thông tin cấu hình của các bộ phận giao điện (interfaces) | |
| **`ifconfig`** | Xem thông tin về mạng | **`ifconfig`** |
|            | Xác định ***địa chỉ IP*** cho giao diện card mạng ***eth0*** | **`ifconfig + eth0 + địa_chỉ_IP`** |
|            | Kích hoạn giao diện card mạng ***eth0*** | **`ifconfig + eth0 + up`** |
|            | Ngắt giao diện card mạng ***eth0*** | **`ifconfig + eth0 + down`** |
|    **`ifup `** | Kích hoạn giao diện card mạng ***eth0*** | **`ifup + eth0`** |
|    **`ifdown`**| Ngắt hoạn giao diện card mạng ***eth0*** | **`ifdown + eth0`** |
| **`iwconfig`** | Xem thông tin về mạng không dây | **`iwconfig`** |
| **`ping`**     | Thử kết nối mạng đến máy có ***địa chỉ IP*** | **`ping + địa_chỉ_IP`** | 
| **`sudo iwlist scan`** | Tìm kiếm các mạng không dây | **`sudo iwlist scan`**|
| **`poweroff`** | Ngắt tất cả các kết nối mạng | **`poweroff + -i`** |



### Process

| Lệnh | Chức năng | Cú pháp |
|------|---------|---------|
|**`top`**| Kiểm tra tài nguyên hệ thống và tiến trình nào chiếm tài nguyên nhiều nhất | **`top`** |
|**`ps`**| Kiểm tra tất cả các tiến trình đang chạy | **`ps + -a`** |
|**`pgrep`**| Lấy PID của tiến trình | **`pgrep + tên_tiến_trình`** |
|**`kill`**| Tắt tiến trình có ***PID***  | **`kill + PID`** |
|**`pkill`**| Tắt tiến trình có ***tên***  | **`pkill + tên_tiến_trình`** |
|**`killall`**| Tắt tiến trình có ***tên***  | **`killall + tên_tiến_trình`** |
|**`xkill`** | Tắt tiến trình đồ hoạ | **`xkill`** |

### Disk

| Lệnh | Chức năng | Cú pháp |
|------|---------|---------|
|**`etc/fstab`**| Chứa thông tin về các ổ cứng | |
|**`df`**| Kiểm tra dung lượng ổ cứng đã sử dụng và khả dụng trên hệ thống Linux | **`df`**|
|**`du`**| Kiểm tra dung lượng ổ đĩa được sử dụng bởi các thư mục và tệp | **`du`** |
|**`fdisk`**| Xem các phân vùng hiện có | **`sudo + fdisk + -l `** |


### SSH

| Lệnh | Chức năng | Cú pháp |
|------|---------|---------|
| **`ssh`** | Kết nối với một ***host*** với tư cách ***user*** | **`ssh + user_name@ip_của_host`** |
|       | Kết nối với một ***host*** ở cổng ***port*** với tư cách ***user*** | **`ssh + -p + port + user_name@ip_của_host`** |

---

## Đọc thêm
