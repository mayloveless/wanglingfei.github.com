---
layout:     post
title:      高性能HTML5
category: techNote
description: HTML5 读书笔记
tags: HTML5 读书笔记
---

##第二部分 性能基础

#开发原则

**编写符合当代浏览器性能的代码**
    
    减少HTML中元素的数量
    减少重绘

**用CSS来布局，处理边界**

不把元素布局在盒模型的盒子之外。

**使用渐进式增强的方法**

特征检测：Modernizr

**各司其职**

#性能准则

    减少HTTP请求
    使用CDN加速
    避免空的src或href属性值
    增加过期头
    启GZIP压缩
    把CSS放头部
    把JS放尾部
    避免使用CSS表达式
    删除不使用的CSS语句
    对JS、CSS进行代码压缩
    减少重绘



