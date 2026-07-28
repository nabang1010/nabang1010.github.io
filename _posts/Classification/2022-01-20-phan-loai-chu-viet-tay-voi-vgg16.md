---
layout: post
title: "Phân loại chữ cái viết tay với mô hình VGG16"
subtitle: "VGG16 là gì ?,Google Colab là gì ?, Làm thế nào để đào tạo VGG16 trên Google Colab? VGG16 có thể đạt được độ chính xác cao trong phân loại chữ viết tay?"
author: "NAB"
header-img: "img/in-post/2022/Jan/Classification/Post-1/header-img.jpg"
# header-style: text
header-mask: 0.4
lang: vi
catalog: true
hidden: true
section:  Classification
seo-keywords:
  - vgg16 là gì
  - vgg16 keras
  - vgg16 pytorch
  - vgg16 paper
  - vgg16 model
  - vgg16 code
  - vgg16 architecture
  - vgg16 cnn
  - vgg16 architecture keras
  - vgg16 architecture diagram
  - train vgg16
  - train vgg16 google colab
  - vgg16 chữ viết tay
  - nhận diện chữ viết tay
  - phân loại chữ viết tay
  - chữ viết tay deep learning
tags:
  - VGG16
  - Image Classification
---

 > Trong bài viết này, mình sẽ hướng dẫn các bạn cách huấn luyện một mô hình phân loại chữ cái viết tay bằng Google Colab với bộ dữ liệu NIST. Trước tiên, chúng ta sẽ cùng tìm hiểu qua về kiến trúc mô hình nay được sử dụng VGG16 và bộ dữ liệu NIST.

## 1. Giới thiệu

### 1.1. VGG16 là gì ?

VGG16 là một mô hình mạng nơ ron tích chập được đề bởi Karen Simonyan và Andrew Zisserman, Vision Geometry Group (VGG) - Đại học Oxford trong bài báo “Very Deep Convolution Networks for Large-Scale Image Recognition”. Mô hình VGG16 đạt được độ chính xác 92,7%  top 5 kiểm tra tập dữ liệu ImageNet (bộ dữ liệu  lớm gồm 14 triệu ảnh và 1000 nhãn). Và là một trong những mô hình nổi tiếng được nộp trong cuộc thị ImageNet Large-Scale Visual Recognition Challenge 2014 (ILSVRC - 2014) - cuộc thi nhận diện hình ảnh trên quy mô lớn.

VGG16 được thiết kế với 13 lớp tích chập (Convolution Network) và 3 lớp liên kết đầy đủ kèm theo ReLU.

![Kiến trúc VGG16](/img/in-post/2022/Jan/Classification/Post-1/kien-truc-vgg16.jpg "Kiến trúc VGG16")

*Hình 1.1 Kiến trúc VGG16*


![Các lớp VGG16](/img/in-post/2022/Jan/Classification/Post-1/cac-lop-vgg16.jpg "Các lớp VGG16")

*Hình 1.2 Các lớp VGG16*


### 1.2. Bộ dữ liệu NIST

**Bộ dữ liệu đặc biệt 19 (Special Database -  SD19 1st)** chứa hình ảnh nhị phân đầy đủ trang của 3699 mẫu viết tay (**Handwriting Sample Forms - HSFs**) và 814255 ký tự và chữ số được phân đoạn ra từ các mãu đó. 

![Handwriting Sample Form](/img/in-post/2022/Jan/Classification/Post-1/handwriting-sample-form.jpg "Handwriting Sample Form")

*Hình 1.3 Handwriting Sample Form*

![Hình ảnh bộ các chữ cái trong bộ dữ liệu NIST](/img/in-post/2022/Jan/Classification/Post-1/NIST.jpg "Bộ dữ liệu NIST")

*Hình 1.4 Hình ảnh các chữ cái thường trong bộ dữ liệu NIST*

