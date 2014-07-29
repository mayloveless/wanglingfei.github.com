---
layout:     post
title:      JS文件下载功能
category: bugNote
description: H5上传的几个问题
tags: bug笔记 HTML5 JS文件下载功能
---

做完文件上传，接下来做文件下载。。。

最开始，我以为直接写a链接就可以下载了，写完弹层逻辑之后我发现我真是太天真了。。。浏览器那么聪明能知道你想干啥么？都是要写代码的少年！

问题：
	
要下载的文件是经过转码后的视频文件，一般是MP4文件，或者flv文件。把地址敲进浏览器地址栏会自己加载播放插件，渲染视频，不能做到下载功能。毕竟，浏览器是可以解析mp4的，返回可解析文件自然就直接解析了，pdf什么的也都是这样的。如果不能解析，才会直接下载。

解决方式有多种：

	1、给链接增加download属性，即：<a href="url" download="filename" >下载1</a>
	这是H5的新规范，可以通过标示这是个下载地址而直接下载，不会作为链接跳转。看上去很好，兼容性差！

	2、用window.open打开下载地址，让浏览器执行"另存为"功能。即：
		window.document.execCommand('SaveAs', false,'filename');
	看上去还行，不能跨域！
	
	3、用iframe，src=下载地址，让浏览器执行"另存为"功能。即：
		ifr.contentWindow.document.execCommand('SaveAs', false,'filename');
	同2一样，不能跨域，没有权限!
	
	4、后端增加返回头，标示“这是个附件，不要渲染”。即：
		<?php 
		   header("Content-Type: application/octet-stream");
		   header("Content-Disposition: attachment; filename=".$_GET['path']);
		   readfile($_GET['path']);
		?>
	Content-Disposition是重点，这才是正确的解决方式！配合iframe可以做到和1一样的效果。

	不过此次需求后端也有实现的难点，因为资源并不在我方，不能随便加返回头。所以基本上做了一个中转站的功能，把文件先读到服务器上，加上返回头，再返给用户。服务器内存的占用是个问题，因为读文件buffer都要读到内存里去。代码实现部分参见参考资料。

	5、还有很多方法下载，和下载文件的不同情境，参见参考资料。




参考资料：

[JavaScript多文件下载](http://www.cnblogs.com/hustskyking/p/multiple-download-with-javascript.html)

[Content-Disposition的使用和注意事项](http://www.cnblogs.com/jzaileen/articles/1281025.html)

	
