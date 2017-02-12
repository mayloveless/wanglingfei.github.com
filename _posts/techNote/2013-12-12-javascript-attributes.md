---
layout:     post
title:      js一些特性的总结
category: techNote
description: javascript
tags: js javascript ECMA 学习笔记
---
在上次的读express源码的时候，碰到了一些js的特性，平常没用到过。
这里记录一下，不是很多，就记录了碰到的，剩下的就参考MDN吧


1、Object.defineProperty

	Defines a new property directly on an object, 
	or modifies an existing property on an object, 
	and returns the object

Object.defineProperty(obj, prop, descriptor)
相当于obj.prop = {}

descriptor里面可以设置很多东西，如
	Writable 
	Enumerable（defines whether the property shows up in a for...in loop and Object.keys() or not.）
	Configurable （whether the property can be deleted from the object or changed【除非writable】）

ie8在特定情况下支持(DOM objects)

[Object.defineProperty-司徒正美-博客园](http://www.cnblogs.com/rubylouvre/archive/2010/09/19/1831128.html
)

2、Object.getOwnPropertyDescriptor

	Returns a property descriptor for an own property 
	(that is, one directly present on an object, 
		not present by dint of being along an object's prototype chain) 
	of a given object.
就给出本身定义的Descriptor的意思吧


3、__defineGetter__

	Binds an object's property to a function 
	to be called when that property is looked up.

obj.__defineGetter__(sprop, fun)

当获取obj对象的sprop属性时，执行fun，相当于给get绑定一个事件
同理__defineSetter__


4、js arguments对象

arguments对象是个不同于其他对象类型的对象哟
	var a = function(){console.log(Object.prototype.toString.call(arguments))};
	a(1,2);
	=>[Object Arguments]
可以像数组一样使用呢
	An Array-like object corresponding to the arguments passed to a function.

5、Array.prototype.slice.call(arguments)

例：
	var a={length:2,0:'first',1:'second'};
	Array.prototype.slice.call(a);//  ["first", "second"]

	var a={length:1,0:'first',1:'second'};
	Array.prototype.slice.call(a);//  ["first"]

	var a={length:2,0:'first'};
	Array.prototype.slice.call(a);// ["first", undefined × 1]


把a转成真正的数组，对象a貌似需要length属性。

而 arguments 是类数组的，so 具备length条件
通过这句话可以把arguments转成真正的数组对象。


6、HTTP header 的Vary(加个http的)

  	Vary  = "Vary" ":" ( "*" | 1#field-name )  
  	要么是“*”，要么是header的key名称组合

vary会告诉代理服务器/缓存/CDN，如何判断请求是否一样
这些缓存服务器神马的会根据某些header来判断是否是一个新的请求。
如果需要重新确认的就用vary。不用的这些服务器就不管了，直接给缓存。
需要重新确认的header值，就写在vary：后的值里。

如：写了Vary:User-Agent的话，即使只是不同浏览器访问，CDN/代理也会认为是不同的页面，都会进行重新确认请求。

参考资料：

[JavaScript reference - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)