---
layout:     post
title:      Javascript框架设计 学习笔记
category: techNote
description: Javascript框架设计 学习笔记
tags: Javascript 框架  学习笔记
---

>第一章：种子模块

种子模块也叫核心模块，是框架的最先执行的部分。包括：对象扩展，数组化，类型判断，简单的事件绑定与卸载，无冲突处理，模块加载与domReady。

**1、命名空间**
	
	noConflict原理：
	//先将命名空间保存在一个内部变量里
	var _jQuery = window.jQuery,_$=window.$;
	jQuery.extend({
		noConflict:function(deep){
			//调用noConflict时，再把jQuery对象拿回来。
			window.$ = _$;
			if(deep)
				window.jQuery = _jQuery;
			return jQuery;
		}
	});

**2、对象扩展**
	
	


第二章：模块加载系统
	
第三章：语言模块

第八章：数据缓存系统

4种形态：
	
	属性标记法
	数组索引法
	valueOf 重写法
	weakMap 关联法

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
	14、/xyz/.test(function(){xyz;})//用于判定函数的toString是否能暴露里面的实现。
	15、sizzle选择器原理，先分组如：div.aaa span.bbb > a.ccc 这样的可以分为3组，中间的“” ,> ,+,~是关系选择器，代表了要过滤出父节点，兄弟节点等。分组之后拿到a.ccc,先sizzle.find，找到ccc的集合，然后sizzle.filter过滤出a.ccc,这样最终会有几个组的集合（例子里是三个）。复制一份a.ccc作为一个基本的种子集，通过目录查找它跟前面两组组合的包含关系，去除多余的元素，就完成了。
	16、
	var global = (function(){
		return (0, eval)('this'); 
	})();
	http://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript
	http://stackoverflow.com/questions/14119988/return-this-0-evalthis

	will correctly evaluate to the global object even in strict mode. In non-strict mode the value of this is the global object but in strict mode it is undefined. The expression (1, eval)('this') will always be the global object. The reason for this involves the rules around indirect verses direct eval. Direct calls to eval has the scope of the caller and the string this would evaluate to the value of this in the closure. Indirect evals evaluate in global scope as if they were executed inside a function in the global scope. Since that function is not itself a strict-mode function the global object is passed in as this and then the expression 'this' evaluates to the global object. The expression (1, eval) is just a fancy way to force the eval to be indirect and return the global object.

	A1: (1, eval)('this') is not the same as eval('this') because of the special rules around indirect verse direct calls to eval.

	A2: The original works in strict mode, the modified versions do not.

	As for why the body is this, that is the argument to eval(), that is the code to be executed as a string. It will return the this in the global scope, which is always the global object.

	(0,xx)返回xx。不直接写是为了暴露在全局scope下执行。‘this’严格模式下可以当做全局变量传进去。

	17、animation-play-state: running | paused 检索或设置对象动画的状态。
	http://ecd.tencent.com/css3/html/animation/animation-play-state.html

	------------------------
	移动版：
	card:如果需要js渲染模板的话，需要引用SDK，模板业务逻辑，js库（JQ），业务逻辑。不要渲染模板的话，前两个可以不用。SDK用来进行模板定义和模板渲染。
	打包的时候把模板业务逻辑require的模板文件都转化成js代码，即编译模板（支持doT和easyTemplate)。define好模块。
	之后先把数据模板先渲染出来。
	后续再处理其他业务逻辑。
	打包用gruntjs(如何编译模板就在这里啦，define模块也在这里啦：weibo-deifine，combine模块用的：grunt-cmd-combo,weibo自己写有。)。
	brick:在card的基础上做了进一步改进，思路不变。从流程上改进，可以控制渲染模板的时机，执行业务逻辑的时机，增加渲染成功的事件等。


	p.s
	sdk文件里的require作为懒执行，即什么时候require什么时候执行，不作为懒下载（文件）用。

	包管理：webcomponent css文件不统一的问题。