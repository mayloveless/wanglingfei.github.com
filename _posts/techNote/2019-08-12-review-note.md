---
layout:     post
title:      复习笔记
category: techNote
description: 学习笔记
tags:  学习笔记
---

1、vue or React 列表 中的key作用

不带key时，可以更有效的复用节点，可以不增删节点的情况下只更新数据，对于简单的模板会更快，缺点是可能会出现状态错位；
带key时更新数据一般会增删节点，但更准确，且复杂模板时更快。
key的作用是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。


2、await

是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。
由于因为async await 本身就是promise+generator的语法糖。所以await后面的代码是microtask。

    async function async1() {
        console.log('async1 start');
        await async2();
        console.log('async1 end');
    }
    等价于

    async function async1() {
        console.log('async1 start');
        Promise.resolve(async2()).then(() => {
                    console.log('async1 end');
            })
    }

3、flatten

    function flatten(arr) {
        return arr.reduce((prev, next)=>{
            return prev.concat(Array.isArray(next) ? [...flatten(next)]:next)
        }, [])
    }

4、实现一个new

    function _new(fn, ...arg) {
        const obj = Object.create(fn.prototype);
        const ret = fn.apply(obj, arg);
        return ret instanceof Object ? ret : obj;// 构造函数是可以自己指定返回一个对象的,相当于将结果返回。
    }

| 比较 | new	 | Object.create |
| :-----| ----: | :----: |
| 构造函数 | 保留原构造函数属性 | 丢失原构造函数属性 |
| 原型链 | 原构造函数prototype属性 | 原构造函数/（对象）本身 |
| 作用对象 | function | function和object |

              



