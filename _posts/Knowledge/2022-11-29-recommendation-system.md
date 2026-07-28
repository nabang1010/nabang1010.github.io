---
layout: post
title: "Collaborative Filtering Recommender Systems "
subtitle: "J. Ben Schafer, Dan Frankowski, Jon Herlocker, and Shilad Sen"
author: "NAB"
header-img: "img/in-post/2022/Nov/Knowledge/MovieLens_use_CF.png"
# header-style: text
header-mask: 0.6
lang: vi
catalog: true
# hidden: false
section:  Knowledge
seo-keywords:
  - RS
  - recommendation
  - system
  - content
  - item
tags:
  - Recommendation System 
  - Collaborative Filtering
  - Knowledge
---

## Abstract
Một trong những công nghệ các nhân hóa mạnh mẽ cung cấp sức mạnh cho web là collaborative filtering (CF) - lọc cộng tác. CF là quá trình lọc hoặc đánh giá các items thông qua ý kiến của người khác. Công nghệ CF tập hợp ý kiến của các cộng đồng lớn được kết nối với nhau trên web, hỗ trợ lọc số lượng dữ liệu đáng kể. Trong bài này, các tác giả giới thiệu các khái niệm cốt lõi về lọc cộng tác dùng trong adaptive web, lý thuyết và thực hành thuật toán CF, và các quyết định thiết kế liên quan đến hệ thống đánh giá và thu thập đánh giá, Các tác giả cũng thảo luận về cách đánh giá hệ thống CF và sự phát triển của các giao diện tương tác.
## Introduction

Collaborative Filtering là quá trình lọc hoặc đánh giá các items sử dụng ý kiến của người khác. Mặc dù thuật ngữ lọc cộng tác (CF) mới chỉ xuất hiện được hơn một tập kỷ, CF bắt nguồn từ một việc mà con người đã làm trong nhiều thế kỷ - chia sẻ ý kiến với người khác.

Trong nhiều năm, mọi người đã đọc và thảo luận về những cuốn sách, những nhà hàng họ đã thử và những bộ phim họ đã xem - sau đó sử dụng những cuộc thảo luận này để đưa ra ý kiến. Ví dụ, Khi có đủ các đồng nghiệp của Amy nói rằng họ thích bộ phim mới nhất của Hollywood, cô ấy có thể quyết định rằng mình cũng nên xem nó. Tương tự như vậy, nếu nhiều người trong số họ thất nó là một thảm họa, cô ấy có thể quyết định tiêu tiền của mình vào nơi khác. Tốt hơn nữa, Amy có thể nhận thấy rằng Matt giới thiệu những thể loại phim mà cô ấy thấy thú vị, Paul có lịch sử giới thiệu những bộ phim mà cô ấy không thích, và Margaret dường như chỉ dưới thiệu mọi thứ. Theo thời gian, cô ấy biết được mình nên lắng nghe ý kiến của ai và cách áp dụng những ý kiến này để giúp cô ấy xác định được chất lượng của một item. 

Máy tính và trang web cho phép chúng ta tiến xa hơn nhưng lời truyền miệng. Thay vì giới hạn bản thân trong hàng chục hoặc hàng trăm cá nhân, internet cho phép chúng ta xem xét ý kiến của hàng nghìn người. Tốc độ của máy tính cho phép chúng ta xử  lý những ý kiến này trong thời gian thực và xác định không chỉ cộng đồng lớn hơn nhiều nghĩ gì về một sản phẩm, mà còn phát triển chế độ xem thực sự được cá nhân hóa về mặt hàng đó bằng cách sử dụng các ý kiến phù hợp nhất cho một người dùng hoặc nhóm người dùng nhất định.

![MovieLens sử dụng tính năng lọc cộng tác để dự đoán rằng người dùng này có khả năng đánh giá phim "Holes" 4 trên 5 sao.](/img/in-post/2022/Nov/Knowledge/MovieLens_use_CF.png "MovieLens sử dụng tính năng lọc cộng tác để dự đoán rằng người dùng này có khả năng đánh giá phim "Holes" 4 trên 5 sao.")
*__Hình 1:__ MovieLens sử dụng tính năng lọc cộng tác để dự đoán rằng người dùng này có khả năng đánh giá phim "Holes" 4 trên 5 sao.*

### Core Concept

Trong khi chương này xem xét nhiều hệ thống CF, chúng tôi giới thiệu chủ đề thông qua MovieLens. MovieLens là một hệ thống lọc cộng tác cho phim. Một user trong MovieLens đánh giá các bộ phim sử dụng 1 đến 5 sao, trong đó 1 là "Awful - Kinh khủng" và 5 là "Must See - Nên xem". MovieLens sau đó sử dụng các đánh giá của cộng động để đề xuất phim khác người dùng có thể quan tâm, dự đoán những gì người dùng đó có thể đánh giá một bộ phim hoặc thực hiện các tác vụ khác.

