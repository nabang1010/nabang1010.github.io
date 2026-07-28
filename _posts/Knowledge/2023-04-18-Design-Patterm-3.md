---
layout: post
title: "Design Patterm 3 (Dive Into Design Partterms - Alexander Shvets)"
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

# Design Principles

## Encapsulate What Varies (Nguyên tắc đóng gói những gì thay đổi)

> ***Identify the aspects of your application that vary and separate them from what stays the same***

***Xác định các khía cạnh của ứng dụng của bạn mà thay đổi và tách chúng ra khỏi những gì vẫn giữ nguyên***

> Imagine that your program is a ship, and changes are hideous mines that linger under water. Struck by the mine, the ship sinks.

Tuơng tượng rằng chương trình của bạn là một con tàu, và các thay đổi là những quả mìn kinh khủng mà lẩn dưới nước. Bị đánh bởi mìn, con tàu chìm.

> The main goal of this principle is to minimize the effect caused by changes.

Mục tiêu chính của nguyên tắc này là giảm thiểu tác động gây ra bởi các thay đổi.

> Knowing this, you can divide the ship’s hull into independent compartments that can be safely sealed to limit damage to a single compartment. Now, if the ship hits a mine, the ship as a whole remains afloat.

Biết điều này, bạn có thể chia thành các khoang độc lập có thể được che chắn an toàn để giới hạn thiệt hại cho một khoang duy nhất. Bây giờ, nếu con tàu đâm vào một quả mìn, con tàu như một thể vẫn nổi.

> In the same way, you can isolate the parts of the program that vary in independent modules, protecting the rest of the code from adverse effects. As a result, you spend less time getting the program back into working shape, implementing and test- ing the changes. The less time you spend making changes, the more time you have for implementing features.

Tương tự, bạn có thể cô lập các phần của chương trình thay đổi trong các mô-đun độc lập, bảo vệ phần còn lại của mã khỏi các tác động tiêu cực. Kết quả là, bạn sẽ tiêu tốn ít thời gian để đưa chương trình trở lại trạng thái hoạt động, triển khai và kiểm tra các thay đổi. Một cách bạn tiêu ít thời gian thay đổi, bạn sẽ có nhiều thời gian hơn để triển khai các tính năng.

### Encapsulation on a method level (Đóng gói ở level `method`)

> Say you’re making an e-commerce website. Somewhere in your code, there’s a getOrderTotal method that calculates a grand total for the order, including taxes.

Hãy nói rằng bạn đang tạo một trang web thương mại điện tử. Ở đâu đó trong mã của bạn, có một phương thức `getOrderTotal` tính toán tổng cộng cho đơn hàng, bao gồm thuế.


> We can anticipate that tax-related code might need to change in the future. The tax rate depends on the country, state or even city where the customer resides, and the actual formula may change over time due to new laws or regulations. As a result, you’ll need to change the getOrderTotal method quite often. But even the method’s name suggests that it doesn’t care about how the tax is calculated.

Chúng ta có thể dự đoán rằng mã liên quan đến thuế có thể cần thay đổi trong tương lai. Tỷ lệ thuế phụ thuộc vào quốc gia, tiểu bang hoặc thậm chí thành phố mà khách hàng cư trú, và công thức thực tế có thể thay đổi theo thời gian do luật pháp hoặc quy định mới. Kết quả là, bạn sẽ cần thay đổi phương thức `getOrderTotal` khá thường xuyên. Nhưng ngay cả tên của phương thức cũng cho thấy rằng nó không quan tâm đến cách tính thuế.

**BEFORE**

```cpp
class Item {
  public:
    float price;
    int quantity;
}

class Order {
  public:
    std::vector<Item> lineItems;
    std::string country;
}

float getOrderTotal(Order order) {
  float total = 0;
  for (Item item : order.lineItems) {
    total += item.price * item.quantity;
  }
  
  if (order.country == "US") {
    total += total * 0.07;
  } else if (order.country == "EU") {
    total += total * 0.2; 
  }

  return total;
}

```


> You can extract the tax calculation logic into a separate method, hiding it from the original method.

