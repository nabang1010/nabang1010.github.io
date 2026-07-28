---
layout: post
title: "Hướng dẫn sử dụng Google Colab cho người mới bắt đầu"
subtitle: "Google Colab là gì ?, Google Colab dùng để làm gì ?, Cách để sử dụng Google Colab ?"
author: "NAB"
header-img: "img/in-post/2022/Jan/Tools/Post-2/google-colab-background.jpg"
# header-style: text
header-mask: 0.4
lang: vi
catalog: true
# hidden: false
section:  Tools
seo-keywords:
  - google colab là gì
  - google colaboratory
  - google colab pro
  - google colab gpu
  - google colab gpu
  - google colaboratory là gì
  - google colab ngắt kết nối
  - google colab notebook
  - google colab python
  - google colab and jupyter notebook
  - hướng dẫn sử dụng google colab
  - google colab machine learning
  - train bằng google colab
  - google colab deep learning

tags:
  - Tutorial
  - Tool
---


> **Google Colab là gì ? Bạn học AI ? Bạn cần huấn luyện các mô hình mà máy bạn lại yếu ? Bạn cần một công cụ dễ dàng cho việc trình bày một cách trực quan ?** Nếu bạn đang gặp vấn đề trên, bài viết này là dành cho bạn. Trong bài viết này mình sẽ hướng dẫn các bạn sử dụng Google Colab như một công cụ học tập AI. Và nhưng bài viết sau mình sẽ hướng dẫn các bạn huấn luyện các mô hình phổ biến trên Colab.


