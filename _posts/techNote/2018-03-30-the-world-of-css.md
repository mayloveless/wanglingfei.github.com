---
layout:     post
title:      《CSS世界》笔记
category: techNote
description: 《《CSS世界》笔记
tags: 笔记 
---

**一、流、元素、基本尺寸**

1、display：inline-blcok:外在的“内联盒子”，内在的“块级容器盒子”

2、height/width作用于内在的盒子。

3、margin的背景永远是透明的

4、height规范：如果包含块的高度没有显示指定，即高度由内容决定，并且该元素不是绝对定位，则计算值为auto。
所以子元素100%是无效的，因为会计算成auto*100/100=NaN。
宽度没有此问题，因为：包含块的宽度取决于该元素的宽度，即未定义，由浏览器自定义。

**如何让元素支持height:100%**

    1)设定显示的高度
    2）使用绝对定位
    绝对定位的宽高百分比计算是相对于padding box的，非绝对定位元素则是相对于content box的。

5、min-width/max-width和min-height/maxheight属性间，以及与width和height直接有一套相互覆盖规则，可以超越!important

**二、盒尺寸四大家族**

content box，padding box，border box，margin box

1、替换元素：内容可被替换，内联元素，如img，object，video，iframe，textarea，input等
内容的外观不受页面上的css影响，有自己的尺寸，在很多css属性上有自己的一套表现规则。

固有尺寸=>HTML尺寸（标签上的width、height）=>CSS 尺寸
固有尺寸是无法更改的，但图片可以设定宽高是因为content替换内容默认的适配方式是填充（fill），外部设定的（CSS尺寸、HTML尺寸）多大，就跟着一样大。

img只要没有src属性，就变成了非替换元素，同span。

content：匿名替换元素：无法选中，无法复制，无法被搜索引擎抓取，无法被屏幕阅读设备读取

margin:auto填充规则

    1）如果一侧定值，一侧auto，则auto为剩余空间大小
    2）如果两侧均是auto，则平分剩余空间。

**三、内联元素与流**

1、ex：小写字母X的高度。不受字体和字号的影响的内联元素的垂直居中对齐效果。

2、对于非替换元素的纯内联元素，其可视高度完全由line-height决定。
行距=line-height-font-size
line-height不能影响替换元素，「幽灵空白元素」可以

3、vertical-align支持数值，正值靠上，负值靠下。起作用的前提条件是：只能应用于内联元素（inline，inline-block，inline-table）以及display值为table-cell的元素。
但浮动和绝对定位会让元素块级化
不同大小文字一起显示时，baseline不一致，会基线对齐，一致后的结果是高度超过行高
一个inline-block元素，如果里面没有内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘，否则其基线就是元素里面最后一行内联元素的基线。

**四、流的破坏与保护**

1、clear元素只有块级元素有效，::after等伪元素默认都是内联元素

2、触发BFC

    html根元素
    float的值不为none
    overflow的值为auto，scroll和hidden
    display的值为table-cell，table-caption和inline-block
    position的值不为relative和static

3、position：absolute

普通元素的百分比宽度是相对于父元素的content box宽度计算的，而绝对定位元素的宽度是相对于第一个position不为static的祖先元素计算的。

「包含块」：

    1、根元素被称为「初始包含块」，其尺寸等同于浏览器可视窗口的大小。
    2、对于其他元素，如果该元素的position是relative或者static，则「包含块」由其最近的块容器祖先盒子的content box边界行程。
    3、如果元素position：fixed，则「包含块」是「初始包含块」
    4、如果元素position：absolute，则「包含块」有最近的position不为static的祖先元素建立

4、absolute是非常独立的CSS属性，其样式和行为表现不依赖其他任何CSS属性就可以完成。用于:

    1、字前icon的定位
    2、居中布局元素旁边的元素定位
    3、下拉列表定位
    4、占位符效果模拟

5、如果overflow不是定位元素，同时绝对定位元素和overflow容器之间也没有定位元素，则overflow无法对absolute元素进行剪裁。

6、clip属性

    可访问性的隐藏
    clip: rect(0 0 0 0)

7、绝对定位元素的居中

    .element{
       width:300px;height:300px;
       position:absulue;
       left:0;top:0;right:0;bottom:0;
       margin:auto; 
     }

8、relative最小化原则

    1）尽量不使用relative，如果想定位某些元素，看看能否使用「无依赖的绝对定位」
    2）如果场景首先，则该relative务必最小化


**五、CSS世界的层叠关系**

1、层叠顺序规则

层叠上下文元素的background/border=〉负z-index=〉block=〉float=〉inline=〉z-index:auto/z-index:0=〉正z-index

2、创建层叠上下文

对于position值为relative/absolute以及Firefox/ie下position：fixed声明的定位元素，当其z-index值不是auto的时候，会创建层叠上下文。

css3:

    元素为flex，同时z-index不是auto
    opacity不是1
    transform不是none
    mix-blend-mode不是normal
    filer值不是none
    isolation的值是isolate
    will-change为上面2-6任意一个
    -webkit-overflow-scrolling为touch


**六、文本**

1、font-face

优先选择woff2 or woff

2、svg图标

纯路径，纯矢量，不要有base64内联图形
使用填充而非描边，避免使用一些高级的路径填充覆盖技巧
宽高最好大于200


看完真的觉得解决了我很多问题，真是像没学过CSS一样，特别棒。
以上我只记录了冰山一角，是我当时觉得不得不写下来的，所以目测可以当工具书来用，随手翻来看呢。