Bạn có thể trích xuất logic tính toán thuế vào một phương thức riêng, ẩn nó khỏi phương thức ban đầu.

**AFTER**

```cpp

class Item {
  public:
    float price;
    int quantity;
}

class Order {
  public:
    std::vector<Item> lineItems;
    std::string country;
}

float getOrderTotal(Order order) {
  float total = 0;
  for (Item item : order.lineItems) {
    total += item.price * item.quantity;
  }
  
  total += total * getTaxRate(order.country);

  return total;
}

float getTaxRate(country) {
  if (country == "US") {
    return 0.07;
  } else if (country == "EU") {
    return 0.2;
  } else {
    return 0;
  }
}

```

> Tax-related changes become isolated inside a single method. Moreover, if the tax calculation logic becomes too complicated, it’s now easier to move it to a separate class.

Các thay đổi liên quan đến thuế trở nên cô lập trong một phương thức duy nhất. Hơn nữa, nếu logic tính toán thuế trở nên quá phức tạp, bây giờ dễ dàng hơn để chuyển nó sang một lớp riêng.

### Encapsulation on a class level (Đóng gói ở level `class`)

> Over time you might add more and more responsibilities to a method which used to do a simple thing. These added behaviors often come with their own helper fields and methods that eventually blur the primary responsibility of the containing class. Extracting everything to a new class might make things much more clear and simple.

Theo thời gian, bạn có thể thêm nhiều và nhiều tác vụ vào một phương thức mà trước đây chỉ làm một việc đơn giản. Những hành vi được thêm vào thường đi kèm với các trường và phương thức trợ giúp riêng của chúng mà cuối cùng làm mờ trách nhiệm chính của lớp chứa. Trích xuất tất cả vào một lớp mới có thể làm cho mọi thứ trở nên rõ ràng và đơn giản hơn nhiều.


## Program to an Interface, not an Implementation (Lập trình theo một `interface`, không phải một `implementation`)

> ***Program to an interface, not an implementation. Depend on abstractions, not on concrete classes***

***Lập trình theo một `interface`, không phải một `implementation`. Phụ thuộc vào trừu tượng, không phải trên các lớp cụ thể***

> You can tell that the design is flexible enough if you can easily extend it without breaking any existing code. Let’s make sure that this statement is correct by looking at another `cat` example. A Cat that can eat any food is more flexible than one that can eat just sausages. You can still feed the first cat with sausages because they are a subset of “any food”; however, you can extend that cat’s menu with any other food. 

Bạn có thể nói rằng thiết kế đủ linh hoạt nếu bạn có thể mở rộng nó một cách dễ dàng mà không làm hỏng bất kỳ mã hiện tại nào. Hãy đảm bảo rằng câu nói này là chính xác bằng cách xem xét một ví dụ khác về `cat`. Một con mèo có thể ăn bất kỳ thức ăn nào linh hoạt hơn một con mèo chỉ có thể ăn xúc xích. Bạn vẫn có thể cho con mèo đầu tiên ăn xúc xích vì chúng là một tập con của “bất kỳ thức ăn nào”; tuy nhiên, bạn có thể mở rộng menu của con mèo đó với bất kỳ thức ăn nào khác. 

> When you want to make two classes collaborate, you can start by making one of them dependent on the other. Hell, I often start by doing that myself. However, there’s another, more flex- ible way to set up collaboration between objects:

Khi bạn muốn làm cho hai lớp làm việc với nhau, bạn có thể bắt đầu bằng cách làm cho một trong số chúng phụ thuộc vào cái kia. Tôi thường bắt đầu bằng cách làm điều đó mình. Tuy nhiên, có một cách khác, linh hoạt hơn để thiết lập sự hợp tác giữa các đối tượng:

> 1. Determine what exactly one object needs from the other: which methods does it execute?
> 2. Describe these methods in a new interface or abstract class.
> 3. Make the class that is a dependency implement this interface.
> 4. Now make the second class dependent on this interface rather than on the concrete class. You still can make it work with objects of the original class, but the connection is now much more flexible

