---
layout:     post
title:      FF下表单默认的记忆功能
category: bugNote
description: FF下表单默认的记忆功能
tags: bug笔记
---

问题：

项目中遇到一个很诡异的bug。

FF下，我页面上disabled一个checkbox，刷新页面，使得另一个checkbook disabled了。

也就是说FF把第一个checkbox的行为记录在了第二个身上。

相当诡异，因为无论id，神马的根本不是一个节点，这样都能记住，真心诡异。



解决办法：

    在input里加 autocomplete="on|off"

off就可以不用记住了。textarea也有这个属性

所以说有时候有些功能是双刃剑。