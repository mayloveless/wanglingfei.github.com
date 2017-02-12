---
layout:     post
title:      《web前端黑客技术揭秘》阅读笔记
category: techNote
description: 《web前端黑客技术揭秘》阅读笔记
tags:  读书笔记
---

**第一章：web安全的关键点**

1、数据与指令

如：SQL注入，XSS跨站脚本

2、浏览器同源策略

关键词：不同域、客户端脚本、授权、读写权限、资源

3、信任与信任关系

4、社会工程学（伪装）

5、攻防不单一

6、场景很重要

攻击技术方式不是重点，意义最重要，也就是做有影响面的攻击



**第二章：前端基础**

具体摘出几个知识点：

1、iframe同源策略

若iframe与父窗口同源，则子窗口可以访问父窗口节点

若不同源，则子窗口对于location只有写权限，木有读权限

2、httpOnly Cookie

仅在http层面上传输的Cookie，设置之后，客户端无法读写该Cookie

3、Cookie的P3P性质

HTTP响应头的P3P（Platform for Privacy Preferences Project）字段是

W3C公布的一项隐私保护推荐标准。用于标识是否允许目标网站的Cookie被另一个域通过加载目标网站而设置或发送，只有IE执行了这个策略。

a）set Cookie IE默认不允许第三方设置

b）sent Cookie 本地Cookie（设置过期时间的Cookie）必须有P3P

内存Cookie（关闭浏览器即销毁的Cookie）正常send 



**第三章：XSS**

XSS即跨站脚本，突破浏览器同源策略将恶意脚本内容在目标网站中目标用户的浏览器中解析。

1、反射型XSS

发出请求时，XSS代码出现在URL里，作为提交到服务器，服务器解析后相应，在相应内容里出现这段代码，最后浏览器执行。

2、存储型XSS

相较于反射型，存储型会存在服务端，持久化、

3、DOM XSS

不需要服务端解析响应，靠DOM解析。



**第四章、CSRF**

Cross Site Request Forgery 跨站请求伪造

1、攻击类型

a）HTML CSRF攻击

能设置连接的地方都可以发起一个GET请求。

构建Form表单可以发起一个POST请求

b）JSON HiJacking 攻击

对于JSON的劫持攻击

例如：

许多网站为了跨域获取信息，采用script加载json文件的方式

当csrf可攻击时（也就是获取数据的网站Cookie木有做防御，可以跨域取到），只要伪造一个页面就可以把获取的数据传到这个伪造的恶意网站。

如果返回的是一个JSON数组，会被认为是一段可执行的JavaScript脚本，于是浏览器会解析执行。

JSON数据如果里字典形式返回，直接在浏览器中会显示错误，所以对于JSON数据，一般会eval("("+JSON_DATA+")")

一般跨域获取JSON文件时，加上callback 回调函数变量名

	<script src="http://...indbox.json?callback=fn"> 

这样数据可以传递给内存中fn的函数中去，callback([json])。

这时，写好fn里就可以处理获取的数据

**CSRF是模拟你的身份去发送请求，Hijacking是模拟你的身份，窃取你在服务器上的私隐信息。**



c）Flash攻击



**第五章、界面操作劫持**

点击劫持、拖放劫持、触屏劫持

1、技术原理：透明层+iframe

把劫持的页面放在iframe里，透明放在恶意页面上，实现视觉欺骗。

用户以为点击了恶意页面上的东西，但本质是点击了iframe里被劫持的页面，从而实现用户不可知的操作。

三种劫持方式都是以不同的掩人耳目的方式让用户操作了隐藏的页面。

2、拖放操作不受同源策略限制，可以从一个域拖到另一个域中。



**第六章、漏洞挖掘**

1、CSRF漏洞挖掘只需要确认以下内容即可：

a）目标表单是否有有效的token随机串

b）目标表单是否有验证码

c）目标是否判断了Referer源

d）网站根目录下crossdomain.xml的“allow-access-from domain”是否是通配符

e）目标JSON数据是否可以自定义callback函数等。



2、界面操作劫持漏洞挖掘只需要确认以下内容即可：

a）目标的HTTP响应头是否设置好了X-Frame-Options字段

DENY/SAMEORIGIN来设定对于iframe的拒绝或者需要同源的命令

b）目标是否有js的Frame Busting机制

也就是如果自己被iframe了，就把父窗口刷成自己

	if ( top.location != self.location ){ top.location = self.location; }