1. Xác định chính xác một đối tượng cần gì từ đối tượng khác: phương thức nào nó thực thi?
2. Mô tả các phương thức này trong một `interface` hoặc lớp `abstract` mới.
3. Làm cho lớp đó là một dependency implement của `interface` này.
4. Bây giờ làm cho lớp thứ hai phụ thuộc vào `interface` này thay vì vào lớp cụ thể. Bạn vẫn có thể làm cho nó hoạt động với các đối tượng của lớp ban đầu, nhưng kết nối bây giờ linh hoạt hơn nhiều

**BEFORE**

```cpp

class Cat {
  public:
    int energy;
    void eat(Sausage s) {
      // eat sausage
    }
}

class Sausage {
private:  
  float nutrition = 10.0;
  int expiration = 30;

public:
  float getNutrition() {
    // return nutrition of sausage
    return this->nutrition;
  }

  int getExpiration() {
    // return expiration date of sausage
    return this->expiration;
  }
}

```
**AFTER**

```cpp

class Cat {
  public:
    int energy;
    void eat(Food s) {
      // eat sausage
    }
}
// create a new interface Food
class Food {
  public:
    virtual float getNutrition() = 0;
}

// create a new class Sausage that implements Food
class Sausage : public Food {

private:  
  float nutrition = 10.0;
  int expiration = 30;

public:
  float getNutrition() {
    // return nutrition of sausage
    return this->nutrition;
  }

  int getExpiration() {
    // return expiration date of sausage
    return this->expiration;
  }

}

```
> After making this change, you won’t probably feel any immediate benefit. On the contrary, the code has become more complicated than it was before. However, if you feel that this might be a good extension point for some extra functionality, or that some other people who use your code might want to extend it here, then go for it. 

Sau khi thực hiện thay đổi này, bạn có thể không cảm thấy bất kỳ lợi ích nào ngay lập tức. Ngược lại, mã đã trở nên phức tạp hơn so với trước đây. Tuy nhiên, nếu bạn cảm thấy rằng điều này có thể là một điểm mở rộng tốt cho một số chức năng bổ sung, hoặc rằng một số người khác sử dụng mã của bạn có thể muốn mở rộng nó ở đây, thì hãy thử.


### Example 

> Let’s look at another example which illustrates that working with objects through interfaces might be more beneficial than depending on their concrete classes. Imagine that you’re creating a software development company simulator. You have different classes that represent various employee types.

Hãy xem một ví dụ khác mà minh họa rằng làm việc với các đối tượng thông qua các `interface` có thể hữu ích hơn so với phụ thuộc vào các lớp cụ thể của chúng. Hãy tưởng tượng rằng bạn đang tạo một trình mô phỏng công ty phát triển phần mềm. Bạn có các lớp khác nhau đại diện cho các loại nhân viên khác nhau.

**BEFORE:**  all classes are tightly coupled.

```cpp
class Designer {
public:
  void designArchitecture() {
    // design architecture
  }
}

class Programmer {
public:
  void writeCode() {
    // write code
  }
}

class Tester {
public:
  void testSoftware() {
    // test software
  }
}

class Company {
public:
  void createSoftware() {
    Designer d = new Designer();
    d.designArchitecture();
    Programmer p = new Programmer();
    p.writeCode();
    Tester t = new Tester();
    t.testSoftware();
  }
}

```

> In the beginning, the `Company` class is tightly coupled to concrete classes of employees. However, despite the difference in their implementations, we can generalize various work-related methods and then extract a common interface for all employee classes

Ban đầu, lớp `Company` được liên kết chặt chẽ với các lớp cụ thể của nhân viên. Tuy nhiên, mặc dù có sự khác biệt trong cài đặt của họ, chúng ta có thể tổng quát hóa các phương thức liên quan đến công việc và sau đó trích xuất một `interface` chung cho tất cả các lớp nhân viên

> After doing that, we can apply polymorphism inside the `Company` class, treating various employee objects via the `Employee` interface.

Sau khi làm điều đó, chúng ta có thể áp dụng đa hình bên trong lớp `Company`, xử lý các đối tượng nhân viên khác nhau thông qua `interface` `Employee`.

