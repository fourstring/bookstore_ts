import {IUser} from "../types/IUser";
import {IBook} from "../types/IBook";
import {ICart} from "../types/ICart";

function fillDb<T extends any>(db: Map<number, T>, key: string = "id") {
  return (value: T) => db.set(value[key] as number, value);
}

let users: IUser[] = [
  {id: 1, username: 'test1', email: 'test@test.com', status: "active", admin: false},
  {id: 2, username: 'test2', email: 'test@test2.com', status: "active", admin: false},
  {id: 3, username: 'test3', email: 'test@test3.com', status: "disabled", admin: false},
  {id: 4, username: 'admin', email: 'admin@test.com', status: "active", admin: true}
];

let userDb = new Map<number, IUser>();
users.forEach(fillDb<IUser>(userDb));

let books: IBook[] = [
  {
    id: 1,
    title: "深入理解计算机系统",
    author: "Randal E.Bryant",
    isbn: "9787111544937",
    cover_pic: "https://img12.360buyimg.com/n1/jfs/t3310/143/1379472768/437459/d9d8bd99/582435faN7c9dd621.jpg",
    price: 99,
    stock: 50,
    description: `和第2版相比，本版内容上*大的变化是，从以IA32和x86-64为基础转变为完全以x86-64为基础。主要更新如下：

基于x86-64，大量地重写代码，首次介绍对处理浮点数据的程序的机器级支持。

处理器体系结构修改为支持64位字和操作的设计。

引入更多的功能单元和更复杂的控制逻辑，使基于程序数据流表示的程序性能模型预测更加可靠。

扩充关于用GOT和PLT创建与位置无关代码的讨论，描述了更加强大的链接技术（比如库打桩）。

增加了对信号处理程序更细致的描述，包括异步信号安全的函数等。

采用新函数，更新了与协议无关和线程安全的网络编程。

Randal E. Bryant，1981年于麻省理工学院获得计算机博士学位，1984年至今一直任教于卡内基-梅隆大学。现任卡内基-梅隆大学计算机科学学院院长、教授，同时还受邀任教于电子和计算机工程系。他从事本科生和研究生计算机系统方面课程的教学近40年。他和O’Hallaron教授一起在卡内基梅隆大学开设了15-213课程“计算机系统导论”，那便是本书的基础。他还是ACM院士、IEEE院士、美国国家工程院院士和美国人文与科学研究院院士。其研究成果被Intel、IBM、Fujitsu和Microsoft等主要计算机制造商使用，他还因研究获得过Semiconductor Research Corporation、ACM、IEEE颁发的多项大奖。

David R. O’Hallaron卡内基梅隆大学电子和计算机工程系教授。在弗吉尼亚大学（University of Virginia）获得计算机科学的博士学位，2007年-2010年为Intel匹兹堡实验室主任。他教授本科生和研究生的计算机系统方面的课程已有20余年，并和Bryant教授一起开设了“计算机系统导论”课程。曾获得CMU计算机学院颁发的Herbert Simon杰出教学奖。他主要从事计算机系统领域的研究，与Quake项目成员一起获得过高性能计算领域中的*高国际奖项——Gordon Bell奖。他目前的工作重点是研究自动分级（autograding）概念，即评价其他程序质量的程序。`
  },
  {
    id: 2,
    title: "设计模式：可复用面向对象软件的基础",
    author: "Erich Gamma",
    isbn: "9787111618331",
    cover_pic: "https://img13.360buyimg.com/n1/jfs/t1/82087/19/1517/147822/5cfdc72cE324e523d/855b76d5bdab57d6.jpg",
    price: 65.1,
    stock: 20,
    description: `本书结合设计实例从面向对象的设计中精选出23个设计模式, 总结了面向对象设计中*有价值的经验, 并且用简洁可复用的形式表达出来。本书分类描述了一组设计良好、 表达清楚的软件设计模式, 这些模式在实用环境下特别有用。 本书适合大学计算机专业的学生、研究生及相关人员参考。
    埃里克·伽玛（Erich Gamma） 在瑞士苏黎世大学获得计算机科学博士学位。他与Kent Beck合作开发了单元测试框架JUnit，并领导了Eclipse Java Development Tools项目。他还曾是IBM Rational Jazz项目的主要成员。2011年，Gamma以杰出工程师（Distinguished Engineer）的身份加入微软Visual Studio团队，领导微软位于瑞士苏黎世的实验室。

理查德·赫尔姆（Richard Helm） 在澳大利亚墨尔本大学获得计算机科学博士学位，曾在IBM T. J. Watson担任研究员，并在澳大利亚开创了IBM面向对象技术研究分部。

拉尔夫·约翰逊（Ralph Johnson） 在美国康奈尔大学获得计算机科学博士学位，伊利诺伊大学教授，在模式、重构等领域均有很高造诣。

约翰·威利斯迪斯（John Vlissides） 在美国斯坦福大学获得计算机科学博士学位，是IBM T. J. Watson研究中心的研究员。`
  },
  {
    id: 3,
    title: "流畅的Python",
    author: "Luciano Ramalho",
    isbn: "9787115454157",
    cover_pic: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t5563/25/932693477/263905/df74601a/590939d4N58892765.jpg!q80.dpg",
    price: 69.5,
    stock: 10,
    description: `本书致力于帮助Python开发人员挖掘这门语言及相关程序库的优秀特性，避免重复劳动，同时写出简洁、流畅、易读、易维护，并且具有地道Python风格的代码。本书尤其深入探讨了Python语言的高级用法，涵盖数据结构、Python风格的对象、并行与并发，以及元编程等不同的方面。
    本书由奋战在Python开发一线近20年的Luciano Ramalho执笔，Victor Stinner、Alex Martelli等Python大咖担纲技术审稿人，从语言设计层面剖析编程细节，兼顾Python 3和Python 2，告诉你Python中不亲自动手实践就无法理解的语言陷阱成因和解决之道，教你写出风格地道的Python代码。
　　● Python数据模型：理解为什么特殊方法是对象行为一致的关键。
　　● 数据结构：充分利用内置类型，理解Unicode文本和字节二象性。
　　● 把函数视作对象：把Python函数视作一等对象，并了解这一点对流行的设计模式的影响。
　　● 面向对象习惯用法：通过构建类学习引用、可变性、接口、运算符重载和多重继承。
　　● 控制流程：学习使用上下文管理器、生成器、协程，以及通过concurrent.futures和asyncio包实现的并发。
　　● 元编程：理解特性、描述符、类装饰器和元类的工作原理。
Luciano Ramalho，从1998年起就成为了Python程序员。他是Python软件基金会的成员，Python.pro.br（巴西的一家培训公司）的共同所有者，还是巴西众创空间Garoa Hacker Clube的联合创始人。他领导过多个软件开发团队，还在巴西的媒体、银行和政府部门教授Python课程。

　　安道，专注于现代计算机技术的自由翻译，译有《Flask Web 开发》《Python 网络编程攻略》《Ruby on Rails 教程》等书。

　　吴珂，现为Airbnb公司软件工程师，所在团队主要负责开发和维护各类可伸缩、高性能服务，并在Airbnb内推广面向服务的系统架构。在分布式系统、云存储服务和跨平台SDK开发，以及大规模数据处理等方面有多年经验。`
  }
];

let bookDb = new Map<number, IBook>();
books.forEach(fillDb<IBook>(bookDb));

export function initCartsDb() {
  // Use function to simulate relation fields.
  let carts: ICart[] = [
    {
      id: 1,
      owner: userDb.get(1) as IUser,
      items: [
        {
          id: 1,
          cart: 1,
          product: bookDb.get(1) as IBook,
          count: 1
        },
        {
          id: 2,
          cart: 1,
          product: bookDb.get(2) as IBook,
          count: 2
        }
      ]
    }
  ];
  let cartDb = new Map<number, ICart>();
  carts.forEach(fillDb<ICart>(cartDb, "owner"));
  return {carts, cartDb};
}

export {
  userDb,
  bookDb
}
