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
	
定义一个全局变量作为命名空间，然后对它进行扩展，去jQuery的jQuery。
	
**2、对象扩展**

即 jQuery=>extend or mixin 	

**3、数组化**

浏览器下存在许多类数组对象，如function内的argument。为了享受纯数组的便捷方法，处理他们前都会做一下转换。

	通常用[].slice.call,能将具有length属性的对象转成数组
	[].slice.call(arguments)相当于Array.prototype.slice.call(arguments)。
	但旧版IE下的HTMLCollection、NodeList不是Object子类，如上方法会导致IE异常，需要在IE下单独实现一个slice方法（各大框架做法均不同，此处仅记容易理解的作者的mass框架的方法）,就是把对象遍历进一个数组里。
	$.slice = window.dispatchEvent ? function(nodes,start,end){
		return {}.slice.call(nodes,start,end);
	} : function(nodes,start,end){
		var ret = {},n = nodes.length;
		if( end === void 0 || typeof end ==="number" && isFinite(end)){
			start = parseInt(start,10) || 0;
			end = end == void 0 ? n :parseInt(end,10);
			if(start <0){
				start += n;
			}
			if(end > n){
				end = n;
			}
			if(end < 0){
				end += n;
			}
			for(var i= start;i<end;++i){
				ret[i-start] = node[i];
			}
		}
		return ret;
	}

**4、类型的判定**

一般来说就用Object.prototype.toString.call(要测定的对象如：Array)就可以了，结果是[object Array]。剩下的window对象，Document,Arguments,NodeList对象单独判定。

**5、domReady**

一般我们的js逻辑会写在window.onload回调中，以防DOM树还没建完就开始对节点进行操作，导致出错，但是有时页面图片等资源过多，window.onload就迟迟不能触发。

domReady其实是一种名为"DOMContentLoaded"事件的别称。此处的domReady指做过兼容性处理的domReady机制。策略：（1）对于支持DOMContentLoaded的用DOMContentLoaded事件。（2）对于旧版本IE用Hack。

Hack原理如下：
	
	1、由于在DOM未建完之前调用元素doScoll抛出错误。所以就不断setTimeout去try{window.document.documentElement.doScoll('left');}直到成功之后就代表load成功，执行用户回调。
	2、用户也有可能在执行这个js的时候dom已经ready了，所以只需判断window.document.onreadystatechange事件回调里window.readyState是否为"complete"就可以了。不需要上面的操作了。
	3、也可以通过创建一个script标签并添加deffer属性，因为指定deffer属性的script会在dom树建立完后触发，所以可以在这个脚本load成功之时执行用户的业务逻辑。
	4、总结一下mass框架的思路就是：先判断Document.readyState没有complete没有就去绑定监听document.onreadystatechange的事件继续等待complete，或者如果符合W3C标准，就去监听DOMContentLoaded。
	这个是要等待异步回调的，那这段时间可以去判断一下scroll函数。总之，用各种各样的方式去试探，一旦成功，立即改变状态，使得其他判断方式失效，最后触发用户回调！实在不行还有window.onload!

**6、无冲突处理**

即多库共存。使用时先引入其他框架，然后jQuery，之后执行noConflict()

	noConflict原理：
	//先将别人的命名空间保存在一个内部变量里
	var _jQuery = window.jQuery,_$=window.$;
	jQuery.extend({
		noConflict:function(deep){
			//jQuery执行完了，调用noConflict时，再把人家对象还回去。
			window.$ = _$;
			if(deep)
				window.jQuery = _jQuery;
			//返回jQuery对象就可以随便赋值给其他变量了，如wlf =$.noConflict();
			//wlf('#id')这样使用就可以啦。
				return jQuery;
		}
	});

>第二章：模块加载系统

**1、AMD规范**
即异步模块定义。

	define('xxx',['aaa','bbb'],function(aaa,bbb){})
	xxx为模块ID，第二个参数为模块依赖。

**2、加载器所在路径的探知**	

1、一般用node.src,在IE下js的绝对路径返回不准确。需要做兼容性处理，用node.readyState === 'interactive'判断，即过滤几个js脚本，找出正在当前解析的那个node。

2、还可以用Error对象。当发生脚本错误的时候，一般会给出错误的事件对象，利用这个对象可以得知出错的js的文件路径等信息，如下：

	try{
		a.b.c();//故意报错
	}catch(e){
		if(e.fileName){//firefox
			return e.fileName;
		}else if(e.sourceURL){//safafi
			return e.souceURL;
		}
	}

**3、require方法**

作用是当依赖加载完毕，执行 用户回调。
1）、取得依赖 列表的第一个ID，转换为URL。
2）、没加载过的加载
3）、创建script标签，绑定onerror，onload，onreadychange等事件判定加载成功与否，然后添加src并插入DOM树，开始加载。
4）、将模块的URL，依赖列表等构建成一个对象，放到检测队列中，在上面的事件触发时进行检测。

藏个seajs的require原理：
	
	debug版的：
	define(factory) 中的 factory 函数。原理是，当将 js 文件加载回来后，执行的仅是 define(factory) 函数，factory 则还未执行。执行 define 时，会扫描 factory.toString() 方法，得到当前模块依赖的文件，下载好好，再执行 factory 函数， 这样就实现了提前并行加载，但执行时看起来是同步的。
	如果是打包过后的，就无所谓了。


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