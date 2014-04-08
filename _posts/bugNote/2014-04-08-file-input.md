---
layout:     post
title:      IE-Input-File
category: bugNote
description: IE-Input-File
tags: bug笔记
---

问题：

最近在做文件上传的功能，比如上传个图片，你就得隐藏个input，设置为file类型，然后点按钮的时候，触发这个input的点击事件，这样它能帮你打开一个选择文件的窗口。

问题就是，每次选完文件我就把这个input的值清空（置为空），结果IE下这个input的值是只读的，也就是说无法清空。我要是想上传同一张图片，就没法再次上传，change事件无法触发。好吧，就算这个我忍了，可是IE11是个奇葩，它是可以清空的，但是清空时，又再次触发了change事件，这就变成了一个死循环了：change事件触发，清空，又触发，又清空。。。。。。
而对比Chrome等现代浏览器就没有这个问题，value可以置空，而不触发change事件。

解决办法：

每次input都是新的，上传完一次就销毁，再创建个新的，sigh……


即便是IE11，也有种想砸电脑的冲动呢


参考资料：

[IE浏览器下的Input File详解](http://www.iefans.net/ie-input-file/)
	