**AFTER:**  polymorphism helped us simplify the code, but the rest of the `Company` class still depends on the concrete `employee` classes

Áp dụng tính đa hình giúp chúng ta đơn giản hóa mã, nhưng phần còn lại của lớp `Company` vẫn phụ thuộc vào các lớp `employee` cụ thể

```cpp

class Employee {
public:
  virtual void doWork() = 0;
}

class Designer : public Employee {
public:
  void doWork() {
    // design architecture
  }
}

class Programmer : public Employee {
public:
  void doWork() {
    // write code
  }
}

class Tester : public Employee {
public:
  void doWork() {
    // test software
  }
}

class Company {
public:
  void createSoftware() {
    std::vector<Employee> employees = [
      new Designer(), 
      new Programmer(), 
      new Tester()
    ];

    for (Employee e : employees) {
      e.doWork();
    }
  }
}

```

> The `Company` class remains coupled to the employee classes. This is bad because if we introduce new types of companies that work with other types of employees, we’ll need to override most of the `Company` class instead of reusing that code.

Lớp `Company` vẫn liên kết với các lớp nhân viên. Điều này không tốt vì nếu chúng ta giới thiệu các loại công ty mới làm việc với các loại nhân viên khác, chúng ta sẽ cần ghi đè hầu hết lớp `Company` thay vì tái sử dụng mã đó.
 
> To solve this problem, we could declare the method for getting `employees` as abstract. Each concrete company will implement this method differently, creating only those employees that it needs.

Để giải quyết vấn đề này, chúng ta có thể khai báo phương thức để lấy `employees` là trừu tượng. Mỗi công ty cụ thể sẽ triển khai phương thức này theo cách khác nhau, tạo ra chỉ những nhân viên mà nó cần.

**AFTER:**  the primary method of the `Company` class is independent from concrete employee classes. Employee objects are created in concrete company subclasses

Sau khi thực hiện thay đổi này, phương thức chính của lớp `Company` không phụ thuộc vào các lớp nhân viên cụ thể. Các đối tượng nhân viên được tạo trong các lớp con công ty cụ thể

```cpp
class Employee {
public:
  virtual void doWork() = 0;
}

class Designer : public Employee {
public:
  void doWork() {
    // design architecture
  }
}

class Programmer : public Employee {
public:
  void doWork() {
    // write code
  }
}

class Tester : public Employee {
public:
  void doWork() {
    // test software
  }
}

class Artist : public Employee {
public:
  void doWork() {
    // draw pictures
  }
}

class Company {
public:
  virtual std::vector<Employee> getEmployees() = 0;

  void createSoftware() {
    std::vector<Employee> employees = getEmployees();

    for (Employee e : employees) {
      e.doWork();
    }
  }
}

class GameDevCompany {
public:
  std::vector<Employee> getEmployees() {
    return [
      new Designer(), 
      new Programmer(), 
      new Artist()
    ];
  }
}

class OutsourcingCompany {
public:
  std::vector<Employee> getEmployees() {
    return [
      new Programmer(), 
      new Tester()
    ];
  }
}

```

> After this change, the Company class has become independent from various employee classes. Now you can extend this class and introduce new types of companies and employees while still reusing a portion of the base company class. Extending the base company class doesn’t break any existing code that already relies on it.

Sau thay đổi này, lớp `Company` đã trở nên độc lập với các lớp nhân viên khác nhau. Bây giờ bạn có thể mở rộng lớp này và giới thiệu các loại công ty và nhân viên mới trong khi vẫn tái sử dụng một phần của lớp công ty cơ sở. Mở rộng lớp công ty cơ sở không làm hỏng bất kỳ mã hiện tại nào đã phụ thuộc vào nó.

> By the way, you’ve just seen applying a design pattern in action! That was an example of the **`Factory` Method** pattern. Don’t worry: we’ll discuss it later in detail.

Bằng cách này, bạn vừa thấy áp dụng một mẫu thiết kế trong thực tế! Đó là một ví dụ về mẫu **`Factory` Method**. Đừng lo lắng: chúng ta sẽ thảo luận về nó sau này một cách chi tiết.

