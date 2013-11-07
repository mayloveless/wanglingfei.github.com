---
layout:     post
title:      Daily Notice
category: project
description: Daily Notice
tags: 练习 node-wekit
---

最近发现了node-webkit，十分想做个东西，但苦于大东西做不了，小东西也没啥想法。

于是就出现了Daily Notice 这个很挫的东西。

主要功能：

1、当天天气

2、定时提醒

3、当天更新的美剧

++++++++++++++++++++++++

实现过程：

1、主要来说是Node-Webkit。Node-Webkit据我印象当中是把nodejs的context和Chrome的v8引擎的context连接在了一起。这样相当于一个可以有自己后端 的浏览器。

于是乎，前后端代码可以都用js，而且还可以混写……

相当于我写一个页面，然后它开个浏览器让我跑这个页面，感觉好像自己写了个桌面应用一样。

2、代码部分：

首先先要有package.json ，非常nodejs风格

	{
	  "name": "Dialy Notice",
	  "main": "index.html",
	  "window" : {
	        "toolbar" : false,
	        "icon" : "icon.jpg",
	        "frame": false,
	        "title" : "iNotice",
	        "position" : "center",
	        "width" : 300,
	        "height" :360
	  }
	}

	p.s不可以有任何注释，因为它不是js…

main:说明的是从哪个页面启动。

window对象是对启动窗口的一个设置：toolbar是上面的工具栏，frame是四周的边，把它们设置成false就可以不像浏览器啦。icon就是运行时显示在任务栏时的图标。位置神马的也可以设置，其他的应该很多，但没有完整的API Doc所以就不知道了。

写好之后是这样，没有了浏览器的形态。

                       

3、之后进入代码环节：

HTML，CSS就不说了。

js部分：

最主要的是：

	gui = require('nw.gui');
	win = gui.Window.get();

首先要拿到gui，也就是操作窗口的关键。然后win就是这个窗口了，可以获取到最小化，关闭等等方法， 也可以监听这些事件。

例子：

	win.showDevTools();

这句话就可以把开发人员工具调用出来了。



4、功能实现之定时提醒。

定时提醒就是轮询一定时间发提醒。



提醒的部分用了其他人的代码，原理是创建了新 窗口，这个窗口很小，停靠在右上角。

然后可以把事件挂在window.LOCAL_NW上，作为窗口间的通信。

desktopNotifications就是这个提醒窗口的整个对象，notify是创建窗口的方法。

需要创建提醒时：

	window.LOCAL_NW.desktopNotifications.notify('desktop-notify.png', '定时提醒', '休息、休息一下', function(){

                    });



由于没改代码，所以是4s后自动消失的。点叉时可以写callback，上面代码空的function就是这个callback。



5、功能实现之天气&美剧。

这两个功能是一样 的，主要是用把其他网站的内容扒下来的小偷程序，是对nodejs的运用，体现了前后端js一起用的强大。

以天气为例：

首先我要先把当前ip查到，然后根据ip查城市，最后根据城市查天气。

1）查ip

最开始用了nodejs，但只是内网ip

	var os = require('os');
	function getLocalIP() {
	    var map = [];
	    var ifaces = os.networkInterfaces();
	    console.log(ifaces);

	    for (var dev in ifaces) {
	        if (dev.indexOf('eth0') != -1) {
	            var tokens = dev.split(':');
	            var dev2 = null;
	            if (tokens.length == 2) {
	                dev2 = 'eth1:' + tokens[1];
	            } else if (tokens.length == 1) {
	                dev2 = 'eth1';
	            }
	            if (null == ifaces[dev2]) {
	                continue;
	            }


	            // 找到eth0和eth1分别的ip

	            var ip = null, ip2 = null;
	            ifaces[dev].forEach(function(details) {
	                if (details.family == 'IPv4') {
	                    ip = details.address;
	                }
	            });

	            ifaces[dev2].forEach(function(details) {
	                if (details.family == 'IPv4') {
	                    ip2 = details.address;
	                }
	            });

	            if (null == ip || null == ip2) {
	                continue;
	            }


	            // 将记录添加到map中去
	            if (ip.indexOf('10.') == 0 ||
	                ip.indexOf('172.') == 0 ||
	                ip.indexOf('192.') == 0) {
	                map.push({"intranet_ip" : ip, "internet_ip" : ip2});
	            } else {
	                map.push({"intranet_ip" : ip2, "internet_ip" : ip});
	            }
	        }
	    }  
	    return map;
	}

上述代码是找网卡，我经过改写只查到了内网ip地址，而我需要公网ip地址。

