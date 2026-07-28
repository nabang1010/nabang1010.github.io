---
layout: post
title: "Design Patterm 1 (Dive Into Design Partterms - Alexander Shvets)"
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

# What's a Design Pattern?

> **Design patterns** are typical solutions to commonly occurring problems in software design. They are like pre-made blue- prints that you can customize to solve a recurring design prob- lem in your code.

`Design patterns` là những giải pháp điển hình cho những vấn đề thường gặp trong thiết kế phần mềm. Chúng giống như những bản thiết kế sẵn có mà bạn có thể tùy chỉnh để giải quyết một vấn đề thiết kế lặp đi lặp lại trong mã của bạn.

> You can’t just find a pattern and copy it into your program, the way you can with off-the-shelf functions or libraries. The pattern is not a specific piece of code, but a general concept for solving a particular problem. You can follow the pattern details and implement a solution that suits the realities of your own program.

Bạn không thể chỉ tìm thấy một `patterm` và sao chép nó vào chương trình của bạn, như cách bạn có thể với các hàm hoặc thư viện sẵn có. `Patterm` không phải là một phần mã cụ thể, mà là một khái niệm chung để giải quyết một vấn đề cụ thể. Bạn có thể theo dõi chi tiết `patterm` và triển khai một giải pháp phù hợp với thực tế của chương trình của riêng bạn.

> Patterns are often confused with algorithms, because both concepts describe typical solutions to some known problems. While an algorithm always defines a clear set of actions that can achieve some goal, a pattern is a more high-level description of a solution. The code of the same pattern applied to two different programs may be different.

`Patterm` thường bị nhầm lẫn với `algorithm`, vì cả hai khái niệm đều mô tả các giải pháp điển hình cho một số vấn đề đã biết. Trong khi một `algorithm` luôn xác định một tập hành động rõ ràng có thể đạt được một số mục tiêu, một `patterm` là một mô tả cấp cao hơn của một giải pháp. Code của cùng một `patterm` được áp dụng cho hai chương trình khác nhau có thể khác nhau.

> An analogy to an algorithm is a cooking recipe: both have clear steps to achieve a goal. On the other hand, a pattern is more like a blueprint: you can see what the result and its features are, but the exact order of implementation is up to you. 24 Introduction to Design Patterns / What’s a Design Pattern?

Một phép so sánh với một `algorithm` là một công thức nấu ăn: cả hai đều có các bước rõ ràng để đạt được một mục tiêu. Ngược lại, một `patterm` giống như một bản thiết kế: bạn có thể thấy kết quả và các tính năng của nó là gì, nhưng thứ tự thực hiện chính xác là do bạn quyết định.


# What does the pattern consist of?

> Most patterns are described very formally so people can reproduce them in many contexts. Here are the sections that are usually present in a pattern description:

Hầu hết các `patterm` được mô tả rất hình thức để mọi người có thể tái tạo chúng trong nhiều ngữ cảnh. Dưới đây là các phần thường có trong mô tả `patterm`:

> - **Intent** of the pattern briefly describes both the problem and the solution.
> - **Motivation** further explains the problem and the solution the pattern makes possible.
> - **Structure** of classes shows each part of the pattern and how they are related.
> - **Code example** in one of the popular programming languages makes it easier to grasp the idea behind the pattern.

- **Intent**: Mô tả ngắn gọn về cả vấn đề và giải pháp.
- **Motivation**: Giải thích thêm về vấn đề và giải pháp mà `patterm` làm cho nó trở nên có thể.
- **Structure**: Các lớp cho thấy mỗi phần của `patterm` và cách chúng liên quan với nhau.
- **Code example**: Trong một trong những ngôn ngữ lập trình phổ biến giúp dễ hiểu hơn về ý tưởng đằng sau `patterm`.

> Some pattern catalogs list other useful details, such as applicability of the pattern, implementation steps and relations with other patterns.

Một số danh mục `patterm` liệt kê các chi tiết hữu ích khác, chẳng hạn như tính ứng dụng của `patterm`, các bước triển khai và mối quan hệ với các `patterm` khác.

# Classification of patterns

> Design patterns differ by their complexity, level of detail and scale of applicability to the entire system being designed. I like the analogy to road construction: you can make an intersection safer by either installing some traffic lights or building an entire multi-level interchange with underground passages for pedestrians

`Design patterns` khác nhau về độ phức tạp, mức độ chi tiết và quy mô ứng dụng cho toàn bộ hệ thống đang được thiết kế. Tôi thích phép so sánh với xây dựng đường: bạn có thể làm cho một giao lộ an toàn hơn bằng cách cài đặt một số đèn giao thông hoặc xây dựng một hệ thống giao lộ đa tầng hoàn chỉnh với hầm dành cho người đi bộ.

> The most basic and low-level patterns are often called `idioms`. They usually apply only to a single programming language.

`Patterm` cơ bản và cấp thấp nhất thường được gọi là `idioms`. Thường áp dụng chỉ cho một ngôn ngữ lập trình duy nhất.

> The most universal and high-level patterns are architectural patterns. Developers can implement these patterns in virtually any language. Unlike other patterns, they can be used to design the architecture of an entire application.

`Patterm` phổ biến và cấp cao nhất là `architectural patterns`. Nhà phát triển có thể triển khai các `patterm` này trong bất kỳ ngôn ngữ nào. Khác với các `patterm` khác, chúng có thể được sử dụng để thiết kế kiến trúc của một ứng dụng hoàn chỉnh.

> In addition, all patterns can be categorized by their intent, or purpose. This book covers three main groups of patterns:

Ngoài ra, tất cả các `patterm` có thể được phân loại theo mục đích hoặc mục đích. Cuốn sách này bao gồm ba nhóm chính của `patterm`:

> - **Creational patterns** provide object creation mechanisms that increase flexibility and reuse of existing code.
> - **Structural patterns** explain how to assemble objects and classes into larger structures, while keeping the structures flexible and efficient.
> - **Behavioral patterns** take care of effective communication and the assignment of responsibilities between objects.

- **Creational patterns**: Cung cấp cơ chế tạo đối tượng giúp tăng tính linh hoạt và tái sử dụng mã hiện có.
- **Structural patterns**: Giải thích cách lắp ráp các đối tượng và lớp vào các cấu trúc lớn hơn, đồng thời giữ cho cấu trúc linh hoạt và hiệu quả.
- **Behavioral patterns**: Chăm sóc việc giao tiếp hiệu quả và phân công trách nhiệm giữa các đối tượng.

# Who invented patterns?


# Why Should I Learn Patterns?

----

# References

* [Dive Into Design Partterms - Alexander Shvets]()