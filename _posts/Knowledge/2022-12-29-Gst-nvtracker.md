---
layout: post
title: "Gst-nvtracker"
subtitle: "Gst-nvtracker"
author: "NAB"
header-img: "img/in-post/2022/Dec/nvidia_wallpaper.jpg"
# header-style: text
header-mask: 0.4
lang: vi
catalog: true
# hidden: false
section: Knowledge
seo-keywords:
  - NVIDIA
  - GStreamer
  - Install
  - install-gstreamer
  - nvidia-gstreamer
  - GStreamer_tutorial
  - gst-nvtracker
  - tracker
tags:
  - NVIDIA
  - GStreamer
  - DeepStream
---

Plugin này cho phép DeepStream pipeline sử dụng thư viện low-level tracker để track các đối tượng đã được phát hiện bằng ID (có thể là duy nhất) của nó theo thời gian. Nó hỗ trợ một số thư viện low-level có thể implements `NvDsTracker`API, bao gồm các implementation tham khảo được cung cấp bởi thư viện `NvMultiObjectTracker`: NvDCF, DeepSORT, và IOU Tracker. Là một phần của API này, plugin truy vấn thư viện low-level để có các khả năng và yêu cầu liên quan đến ***input format***, ***memory type*** và ***batch processing support***. Dựa trên các truy vấn này, sau đó plugin chuyển đổi input frame buffers sang định dạng mà thư viện low-level tracker yêu cầu. Ví dụ, `NV12` hoặc `RGBA`, trong khi IOU hoàn toàn không yêu cầu frame buffers.

Các khả năng của thư viện low-level tracker cũng bao gồm ***support for batch processing*** (hỗ trợ cho xử lý batch) trên multiple input stream (nhiều đầu vào). Batch processing thường hiệu quả hơn so với xử lý độc lập đặc biệt là khi GPU-based acceleration (tăng tốc độ phần cứng dựa trên GPU) được thực hiện bởi thư viện low-level. Nếu một thư viện low-level ***support batch processing***, thì đó sẽ là chế độ hoạt động được chọn bởi plugin; tuy nhiên tùy chọn này có thể được ghi đè với tùy chọn cấu hình `enable-batch-process` nếu thư viện low-level hỗ trợ cả theo batch và theo luồng (per-stream-modes).

Các khả năng của low-level cũng bao gồm hỗ trợ ***passing the past-frame*** (truyền frame trước đó), bao gồm dữ liệu theo dõi đối tượng được tạo trong các khung hình trước đây nhưng chưa được report là đầu ra. Đây có thể là trường hợp khi low-level tracker lưu trữ dữ liệu theo dõi đối tượng được tạo trong các khung hình trước đây chỉ trong nội bộ do độ tin cây theo dõi thấp, nhưng sau đó đã quyết định report do độ tin cây cao. Nếu dữ liệu khung hình trong quá khứ - past frames được truy xuất từ low-level tracker, nó sẽ được report là *user-meta* gọi là `NvDsPastFrameObjBatch`. Nó có thể được kích hoạt bằng tùy chọn cấu hình `enable-past-frame`.