## Favor Composition Over Inheritance (Ưu tiên `composition` hơn là `inheritance`)

> Inheritance is probably the most obvious and easy way of reusing code between classes. You have two classes with the same code. Create a common base class for these two and move the similar code into it. Piece of cake!

**Kế thừa** có lẽ là cách rõ ràng và dễ dàng nhất để tái sử dụng mã giữa các lớp. Bạn có hai classes với code giống nhau. Tạo một lớp cơ sở chung cho hai lớp này và chuyển phần code giống nhau vào đó. Dễ như ăn bánh!

> Unfortunately, inheritance comes with caveats that often become apparent only after your program already has tons of classes and changing anything is pretty hard. Here’s a list of those problems.

Thật không may, kế thừa đi kèm với những lưu ý mà thường chỉ trở nên rõ ràng sau khi chương trình của bạn đã có nhiều classes và thay đổi bất kỳ điều gì cũng khá khó khăn. Dưới đây là một danh sách các vấn đề đó.

> - **A subclass can’t reduce the interface of the superclass**. You have to implement all abstract methods of the parent class even if you won’t be using them.
- **Một lớp con không thể giảm `interface` của lớp cha**. Bạn phải triển khai tất cả các phương thức trừu tượng của lớp cha ngay cả khi bạn không sử dụng chúng.
> - **When overriding methods you need to make sure that the new behavior is compatible with the base one**. It’s important because objects of the subclass may be passed to any code that expects objects of the superclass and you don’t want that code to break.
- **Khi ghi đè phương thức, bạn cần đảm bảo rằng hành vi mới tương thích với hành vi cơ bản**. Điều này quan trọng vì các đối tượng của lớp con có thể được chuyển đến bất kỳ code nào mong đợi các objects của lớp cha và bạn không muốn code đó bị hỏng.
> - **Inheritance breaks encapsulation of the superclass** because the internal details of the parent class become available to the subclass. There might be an opposite situation where a pro- grammer makes a superclass aware of some details of subclasses for the sake of making further extension easier. 
- **Kế thừa phá vỡ tính đóng gói của lớp cha** vì các chi tiết nội bộ của lớp cha trở nên có sẵn cho lớp con. Có thể có tình huống ngược lại khi một lập trình viên làm cho lớp cha nhận thức về một số chi tiết của các lớp con vì lợi ích của việc mở rộng tiếp theo dễ dàng hơn.
> - **Subclasses are tightly coupled to superclasses**. Any change in a superclass may break the functionality of subclasses.
- **Lớp con được liên kết chặt chẽ với lớp cha**. Bất kỳ thay đổi nào trong lớp cha cũng có thể làm hỏng chức năng của lớp con.
> - **Trying to reuse code through inheritance can lead to creating parallel inheritance hierarchies**. Inheritance usually takes place in a single dimension. But whenever there are two or more dimensions, you have to create lots of class combinations, bloating the class hierarchy to a ridiculous size. <br>
> There’s an alternative to inheritance called composition. Whereas inheritance represents the “is a” relationship between classes (a car is a transport), composition represents the “has a” relationship (a car has an engine). <br>
> I should mention that this principle also applies to aggregation—a more relaxed variant of composition where one object may have a reference to the other one but doesn’t manage its lifecycle. Here’s an example: a car has a driver, but he or she may use another car or just walk without the car 

- **Cố gắng tái sử dụng mã thông qua kế thừa có thể dẫn đến việc tạo ra các cấu trúc kế thừa song song**. Kế thừa thường diễn ra trong một chiều. Nhưng mỗi khi có hai hoặc nhiều chiều, bạn phải tạo ra nhiều kết hợp lớp, làm phình to cấu trúc lớp thành một kích thước ngớ ngẩn. <br>
- Có một phương án thay thế cho kế thừa gọi là `composition`. Trong khi kế thừa đại diện cho mối quan hệ “là một” giữa các lớp (một chiếc xe là một phương tiện), `composition` đại diện cho mối quan hệ “có một” (một chiếc xe có một động cơ). <br>
- Tôi nên đề cập rằng nguyên tắc này cũng áp dụng cho `aggregation`—một biến thể linh hoạt hơn của `composition` nơi một đối tượng có thể có một tham chiếu đến đối tượng khác nhưng không quản lý vòng đời của nó. Dưới đây là một ví dụ: một chiếc xe có một tài xế, nhưng anh ấy hoặc cô ấy có thể sử dụng một chiếc xe khác hoặc chỉ đi bộ mà không cần xe

