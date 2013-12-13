---
layout:    post
title:     sublime-text plugin
category:  techNote
description: sublime-text plugin
tags: sublime 学习笔记
---
做项目的时候，大神领导们给规定了个模板，照着格式写项目填空就行了。
每次都复制粘贴、改名字，微累。
想起了大神的博客里写过怎么写sublime-text-2的插件，遂决定写一个自动创建项目的插件。

具体创建过程见参考文献，很清楚，这里就不表了。
下面记录一下我写的这个插件的思路：

一共两个文件：
	Side Bar.sublime-menu
	plpackage.py

1、Side Bar.sublime-menu

它是sublime-text-2编辑器的左边导航栏的右键菜单配置。
我把这个文件放在Packages\User下，也就是这是我添加的意思。

代码：
	
	{ "caption": "Create PL", "command": "plpackage","args": {"dirs": []} }
	
"Create PL"是插件名字，command后面的plpackage就是插件调用时候的名字。也就是说，插件是可以按ctrl+`调出命令行界面调用的，这里是个Side Bar的快捷方式。

还可以带参数，dirs也就是目录，在插件里使用dirs[0]是右键的目录路径。

<p style="text-align:center"><img src="/images/2013/sideBar.png" style="max-width:50%"/></p>

2、plpackage.py

	#-*- coding: UTF-8 -*-  
	import sublime, sublime_plugin
	import os
	import time
	import os.path
	plIndex = '''
	 #很多模板code
	'''
	plInit = '''
	#很多模板code
	'''
	#要与文件名相同，首写字母大写
	#所以文件命名的时候就不要驼峰了，会让类名误会的
	class PlpackageCommand(sublime_plugin.WindowCommand):
        plName = ''
        saveAddress = ''
        parentDir = ''
        def run(self,dirs):
                fname = ''
                #用到了dirs[0],右键目录地址
                self.saveAddress = dirs[0]
                def done(commands):
                		#分析参数
                        cs = commands.split(',')
                        if not cs:
                                return
                        if len(cs) == 1:
                                self.plName = cs[0]
                        if len(cs) == 2:
                                self.plName = cs[0]
                                self.parentDir = cs[1]
                        #make folder
                        packagePath  = os.path.join(self.saveAddress, self.plName)
                        os.makedirs(packagePath)
                        #pl index.js
                        #如果是深一级的pl项目的话，在填一个父文件夹目录名称
                        #这样命名空间才是对的
						if self.parentDir : 
                            nameSpace ='pl.'+self.parentDir+'.'+ os.path.basename(self.saveAddress)+'.'+self.plName
                        else :
                            nameSpace ='pl.'+os.path.basename(self.saveAddress)+'.'+self.plName
                                                plId = '_'.join(nameSpace.split('.')) 
                        #今天日期
                        now = time.strftime('%Y-%m-%d',time.localtime(time.time()))
                        #替换模板
                        plIndexContent = plIndex % (now,nameSpace,nameSpace,plId,nameSpace)
                        #写文件
                        f = open(packagePath+'/'+'index.js','w') 
                        f.write(plIndexContent)
                        f.close()
                        #make source folder
                        #make init.js
                        #同上，这里省略了

                #首先先显示个 input_panel，输入一下pl名称
                #之后调用done方法，去创建2个文件夹，2个文件      
                self.window.show_input_panel("Input the pl Name:", fname, done, None, None)

最后用的时候：

如果是正常的pl/someProject/，就输入 plname就好了

如果是深一级的项目，如pl/someProject/someChildProject,就输入plname，someProject。把上面那一级也写好。

创建的文件目录为:
	 └─testPl
	   │  index.js
	   │
	   └─ source
	           init.js


[Github](https://github.com/wanglingfei/sublime-text_plugin)

参考文献：

[Sublime Text 2插件开发Tips|GuoJing's Blog](http://guojing.me/tec/2012/11/09/sublime-text-2-plugins-tips/)