于是方法如下：

	var http = require('http');
	var options = {
                host:'ip.qq.com',
                port:80,
                path:'/'
            };

            var html = "";
            //获取ip.qq.com页面，把ip截取出来
            var req = http.get(options, function(res){
                res.setEncoding('binary');
                res.on('data',function (data) {
                    html += data;
                }).on('end', function () {
                   html=iconv.decode(new Buffer(html,'binary'), 'GBK');
                    var dom = $(html);
                    var ip=dom.find("#login_show .red").text();
                    if(ip.split('.').length==4){
                        getPosition(ip,getWeather)
                    }
                });
            });
            req.end();

基本就是把ip.qq.com页面里给出的ip地址取出来。

这里主要是用到了nodejs http模块，用它来访问页面，把二进制页面代码解码，找到节点，把数据取出来。

之后的都是一样的，只不过有页面，有json的，但实现过程都是一样的，美剧也是如此。



天气的图片现在还不全，因为无法得知都有神马类型的天气，不过这不是重点……



6、开始想加一个微博提醒，最后犯懒没写。

7、最小化功能

最小化可以用

	win.minimize();

但这只是最小化到任务栏，我想最小化到系统托盘。

于是：

 	win.on('minimize',function(){
        this.hide();
        //create a tray icon
        tray = new gui.Tray({title:'Daily Notice',icon:'icon.jpg'});
        tray.on('click',function(){
            //remove the tray
            this.remove();
            tray = null;
            //show window
            win.show();
        })
    });

这段代码的意思是 ，监听事件，当最小化到任务栏时，把窗口隐藏，然后创建一个图标，并指定图标名称和图片，这就是系统托盘看到的图标了。

然后给它绑定事件，点击时窗口恢复显示，并把这个系统托盘图标删除。

还可以绑定右键菜单等。



8、打包：

程序基本就没啥了，非常弱智的demo……

然后就可以打包成exe了

1、把程序文件包压缩成zip，并命名为nw

注意：package.json要在root节点，所以就不要压缩文件夹了，就全选压缩就好。

2、copy /b nw.exe+app.nw app.exe

把app.nw放进nw.exe目录，把nw.exe 压进去

3、用Enigma Virtual Box软件把nw.pak和*.dll压进去

1）选刚压了nw.exe的app.exe

2)点add选择nw.pak和*.dll依赖。基本用default就好，然后ok

3）Press 'File Options', choose 'Compress Files', and 'OK'

4）Process

4）最后压出来个新exe，就好了



9、总结：

总体感觉Node-Webkit还是很强大的，就是我也没写啥，就出了一个40多M的exe，略大……

前后端混写js感觉不靠谱的样子，但是代码组织好，这应该是没啥问题的。

最后感叹一下自己做产品的能力极差啊……想不出产品就遇不到问题，也就没法深入的研究呢……

Node-Webkit从应用层面上来讲应该还是有很多可挖掘的东西，不过现在想不到了……

不过，其实主要就是对于Nodejs的运用和窗口调用吧，如果仅仅是这样，其实也还好……





++++++++++++++

最后把参考文献里的关于优缺点的比较粘了过来。

六、使用node-webkit开发桌面客户端的优缺点？

1、优点

提高UI开发效率，DOM中丰富的事件等可以涵盖绝大多数桌面开发中的情况

HTML(5)与CSS(3)拥有丰富的展现效果，可以更容易地对界面进行改版、换肤

容易实现跨平台:Mac OS X 、Windows、Linux

使用Web开发人员工具可以使 UI 调试变得很轻松

桌面程序UI与Web版UI可以共享代码

2）、缺点

浏览器原生API几乎仅仅局限在Web页面上

若通过JavaScript引擎向Web前端暴露一些具有操作客户端权限的API，如何保证代码安全性

必须携带浏览器内核运行库，无形增加程序体积，至少20MB以上（压缩后）

能否满足各种复杂怪异的需求，比如异型窗口  

我觉得这点最重要：

若通过JavaScript引擎向Web前端暴露一些具有操作客户端权限的API，如何保证代码安全性

跟H5一样，安全性不解决就没戏……（虽然我在这说安全性，可以我一点也不懂……）……Node-Webkit任重而道远啊……

+++++++++++++++++++

Daily Notice github地址：

https://github.com/wanglingfei/dailyNotice



===================================================

参考文章：

[Node-Webkit原作文档](https://github.com/rogerwang/node-webkit   )   

[解决了我大量问题的例子](http://oklai.name/2013/04/%E8%BF%99%E5%B9%B4%E5%A4%B4%EF%BC%8C%E4%BD%A0%E5%8F%AA%E9%9C%80%E8%A6%81%E6%87%82node-webkit/)

[获取本机ip代码](http://blog.bd17kaka.net/blog/2013/07/10/get-ip-addrs-using-nodejs/ )

[Node-Webkit例子&优缺点](http://www.baidufe.com/item/1fd388d6246c29c1368c.html)