### Example 

- **Arrow with empty triangle head:** Mũi tên với đầu tam giác trống đại diện cho `inheritance` và thường có chiều từ subclass đến superclass.
- **Arrow with empty triangle head and dashed line:** Mũi tên với đầu tam giác trống và nét đứt chỉ ra rằng `class` này `implement` một `interface`.
- **Simple Arrow:** Mũi tên đơn gian chỉ rằng một `class` phu thuộc vào một `class` khác. `Association` relationship.
- **Simple Arrow and dashed line:** Mũi tên đơn gian và nét đứt chỉ ra rằng một `Dependency` relationship.
- **Line with a filled diamond at the container end and an simple arrow at the end pointing toward the component:** Đường thẳng với một hình kim cương được điền ở đầu chứa và một mũi tên ở cuối chỉ về phần tử. `Composition` relationship.
- **Line with a empty diamond at the container end and an simple arrow at the end pointing toward the component:** Đường thẳng với một hình kim cương trống ở đầu chứa và một mũi tên ở cuối chỉ về phần tử. `Aggregation` relationship.

```cpp

class Transport {
}

class Truck : public Transport {
}

class Car : public Transport {
}

class ElectricTruck : public Truck {
}

class CombustionEngineTruck : public Truck {
}

class ElectricCar : public Car {
}

class CombustionEngineCar : public Car {
}

class AutopilotElectricTruck : public ElectricTruck {
}

class AutopilotElectricCar : public ElectricCar {
}

class AutopilotCombustionEngineTruck : public CombustionEngineTruck {
}

class AutopilotCombustionEngineCar : public CombustionEngineCar {
}

```





> As you see, each additional parameter results in multiplying the number of subclasses. There’s a lot of duplicate code between subclasses because a subclass can’t extend two classes at the same time

Như bạn thấy, mỗi tham số bổ sung dẫn đến việc nhân số lượng lớp con. Có rất nhiều mã trùng lặp giữa các lớp con vì một lớp con không thể mở rộng hai lớp cùng một lúc

> You can solve this problem with composition. Instead of car objects implementing a behavior on their own, they can delegate it to other objects.

Bạn có thể giải quyết vấn đề này với `composition`. Thay vì các đối tượng xe thực hiện một hành vi trên chính họ, chúng có thể ủy quyền nó cho các đối tượng khác.

> The added benefit is that you can replace a behavior at runtime. For instance, you can replace an engine object linked to a car object just by assigning a different engine object to the car.

Lợi ích được thêm vào là bạn có thể thay thế một hành vi tại thời gian chạy. Ví dụ, bạn có thể thay thế một đối tượng động cơ liên kết với một đối tượng xe chỉ bằng cách gán một đối tượng động cơ khác cho xe.

```cpp

class Transport {
private:
  Engine engine;
  Driver driver;
public:
  void deliver(destination, cargo) {
  }
}
class Engine {
public:
  virtual void move() = 0;
}

class Driver {
public:
  virtual void navigate() = 0;
}

class CombustionEngine : public Engine {
public:
  void move() {
    // move with combustion engine
  }
}


class ElectricEngine : public Engine {
public:
  void move() {
    // move with electric engine
  }
}

class Robot : public Driver {
public:
  void navigate() {
    // navigate with robot
  }
}

class Human : public Driver {
public:
  void navigate() {
    // navigate with human
  }
}

```
> This structure of classes resembles the Strategy pattern, which we’ll go over later in this book.

Cấu trúc của các lớp này giống với mẫu **`Strategy`**, mà chúng ta sẽ xem xét sau trong cuốn sách này.


----

# References

* [Dive Into Design Partterms - Alexander Shvets]()