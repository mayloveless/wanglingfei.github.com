---
layout:     post
title:      松本行弘的程序世界读书笔记
category: techNote
description: 松本行弘的程序世界读书笔记
tags: 程序思想 读书笔记
---

##1、为何开发Ruby

三个设计原则：简洁性、扩展性、稳定性

##2、面向对象

多态、数据抽象、继承

多重继承缺点：结构复杂化，优先顺序模糊，功能冲突

对象是对现实世界具体物体的反映，继承是对物体分类的反映。额，这是错误的观点= =

面向对象功能：1、不需要知道内部的详细处理就可以进行操作（封装、数据抽象）。2、根据不同的数据类型自动选择适当的方法（多态性）

类是对象的模板 。类是模块，继承是利用模块的方法

元编程：对程序进行编程。反射：程序执行时取出程序的信息或者改变程序信息。

##程序块

程序块：在方法调用时，可以追加的代码块

Ruby块的特点：

  1、代码块可以作为参数传递给方法
  2、再被调用的方法中可以执行传递过来的代码块，执行后程序的控制权返回给方法
  3、块中最后执行的算是的值是块的值，这个值可以返回给方法。

Ruby的块本质和高阶函数一样。

##设计模式

设计模式一共23个。Singleton模式属于有关生成，Proxy模式属于有关构造，Iterator模式属于有关行为的模式。

Singleton模式用来保证某个类的实例只有一个。

Proxy模式是为了某个对象提供代理对象的模式

Iterator(迭代器)模式提供按顺序访问集合对象中各元素的方法。没有闭包的语言中，需要外部迭代器进行循环控制。内部迭代器缺点：不能同时进行多个循环。外部迭代器的缺陷是迭代器（光标）对象需要参照集合对象的内部信息。

Prototype模式：明确一个实例作为要生成对象的种类原型，通过复制该实例来生成新的对象。

Template Method：在父类的一个方法中定义算法的框架，其中几个步骤的具体内容则留给子类来实现。可以在不改变算法构造的前提下，在子类定义算法的一些步骤

观察者模式：当某个对象的状态发生变化时，依存于该状态的全部对象都自动得到通知，而且为了让他们都得到更新，定义了对象间一对多的依存关系。

开放-封闭原则：对模块扩展必须开放，对修改必须封闭。（其实就是高内聚低耦合？？）

Strategy模式：定义算法的合集，将各算法封装，使它们能够交换。使用Strategy模式，算法和利用这些算法的客户程序可以分别进行修改而互不影响。跟Template Mehtod不用的是，它是独立对象，能够动态交换处理逻辑。


##Ajax

##MVC和Ruby on Rails

MVC的优点
  
    可以更换节目
    一个模型对应多个视图
    多个视图同时响应
    容易测试
    复杂性
    强关联性

猴子补丁：动态语言中，不改变源代码而对功能进行追加和变更 。目的：功能追加，功能变更，修正程序错误，钩子，缓存。规则：基本上只能追加功能，功能变更时要谨慎，尽量小规模。小心相互作用。

##文字编码

编程语言处理文本数据的方法：UCS、CSI

UCS：泛用字符集，指程序中所处理的共同字符集（及字符编码方式）。输入输出时，编程语言将文本数据编程UCS，内部对文本数据进行统一处理。

CSI：字符集独立，指不对各种文字集（编码方式）进行任何变化，原封不动进行处理。

##正则表达式
##整数和浮点小数

##高速执行和并行处理

    根据测定发现瓶颈
    削减对象：减少对象，减少方法调用
    利用立即值
    利用C语言
    采用合适的数据结构
    以空间换时间 

<p style="text-align:center"><img src="/images/2015/thread.jpg" style="max-width:100%"/></p>

    信息共有的问题：
    数据整合性的丧失
    死锁

    线程间的信息交换：存储、信道、队列

##程序安全性

    4种软件漏洞
    DOS攻击
    信息泄露
    权限夺取
    权限升格

##关于数据的持久化

    xml的优缺点
    优点：数据以纯文本表示，表示结构的信息附加在标签里。
    不易发生关于字符编码的问题
    没有数据结构的情况下也能解析
    与其解析工具不依赖于特定的语言
    容易理解的结构（可读性）
    缺点：冗长，解析效率低下。

##函数式编程

    特征：
    函数本身也作为数据来处理
    以函数为参数的高级函数
    参数相同即可保证结果相同的引用透明性
    为实现引用透明性，禁止产生副作用的处理。