Có năm thư mục trong _cây dữ liệu con_. Cái đầu tiên _**hsf_page**_ chứa các hình ảnh đầy đủ của mẫu viết tay (HFS). Bốn thư mục khác (_**by_write**_, _**by_field**_, _**by_class**_, _**by_merge**_), mỗi cái có tổ chức hình ảnh các ký tự đã được phân đoạn phù hợp với các ứng dụng nhận diện khác nhau.

Trong bài viết này mình sẽ sử dụng dữ liệu NIST trong thư mục _**by_class**_. Dữ liệu trong thư mục này được tổ chức theo nhãn (_class_). Tổ chức phân cấp theo kiểu này chứa các tệp ít và lớn, và thích hợp cho việc nghiên cứu phân tách và nhận dạng lớp. 


```sh
by_class
|
|
30 ... 39 41 ... 5a 61 ... 7a
|
|
hsf_0.mis ... hsf_7.mis train_30.mis
hsf_0.cls ... hsf_7.cls train_30.cls
hsf_0.mit ... hsf_7.mit train_30.mit

<-- NIST Special Database 19 User Guide -->
```       
*Cấu trúc thư mục bên trong bộ dữ liệu NIST*


Tên các thư mục con có các nhãn là các biểu diễn ASCII hệ thập lục phân (_hexadecimal_). 

> Các số `0 --> 9` có giá trị trong ASCII đổi sang hệ hexa là từ `0x30 --> 0x39` nên tên thư mục tương ứng sẽ là từ `30 --> 39`.

> Tương tự từ `A --> Z` là `41 --> 5a` và từ `a --> z` là `61 --> 7a`.


Trong đó có những file như:

- ***.mis***: là một tệp chứa nhiều hình ảnh các ký tự tách biệt

- ***.cls***: là một tệp có chứa các lớp đã kiểm tra của hình ảnh được chứa trong tệp ***.mis*** đi kèm

- ***.mit***: là một tệp có chứa con trỏ đến nguồn ***misfile***. Nó chứa danh tính người viết và vị trí chính sác (tên đường dẫn và chỉ mục bù) cho các ký tự phân đoạn của người viết đó được giữ trong tệp ***.mis*** đi kèm.

- ***train_\*\*.mis*** chứa tất cả các ảnh của ***hsf{0,1,2,3,6,7}***. ***hsf_4*** được dùng như một tập ***test*** tiêu chuẩn bảo cáo kết quả thử nghiệm. Các tệp này được đề xuất cho nghiên cứu OCR 

> Trông nó khá phức tạp và khó hiểu nhưng thực ra khi mình giải nén ra thì cấu trúc của file dữ liệu _**by_class**_ sẽ như thế này:

```sh
├───30
│   ├───hsf_0
│   │   ├───hsf_0_00000.png
│   │   ├───hsf_0_00001.png
│   │   ├───hsf_0_00002.png
│   │   ├── .
│   │   ├── .
│   │   └── .
│   ├───hsf_1
│   ├───hsf_2
│   ├───hsf_3
│   ├───hsf_4
│   ├───hsf_6
│   ├───hsf_7
│   └───train_30
│       ├───train_30_00000.png
│       ├───train_30_00001.png
│       ├───train_30_00002.png
│       ├── .
│       ├── .
│       └── .
├─── .
├─── .
├─── .
│    
├───39
│   ├───hsf_0
│   ├───hsf_1
│   ├───hsf_2
│   ├───hsf_3
│   ├───hsf_4
│   ├───hsf_6
│   ├───hsf_7
│   └───train_39
│    
├───41
│   ├───hsf_0
│   ├───hsf_1
│   ├───hsf_2
│   ├───hsf_3
│   ├───hsf_4
│   ├───hsf_6
│   ├───hsf_7
│   └───train_41
│    
├── .
├── .
├── .
│    
├───5a
│   ├───hsf_0
│   ├───hsf_1
│   ├───hsf_2
│   ├───hsf_3
│   ├───hsf_4
│   ├───hsf_6
│   ├───hsf_7
│   └───train_5a
│    
├───61
│   ├───hsf_0
│   ├───hsf_1
│   ├───hsf_2
│   ├───hsf_3
│   ├───hsf_4
│   ├───hsf_6
│   ├───hsf_7
│   └───train_61
│    
├── .
├── .
├── .
│ 
└───7a
    ├───hsf_0
    ├───hsf_1
    ├───hsf_2
    ├───hsf_3
    ├───hsf_4
    ├───hsf_6
    ├───hsf_7
    └───train_7a
```



