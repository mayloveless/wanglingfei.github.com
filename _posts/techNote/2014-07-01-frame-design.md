---
layout:     post
title:      Javascript框架设计 学习笔记
category: techNote
description: Javascript框架设计 学习笔记
tags: Javascript 框架  学习笔记
---

第一章：种子模块

种子模块也叫核心模块，是框架的最先执行的部分。包括：对象扩展，数组化，类型判断，简单的事件帮顶与卸载，无冲突处理，模块加载与domReady。

第二章：模块加载系统
	
第三章：语言模块


	1、oninput
	2、oncompositionstart
	3、oncompositionend
	4、elem.compareDocumentPosition(t) & 16 //包含
	5、"top,left".replace( /[^, ]+/g , function(name) {});//foreach
	6、 数组转化为对象的key，值为val或默认为1
		var oneObject = function (array, val) {
	        if (typeof array === "string") {
	            array = array.match(rword) || []
	        }
	        var result = {},
	                value = val !== void 0 ? val : 1
	        for (var i = 0, n = array.length; i < n; i++) {
	            result[array[i]] = value
	        }
	        return result
	    
	7、Object.getOwnPropertyNames
	8、hidefocus outline=true
	9、遍历DOM(NodeIterator和TreeWalker的使用
	http://www.cnblogs.com/blog-zwei1989/archive/2012/11/28/2792420.html
	10、withCredentials xhr
	http://www.zawaliang.com/2013/02/186.html
	11、try{}catch(e){e.stack}//取错误信息
	12、$(document).ready
	http://blog.csdn.net/dyllove98/article/details/9237805
	http://www.cnblogs.com/haogj/archive/2013/01/15/2861950.html
	13、[].slice.call(arguments)=》Array.prototype.slice.call(arguments)。能将具有length属性的对象转成数组。
	14、