Nói một cách khác, một đánh giá bao gồm sự kết hợp của hai thứ -  user và item - thường được bằng một giá trị nào đó. Một cách để trực quan hóa các đánh giá là dưới dạng ma trận Bảng 1. Không làm mất tính tổng quát, một ma trận đánh giá bao gồm một bảng trong đó mỗi hàng đại diện cho người dùng (user), mỗi cột đại diện cho một bộ phim cụ thể (item) và các con số tại giao điểm của một hàng và một cột biểu thị giá trị đánh giá của người dùng. Sự vắng mặt của một điểm đánh giá tại điểm giao nhau này cho biết rằng người dùng chưa đánh giá item này.



*__Bảng 1:__ MovieLens ma trận đánh giá. Amy đánh giá bộ phim Sideways là 5. Matt chưa xem
Matrix*

| | The Matrix | Speed | Sideways | Brokeback Mountain |
|:--:|:--:|:--:|:--:|:--:|
| Amy | 1 | 2 | 5 |  | 
| Matt |  | 3 | 5 | 4 | 
| Paul | 5 | 5 | 2 | 1 | 
| Cliff| 5 | 5 | 5 | 5 | 


Thuật ngữ `người dùng` - `user` đề cập đến bất kỳ cá nhân nào cung cấp đánh giá cho một hệ thống. Thường xuyên nhất, chúng tôi sử dụng thuật ngữ này để chỉ những người sử dụng hệ thống để nhận thông tin (ví dụ: gợi ý) mặc dù nó cũng đề cập đến những người cung cấp dữ liệu (đánh giá) được sử dụng để tạo ra thông tin này.

Các hệ thống lọc cộng tác tạo ra các dự đoán hoặc đề xuất cho một người dùng nhất định và một hoặc nhiều items. Items có thể bao gồm bất cứ thứ gì mà con người có thể cung cấp đánh giá, chẳng hạn như tác phẩm nghệ thuật, sách, đĩa CD, bài báo hoặc điểm đến trong kỳ nghỉ.

Đánh giá trong hệ thống lọc cộng tác có thể có nhiều dạng khác nhau.
* Đánh giá vô hướng có thể bao gồm đánh giá số, chẳng hạn như 1-5 sao được cung cấp trong MovieLens hoặc đánh giá theo thứ tự như rất đồng ý, đồng ý, trung lập, không đồng ý,
mạnh mẽ phủ quyết.
* Mô hình đánh giá nhị phân lựa chọn giữa đồng ý/không đồng ý hoặc tốt/xấu.
* Đánh giá đơn nguyên có thể cho biết rằng người dùng đã quan sát hoặc mua một item hoặc người khác đã đánh giá tích cực item đó. Việc không có đánh giá cho thấy rằng chúng ta không có thông tin liên quan đến người dùng với item đó (có lẽ họ đã mua mặt hàng đó ở đâu đó khác).
  
Đánh giá có thể được thu thập thông qua các *explicit means - ý nghĩa rõ ràng*, *implicit means - ý nghĩa tiềm ẩn* hoặc cả hai. Đánh giá rõ ràng (Explicit Rating) là những thứ mà người dùng được yêu cầu đưa ra ý kiến về một item. Đánh giá ngầm (Implicit Rating) là những đánh giá được suy ra từ hành động của người dùng. Ví dụ, một người dùng truy cập một trang sản phẩm  có thể có mối quan tâm mạnh mẽ hơn nhiều đối với sản phẩm đó. Các vấn đề của các quyết định thiết kế và sự đánh đổi liên quan đén việc thu thập các loại đánh giá khác nhau được thảo luận trong [phần](#acquiring-ratings-design-tradeoffs).

### The Beginning of Collaborative Filtering

### Collaborative Filtering and the Adaptive Web

## Uses for Collaborative Filtering

### User Tasks

### Collaborative Filtering System Functionality

### Properties of Domains Suitable for Collaborative Filtering

### Comparing Collaborative Filtering to Content-Based Filtering


## Collaborative Filtering Algorithms: Theory and Practice 


### Non-probabilistic Algorithms 

### Probabilistic Algorithms 

### Over-Arching Practical Concerns

## Acquiring Ratings: Design Tradeoffs

### Explicit Versus Implicit Ratings: Tradeoff 

### The Challenge of Collecting Explicit Ratings


### Rating Scales


### Cold Start Issues


## Evaluation

### Accuracy

### Beyond Accuracy