Plugin chấp nhận dữ liệu khung hình có định dạng `NV12` hoặc `RGBA` từ phần tử upstream và scales (và/hoặc converts) input buffer thành buffer trong plugin tracker dụa trên định dạng được yêu cầu bởi thư viện low-level, với độ phân giải frame đưcọ chỉ định bởi `tracker-width` và `tracker-height` trong tệp cấu hình của phần `[tracker]`. Đường dẫn đến thư viện low-level tracker được chỉ định thông qua tùy chọn cấu hình `ll-lib-file` trong cùng phần. Thư viện low-level đươc sử dụng cũng có thể yêu cầu tệp cấu hình riêng, tệp này có thể được chỉ định thông qua tùy chọn `ll-config-file`. Nếu `ll-config-file` không được chỉ định, thư viện low-level tracker có thể tiếp tục với các giá trị tham số mặc định của nó. Việc triển khai low-level tracker tham khảo được cung cấp bởi thư viện `NvMultiObjectTracker` hỗ trợ các thuật toán theo dõi khác nhau:
- **NvDCF**: **NvDCF** tracker là một  NVIDIA®-adapted Discriminative Correlation Filter (DCF) tracker - Bộ lọc tương quan sử dụng sử dụng thuật toán học phân biệt trực tuyến (online discriminative learning algorithm) dựa trên bộ lọc tương quan (correlation filter-based)cho khả năng theo dõi đối tượng trực quan, đồng thời sử dụng thuật toán liên kết dữ liệu (data association algorithm) và ước tính trạng thái (state estimator) để theo dõi nhiều đối tượng (multi-object tracking). 
- **DeepSORT**: **DeepSORT** tracker là một re-implementation của DeepSORT tracker chính thức, sử dụng phương pháp học chỉ số deep cosine với một Re-ID neural network. Implementation này cho phép người dùng sử dụng bất kỳ mạng Re-ID nào miễn là nó được hỗ trợ bởi framework NVIDIA TensorRT™.
- **IOU Tracker**:  Intersection-Over-Union (IOU) tracker sử dụng các giá trị IOU trong các bounding box của detector giữa 2 frame liên tiếp để thực hiện liên kết giữa chúng hoặc chỉ định ID mục tiêu mới nếu không tìm thấy kết quả khớp. Tracker này bao gồm một logic để xử lý các false positives và false negatives từ object detector; tuy nhiên, đây có thể coi là bare-minimum object tracker, chỉ có thể đóng vai trò là baseline.

