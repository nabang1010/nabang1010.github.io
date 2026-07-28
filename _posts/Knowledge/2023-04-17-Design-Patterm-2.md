---
layout: post
title: "Design Patterm 2 (Dive Into Design Partterms - Alexander Shvets)"
subtitle: "Design Patterm"
author: "nabang1010"
header-img: ""
# header-style: text
header-mask: 0.4
lang: vi
catalog: true
# hidden: false
section: Knowledge
seo-keywords:
  - design_patterm
tags:
  - Design Patterm
---

# Features of Good Design

## Code reuse

> Cost and time are two of the most valuable metrics when developing any software product. Less time in development means entering the market earlier than competitors. Lower development costs mean more money is left for marketing and a broader reach to potential customers.

Chi phí và thời gian là hai trong những chỉ số quý giá nhất khi phát triển bất kỳ sản phẩm phần mềm nào. Thời gian ít hơn trong quá trình phát triển có nghĩa là sớm hơn so với các đối thủ. Chi phí phát triển thấp có nghĩa là còn nhiều tiền để tiếp thị và tiếp cận rộng rãi đến khách hàng tiềm năng.

> **Code reuse** is one of the most common ways to reduce development costs. The intent is pretty obvious: instead of developing something over and over from scratch, why don’t we reuse existing code in new projects?

Việc tái sử dụng mã là một trong những cách phổ biến nhất để giảm chi phí phát triển. Mục đích khá rõ ràng: thay vì phát triển một cái gì đó từ đầu nhiều lần, tại sao chúng ta không tái sử dụng mã hiện có trong các dự án mới?

> The idea looks great on paper, but it turns out that making existing code work in a new context usually takes extra effort. Tight coupling between components, dependencies on concrete classes instead of interfaces, hardcoded operations—all of this reduces flexibility of the code and makes it harder to reuse it.

Ý tưởng trông tuyệt vời trên giấy, nhưng cuối cùng thì việc làm cho mã hiện có hoạt động trong một ngữ cảnh mới thường đòi hỏi nỗ lực bổ sung. Sự kết nối chặt chẽ giữa các thành phần, sự phụ thuộc vào các lớp cụ thể thay vì giao diện, các hoạt động cứng nhắc - tất cả điều này làm giảm tính linh hoạt của mã và làm cho việc tái sử dụng nó khó khăn hơn.

> Using **design patterns** is one way to increase flexibility of software components and make them easier to reuse. However, this sometimes comes at the price of making the components more complicated.

Sử dụng `design patterns` là một cách để tăng tính linh hoạt của các thành phần phần mềm và làm cho chúng dễ tái sử dụng hơn. Tuy nhiên, điều này đôi khi đến với giá của việc làm cho các thành phần phức tạp hơn.

## Extensibility

> **Change** is the only constant thing in a programmer’s life.

**Thay đổi** là điều duy nhất không đổi trong cuộc sống của một lập trình viên.


> - You released a video game for Windows, but now people ask for a macOS version.
> - You created a GUI framework with square buttons, but several months later round buttons become a trend.
> - You designed a brilliant e-commerce website architecture, but just a month later customers ask for a feature that would let them accept phone orders.

- Bạn đã phát hành một trò chơi video cho Windows, nhưng bây giờ mọi người yêu cầu một phiên bản macOS.
- Bạn đã tạo một khung GUI với các nút vuông, nhưng vài tháng sau nút tròn trở thành một xu hướng.
- Bạn đã thiết kế một kiến trúc trang web thương mại điện tử tuyệt vời, nhưng chỉ một tháng sau khách hàng yêu cầu một tính năng cho phép họ chấp nhận đơn đặt hàng qua điện thoại.

Each software developer has dozens of similar stories. There are several reasons why this happens

Mỗi lập trình viên phần mềm có hàng chục câu chuyện tương tự. Có một số lý do khiến điều này xảy ra

> First, we understand the problem better once we start to solve it. Often by the time you finish the first version of an app, you’re ready to rewrite it from scratch because now you under- stand many aspects of the problem much better. You have also grown professionally, and your own code now looks like crap.

Đầu tiên, chúng ta hiểu vấn đề tốt hơn khi bắt đầu giải quyết nó. Thường vào lúc bạn hoàn thành phiên bản đầu tiên của một ứng dụng, bạn sẵn sàng viết lại từ đầu vì bây giờ bạn hiểu rõ nhiều khía cạnh của vấn đề hơn nhiều. Bạn cũng đã phát triển một cách chuyên nghiệp và mã của riêng bạn bây giờ trông thật tệ.

> Something beyond your control has changed. This is why so many dev teams pivot from their original ideas into something new. Everyone who relied on Flash in an online application has been reworking or migrating their code as browser after browser drops support for Flash.

Một số thứ nằm ngoài tầm kiểm soát của bạn đã thay đổi. Đây là lý do tại sao nhiều nhóm phát triển chuyển từ ý tưởng ban đầu của họ sang một cái gì đó mới. Mọi người dựa vào Flash trong một ứng dụng trực tuyến đã phải làm việc lại hoặc di chuyển mã của họ khi từng trình duyệt sau trình duyệt ngừng hỗ trợ Flash.

> The third reason is that the goalposts move. Your client was delighted with the current version of the application, but now sees eleven “little” changes he’d like so it can do other things he never mentioned in the original planning sessions. These aren’t frivolous changes: your excellent first version has shown him that even more is possible.

Lý do thứ ba là cột mốc di chuyển. Khách hàng của bạn rất hài lòng với phiên bản hiện tại của ứng dụng, nhưng bây giờ thấy mười một “nhỏ” thay đổi mà anh ấy muốn để nó có thể làm những điều khác mà anh ấy chưa bao giờ đề cập trong các phiên kế hoạch ban đầu. Đây không phải là những thay đổi vô nghĩa: phiên bản đầu tiên xuất sắc của bạn đã cho anh ấy thấy rằng thậm chí còn nhiều hơn là có thể.


> ***There’s a bright side: if someone asks you to change something in your app, that means someone still cares about it.***

***Có một điều tích cực: nếu ai đó yêu cầu bạn thay đổi một cái gì đó trong ứng dụng của bạn, điều đó có nghĩa là vẫn có người quan tâm đến nó.***

> That’s why all seasoned developers try to provide for possible future changes when designing an application’s architecture.

Đó là lý do tại sao tất cả các nhà phát triển kỳ cựu đều cố gắng dự phòng cho các thay đổi trong tương lai có thể xảy ra khi thiết kế kiến trúc của một ứng dụng.















----

# References

* [Dive Into Design Partterms - Alexander Shvets]()