---
![Google Colab](https://img.shields.io/badge/google_colab-000?style=for-the-badge&logo=google-colab&logoColor=F9AB00 "Google Colab")

## 1. Google Colaboratory là gì ?
 
Google Colaboratory (Google Colab) là một sản phẩm của Google Research cho phép người dùng có thể viết và thực thi đoạn mã python thông qua trình duyệt. Đặc biệt Google Colab còn có cấu hình mạnh cho phép người dung có thể học tập và nghiên cứu về Machine Learning. Về mặt kỹ thuật, Colab là một tổ chức dịch vụ Jupyter notebook không yêu cầu thiết lập để sử dụng, đồng thời cung cấp quyền truy cập miễn phí vào các tài nguyên máy tính bao gồm GPU.


Google Colab bản **Free** có 3 chế độ chạy:

| CPU | GPU | TPU |
| :------: | :------: | :------: |
| Intel® Xeon® Processor 2.20 GHz 2 Cores | Intel® Xeon® Processor 2.30 GHz 2 Cores | Intel® Xeon® Processor 2.20 GHz 2 Cores |
| RAM: 13GB | RAM: 13GB | RAM: 13GB |
| | NVIDIA Tesla T4s 16GB VRAM DDR5 or NVIDIA Tesla K80s & P100s | Cloud TPU with 180 teraflops of computation |

**Ưu điểm và nhược điểm của Google Colab**
> Dưới dây là nhận xét của chính bản thân mình sau khi được sử dụng. Các bạn có thể góp ý thêm cho mình ở phần bình luận để mình có thể bổ sung thêm vào bài viết. Cảm ơn các bạn rất nhiều.

**Ưu điểm:**
* Dễ dàng sử dụng chỉ với trình duyệt kết nối internet (không cần cài trên máy)
* Có **GPU** và **TPU** là một công cụ hoàn hảo hỗ trơ cho việc học Deep Learning và Data Analytics
* Có sẵn Python và các thư viện hỗ trợ cho việc học (TensorFlow, Keras, PyTorch, ... )
* Có thể dùng như một bản trình bày bằng việc sử dụng **Markdown**
* Giao diện rõ ràng có hỗ trợ nhiều chế độ hiển thị (Dark mode / Light mode)
* Có thể **mount** (liên kết) với Google Drive để lấy dữ liệu.
  
**Nhược điểm:**
* Bị giới hạn thời gian sử dụng (phiên làm việc của bạn chỉ có < **12 tiếng** / 1 ngày) nếu muốn sử dụng với thời gian lâu hơn bạn có thể tham khảo Google Colab bản **Pro** và **Pro+** tại [đây](https://colab.research.google.com/signup)
* Quá trình đọc và ghi dữ liệu từ Google Dive còn chậm (delay). Nếu bạn xử lý với dữ liệu lớn có thể **upload** trực tiếp vào Google Colab để không bị trễ nhưng dữ liệu này **sẽ mất** sau khi phiên làm việc của bạn kết thúc
* Phiên làm việc của bạn có thể bị ngắt nếu kết nối mạng bị yếu hoặc mất.
  

## 2. Hướng dẫn sử dụng Google Colab

Bạn có thể làm việc với Google Colab bằng 2 cách tiếp cận sau [truy cập trực tiếp vào Google Colab](#211-truy-cập-trực-tiếp-và-tạo-notetbook) hoắc có thể [sử dụng với Google Drive](#212-mở-notebook-từ-google-drive).

### 2.1. Tạo notebook mới

#### 2.1.1. Truy cập trực tiếp và tạo notetbook

Để có thể sử dụng Google Colab bạn có thể truy cập vào trang Google Colab tại [**colab.research.google.com**](https://colab.research.google.com/).

![Truy cập vào Google Colab](/img/in-post/2022/Jan/Tools/Post-2/new_notebook.jpg "Truy cập vào Google Colab") 

Tại đây bạn có thể:
* Tạo một Notebook mới bằng cách bấm **New notebook** 
* Mở notebook trong Google Drive bằng cách chọn **Google Drive** và chọn file bạn muốn mở (đuôi **.ipynb**)
* Mở notebook trong Github bằng cách chọn **GitHub** và nhập URL của repo có chưa file bạn muốn mở
* Tải lên notebook của bạn bằng cách chọn **Upload** và tải lên file bạn muốn mở. 

#### 2.1.2. Mở notebook từ Google Drive
> Ngoài viêc có thể mở file bằng cách truy cập trực tiếp vào Google Colab. Bạn có thể mở Google Colab bằng cách sau.

Để Google Colab có thể đọc được các tập tin có chứa đoạn mã chương trình đuôi ***.ipynb*** (*notebook document sử dụng bởi Jupiter Notebook*) được lưu trong Google Drive bạn cần phải kết nối Google Drive với Google Colab. 

Để kết nối Google Colab với Google Drive chúng ta là như sau:
* Truy cập vào [**Google Drive**](https://drive.google.com/drive/my-drive) của mình chọn **Drive của tôi** &rarr; **Ứng dụng khác** &rarr; **Kết nối ứng dụng khác** 
* **Hoặc** bấm dấu **+**

![Kết nối Google Colab với Google Drive](/img/in-post/2022/Jan/Tools/Post-2/them-google-colab-vao-google-drive-1.jpg "Kết nối Google Colab với Google Drive")

<!-- *Hình 1.5 Kết nối Google Colab với Google Drive* -->
* Ở cừa sổ mới hiện ra nhập **Colab** để tìm kiếm &rarr; **Colaboratory**
   
![Tìm Colaboratory](/img/in-post/2022/Jan/Tools/Post-2/tim-google-colab.jpg "Tìm Colaboratory")

<!-- *Hình 1.6 Tìm Colaboratory* -->
* Ở cừa sổ mới hiện ra chọn **Colaboratory**

![Chọn Colaboratory](/img/in-post/2022/Jan/Tools/Post-2/chon-colaboratory.jpg "Chọn Colaboratory")

<!-- *Hình 1.7 Chọn Colaboratory* -->
* Chọn **Cài đặt**

![Chọn Cài đặt](/img/in-post/2022/Jan/Tools/Post-2/chon-cai-dat.jpg "Chọn Cài đặt")

<!-- *Hình 1.8 Chọn Cài đặt* -->
* Ở cừa sổ mới hiện ra chọn **TIẾP TỤC**

![Chọn TIẾP TỤC](/img/in-post/2022/Jan/Tools/Post-2/chon-tiep-tuc.jpg "Chọn TIẾP TỤC")

<!-- *Hình 1.9 Chọn TIẾP TỤC* -->
* Xác nhận tài khoản Google Drive của bạn. 

![Kết nối Google Colab thành công](/img/in-post/2022/Jan/Tools/Post-2/ket-noi-google-colab-thanh-cong.jpg "Kết nối Google Colab thành công")

<!-- *Hình 1.10 Kết nối Google Colab thành công* -->

Vậy là chúng ta đã kết nối thành công Google Colab với Google Drive. Bây giờ bạn có thể chọn file chương trình của bạn trong Google Drive và nó sẽ được mở trong Google Colab hoặc bạn có thể tạo một notebook mới bằng cách.

**Tạo notetbook mới từ Google Drive:**
* Truy cập vào [**Google Drive**](https://drive.google.com/drive/my-drive) của mình chọn **Drive của tôi** &rarr; **Ứng dụng khác** &rarr; **Google Colaboratory** .

![Tạo notetbook mới từ Google Drive](/img/in-post/2022/Jan/Tools/Post-2/tao-notebook-moi-tu-drive.jpg "Tạo notetbook mới từ Google Drive")

* Cửa sổ notebook mới sẽ mở ra.

![Cửa sổ notebook mới mở ra](/img/in-post/2022/Jan/Tools/Post-2/new-notebook.jpg "Cửa sổ notebook mới mở ra")


### 2.2. Làm quen với Google Colab

#### 2.2.1. Đổi tên notebook

Bạn có thể đổi notebook bằng cách bấm vào tên hiện tại của notebook tại góc trên bên trái và gõ tên mới vào đó. Sau đó nhấn **Enter** để hoàn tất đặt tên mới.

![Đổi tên notebook](/img/in-post/2022/Jan/Tools/Post-2/doi-ten-notebook.jpg "Đổi tên notebook")

#### 2.2.2. Đổi chế độ chạy

Như đã đề cập ở trên, Google Colab bản miễn phí sẽ có 3 chế độ chạy. 
* Để đổi các chế độ chạy bạn có thể chọn **Runtime** &rarr; **Change runtime type**.


![Đổi chế độ chạy](/img/in-post/2022/Jan/Tools/Post-2/doi-che-do-chay.jpg "Đổi chế độ chạy")


* Chọn chế độ chạy bạn muốn sau đố chọn **Save**.
> Chế độ chạy sẽ được lưu cùng với notebook, từ lần sau mở notebook đó bạn sẽ không phải chọn lại chế độ chạy nữa. Trừ khi bạn muốn đổi chế độ chạy.

#### 2.2.3. Kết nối và huỷ phiên làm việc
> Ở góc trên bên phải bạn sẽ nhìn thấy một số biểu tưởng như hình dưới đây.


![Kết nối và huỷ phiên làm việc trong Goolge Colab](/img/in-post/2022/Jan/Tools/Post-2/ket-noi-va-huy-phien-trong-colab.jpg "Kết nối và huỷ phiên làm việc trong Goolge Colab")

Chức năng của chúng là:
* Nhận xét (comment): bạn có thể thêm bình luận vào các cell để tiện khi xem lại hoặc chia sẻ cho bạn bè.
* Chia sẻ (share): notebook có thể được chia sẻ cho nhiều xem và có thể chạy.
* Cài đặt (setting): cho phép bạn cài đặt các Google Colab
* Kết nối(connect): ở đây bạn có thể xem được dung lượng RAM và bộ nhớ bạn đã sử dụng
* * Quản lý các phiên làm việc (manage sessions): cho bạn xem các phiên làm việc đang hoạt động và có thể chấm dứt phiên làm việc đấy bằng cách chọn Chấm dứt (**TERMINATE**) như trong hình dưới đây.
  
![Chấm dứt phiên làm việc](/img/in-post/2022/Jan/Tools/Post-2/terminate-session.jpg "Chấm dứt phiên làm việc")

* Ngoài ra khi đang làm việc với Google Colab mà bạn bị mất kết nối mạng thì có thể bấm vào nút **Reconnect** như trong trường hợp dưới đây để có thể tiếp tục sử dụng.
  
![Kết nối lại Google Colab](/img/in-post/2022/Jan/Tools/Post-2/reconnect.jpg "Kết nối lại Google Colab")

#### 2.2.4. Panel bên trái

> Ở góc trên bên trái bạn sẽ nhìn thấy một panel như hình dưới đây

![Panel](/img/in-post/2022/Jan/Tools/Post-2/panel.jpg "Panel")

Các thành phần của panel này là:
1. Table of contents: mục lục
2. Find and replace: tìm kiếm và thay thế
3. Code snippets: các đoạn code mẫu
4. Variables: các biến
5. Files: các tệp
   
**Tabel of contents**

TOC (Tables of contents) hay còn gọi là một công cụ tạo mục lục cho các tiêu đề trong bài trình bày của bạn. Khi bạn bấm vào các mục trong tiêu đề sẽ đưa bạn đến vị trí tiêu đề đó trong bài trình bày. Mục lục rất có ích trong bài trình bày của bạn. Nó giúp người đọc có cái nhìn khái quát về nội dụng và bố cục của bài.

![Mục lục](/img/in-post/2022/Jan/Tools/Post-2/toc.jpg "Mục lục")

**Find and replace**

Công cụ này giúp bạn tìm và có thể thay thế các chữ hoặc ký tự trong notebook.

**Code snippets**

Đây là một công cụ giúp bạn có thể tìm được các đoạn code mẫu mà Google Colab cung cấp sẵn và sử dụng trong notebook. Giúp ích cho nhiều bạn đang bắt đầu học và tiết kiệm thời gian.

**Variables**

Công cụ này giúp bạn có thể xem được các biến hiện tại đang có gồm: tên, kiểu dữ liệu, hình dạng, giá trị của nó. Công cụ này giúp bạn có cái nhìn khái quát về dữ liệu mà mình đang xử lý. Nhất là những bài toán có dữ liệu lớn. Mình hay dùng công cụ này để debug code.

![Variabless](/img/in-post/2022/Jan/Tools/Post-2/variables.jpg "Variables")

**Files**

Công cụ này cho phép bạn nhìn thấy được các thư mục và các tếp mình đang làm việc.

#### 2.2.5. Cell

Trong Google Colab có 2 loại cell đó là:
* Code cell nơi chứa các đoạn code python hoặc các câu lệnh có thể chạy riêng biệt từng cell.
* Text cell các ô văn bản được định dạng bằng một ngôn ngữ đánh dấu đơn giản gọi là Markdown.

Để tạo một **Code cell** hoặc **Text cell** bạn có thể là như sau:
* Chọn **+ Code** hoặc **+ Text** ở  2 vị trí như trong ảnh dưới đây
  
![Tạo cell mới](/img/in-post/2022/Jan/Tools/Post-2/cac-loai-cell.jpg "Tạo cell mới")

Ở cuối mỗi code cell hoặc text cell chúng ta sẽ thấy các lựa chọn sau:

![Thao tác với cell](/img/in-post/2022/Jan/Tools/Post-2/thao-tac-voi-cell.jpg "Thao tác với cell")

1. Move cell up `Cmd/Ctrl+M K`:  di chuyển cell lên trên.
2. Move cell down `Cmd/Ctrl+M J`: di chuyển cell xuống dưới.
3. Link to cell: lấy đường dẫn đến cell.
4. Add a comment `Cmd/Ctrl+Alt+M`: thêm chú thích vào cho cell.
5. Open editor settings: mở cài đặt của trình soạn thảo (editor).
6. Edit/Close Editor: chỉnh sửa cell/tắt chỉnh sửa cell.
7. Mirror cell in tab: xem cell trong tab.
8. Delete cell `Cmd/Ctrl+M D`: xoá cell.
9. More cell actions: Các thao tác khác.
   1.  Select cell `Cmd/Ctrl+Shift+S`: chọn cell.
   2.  Coppy cell: sao chép cell.
   3.  Cut cell: cắt cell.

**Code cell**

> Ở trong Code cell bạn có thể chạy được các câu lệnh của **python** .

![Chạy các câu lệnh python](/img/in-post/2022/Jan/Tools/Post-2/python-in-code-cell.jpg "Chạy các câu lệnh python")

Sau khi gõ các câu lệnh của python xong, bạn có thể bấm nút play/pause ở đầu cell để thực thi/ngắt chạy code. Ngoài ra bạn có thể run cell bằng cách dùng phím tắt:
* `Cmd/Ctrl+Enter`: chạy cell tại chỗ.
* `Shift+Enter`: chạy cell và di chuyển con trỏ xuống cell tiếp theo (thêm cell mới nếu cell tiếp theo không tồn tại).
* `Alt+Enter`: chạy cell và chèn thêm một cell mới ngay dưới nó.

Và kết quả đoạn code sau khi chạy xong sẽ được hiển thị ở phần output ngay dưới cell.

Để xoá kết quả chạy chọn vào nút **Clear output** như hình dưới đây.

![clear output](/img/in-post/2022/Jan/Tools/Post-2/clear-output.jpg "Xoá output")



> Ngoài ra có thể chạy được các câu lệnh của **bash** như trong **terminal** của hệ điều hành **Ubuntu** bằng cách thêm **"`!`"** vào đầu mỗi câu lệnh.

![Chạy các câu lệnh bash](/img/in-post/2022/Jan/Tools/Post-2/bash-in-code-cell.jpg "Chạy các câu lệnh bash")


**Text cell**
> Như mình đã nói ở trên chúng ta có thể sử dụng Google Colab như một bài trình bày bằng việc sử dụng ngôn ngữ **Markdown**. Hoặc bạn có thể sử dụng các công cụ có ở trên mỗi text cell để soạn thảo cho bài trình bày của mình.

* Để có thể sửa hoặc gõ trong một text cell bạn phải click chuột vào text cell hoặc chọn biểu tượng **Edit** ở bên phải text cell.

* Giao diện như bên dưới hiện ra. Ở bên trái là văn bản đang soạn thảo và bên phải sẽ là kết quả.
* Để kết thúc chỉnh sửa bạn phải click ra một vùng khác ngoài text box hiện tại hoặc chọn biểu tượng **Close edit** ở bên phải text cell

![Text cell](/img/in-post/2022/Jan/Tools/Post-2/text-cell.jpg "Text cell")


#### 2.2.6. Mount Google Drive

Để có thể liên kết với Google Drive và lấy dữ liệu để làm việc trên Google Colab bạn cần phải **Mount** Google Drive.

  
* Chạy đoạn code dưới đây trong một code cell để có thể mount với Google Drive

```python
from google.colab import drive
drive.mount('/content/drive')
```

* Sau khi kết nối xong bạn sẽ nhìn thấy thư mục **drive** trong công cụ Files

![Mounted Google Drive](/img/in-post/2022/Jan/Tools/Post-2/mounted-drive.jpg "Mounted Google Drive")

Vậy là bạn đã kết nối với Google Drive thành công. Bạn có thể đọc hoặc ghi dữ liệu của mình ở Google Drive


---

> Trên đây là toàn bộ bài viết về hướng dẫn sử dụng Google Colab cho người mới bắt đầu của mình. Nếu bạn có bất kỳ một thắc mắc nào hãy để lại bình luận để mình cùng mọi người có thể giải đáp cho bạn. Cám ơn bạn đã dành thời gian đọc bài viết của mình.

---

## Đọc thêm
* [Overview of Colaboratory Features](https://colab.research.google.com/notebooks/basic_features_overview.ipynb)
* [Welcome To Colaboratory](https://colab.research.google.com/?utm_source=scs-index#scrollTo=lSrWNr3MuFUS)
* [Markdown Guide](https://colab.research.google.com/notebooks/markdown_guide.ipynb) 