Chi tiết hơn về từng thuật toán và triển khai của nó có thể tìm thấy tại phần [NvMultiObjectTracker : A Reference Low-Level Tracker Library](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvtracker.html#nvmultiobjecttracker-a-reference-low-level-tracker-library).


![DeepStream Plugin Gst-nvtracker](/img/in-post/2022/Dec/Knowledge/DS_plugin_gst-nvtracker_6.0GA.png "DeepStream Plugin Gst-nvtracker")

_**Hình 1:** DeepStream Plugin Gst-nvtracker_


# Inputs anb Outputs

Phần này sẽ tổng hợp các inputs và outputs và phương tiện giao tiếp của plugin Gst-nvtracker.

- Input
  - Gst Buffer (dưới dạng frame batch từ các luồng source có sẵn)
  - `NvDsBatchMeta`

Chi tiết hơn về `NvDsBatchMeta` có thể tìm thấy tại [link](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_metadata.html?highlight=nvdsbatchmeta/). Các định dạng màu được plugin nvtracker hỗ trợ cho frame video đầu vào là NV12 và RGBA.

- Output
  - Gst Buffer (được cung cấp như một input)
  - `NvDsBatchMeta` (có thêm tọa đối tượng được theo dõi (object coordinates), độ tin cậy của tracker (tracker confidenc) và ID của đối tượng (object IDs) trong `NvDsObjectMeta`)

> Lưu ý
>
> Nếu thuật toán tracker không tạo giá trị độ tin cậy (confidence) thì giá trị này sẽ được đặt bằng là giá trị mặc định (nghĩa là `1.0`) cho các đối tượng được theo dõi. Đối với **IOU** và **DeepSORT** trackers, `tracker-confidence` được đật là `1.0` vì các thuật toán này không tạo ra giá trị độ tin cậy cho các đối tượng được theo dõi. Mặt khác, **NvDCF** tracker tạo ra độ tin cậy cho các đối tượng được theo dõi do khả năng theo dõi đối tượng trực quan của nó và giá trị của nó được đặt trong trường `tracker-confidence` của cấu trúc `NvDsObjectMeta`.
>
> Lưu ý rằng có các tham số riêng biệt trong `NvDsObjectMeta` cho độ tin cậy của detector và độ tin cậy của tracker, là `confidence` và `tracker-confidence` tương ứng. Chi tiết hơn có thể được tìm thấy trong [New metadata field](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_metadata.html?highlight=tracker_confidence#new-metadata-fields)

Bảng sau tổng hợp các tính năng của plugin.

| Tính năng | Mô tả |
| --- | --- |
| Configurable tracker width/height | Các frames được scaled nội bộ trong plugin NvTracker thành độ phân giải được chỉ định để theo dõi và được chuyển đến thư viện low-level |
| Multi-stream CPU/GPU tracker | Hỗ trợ theo dõi trên batched buffers bao gồm các frames từ nhiều sources |
| NV12 Input | __ |
| RGBA Input | __ |
| Configurable GPU device | Người dùng có thể lựa chọn GPU cho việc chuyển đổi scaling/color format nội bộ và tracking |
| Dynamic addition/deletion of sources at runtime | Hỗ trợ theo dõi trên các sources mới được thêm vào trong quá trình chạy  và cleanup tài nguyên khi sources được gỡ ra |
| Support for user’s choice of low-level library | Tự động load thư viện low-level do người dùng chọn |
| Support for batch processing | Hỗ trợ việc gửi các frames từ nhiều luồng đầu vào tới thư viện low-level dưới dạng một batch nếu thư viện low-level có khả năng xử lý điều đó |
| Support for multiple buffer formats as input to low-level library | Chuyển đổi input buffer thành các định dạng do thư viện low-level yêu cầu, cho tối đa 4 định dạng trên mỗi frame |
| Support for reporting past-frame data | Hỗ trợ việc báo cáo dữ liệu các frame trong quá khứ nếu thư viện low-level hỗ trợ khả năng này |
| Support for enabling tracking-id display | Hỗ trợ enabling hoặc disabling hiển thị của tracking-id |
| Support for tracking ID reset based on event | Dựa trên sử kiện pipeline (ví dụ: `GST_NVEVENT_STREAM_EOS` và `GST_NVEVENT_STREAM_RESET`), IDs theo dõi trên một luồng cụ thể có thể được đặt lại thành 0 hoặc ID mới |

# Gst Properties

Bảng sau mô tả các thuộc tính của plugin Gst-nvtracker.

| Thuộc tính | Mô tả | Type and Range | Ví dụ |
| --- | --- | --- | --- |
| tracker-width | Chiều rộng frame mà tracker sẽ hoạt động, tính bằng pixel | Interger, 0 -> 4,294,967,295 | tracker-width = 640 (bội số của 32) |
| tracker-height | Chiều cao frame mà tracker sẽ hoạt động, tính bằng pixel | Interger, 0 -> 4,294,967,295 | tracker-height = 384 (bội số của 32) |
| ll-lib-file | Tên đường dẫn của thư viện low-level tracker sẽ được load bởi Gst-nvtracker | String | ll-lib-file=­/opt/nvidia/­deepstream/­deepstream/­lib/libnvds_nvmultiobjecttracker.so |
| ll-config-file | Tệp cấu hình cho thư viện low-level nếu cần | Đường dẫn tới file cấu hình | ll-config-file=­config_tracker_NvDCF_perf.yml |
| gpu-id | ID của GPU mà thiết bị/bộ nhớ hợp nhất sẽ được phấp phát với việc sao copy/scaling được sẽ được thực hiện (chỉ dGPU) | Interger, 0 -> 4,294,967,295 | gpu-id=0 |
| enable-batch-process | Enable/disable batch processing mode. Chỉ hiệu quả nếu thư viện low-level hỗ trợ cả batch và per-stream processing (Tùy chọn) (gía trị mặc định là 0) | Boolean, 0 hoặc 1 | enable-batch-process=1 |
| enable-past-frame | Enable/disable reporting past-frame data mode. Chỉ hiệu quả nếu thư viện low-level hỗ trợ nó (Tùy chọn) (gía trị mặc định là 0) | Boolean, 0 hoặc 1 | enable-past-frame=1 | 
| tracking-surface-type | Đặt loại surface stream để theo dõi | Integer, ≥0 | tracking-surface-type=0 |
| display-tracking-id | Cho phép hiển thị ID theo dõi trên OSD (On Screen Display) | Boolean, 0 hoặc 1 | display-tracking-id=1 |
| compute-hw | Công cụ tính toán để sử dụng để scaling. <br> 0 - Mặc định <br> 1 - GPU  <br> 2 - VIC (chỉ dành cho Jetson) | Integer, 0 -> 2 | compute-hw=1 |
| tracking-id-reset-mode | Cho phép force-reset tracking ID dựa trên sự kiện pipeline. Sau khi đặt lại ID theo dõi được bật và sự kiện như vậy xảy ra, ID tracking thấp hơn 32-bit sẽ được reset về 0: <br> 0: Không đặt lại tracking ID khi sự kiện reset luồng hoặc EOS xảy ra <br> 1: Chấm dứt tất cả các trackers hiện có và chỉ định ID mới cho luồng khi quá trình reset luồng diễn ra (tức là `GST_NVEVENT_STEAM_RESET`) <br> 2: Để ID tracking bắt đầu từ 0 sau khi nhận được sự kiện EOS (tức là `GST_NVEVENT_STREAM_EOS`) (Lưu ý: chỉ ID theo dõi thấp hơn 32 bit mới bắt đầu từ 0) <br> 3: Enable cả lựa chọn 1 và 2 | Integer, 0 -> 3 | tracking-id-reset-mode=0 |

# NvDsTracker API for Low-Level Tracker Library

Một thư viện low-level có thể được triển khai bằng API được xác định trong `sources/includes/nvdstracker.h`. Các phần của API đề cập dến `sources/includes/nvbufsurface.h`. Các tên của hàm API và cấu trúc dữ liệu có tiền tố là `NvMOT`, nghĩa là NVIDIA Multi-Object Tracker. Dưới đây là quy trình chung của API:

1. **Hàm cần thiết đầu tiền là:**

```c
NvMOTStatus NvMOT_Query (
     uint16_t customConfigFilePathSize,
     char* pCustomConfigFilePath,
     NvMOTQuery *pQuery
);
```
- Plugin sử dụng hàm này để truy vấn các khả năng và yêu cầu của thư viện low-level trước khi nó bắt đầu bất kỳ phiên xử lý nào  với thư viện. Các thuộc tính được truy vấn bao gồm định dạng màu của các frames (ví dụ: `RGBA` hoặc `NV12`), kiểu dữ liệu (ví dụ:NVIDIA® CUDA® device hoặc CPU-mapped NVMM) và support for batch processing.

- Plugin thực hiện truy vấn này một lần trong giai đoạn khởi tạo và kết quả của nó được áp dụng cho tất cả các contexts được thiết lập với thư viện low-level. Nếu tệp cấu hình của thư viện low-level được chỉ định, nó sẽ được cung cấp trong truy vấn để thư viện tham khảo. Cấu trúc trả lời truy vấn, `NvMOTQuery`, bao gồm các trường sau:
  - `NvMOTCompute computeConfig`: Report các mục tiêu tính toán được hỗ trợ bởi thư viện. Plugin hiện tải chỉ lặp lại giá trị được report khi bắt đầu context.
  - `uint8_t numTransforms`: Số lượng định dạng màu được yêu cầu bởi thư viện low-level. Rải giá trị là từ `0` đến `NVMOT_MAX_TRANSFORMS`. Đặt nó thành `0` nếu thư viện không yêu cầu bất kỳ dữ liệu trực quan nào.
  - > `0` không có nghĩa là dữ liệu chưa được chuyển đổi được truyền đén thư viện
  - 