3、HTML与JS自解码机制

HTML会自动将字符串解码

js初始化的时候会将字符串编码

如：innerHTML="<>"等同于innerHTML="&lt;&gt"



但有些HTML标签是不具备HTMLEncode功能的

如：textarea、iframe、noscript、noframes



4、url编码差异

浏览器请求时对url进行编码，不同浏览器对于url编码的字符数不同。



5、fuzzing模糊测试

基本就是遍历查找的意思



6、Flash XSS挖掘

基本就是反编译看代码，覆盖全局变量



7、字符集缺陷导致的XSS

a）字符集：ASCII，GBK，Unicode 。。。。

b）字符集编码：Unicode=》utf系列，GBK=》GBK

c）GBK，GB2312是宽字节，占2个字符

引发的问题：url编码xss时，要把字符转成该网站的编码才能正确XSS

d）utf-7=》自动选择问题

在IE6,7如果没有声明HTTP响应头字符编码方式或者声明错误

同时<meta http-equiv>未指定Charset或者指定错误

那么浏览器就把UTF-7编码的转成UTF-7

所以，这种页面就插入UTF-7字符就可以了。

e）utf-7=》iframe调用外部utf-7 html问题

父窗口utf-7，子窗口有UTF-7编码的就会被转成UTF-7

f）utf-7=》link调用外部css文件问题

css文件utf-7，父窗口也utf-7

g）utf-7=》指定BOM头问题

BOM=》标记字节顺序码

文档开头发现BOM是+/v8即认定文档按照utf-7编码



以上，utf-7只在ie下支持了。



8、绕过XSS Filter

Chrome和IE有XSS Filter，主要针对反射型XSS，启发式检测，判断是否有XSS特征，重新渲染内容，以保证不触发。

a）CRLF  回车换行

在X-XSS-Protection:0之后加入回车换行，就额可以使这个响应头失效。

b）同域白名单

IE判断Referer来源是否本域，本域则Filter不生效

Chrome同域JS不防御。



9、混淆的代码

a）encodeURL，encodeURLComponent不编码的字符数量不同

b）HTML注入技巧

标签，属性，HTML事件

c）CSS注入技巧

可以插入XSS的地方

资源有关的属性值：background，background-image等

@important可以混淆骗过过滤器

ie下expression

@charset可以协助绕过Filter（参见7、字符集缺陷导致的XSS）

d）js注入技巧

闭合变量

JSON若是callback参数名的参数调用的Object，如：

callback([{a:"b"}])（参加JSON HiJacking 攻击）

	url?callback=fn  =》url?callback<script>alert(1)</script>

若没有过滤callback函数名，就可以注入



**第七章 漏洞利用**

1、偷取隐私数据

XSS探针、获取Referer信息、浏览器明文密码、键盘记录器

2、跨域操作技术

a）IE res：协议跨域

b）CSS String Injection 跨域

c）浏览器特权区域

d）浏览器扩展

f）跨子域：document.domain

把proxy页面（空的）放到iframe里，设置evil页面与proxy相同的domain

这样2个页面就同域无跨域限制了，自由注入js

顺便：window.name跨域

把需要取数据的页面放到iframe里，设置window.name,然后iframe换个src，但窗体实例window不变，所以window.name保留。

src换成与父窗口同域的，这样父窗口就可以读子窗口的window.name

实现跨域取数据



**第八章、HTML5安全**

1、新属性新标签绕过黑名单策略

2、Histroy API 

3、僵尸网络

web worker、CORS（XMLHttpRequest 的跨域资源共享 ）

4、地理位置暴露



**第九章 web蠕虫**



**第十章 关于防御**

1、CSP策略（Content-Security-Policy）

2、web厂商的防御

a）域分离

b）安全传输

c）cookie

d）验证码

f）慎用第三方

g）xss防御

h）CSRF防御

http referer同域

session cookie生命周期

验证码

一次性token

i）界面操作劫持防御

	x-frame-options
	frame-busting

+++++++++++++

看完了这书，还是比较长知识的，只是作者很多解释的并不详细，需要边查边看。并且在书中罗列大片代码实在是体验很不好。



花了4天时间，大概16个小时左右看完的。

总结的很多点，但是例子就没法贴了……虽然那才是重点……



本来想试验一下的，结果weibo，youku神马的普通的都已防御了……sigh……