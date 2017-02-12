---
layout:     post
title:      WebComponent框架调研
category: techNote
description: Web Component 
tags: WebGL 
---
#各框架组件开发调研

##AmazeUI:

###开发规范

    目录结构：
        {widget}
        |-- package.json
        |-- README.md
        |-- HISTORY.md
        |-- resources
        |   `-- screenshots
        |       |-- 0.jpg
        |       |-- 1.jpg
        |       `-- 2.jpg
        `-- src
            |-- {widget}.hbs
            |-- {widget}.js
            |-- {widget}.less
            |-- {widget}.default.less
            |-- {widget}.[theme1].less
            |-- {widget}.[themen].less
            `-- {widget}.png


开发工具：

    1、开发脚手架构建以上文件。
    2、本地调试：所有css文件，js均打包好。watch change

规范：
    
css、js开发时需要注意命名空间

    如js组件：
    module.exports = $.AMUI.video = {
      VERSION: '0.0.1',
      init: videoInit
    };


##使用方式


1、参数写在标签里。

2、在客户端编译HTML片段：

例：

    HTML：
    <script type="text/x-handlebars-template" id="amz-tpl">
      {{>video video}}
    </script>
    css：依旧是打包好的


    js：
    前置js：jquery+amazui.js+handlebars
    //打包所有组件的hbs文件成js（字符串）。
    <script src="../../dist/js/amazeui.widgets.helper.js"></script>

    //初始化部分     
    <script>
      $(function() {
        //把HTML里的组件配置拿出来，编译。
        var $tpl = $('#amz-tpl'),
          source = $tpl.text(),
          template = Handlebars.compile(source),
          //把各个组件的参数配置写在这里
          data = {
            video:{
              "options":{
                "isAutoPlay": false
              }
            }
          },
          html = template(data);
         //插入节点
        $tpl.before(html);

        //初始化
        $.each(['video'], function(i, m) {
          var module = $.AMUI[m];
          module && module.init && module.init();
        })
      });
    </script>

        如果使用的组件较多或者还有组件以外的自定义模板，建议使用上面的方法，将模板分离出来，便于维护。

3、基本同2 ，直接将组件调用代码传给 Handlebars

    var template = Handlebars.compile('{{>video}}'),
        data = {
          video:{
                "options":{
                    "isAutoPlay": false
                  }
                }
        },
        html = template(data.video);
    $('body').append(html);

##比较：

    优点：相比现有方式，把组件的HTML+CSS进行了管理。
    缺点：组件全部打包，文件大。压缩之后amazeui.min.js为215k，amazeui.widgets.helper为36k。



##React

JSX渲染结构。JS配置。

##Polymer

web Component标准 兼容性差。

##[Cardkit](http://ozjs.org/CardKit/)

 自定义标签,HTML配置组件

##[arkui](https://github.com/douban-f2e/arkui )

Basic UI components for Douban Read 只有样式。


