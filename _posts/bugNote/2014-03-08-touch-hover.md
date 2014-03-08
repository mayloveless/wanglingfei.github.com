---
layout:     post
title:      iOS系统下:hover伪类处理
category: bugNote
description: iOS系统下:hover伪类处理
tags: bug笔记
---

问题：

遇到一个纠结了好久的bug：IOS系统下（iPad,iPhone）样式hover伪类引发的bug。

假如一个节点上写了:hover，那么点击的时候就会触发:hover ，然后才去执行click事件。如果这个伪类是控制显示隐藏的，比如visibility,display的话，就会先把需要显示得显示出来，也就是要hover的东西hover出来，之后才能再点击才能触发click事件。

我遇到的问题主要是有hover伪类的地方，如果控制显隐则链接不可点，控制背景颜色的点击完了hover状态一直保持。

这也许是iOS系统太过高级了，想在移动平台做hover效果，结果让人很头疼。

具体的参考资料上写得很清楚。


解决办法：

在需要hover伪类的样式上，或者只在PC端的样式上 前面加一个命名空间，比如：no-touch。

然后在html或者body标签上写上class="no-touch",写在这里主要是为了整个页面都做处理，不去区分具体业务逻辑。

之后js判断平台，如果是移动平台则去掉no-touch，这样移动平台的样式就无法触发到no-touch样式里的hover伪类了。


参考资料：

[iOS has a :hover problem](http://www.nczonline.net/blog/2012/07/05/ios-has-a-hover-problem/)
	
[Fix CSS hover on iPhone/iPad/iPod](http://stackoverflow.com/questions/18047353/fix-css-hover-on-iphone-ipad-ipod)