### 1.3. Google Colaboratory

Quá trình huấn luyện sử dụng Google Colab (Google Colaboratory). Google Colab là một sản phẩm của Google Research cho phép người dùng có thể viết và thực thi đoạn mã python thông qua trình duyệt. Đặc biệt Google Colab còn có cấu hình mạnh cho phép người dung có thể học tập và nghiên cứu về Machine Learning.

## 2. Chuẩn bị dữ liệu và huấn luyện

### 2.1. Chuẩn bị dữ liệu


```python
from keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split


import sklearn.metrics as metrics


load_train = ImageDataGenerator(rescale=1. / 255,
                                shear_range=0.2,
                                width_shift_range=0.2,
                                height_shift_range=0.2,
                                zoom_range=0.2,
                                horizontal_flip=True,
                                fill_mode='nearest')

load_test = ImageDataGenerator(rescale=1. / 255)

trainset = load_train.flow_from_directory('/content/data',
                                       target_size=(128, 128),
                                       color_mode="rgb", 
                                       class_mode='categorical', 
                                       batch_size= 64 )
testset = load_test.flow_from_directory('/content/test', 
                                       target_size=(128, 128),
                                       color_mode="rgb", 
                                       class_mode='categorical', 
                                       batch_size= 64)
```


### 2.2. Xây dựng mô hình & huấn luyện

.

.

.

```python
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.utils import np_utils

model = Sequential()

model.add(Conv2D(input_shape=(128,128,3),
                filters=64,kernel_size=(3,3),
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=64,
                kernel_size=(3,3),
                padding="same", 
                activation="relu"))
                
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(filters=128, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=128, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(filters=256, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=256, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=256, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(filters=512, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=512, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=512, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(filters=512, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=512, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(Conv2D(filters=512, 
                kernel_size=(3,3), 
                padding="same", 
                activation="relu"))

model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))

model.add(Flatten())

model.add(Dense(units=4096,activation="relu"))

model.add(Dense(units=4096,activation="relu"))

model.add(Dense(units=26, activation="softmax"))

model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])
              
model.summary()

model.fit_generator(generator=trainset,
                    steps_per_epoch=888,
                    epochs=10,
                    validation_data=testset,
                    validation_steps=36)

# =====================Coding========================
```
### 2.3. Kết quả huấn luyện
.

.

.

## 3. Đánh giá và phân loại thử

### 3.1. Đánh giá



### 3.2. Phân loại thử

```python
from google.colab.patches import cv2_imshow
from keras.preprocessing.image import ImageDataGenerator
load_predict = ImageDataGenerator(rescale=1./255)
predict_file = load_predict.flow_from_directory(
        '/content/gdrive/MyDrive/ABC',
        target_size=(128, 128),
        color_mode="rgb",
        class_mode='categorical',
        batch_size= 1)
cv2_imshow(predict_file[0][0][0]*255)
predict = model.predict_generator(predict_file,steps = 1)
index = np.argmax(predict)
print("ket qua du doan:  " + class_idx[ index ])
```



```python
predictions = model.predict(samples_to_predict)
print(predictions)
```

.

.

---
## Tài liệu tham khảo
- [Very Deep Convolution Networks for Large-Scale Image Recognition](https://arxiv.org/abs/1409.1556)
- [NIST Special Database 19](https://www.nist.gov/srd/nist-special-database-19)
- [NIST Special Database 19 User Guide](https://s3.amazonaws.com/nist-srd/SD19/1stEditionUserGuide.pdf)