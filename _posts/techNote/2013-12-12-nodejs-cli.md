---
layout:     post
title:      命令行的node app开发方式
category: techNote
description: nodejs cli
tags: nodejs 学习笔记
---

1、创建一个bin文件夹，创建一个文件如：cli

2、cli文件要第一行要写：

  	#!/usr/bin/env node

应该是声明node命令环境的。

3、之后就可以写node代码啦。对于命令行的app主要就是分析输入参数，去进行相应的操作。

一般来说分析输入参数的方式就是：
    var argv = process.argv.slice(2);
然后去做判断就好。这方面的模块有optimist。

参考资料：

[ Build a Command-line app with Nodejs ](http://www.creativebloq.com/javascript/build-command-line-app-nodejs-6135565)

[ Building CLI Tools with Node.js ](http://michaelbrooks.ca/deck/jsconf2013/)