---
layout:     post
title:      ie6下iframe不显示内容的bug
category: bugNote
description: ie6下iframe不显示内容的bug
tags: bug笔记
---

这次在项目中遇到一个bug：

ie6下iframe不显示内容，一片空白，如果直接访问iframe地址的话，是可以访问的，也就是说是js的问题。

1、bug代码我是这样写的。

	var TEMPLATE = {

	  'buyFrame':  '<#et data>'+
                     '<iframe width="469" height="367" scrolling="no"  frameborder="0" src="${url}" >'+
                     '</iframe>'+
                '</et>'
	};
	layer.html( $.easyTemplate(TEMPLATE['buyFrame'],{data:url} );

也就是说，用模板引擎替换url的方法。当然这显然是木有必要的，模板在此项目中是不需要服用的。这貌似也是问题的根源之一。

2、网上找了半天，有的给的答案是这样的：

1）宽高固定

2 )border:0

3) src 不能直接放在第一属性，也就是说不能写成<iframe src=""

这3条我都没有，于是怀疑是模板引擎的原因，遂弃用之。但依旧没内容。



3、经过多方尝试，想到，也许先出iframe再写url的方式，也就是等一下的感觉。

于是写成了这样：

	'buyFrame':

        '<iframe width="469" height="367" frameborder="0" scrolling="no"   >'+

        '</iframe>'

	layer.html( TEMPLATE['buyFrame'] );

 	var iframeDom = $.sizzle('iframe',layer.getInner())[0];

 	iframeDom.setAttribute('src',someurl)

       居然成功了……虽然不知道原理，但也许跟setTimeout(0)一样，需要加入执行队列里去。

3、虽然成功了，但iframe只显示了我加入的链接页面，这个页面本来是要跳转的，结果跳不动了、

好吧，依旧是js的问题。又经过多方尝试，原来去掉 scrolling="no" 就好了！

本来想为避免样式问题，不显示滚动条，显然又多此一举了……



4、总结一下就是原因未知，但问题解决了

真是不靠谱的debug……ie6走好不送……