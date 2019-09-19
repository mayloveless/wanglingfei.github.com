---
layout:     post
title:      ie6 下location.href 失效
category: bugNote
description: ie6 下location.href 失效
tags: bug笔记
---

在用到按钮的时候，一般都是然后阻止默认跳链，执行js。

一般的写法是

	<a href="javascript:;">

	<a href="javascript:void(0);">

	<a href="###">

当然它们是有区别的，而且很多。

此处说明的bug是，假如写第一、二种方式的话，ie6下，执行js到最后，需要location.href的时候，就不起作用了

解决方式是只能写成第三种方式，原因依然未知

ie6真是让人不省心