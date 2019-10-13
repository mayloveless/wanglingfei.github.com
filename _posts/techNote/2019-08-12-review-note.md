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

    当代码执行new Foo时，会发生以下事情：
    1. 一个继承自 Foo.prototype 的新对象被创建
    2. 使用指定的参数调用构造函数 Foo,并将this绑定到新创建的对象
    3. 由构造函数返回的对象就是new表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。(一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤)

    function myNew(){
        // 创建一个新对象obj，声明要返回的结果result,取参数的第一项为构造函数fn
        let obj = new Object(),result,fn = [].shift.call(arguments);
        // 将obj.__proto__连接到构造函数fn的原型
        obj.__proto__ = fn.prototype;
        // result接收构造函数执行后的返回结果
        result = arguments.length>0?fn.apply(obj,arguments):fn.apply(obj);
        // 如果构造函数返回一个对象，则将该对象返回，否则返回步骤1创建的对象
        return typeof result === 'object'?result:obj;
     }


| 比较 | new	 | Object.create |
| :-----| ----: | :----: |
| 构造函数 | 保留原构造函数属性 | 丢失原构造函数属性 |
| 原型链 | 原构造函数prototype属性 | 原构造函数/（对象）本身 |
| 作用对象 | function | function和object |

              
5、两数之和
暴力方式：嵌套遍历数据两次，两两相加看看是否等于target，时间复杂度n^2
空间换时间：把数据存到hash表里{数字：下标}，然后用target减去当前遍历的数字，看看存在hash里么？存在即返回下标，不存在就是不对，继续遍历。时间复杂度n

6、只出现一次的数字

    var singleNumber = function(nums) {
        let a = 0
        for (let i = 0; i < nums.length; i++) {
            a^=nums[i] // 异或。相同是0，0和非0是那个非0数字。
        }
        return a
    };

7、整数翻转

	let res = 0;
	while (x > 0) {
		res = res * 10 + x % 10;
		x = ~~(x / 10); // ~~:Math.floor
	}

8、回文数

    把数字倒过来比较。优化点是可以一位再加一位比较，如 12321 ，比较1和1，在让21变12，再和12比较大小。当翻转的数字较大时，也就到一半了，则证明可以结束比较了。

9、操作数组

    不会改变原来数组的有：
        concat()---连接两个或更多的数组，并返回结果。
        every()---检测数组元素的每个元素是否都符合条件。
        some()---检测数组元素中是否有元素符合指定条件。
        filter()---检测数组元素，并返回符合条件所有元素的数组。
        indexOf()---搜索数组中的元素，并返回它所在的位置。
        join()---把数组的所有元素放入一个字符串。
        toString()---把数组转换为字符串，并返回结果。
        lastIndexOf()---返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
        map()---通过指定函数处理数组的每个元素，并返回处理后的数组。
        slice()---选取数组的的一部分，并返回一个新数组。
        valueOf()---返回数组对象的原始值。

    会改变原来数组的有：
        pop()---删除数组的最后一个元素并返回删除的元素。
        push()---向数组的末尾添加一个或更多元素，并返回新的长度。
        shift()---删除并返回数组的第一个元素。
        unshift()---向数组的开头添加一个或更多元素，并返回新的长度。
        reverse()---反转数组的元素顺序。
        sort()---对数组的元素进行排序。
        splice()---用于插入、删除或替换数组的元素。

10、删除排序数组中的重复项

    快指针&&慢指针。快指针遍历，慢指针重复利用数组空间，最后记录一下length即可。

11、二分查找法

    let left = 0; // 左指针
    let right  = nums.length; // 右指针
    while (left < right) { // 相等即退出
        let mid = (left + right) >>> 1; //无符号右移，避免溢出。此处取左中位
        if( nums[mid] < target ){  // target根据具体场景需求
            left = mid + 1; //左边舍去，如果取左中位，则需要左边指针收缩，避免死循环。
        }else{
            right = mid;//右边舍去
        }
    }
    return left;// 左右相等都可以。

 参考：[十分好用的二分查找法模板](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)

 12、ES6 模块与 CommonJS 模块的差异
    
    CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。即ES6 Module只存只读，不能改变其值，具体点就是指针指向不能变，类似const

    import的接口是read-only（只读状态），不能修改其变量值。即不能修改其变量的指针指向，但可以改变变量内部指针指向。
    可以对commonJS对重新赋值（改变指针指向），但是对ES6 Module赋值会编译报错。

    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

13、tcp

    Chrome 最多允许对同一个 Host 建立六个 TCP 连接。
    如果请求头connection是keep-alive可以不断开tcp，减少创建关闭的消耗。
    HTTP/1.1 单个 TCP 连接在同一时刻只能处理一个请求，即：两个请求的生命周期不能重叠，任意两个 HTTP 请求从开始到结束的时间在同一个 TCP 连接里不能重叠。
    HTTP2 提供了 Multiplexing 多路传输特性，多个 HTTP 请求可以在同一个 TCP 连接中并行进行。

14、最大子序和

    动态规划

15、斐波那契数列

    传统是递归方式解，时间复杂度为n^2，可用循环方式解，利用上一次的计算结果
    var climbStairs = function(n) {
    /*  递归解法
        if( n === 1){
            return 1;
        }
        if( n === 2 ){
            return 2;
        }
        return climbStairs(n - 2) + climbStairs(n-1) */
    // 循环解法
        if (n === 1) {
            return 1;
        }
        if (n === 2) {
            return 2;
        }
        let prev = 1;
        let next = 2;
        let res = 0;
        for(var i=2;i<n;i++){
            res = prev + next;// 对应递归解法
            prev = next;
            next = res;
        }
        return res;
    };

16、树的DFS BFS

    深度优先：先往栈中压入右节点，再压左节点，这样出栈就是先左节点后右节点了。
    广度优先：先往队列中插入左节点，再插右节点，这样出队就是先左节点后右节点了

    遍历：当队列or栈不为空时，循环。先出一个节点，这个节点如果左右子节点都是空则到了底部。压左右节点。此时可记录当前节点的值。

17、三数之和

    var threeSum = function(nums) {
        let res = [];
        nums.sort((a,b)=>{
            return a - b;
        });// 排序
        length = nums.length;
        if (nums[0] <= 0 && nums[length - 1] >= 0) { //满足前面小于0，后面大于0；
            for(var i=0;i< length -2; ){
                if (nums[i] > 0) break; // 大于0了，后面就不用看了。
                
                let first = i + 1
                let last = length - 1;
                do {
                    
                    let result = nums[i] + nums[first] + nums[last] //拿出一个数，把后面的最前和最后加一块
                    if (result === 0) { 
                        res.push([nums[i], nums[first], nums[last]]) //正好则push进数组
                    }
                    if (result <= 0) { //小了，不断找到不一样的那个数，接着遍历
                        while (first < last && nums[first] === nums[++first]) { }
                    } else {  //大了，不断找到不一样的那个数，接着遍历
                        while (first < last && nums[last] === nums[--last]) { }
                    }
                } while (first < last)
                while (nums[i] === nums[++i]) { } // 第一个数也是，不断找到不一样的数再判断
            }
        }
        return res;
    };

18、二叉树的中序遍历

    递归法
        var inorderTraversal = function(root) {
            if (!root) { return [] };
            let res = [];
            let _inorder = function (node,res) {
                if (node != null) {
                    if (node.left !== null) { //左
                        _inorder(node.left, res)
                    }
                    res.push(node.val); // 中
                    if (node.right !==null ) { // 右
                        _inorder(node.right, res)
                    }
                }
            }
            _inorder(root, res)
            return res;
        };
    非递归
        var inorderTraversal = function(root) {
            var arr = [], res = [];
            while (true) {
                while (root != null) { //每遍历一个节点，先压所有左节点，直到叶子节点
                    arr.push(root);
                    root = root.left;
                }
                //终止条件：最后树遍历完了自然就结束
                if (arr.length == 0) {
                    break;
                }
                var temp = arr.pop(); // 取该节点值，同时往上了一层
                res.push(temp.val);
                root = temp.right;  // 换右边节点
            }
            return res;
        };

19、	环形链表是否有环
     快慢指针。如果能相遇就是有环。此时如果再继续往前走，又回到这里时就是环的长度。
入口节点：知道了长度，一个指针先走一个环的长度，另一个开始从头，当他们相遇的时候就是长度

20、买卖股票的最佳时机
    单次：记录一下最小值，然后看看每个元素跟最小值的差，是否为最大。
    多次：相邻之间如果是递增的，则累加递增部分。

21、无重复字符的最长子串

        var lengthOfLongestSubstring = function(s) {
            if (!s) { return 0; }
            let max = 0;
            let hash = {};
            for(let left=0,right=0;right<s.length&&left<s.length;){
                if ( !hash[s[right]] ){  
                    hash[s[right]] = 1; //没有的字符放进来
                    right++; //右边指针加一
                        max = Math.max(max, right - left); // 长度就是差值
                }else{
                    hash[s[left]]  = 0; //有了之后，注意，是左边的舍去
                    left++; //左边往前
                }
            }
            return max;
        };
22、删除链表中的节点
    三种case 有next的，用next覆盖；如果是head则直接null；如果不是head，即最后一个node，则倒到最后null掉

23、反转链表
    把当前节点的下一个节点删掉，然后把这个节点的next指向当前节点。

24、删除链表的第N个节点
    快慢指针。快指针先倒n补，如果没倒完，说明是删第一个节点，直接返回head.head
    然后快慢一起走。当倒完了的时候，慢指针下一个就是该删的节点。如何删除见《删除链表中的节点》

25、二叉树的最大深度
    
    //压栈，pop，压左节点，压右节点。记录每个节点深度。
    var maxDepth = function(root) {
        let arr = [];
        let max = 0;
        arr.push({
            node:root,
            depth:1
        });
        while (arr.length) {
            let item = arr.pop();
            if( !item.node){
                continue
            }
            if (!item.node.left && !item.node.right){
                max = max > item.depth ? max : item.depth;
            }
            item.node.left && arr.push({
                node: item.node.left,
                depth: item.depth+1
            })
            item.node.right && arr.push({
                node: item.node.right,
                depth: item.depth+1
            })
        }
        return max
    };

26、最小回文子串：动态规划解法

    先把所有子串的两端下标初始化一个二维数字。单个的肯定是回文，如list[1][1],置为1；
    两个挨着相等的也是，置为1。
    从这个基础上出发，遍历字符串，步长从3开始试探。如果当前字符加上步长，满足中间的是回文，两端字符还相等，那么这个也是回文，置为1.同时记录一下这个位置

27、编辑距离：动态规划解法
   
    D[i][j]=1+min(D[i−1][j],D[i][j−1],D[i−1][j−1]);
    D[i][j] 表示 word1 的前 i 个字母和 word2 的前 j 个字母之间的编辑距离。
    也就是先从最少的字符串开始算起，每增加一下看看需要多少距离，每一步都存储在这个二维数组中，最后一步即为答案。
    初始化条件是当只有比较的一方有字符时，d[i][0] = i or d[j][0] = j
    
28、生成括号：回溯解法
    
    试探，左边括号不够数量时，加左括号试试，右边括号小于左边括号时，加有边括号试试。当字符串长度到达时，记录一下当前字符串，停止递归。

    
29、质数

    function isPrimeNum(num){
        if (!isNum(num)){
            return false;
        }
        if (!isInteger(num)){
            return false;
        }
        for (var i = 2; i <= Math.sqrt(num); i++) {
            if (num%i==0){
                return false;
            }
        };
        return true;
    }
    function isInteger(num){
        return num == ~~num ? true : false;
    }
    function isNum(num){
        return num == +num ? true : false;
    }

30、最大公约数&最小公倍数

    function GCD(a,b){ //最大公约数
        var temp;
        while(b != 0){
            temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    //最小公倍数，是两个数的乘积除以最大公倍数
    function scm(a,b){
        return (a*b)/gcd(a,b);
    }

31、快速排序

     function quickSort(array, start, end) {
        if (end - start < 1) {
            return;
        }
        const target = array[start];
        let l = start;
        let r = end;
        while (l < r) {
            while (l < r && array[r] >= target) {
                r--;
            }
            array[l] = array[r];
            while (l < r && array[l] < target) {
                l++;
            }
            array[r] = array[l];
        }
        array[l] = target;
        quickSort(array, start, l - 1);
        quickSort(array, l + 1, end);
        return array;
    }

32、归并排序

    var mergeSort = function(arr){
        if(arr.length<2){return arr}
        let mid = Math.floor(arr.length/2)
        let front = arr.slice(0,mid)
        let end = arr.slice(mid)
        return merge(mergeSort(front),mergeSort(end))
    }
    var merge = function(l,r){
        var temp = [];
        while(l.length&& r.length){
            if(l[0]<r[0]){
                temp.push(l.shift())
            }else{
                temp.push(r.shift())
            }
        }
        while(l.length){temp.push(l.shift())}
        while(r.length){temp.push(r.shift())}
        return temp;
    }

33、全排列：回溯法套路

    var permute = function(nums) {
        let res = [];// 全局记录
        count([],nums,res);// 空数组开始
        return res;
    }

    var count = function (arr,nums,res) {
        if(arr.length === nums.length){ //递归停止处：如果长度ok了，打印数据
            res.push(arr.slice())
            return
        }
        for (let i = 0; i < nums.length; i++) {// loop 开始
            if (arr.indexOf(nums[i]) !== -1) continue;// 重复数字不管
            arr.push(nums[i]); //存
            count(arr,nums,res);// 递归看看
            arr.pop(); //再出去
        }
    }

34、最小路径和：动态规划

    // 状态转移方程
    var minPathSum = function(grid) {
        var m = grid.length;
        var n = grid[0].length;
        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                if (i + 1 < m && j + 1 < n) {
                    grid[i][j] += Math.min(grid[i + 1][j], grid[i][j + 1]);
                } else if (i + 1 < m) {
                    grid[i][j] += grid[i + 1][j];
                } else if (j + 1 < n) {
                    grid[i][j] += grid[i][j + 1];
                }
            }
        }
        return grid[0][0];
    };

35、作用域

    1、存储变量的规则称为作用域，存在于引擎内部，无法通过js访问。
    2、编译：词法分析，语法分析（生成AST），代码生成
    3、词法作用域：定义在词法阶段的作用域，即变量和块作用域写在哪里决定的。
    4、欺骗词法：
        eval  非严格模式下，可以动态修改当前词法作用域。严格模式下会有自己的词法作用域
        with  根据传递给它的对象 新创建一个词法作用域。严格模式被禁止。
        都无法事先优化
    5、函数作用域：函数的全部变量都可以在整个函数的范围内使用及复用。
        function是函数声明中的第一个词，就是函数声明，否则是函数表达式（立即执行函数）。表达式可以匿名，函数声明不可以
    6、规避冲突：命名空间，模块管理
    7、变量提升：函数声明优先
    8、当函数可以记住并访问所在的词法作用域是，就产生了闭包，即使函数是在当前词法作用域之外执行。
    9、模块特征：为创建内部作用域而调用一个包装函数；包装函数返回值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。

36、this

    1、this是运行时绑定的，它的上下文取决于函数调用方式。无关this的绑定和函数声明的位置（词法作用域）
    2、this绑定规则：默认（独立函数调用），隐形（对象调用），显性（call，apply），new （构造函数是使用new操作符时被调用的普通函数）
    3、new：1、创建一个全新的对象，2、这个新对象会被执行[[Prototype]]连接 3、这个新对象会绑定到函数调用的this 4、如果函数没有返回其他对象，那么new表达式的函数调用会自动返回这个新对象。
    4、优先级
        new调用 ，绑定到新创建的对象
        call or apply 调用，绑定到指定对象
        上下文对象调用，绑定到上下文对象
        默认：严格模式undefined，非严格模式全局对象。
        箭头函数根据当前的词法作用域来决定this：继承外层函数代用的this绑定。和es6之前的self=this机制一样。

37、类

    1、类是一种设计模式 传统的类的继承其实就是复制，多态本质上引用的其实是复制的结果。js的对象机制不会自动执行复制行为。
    2、继承：
        混合复制：把父类复制到一个新对象中，然后子类再覆盖复制。无法真正复制，覆盖父类
        寄生复制：复制一份父类的定义，然后混入子类。
        function Vehicle(){
            this.engines  = 1;
        }
        Vehicle.prototype.drive = function(){}
        function Car(){
            var car = new Vehicle;
            var vehDrtive = cat.drive;
            cat.drive = fuction(){
                vehDrtive.call(this);
                //...
            }
            return car
        }
        vat myCar = new Car();

38、原型

    __proto__和constructor属性是对象所独有的； prototype属性是函数所独有的。但是由于JS中函数也是一种对象，所以函数也拥有__proto__和constructor属性、

    .__proto__ 实现
    Object.defineProperty(Object.prototype,"__proto",{
        get:function(){
            return Object.getPrototypeOf(this)
        },
        set:function(o){
            Object.setPrototypeOf(this,o)
            return o;
        }
    })
    [[Prototype]]机制就是存在于对象内部的一个链接，它会引用其他对象。作用是，如果对象上没有找到需要的属性或者方法引用，[[GET]]操作就会查找对象内部[[Prototype]]关联的对象。
    Object.create(null);会创建一个拥有空[[Prototype]]链接的对象，这个对象无法进行委托。
    polyfill：
         Object.create = function(o){
             function F(){}
             F.protoytpe = o;
             return new F();
         }

39、类型

    Number.MAX_SAFE_INTEGER:2^53-1
    字符串的值不可通过原型上的方法更改
    JSON.stringify在对象遇到undefined function 和symbol和包含循环引用时会自动忽略。
    数字类型强制转换先valueOf再toString，字符串类型反过来
    parseInt先将参数强制类型转换为字符串再解析

40、异步

    事件循环把自身的工作分成一个个任务并顺序执行，不允许对共享内存的【并行】访问和修改。通过分立线程中彼此合作的事件循环，并行和顺序执行可以共存。并行线程的交替执行和异步事件的交替调度，粒度完全不同。

41、生成器

    迭代器是一个对象，它定义一个序列，并在终止时可能返回一个返回值。 更具体地说，迭代器是通过使用 next() 方法实现 Iterator protocol 的任何一个对象，该方法返回具有两个属性的对象： value，这是序列中的 next 值；和 done ，如果已经迭代到序列中的最后一个值，则它为 true 。如果 value 和 done 一起存在，则它是迭代器的返回值。

    生成器是一种返回迭代器的函数，通过function关键字后的星号（*）来表示，函数中会用到新的关键字yield。

42、程序性能

    Webworker 数据传递时，序列化反序列化导致速度损失，并且数据需要被复制，引起双倍的内存使用。可以使用结构化克隆算法避免string的性能损失。或者使用transferable对象，不需要做什么，实现了transferable接口的数据结构自动按照这种方式传输。

43、大数相加

    function bigNumberSum(a, b) {
        // 123456789  000009876
        // padding
        let cur = 0;
        while (cur < a.length || cur < b.length) {
            if (!a[cur]) {
                a = "0" + a;
            } else if (!b[cur]) {
                b = "0" + b;
            }
            cur++;
        }

        let carried = 0;
        const res = [];

        for (let i = a.length - 1; i > -1; i--) {
            const sum = carried + +a[i] + +b[i];
            if (sum > 9) {
                carried = 1;
            } else {
                carried = 0;
            }
            res[i] = sum % 10;
        }
        if (carried === 1) {
            res.unshift(1);
        }
        return res.join("");
    }

44、手写 bind

    //bind 返回的是一个待执行函数，是函数柯里化的应用，而 call/apply 则是立即执行函数
    Function.prototype.myBind = function(ctx, ...args) {
        return (...innerArgs) => this.call(ctx, ...args, ...innerArgs);
    };

45、实现加法

    function twoSum(a, b) {
        if (a === 0) return b;
        if (b === 0) return a;
        const res = a ^ b;// 无进位相加
        return twoSum(res, (a & b) << 1); //结果 加上 进位
    }

46、实现curry

    function currying(fn) {
        const argArr = [];
        let closure = function(...args) {
            if(args.length > 0) {
                argArr = [...argArr, ...args];
                return closure;
            }
            return fn(...argArr);
        }
        return closure;
    }

47、[实现深拷贝](https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js)

    function deepCopy(o) {
        if (typeof o !== "object") return o;
        let n;
        if (Array.isArray(o)) {
            n = new Array(o.length);
            o.forEach((v,i) => (n[i] = deepCopy(v)));
        }

        // reg math function 等其他类型暂时不考虑
        else if (!Array.isArray(o)) {
            n = {};
            Object.keys(o).forEach(key => {
                n[key] = deepCopy(o[key]);
            });
        }
         return n;
    }
    // 循环引用问题，递归爆栈问题，其他数据类型（如果拷贝函数则new Function，参数和方法正则匹配出来）

48、实现继承

    function extend(A, B) {
        function f() {}
        f.prototype = B.prototype;
        A.prototype = new f();
        A.prototype.constructor = A;
    }

    function Dog(color) {
        Animal.apply(this, arguments);
        this.name = 'dog';
    }
    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.constructor = Dog;

49、拍平数组

    function flatten(list) {
        if (list.length === 0) return [];
        const head = list[0];
        if (head instanceof Array) {
            list[0] = flatten(head);
        } else {
            list[0] = [list[0]];
        }
        return list[0].concat(flatten(list.slice(1)));
    }

    function flattenDepth(list, n) {
        if (list.length === 0) return [];
        if (n === 0) return list;
        const head = list[0];
        if (head instanceof Array) {
            list[0] = flattenDepth(head, n - 1);
        } else {
            list[0] = [list[0]];
        }
        return list[0].concat(flattenDepth(list.slice(1), n));
    }

50、用栈实现队列

    function queue(nums) {
        this.stack = nums || [];
        this.helperStack = [];
    }

    queue.prototype.push = function(ele) {
        // push
        // pop
        let cur = null;
        while ((cur = this.stack.pop())) {
            this.helperStack.push(cur);
        }
        this.helperStack.push(ele);

        while ((cur = this.helperStack.pop())) {
            this.stack.push(cur);
        }
    };

    queue.prototype.pop = function() {
        return this.stack.pop();
    };

51、判断是否是完全二叉树

    function isCompleteBinaryTree(root) {
        if (root === null) return root;
        let cur = root;
        const queue = [];

        while (cur !== null) {
            queue.push(cur.left);
            queue.push(cur.right);
            cur = queue.shift();
        }

        return queue.filter(Boolean).length === 0;
    }

52、实现千分位展示

    function moneyFormat(num) {
        // 123456789
        // 123,456,789
        const res = [];
        const decimalIndex = num.indexOf(".");
        const hasDecimal = decimalIndex > -1;

        for (let i = num.length - 1; i > -1; i--) {
            let cur = 1;
            while (hasDecimal && i >= decimalIndex) {
            res.unshift(num[i]);
            i--;
            }
            while (cur <= 3) {
            res.unshift(num[i]);
            cur++;
            i--;
            }
            res.unshift(num[i]);
            res.unshift(",");
        }

        if (res[0] === ",") res.shift();

        return res.join("");
    }

53、实现简化的 promise

    //三种状态pending| fulfilled(resolved) | rejected
    //当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态
    //当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。


    function Promise(func) {
        this.fullfilled = false;
        this.rejected = false;
        this.pending = true;
        this.handlers = [];
        this.errorHandlers = [];
        function resolve(...args) {
            this.handlers.forEach(handler => handler(...args));
        }
        function reject(...args) {
            this.errorHandlers.forEach(handler => handler(...args));
        }
        func.call(this, resolve.bind(this), reject.bind(this));
    }

    Promise.prototype.then = function(func) {
        this.handlers.push(func);
        return this;
    };
    Promise.prototype.catch = function(func) {
        this.errorHandlers.push(func);
        return this;
    };

    Promise.race = promises =>
        new Promise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve, reject);
            });
        });

    Promise.all = promises =>
        new Promise((resolve, reject) => {
            let len = promises.length;
            let res = [];
            promises.forEach((p, i) => {
                p.then(r => {
                    if (len === 1) {
                        resolve(res);
                    } else {
                        res[i] = r;
                    }
                    len--;
                }, reject);
            });
        });

    // 带状态判断版本，then是promise：可以简化一下书写
    const PENDING = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED = "rejected";

    function Promise(excutor) {
        let that = this; // 缓存当前promise实例对象
        that.status = PENDING; // 初始状态
        that.value = undefined; // fulfilled状态时 返回的信息
        that.reason = undefined; // rejected状态时 拒绝的原因
        that.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
        that.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数

        function resolve(value) { // value成功态时接收的终值
            if(value instanceof Promise) {
                return value.then(resolve, reject);
            }
            // 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
            setTimeout(() => {
                // 调用resolve 回调对应onFulfilled函数
                if (that.status === PENDING) {
                    // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
                    that.status = FULFILLED;
                    that.value = value;
                    that.onFulfilledCallbacks.forEach(cb => cb(that.value));
                }
            });
        }
        function reject(reason) { // reason失败态时接收的拒因
            setTimeout(() => {
                // 调用reject 回调对应onRejected函数
                if (that.status === PENDING) {
                    // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
                    that.status = REJECTED;
                    that.reason = reason;
                    that.onRejectedCallbacks.forEach(cb => cb(that.reason));
                }
            });
        }
        // 捕获在excutor执行器中抛出的异常
        // new Promise((resolve, reject) => {
        //     throw new Error('error in excutor')
        // })
        try {
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    Promise.prototype.then = function(onFulfilled, onRejected) {
        const that = this;
        let newPromise;
        // 处理参数默认值 保证参数后续能够继续执行
        onFulfilled =
            typeof onFulfilled === "function" ? onFulfilled : value => value;
        onRejected =
            typeof onRejected === "function" ? onRejected : reason => {
                throw reason;
            };
        if (that.status === FULFILLED) { // 成功态
            return newPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try{
                        let x = onFulfilled(that.value);
                        resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                    } catch(e) {
                        reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                    }
                });
            })
        }

        if (that.status === REJECTED) { // 失败态
            return newPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(that.reason);
                        resolvePromise(newPromise, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            });
        }

        if (that.status === PENDING) { // 等待态
            // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
            return newPromise = new Promise((resolve, reject) => {
                that.onFulfilledCallbacks.push((value) => {
                    try {
                        let x = onFulfilled(value);
                        resolvePromise(newPromise, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
                that.onRejectedCallbacks.push((reason) => {
                    try {
                        let x = onRejected(reason);
                        resolvePromise(newPromise, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            });
        }
    };

    // 可以接受的简化版
    const PENDING = "pending"
    const RESOLVED = "resolved"
    const REJECTED = "rejected"


    class MyPromise {
        constructor(callback) {
            //创建一个state属性,记录当前promise状态
            this.state = PENDING
            //resolve和reject的回调函数

            this.resolveList = []
            this.rejectList = []
            //传入到fn里面的resolve和reject
            const resolve = (arg) => {
                this.state = RESOLVED
                this.value = arg
                this.resolveList.forEach(fn => {
                    this.value = fn(this.value)
                })
            }
            const reject = (arg) => {
                this.state = REJECTED
                this.value = arg
                this.rejectList.forEach(fn => fn(this.value))
            }
            //传入上面两个函数,执行fn,捕获错误
            try {
                callback(resolve, reject)
            } catch (error) {
                reject(error)
            }
        }
        //than 方法为那两个待处理数组添加函数
        then(callback1, callback2) {
            this.rejectList.push(callback2)
            return new Promise((resolve, reject) => {
                this.resolveList.push(callback1)
                this.value =
                    this.resolveList.push(resolve)
            })
        }
    }

54、函数节流

    function throttle(fn, threshhold) {
        var last, timerId;
        threshhold || (threshhold = 250);
        return function() {
            var now = Date.now();
            if(last && now - last < threshhold) {
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    fn.apply(this, arguments);
                }, threshhold)
            } else {
                last = now;
                fn.apply(this, arguments);
            }
        }
    }


55、函数防抖

    const debounce = (fn, delay) => {
        let timer = null;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    };

56、数组去重

    function uniqueArray(list) {
        list.sort();
        // 和leetcode26题一摸一样
        const size = list.length;
        let slowP = 0;
        for (let fastP = 0; fastP < size; fastP++) {
            if (list[fastP] !== list[slowP]) {
            slowP++;
            list[slowP] = list[fastP];
            }
        }
        return list.slice(0, slowP + 1);
    }

57、实现Event(event bus)

    export function EventBus() {
        this.eventMap = {};
    }
    EventBus.prototype.on = function (eventName, callback) {

        if (this.eventMap[eventName] === undefined) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(callback);
    }

    EventBus.prototype.emit = function (eventName, ...args) {
        let callbacks = this.eventMap[eventName];
        if (callbacks) {
            callbacks.forEach((callback) => {
                Promise.resolve().then(() => {
                    callback.apply(null, args);
                })
            })
        }

    }

58、实现call

    Function.prototype.call = function(cxt, ...args) {
        ctx || (ctx = window);
        ctx.fn = this;//把调用者存下来
        let args = [];
        let r = eval(`ctx.fn(${args})`);//执行，this就指向了cxt
        delete ctx.fn;
        return r;
    }

59、实现apply

    Funtion.prototype.apply = function(ctx, args) {
        ctx || (ctx = window);
        ctx.fn = this;
        let r = eval(`ctx.fn(${args})`)
        delete ctx.fn;
        return r;
  }

60、JS判断两个对象内容是否相等

    function isObjectValueEqual(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i]

            var propA = a[propName]
            var propB = b[propName]
            if ((typeof (propA) === 'object')) {
            if (this.isObjectValueEqual(propA, propB)) {
                return true
                } else {
                return false
                }
            } else if (propA !== propB) {
            return false
            } else { }
        }
        return true
    }

61、手写parseInt

62、for...in 与 for...of 的区别

    for...in循环的是key。for...of循环的是value。作用于数组的for-in循环除了遍历数组元素以外,还会遍历自定义属性。

63、iframe缺点是什么？

    iframe会阻塞主页面的onload事件；
    iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。，会产生很多页面，不容易管理。
    iframe框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。
    代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理iframe中的内容，所以使用iframe会不利于搜索引擎优化（SEO）。
    很多的移动设备无法完全显示框架，设备兼容性差。
    iframe框架页面会增加服务器的http请求，对于大型网站是不可取的。

64、实现一个instanceOf

    function instanceOf(left,right) {
        let proto = left.__proto__;
        let prototype = right.prototype
        while(true) {
            if(proto === null) return false
            if(proto === prototype) return true
            proto = proto.__proto__;
        }
    }


65、手写一个模版引擎

    function render(tpl, data) {
        return tpl.replace(/\{\{(.+?)\}\}/g, function($1, $2) {
            // $1 分组为 类似 {{name}}
            // $2 分组为 类似 name
            // 加上面的小括号就是为了方便拿到key而已
            return data[$2];
        });
    }

66、实现一个简单的async/await

    // 定义了一个promise，用来模拟异步请求，作用是传入参数++
    function getNum(num){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(num+1)
            }, 1000)
        })
    }

    //自动执行器，如果一个Generator函数没有执行完，则递归调用
    function asyncFun(func){
        var gen = func();

        function next(data){
            var result = gen.next(data);
            if (result.done) return result.value;
            result.value.then(function(data){
            next(data);
            });
        }

        next();
    }

    // 所需要执行的Generator函数，内部的数据在执行完成一步的promise之后，再调用下一步
    var func = function* (){
        var f1 = yield getNum(1);
        var f2 = yield getNum(f1);
        console.log(f2) ;
    };
    asyncFun(func);

67、设计模式

    1、工厂模式 应用场景：JQuery中的$、Vue.component异步组件、React.createElement等
    2、单例模式 应用场景：JQuery中的$、Vuex中的Store、Redux中的Store等
    3、适配器模式 应用场景：Vue的computed、旧的JSON格式转换成新的格式等
    4、装饰器模式 应用场景：ES7装饰器、Vuex中1.0版本混入Vue时，重写init方法、Vue中数组变异方法实现等
    5、代理模式 应用场景：ES6 Proxy、Vuex中对于getters访问、图片预加载等
    6、外观模式 应用场景：JS事件不同浏览器兼容处理、同一方法可以传入不同参数兼容处理等
    7、观察者模式 应用场景：JS事件、JS Promise、JQuery.$CallBack、Vue watch、NodeJS自定义事件，文件流等
        观察者模式与发布/订阅模式区别: 本质上的区别是调度的地方不同。虽然两种模式都存在订阅者和发布者（具体观察者可认为是订阅者、具体目标可认为是发布者），但是观察者模式是由具体目标调度的，而发布/订阅模式是统一由调度中心调的，所以观察者模式的订阅者与发布者之间是存在依赖的，而发布/订阅模式则不会。
    8、迭代器模式 应用场景：内部： JQuery.each方法；外部：应用场景：JS Iterator、JS Generator
    9、状态模式 应用场景：灯泡状态、红绿灯切换等

68、[正则表达式](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)

    邮箱 /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    手机号 /^((\+|00)86)?1[3-9]\d{9}$/
    url  /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    正则表达式的匹配原理和性能优化：[有限状态机](https://sine-x.com/regexp-1/),减少回溯。

69、ES6 class与ES5 function区别及联系

    class Foode Foo()调用必须通过new，不能Foo.call()
    function Foo是提升的，class Foo不是。在实例化一个class之前必须先声明
    全局作用域中的class Foo创建了这个作用域的一个词法标识符Foo，但是和function Foo不一样，并没有创建一个同名的全局对象属性，只创建了一个同名的构造器函数。

70、fetch

    1）fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
    2）fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
    3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
    4）fetch没有办法原生监测请求的进度，而XHR可以

71、浏览器缓存

    缓存位置：
    Service Worker
    Memory Cache
    Disk Cache
    Push Cache

    缓存策略：强缓存和协商缓存，都是通过设置 HTTP Header 来实现的。

    强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。
    1.Expires 缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点，需要和Last-modified结合使用。是 HTTP/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效
    2.Cache-Control 优先级高于Expires

    协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。
    1.Last-Modified和If-Modified-Since 地打开缓存文件，会造成 Last-Modified 被修改，只能以秒计时
    2.ETag和If-None-Match Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成。性能上，Etag要逊于Last-Modified

    强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存。

    打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。
    普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。
    强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control: no-cache(为了兼容，还带了 Pragma: no-cache),服务器直接返回 200 和最新内容

72、重排&重绘

    如何触发重排和重绘？
        任何改变用来构建渲染树的信息都会导致一次重排或重绘：
        添加、删除、更新DOM节点
        通过display: none隐藏一个DOM节点-触发重排和重绘
        通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
        移动或者给页面中的DOM节点添加动画
        添加一个样式表，调整样式属性
        用户行为，例如调整窗口大小，改变字号，或者滚动。
    如何避免重绘或者重排？
        集中改变样式
        使用DocumentFragment
        提升为合成层： will-change 属性

73、浏览器

    最新的 Chrome 浏览器包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程。

    浏览器进程：主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
    渲染进程：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。
    Chrome 默认采用每个标签对应一个渲染进程，但是如果两个页面属于同一站点，那这两个标签会使用同一个渲染进程。

    渲染流程：
        渲染进程将 HTML 内容转换为能够读懂的DOM 树结构。
        渲染引擎将 CSS 样式表转化为浏览器可以理解的styleSheets，计算出 DOM 节点的样式。
        创建布局树(忽略不可见元素)，并计算元素的布局信息。
        对布局树进行分层，并生成分层树
            1、拥有层叠上下文属性的元素会被提升为单独的一层。
            2、需要剪裁（clip）的地方也会被创建为图层。
        为每个图层生成绘制列表，并将其提交到合成线程。
        合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
        合成线程发送绘制图块命令DrawQuad给浏览器进程。
        浏览器进程根据 DrawQuad 消息 生成页面，并显示到显示器上

    JavaScript 文件的下载过程会阻塞 DOM 解析。样式文件又会阻塞 JavaScript 的执行
    CSSOM 提供给 JavaScript 操作样式表的能力，第二个是为布局树的合成提供基础的样式信息。
    白屏时间过长解决办法：
        1、通过内联 JavaScript、内联 CSS 来移除这两种类型的文件下载，这样获取到 HTML 文件之后就可以直接开始渲染流程了。
        2、但并不是所有的场合都适合内联，那么还可以尽量减少文件大小，比如通过 webpack 等工具移除一些不必要的注释，并压缩 JavaScript 文件。
        3、还可以将一些不需要在解析 HTML 阶段使用的 JavaScript 标记上 sync 或者 defer。 async 和 defer 都是异步的，使用 async 标志的脚本文件一旦加载完成，会立即执行（用于不关心页面中的DOM元素）；而使用了 defer 标记的脚本文件，需要在文档渲染完毕后 DOMContentLoaded 事件之前执行。
        4、对于大的 CSS 文件，可以通过媒体查询属性，将其拆分为多个不同用途的 CSS 文件，这样只有在特定的场景下才会加载特定的 CSS 文件。

    页面优化：
        在加载阶段，核心的优化原则是：优化关键资源的加载速度，减少关键资源的个数，降低关键资源的 RTT 次数。
        在交互阶段，核心的优化原则是：尽量减少一帧的生成时间。可以通过减少单次 JavaScript 的执行时间、避免强制同步布局、避免布局抖动、尽量采用 CSS 的合成动画、避免频繁的垃圾回收等方式来减少一帧生成的时长。

74、V8垃圾回收

    新生代内存空间用来存放存活时间较短的对象，老生代内存空间用来存放存活时间较长的对象。
    新生代内存中的垃圾回收：将内存空间一分为二， 一个处于使用，一个处于闲置。处于使用中的 叫作 From，处于闲置中叫作 To。
    在垃圾回收运行时时，会检查 From 中的对象，当某个对象需要被回收时，将其留在 From 空间，剩下的对象移动到 To 空间，然后进行反转，将 From 空间和 To 空间互换。进行垃圾回收时，会将 To 空间的内存进行释放
    新生代中的对象可以晋升到老生代中，具体有两种方式：
    在垃圾回收的过程中，如果发现某个对象之前被清理过，那么会将其晋升到老生代内存空间中
    在 From 空间和 To 空间进行反转的过程中，如果 To 空间中的使用量已经超过了 25%，那么就将 From 中的对象直接晋升到老生代内存空间中
    老生代内存空间中的垃圾回收有标记清除（Mark Sweep）和标记合并（Mark Compact）两种方式。
    Mark Sweep 是将需要被回收的对象进行标记，在垃圾回收运行时直接释放相应的地址空间
    Mark Compact 的思想有点像新生代垃圾回收时采取的 Cheney 算法：将存活的对象移动到一边，将需要被回收的对象移动到另一边，然后对需要被回收的对象区域进行整体的垃圾回收。

75、构建工具webpack

    1、webpack与grunt、gulp的不同？Grunt、Gulp是基于任务运行的工具;Webpack是基于模块化打包的工具.

    2、bundle，chunk，module是什么
    bundle：是由webpack打包出来的文件
    chunk：代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
    module：是开发中的单个模块，在webpack的世界，一切皆模块，一个模块对应一个文件，webpack会从配置的entry中递归开始找出所有依赖的模块

    3、tree-shaking:无法优化带有副作用的代码。
    副作用这个概念来源于函数式编程(FP)，纯函数是没有副作用的，也不依赖外界环境或者改变外界环境。纯函数的概念是：接受相同的输入，任何情况下输出都是一样的。
    非纯函数存在副作用，副作用就是：相同的输入，输出不一定相同。或者这个函数会影响到外部变量、外部环境。
    函数如果调用了全局对象或者改变函数外部变量，则说明这个函数有副作用。

    4、Tapable 是一个类似于 Node.js 的 EventEmitter 的库, 主要是控制钩子函数的发布 与订阅,控制着 webpack 的插件系统。Tapable库暴露了很多 Hook（钩子）类，为插件提供挂载的钩子。

    5、构建流程是什么?
    Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

    初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
    开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
    确定入口：根据配置中的 entry 找出所有的入口文件；
    编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
    完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
    输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
    输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
    在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果

    6、[热更新原理](https://zhuanlan.zhihu.com/p/30669007)
    webpack 监听文件变化，websocket(据我观察室EventSource ，它是 HTML5 中 Server-sent Events的技术实现 )给浏览器传递新模块的hash值，浏览器端用hash请求代码，更新代码or刷新浏览器。

    7、如何用webpack来优化前端性能？
    压缩代码，换CDN，tree-shaking，Code Splitting，提取公共第三方库
    
    8、构建速度和体积优化：
        分析速度，包的大小；升级版本；开多进程多实例编译压缩；分包dll（先编译lib代码，生成map，再引入map）；压缩等缓存；减少文件搜索范围；减小构建目标；
        tree-sharking删除冗余代码；图片压缩（转为8位的png图片）；动态polyfill
    
   
76、bable

    babel 的转译过程也分为三个阶段

    解析 Parse: 将代码解析生成抽象语法树( 即AST )，即词法分析与语法分析的过程
    转换 Transform: 对于 AST 进行变换一系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进行遍历，在此过程中进行添加、更新及移除等操作
    生成 Generate: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是 babel-generator

    转换器操作 AST 一般都是使用访问器模式，由这个访问者(Visitor)来 ① 进行统一的遍历操作，② 提供节点的操作方法，③ 响应式维护节点之间的关系；而插件(设计模式中称为‘具体访问者’)只需要定义自己感兴趣的节点类型，当访问者访问到对应节点时，就调用插件的访问(visit)方法。

77、框架

    vue：

    1、双向绑定实现原理 ：
        利用Proxy或Object.defineProperty生成的Observer针对对象/对象的属性进行"劫持",在属性发生变化后通知订阅者
        解析器Compile解析模板中的Directive(指令)，收集指令所依赖的方法和数据,等待数据变化然后进行渲染
        Watcher属于Observer和Compile桥梁,它将接收到的Observer产生的数据变化,并根据Compile提供的指令进行视图渲染,使得数据变化促使视图变化
        
        Object.defineProperty问题
        无法监听数组变化，vue针对数组几个方法进行了hack可以监听，但直接赋值是不行的。只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历
        Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty。

        优势：需显示调用，可精确得知变化数据无须diff
        
        大体来说，我理解Observer负责监听get，set，Dep作为发布订阅模块；谁想监听变化谁实例化一个Watcher，Watcher注册回调事件，回调事件的内容由Compile提供。
        Compile就是解析模板里的命令，然后实例化Wathcer，给wathcer的回调还是操作dom，但一般要在fragment里操作。

    2、template转化为dom的机制
        在$mount过程中，如果是独立构建构建，则会在此过程中将template编译成render function。过程是：将模板template进行parse得到一个AST语法树，再通过optimize做一些优化，最后通过generate得到render以及staticRenderFns。render的返回值是VNode。在_update的时候，经过patch与之前的VNode节点进行比较，得出差异后将这些差异渲染到真实的DOM上。
    3、组件通信
        props / $emit
        $children / $parent —— 父组件中用 this.$children 获取到子组件实例数组，子组件中可以使用 this.$parent 获取父组件实例对象。
        provide / inject —— 父组件通过 provide 属性来提供变量，然后在子组件中用 inject 来注入变量。
        ref / $refs —— ref 在普通 DOM 元素上使用，引用的就是 DOM 元素；如果在子组件上，引用的是组件实例
        $attrs / $listeners —— 可以进行跨级的组件通信
        eventBus
    4、nextTick
         Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和MutationObserver，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。
         就是说Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新，这也是一个“批处理”的过程。
         如果想在 Vue 完成更新 DOM之后做操作 ，可以在数据变化之后立即使用Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。相当于手动触发下一个事件循环，不必等有变量变化什么的再触发。
    5、watch和computed区别
        computed：常用于比较消耗性能的计算场景，具有缓存性，getter执行后会被缓存，只有它依赖的属性值变化后，下一次获取的computed值才会重新计算
        watch：常用于某些数据的监听，观察props、 $emit或本组件值的变化来执行回调进行后续操作，无缓存性，页面重新渲染时值不变化也会执行。
    6、vuex
        mutation 都是同步事务，action可以异步。一个 Action 里面可以触发多个 mutation。所以 Vuex 的Action 类似于一个灵活好用的中间件。Vuex 引入了 Module 的概念，每个 Module 有自己的 state、mutation、action、getter，其实就是把一个大的 Store 拆开。

    react：

    1、react核心思想：
        内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟DOM，得到一颗新树，然后diff新老虚拟DOM树，找到有变化的部分，得到一个change(patch)，将这个patch加入队列，最终批量更新这些path到DOM中。 简单说就是： diff + patch 。
        调度阶段 （Reconciler）:React 会自顶向下通过递归, 用新数据生成一颗新树，遍历虚拟dom，diff新老virtual dom树，搜集具体的UI差异，找到需要更新的元素(Patch)，放到更新队列中。
        渲染阶段（Renderer）: 遍历更新队列，通过调用宿主环境的API，实际更新渲染对应元素。宿主环境，比如 DOM、Native、WebGL 等。

    2、SetState的原理 
        setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
        setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
        setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。
    3、渲染属性（Render Props）&& 高阶组件 && mixin
        Mixin和HOC的问题：
            ES6 class。其不支持 mixins。
            不够直接。minxins 改变了 state，因此也就很难知道一些 state 是从哪里来的，尤其是当不止存在一个 mixins 时。同理HOC
            名字冲突。
        Render Props > HOCs：属性是函数
    4、hooks
        React Hooks 要解决的问题是状态共享，称为状态逻辑复用会更恰当，因为只共享数据处理逻辑，不会共享数据本身。
        是一些可重用的函数,如 React 里面 state， lifecycle 和 context 这些内部构建块。代码更加 FP
        Hooks的使用有两个原则：
            不要在循环，条件判断，函数嵌套中使用hooks。因为hook是基于数组（链表）memoizedState 实现的，是按 hook定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到。
            只能在函数组件中使用hooks
        
    5、fiber(https://libin1991.github.io/2019/07/01/%E7%90%86%E8%A7%A3-React-Fiber-%E6%9E%B6%E6%9E%84/)
        问题：在协调阶段阶段，由于是采用的递归的遍历方式，这种也被成为 Stack Reconciler ，主要是为了区别 Fiber Reconciler 取的一个名字。这种方式有一个特点： 一旦任务开始进行，就无法中断 ，那么 js 将一直占用主线程， 一直要等到整棵 Virtual DOM 树计算完成之后，才能把执行权交给渲染引擎，那么这就会导致一些用户交互、动画等任务无法立即得到处理，就会有卡顿，非常的影响用户体验 。

        解决：把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务；如果没有，挂起当前任务，将时间控制权交给主线程，等主线程不忙的时候在继续执行。 这种策略叫做 Cooperative Scheduling（合作式调度），操作系统常用任务调度策略之一。Fiber就是重新实现的堆栈帧，本质上Fiber也可以理解为是一个虚拟的堆栈帧，将可中断的任务拆分成多个子任务，通过按照优先级来自由调度子任务，分段更新，从而将之前的同步渲染改为异步渲染。

        Fiber的工作：
            增量渲染，把一个渲染任务拆分成多个子任务，平均到多个渲染帧中执行，每次只做一小段，做完后就把时间控制权上交给主线程
            在渲染更新时，能够暂停，复用任务
            不同类型的任务具有不同的优先级
            并发方面的其他能力
            错误边界
        
        实现：时间分片 + 链表结构 。

        Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程。如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。在构造 Fiber 树的过程中，Fiber Reconciler 会将需要更新的节点信息保存在Effect List当中，在阶段二执行的时候，会批量更新相应的节点。
        也就是说计算是空闲时间计算，DOM批量更新还是一次执行的。
   
    通用：
    router
        1、基于 Hash —— 兼容性更好，但存在 '#' 不够美观，点击跳转或浏览器历史跳转：触发 hashchange 事件 -> 解析 url ->  匹配到对应的路由规则，手动刷新： 触发 load 事件 -> ...
        2、基于 History API —— HTML5 新路由方案，更加方便可读，兼容性较差
            浏览器动作，如前进后退：触发 popstate 事件 -> 解析 url ->  匹配到对应的路由规则
            点击跳转：调用 pushState 函数向浏览器历史添加一个状态 -> ...
            刷新页面或输入 URL：会向服务器请求，所以使用 history 需要后端配合重定向 -> .

    虚拟DOM，DOM diff算法

        比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗：
        innerHTML:  render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
        Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)
        Virtual DOM：它保证了 1）不管你的数据变化多少，每次重绘的性能都可以接受；2) 你依然可以用类似 innerHTML 的思路去写你的应用。

        脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
        依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)
        脏检查运用到很多地方，angular早期的脏检查被诟病是因为检查范围太大。
        创建 ViewModel / scope 实例（vue angular）比起 Virtual DOM （react）来说要昂贵很多。React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。
     
        Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求：
        初始渲染：Virtual DOM > 脏检查 >= 依赖收集
        小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
        大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

        Virtual DOM 真正的价值从来都不是性能，而是它 1) 为函数式的 UI 编程方式打开了大门；2) 可以渲染到 DOM 以外的 backend比如 ReactNative。

    [网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713/answer/53544875)


        在处理完 VNode 的自身属性后，会对子结点进行 diff 计算；为了提高这个计算的性能，我们在框架中强制要求每个子 VNode 都必须有一个属性 key，字符串类型，并且每个 key 互不相同。我们需要使用 key 来构建索引，加速子 VNode 的匹配过程。

        子结点 diff 的过程大概是这样的：
            首先，先将当前子 VNode 按属性 key 为键、VNode 为值，构建成一个 Map；
            这里就是为什么 key 一定要互不相同的原因。如果 key 有冲突，那么这个 Map 就无法构建了。
            遍历所有新的子 VNode；
            使用新子 VNode 的 key，找到在 Map 中的当前子 VNode；
            将两者做 diff；
            实际上是递归整个 diff 算法。没找到对应 VNode 就是新增结点，找到了就是更新结点。
            将此 VNode 的 key 从 Map 中移除；
            最后，把 Map 中剩余的 VNode 全部卸载
        
        diff 算法
            两个树的完全的 diff 算法是一个时间复杂度为 O(n^3) 的问题。但是在前端当中，你很少会跨越层级地移动DOM元素。所以 Virtual DOM 只会对同一个层级的元素进行对比。
            没有新的节点，则什么都不用做
            新的节点的 tagName 和 key 和旧的不同，直接替换节点
            新的节点的 tagName 和 key（可能没有）和旧的相同，则判断属性是否变更，并继续遍历子树
                判断属性是否变更
                遍历旧的属性列表，查看每个属性是否还存在于新的属性列表中
                遍历新的属性列表，判断都存在的属性值是否有变化（同时查看是否出现新的属性）

            在实际的代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记，在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。
    
78、property和attribute的区别理解

    创建
        DOM对象初始化时会创建默认的基本property；
        只有在HTML标签中定义的attribute才会被保存在property的attributes属性中；
        attribute会初始化property中的同名属性，但自定义的attribute不会出现在property中；
        attribute的值都是字符串；
    数据绑定
        attributes的数据会同步到property上，然而property的更改不会改变attribute；
        对于value，class这样的属性/特性，数据绑定的方向是单向的，attribute->property；
        对于id而言，数据绑定是双向的，attribute<=>property；
        对于href而言，二者是双向绑定的，property中的href永远保存绝对路径，而attribute中的href则是保存相对路径。
        对于disabled而言，改变attributes中的disabled不会改变更改property，也不会取消输入栏的禁用效果。当property上的disabled为false时，attribute上的disabled必定会不存在，此时数据绑定可以认为是双向的；
    使用
        可以使用DOM的setAttribute方法来同时更改attribute和property；
        更改property和attribute上的任意值，都会将更新反映到HTML页面中；
        直接访问attributes上的值会得到一个Attr对象，而通过getAttribute方法访问则会直接得到attribute的值；
        大多数情况（除非有浏览器兼容性问题），jQuery.attr是通过setAttribute实现，而jQuery.prop则会直接访问DOM对象的property；
    关键的两句话：
        attribute（特性），是我们赋予某个事物的特质或对象。
        property（属性），是早已存在的不需要外界赋予的特质。

79、浏览器每一帧都需要完成哪些工作？

    处理用户的交互
    JS 解析执行
    帧开始。窗口尺寸变更，页面滚去等的处理
    requestAnimationFrame(rAF)
    布局
    绘制

    时间有富余，此时就会执行 requestIdleCallback 里注册的任务，是调度在空闲期间调用的低优先级函数
    requestAnimationFrame 每一帧必定会执行，是调度在下一个动画帧上调用的高优先级函数。

80、性能优化

    DNS 预解析 <link rel="dns-prefetch" href="//host_name_to_prefetch.com" />
    预加载 <link rel="preload" href="http://example.com" />
    预渲染 <link rel="prerender" href="http://example.com" />

    优化渲染过程
        代码层面的优化（参考浏览器篇如何减少重绘和回流）
        懒执行 —— 将某些逻辑放到使用时再进行，可以通过定时器或事件进行唤醒
        懒加载 —— 将不关键的资源延后加载，如图片、视频资源等。
    图片优化：
        小图片用 base64 格式
        雪碧图
    其他文件优化：
        CSS 文件放在 head 中
        服务端开启文件压缩功能
        将 script 标签放在 body 底部，因为 JS 文件执行会阻塞渲染。
        script 文件异步加载
        defer：在 script 标签上加上 defer 属性，defer 是在 HTML 解析完之后才会执行，如果是多个，按照加载的顺序依次执行
        async：在 script 标签上加上 async 属性，async 是在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关
        对于需要很多时间计算的代码可以考虑使用 Webworker，Webworker 可以让我们另开一个线程执行脚本而不影响渲染。
        使用CDN
    使用 Webpack 优化项目：
        对于 Webpack4，打包项目使用 production 模式，这样会自动开启代码压缩
        开启 tree shaking，移除没有用的代码
        优化图片，对于小图可以使用 base64 的方式写入文件中
        按照路由拆分代码，实现按需加载
        给打包出来的文件名添加哈希，实现浏览器缓存文件
    错误监控：
        即时运行错误
            try...catch
            window.onerror
        资源加载错误
            object.onerror
            高级浏览器下的 performance.getEntries() 可以获取已经加载完成的资源进而监控加载失败的资源
        跨域的 js 运行错误 —— 在 script 标签增加 crossorigin 属性，然后设置 js 资源响应头 Access-Control-Allow-Origin
        打包时生成 sourceMap 文件便于 debug
        错误上报：
            采用 Ajax 通信的方式上报
            通过 img 标签的 src 发起一个请求。

    https://github.com/azl397985856/automate-everything/blob/master/docs/chapter4.md

81、小程序

    提前新建 Web View，准备新页面渲染
    View 层和逻辑层分离，通过数据驱动，不直接操作 DOM，jsbridde通信
    使用 Virtual DOM，进行局部更新
    全部使用 https，确保传输过程中安全
    前端组件化开发
    加入 rpx 单位，隔离设备尺寸，方便开发

82、WebViewJavascriptBridge

    JS 端加入 src 为 https://__bridge_loaded__ 的 iframe
    Native 端检测到 Request，检测如果是 __bridge_loaded__ 则通过当前的 WebView 组件注入 WebViewJavascriptBridge_JS 代码
    注入代码成功之后会加入一个 messagingIframe，其 src 为 https://__wvjb_queue_message__
    之后不论是 Native 端还是 JS 端都可以通过 registerHandler 方法注册一个两端约定好的 HandlerName 的处理，也都可以通过 callHandler 方法通过约定好的 HandlerName 调用另一端的处理（两端处理消息的实现逻辑对称）

83、HTML&&CSS

    BFC（块状格式化上下文）
        是一个独立的容器，里面的元素和外面的元素互不影响；
        BFC垂直方向的边距会发生重叠；
        BFC 区域不会与浮动元素区域重叠；
        计算 BFC 高度时，浮动元素也参与计算。
        创建方式：
            float 值不为 none;
            position 的值不为 static 或 relative;
            display 为 inline-box, table, table-cell 等；
            overflow 不为 visible
        作用：
            清除浮动
            防止同一 BFC 容器中的相邻元素间的外边距重叠问题

    分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。
        结构上：display:none 会从渲染树中消失，元素不占据空间且无法点击；visibility: hidden 不会从渲染树中消失，元素继续占据空间但无法点击；opacity: 0 不会从渲染树消失，元素占据空间且可点击。
        继承性：display: none 和 opacity: 0 是非继承属性；父元素设置了 display:none 或 opacity: 0，子元素无论怎么设置都无法显示；visibility: hidden 会被子元素继承，并且子元素可以通过设置设置 visibility: visible; 来取消隐藏。
        性能：display: none 会引起重排，性能消耗较大；visibility: hidden 会引起重绘，性能消耗相对较小； opacity: 0 会重建图层，性能较高

    ink与@import的区别
        link是 HTML 方式， @import是 CSS 方式
        link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC
        link可以通过rel="alternate stylesheet"指定候选样式
        浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式
        @import必须在样式规则之前，可以在 css 文件中引用其他文件
        总体来说：link 优于@import
    
    display: block;和display: inline;的区别
        block元素特点：
        1.处于常规流中时，如果width没有设置，会自动填充满父容器 
        2.可以应用margin/padding 
        3.在没有设置高度的情况下会扩展高度以包含常规流中的子元素 
        4.处于常规流中时布局时在前后元素位置之间（独占一个水平空间） 
        5.忽略vertical-align

        inline元素特点
        1.水平方向上根据direction依次布局
        2.不会在元素前后进行换行
        3.受white-space控制
        4.margin/padding在竖直方向上无效，水平方向上有效
        5.width/height属性对非替换行内元素无效，宽度由元素内容决定
        6.非替换行内元素的行框高由line-height确定，替换行内元素的行框高由height,margin,padding,border决定
        7.浮动或绝对定位时会转换为block
        8.vertical-align属性生效

    line-height
        对于非替换元素的纯内联元素，其可视高度完全由line-height决定。 行距=line-height-font-size line-height不能影响替换元素，「幽灵空白元素」可以

    vertical-align
        支持数值，正值靠上，负值靠下。起作用的前提条件是：只能应用于内联元素（inline，inline-block，inline-table）以及display值为table-cell的元素。 但浮动和绝对定位会让元素块级化 不同大小文字一起显示时，baseline不一致，会基线对齐，一致后的结果是高度超过行高 一个inline-block元素，如果里面没有内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘，否则其基线就是元素里面最后一行内联元素的基线。

    层叠顺序
        规则：层叠上下文元素的background/border=〉负z-index=〉block=〉float=〉inline=〉z-index:auto/z-index:0=〉正z-index
        创建： 对于position值为relative/absolute以及Firefox/ie下position：fixed声明的定位元素，当其z-index值不是auto的时候，会创建层叠上下文。css3一些属性。

    水平垂直居中的方案
        flex方案，absolute四个值为0，absolute50% margin负值，absolute50% translate -50%
     
    圣杯
        <div class="main clearfix">
            <div class="content">content</div>
            <aside class="sidebar-left">left</aside>
            <aside class="sidebar-right">right</aside>
        </div>
        .main {
            padding: 0 200px 0 150px;
        }
        .content,
        .sidebar-left,
        .sidebar-right {
            float: left;
            position: relative;
            height: 400px;
            line-height: 400px;
        }

        .content {
            width: 100%;
            background-color: #f5c531;
        }

        .sidebar-left {
            width: 150px;
            background-color: #a0c263;
            margin-left: -100%;
            left: -150px;
        }

        .sidebar-right {
            background-color: #a0c263;
            width: 200px;
            margin-right: -200px;
            /*margin-left: -200px;*/
            /*right: -200px;*/
        }

    双飞翼

    <div class="main clearfix">
        <div class="content-wrapper">
            <div class="content">content</div>
        </div>
        <aside class="sidebar-left">left</aside>
        <aside class="sidebar-right">right</aside>
    </div>

    body {
        color: #fff;
        font-size: 40px;
        font-family: Arial;
        background-color: #666;
        text-align: center;
    }

    .sidebar-left,
    .sidebar-right {
        float: left;
        height: 400px;
        line-height: 400px;
    }

    .content-wrapper {
        width: 100%;
        float: left;
    }

    .content {
        margin: 0 200px 0 150px;
        background-color: #f5c531;
        height: 400px;
        line-height: 400px;
    }

    .sidebar-left {
        width: 150px;
        background-color: #a0c263;
        margin-left: -100%;
    }

    .sidebar-right {
        background-color: #a0c263;
        width: 200px;
        margin-left: -200px;
    }

    flex
        容器的属性
            flex-direction
            flex-wrap
            flex-flow
            justify-content
            align-items
            align-content
        #1.flex-direction属性决定元素的排列方向
            row(默认)  水平方向排列，从左到右
            row-reverse  水平方向排列，从右到做
            colomn 垂直方向，从上往下
            colomn-reverse 垂直方向，从下往上
        #2.flex-wrap属性规定如果元素无法在一行中排下，如何换行。
            nowrap（默认） 不换行
            wrap 换行，第一行在上方
            wrapreverse 换行，第一行在下方
        #3.flex-flow属性是flex-direction属性和flex-wrap属性的简写方式。它的默认值是row nowrap。
            .box{   
                flex-flow: <flex-direction> <flex-wrap> ;
            }
        #4.justify-content属性规定了元素的对齐方式
            flex-start（默认值） 左对齐
            flex-end 右对齐
            center 居中
            space-between 两端对齐，元素之间的间隔都相等
            space-around 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
        #5.align-items属性规定了垂直方向上如何对齐
            flex-start紧贴顶部对齐
            flex-end紧贴底部对齐
            center交叉轴的终点对齐
            baseline按照项目的第一行文字的基线对齐
            stretch(默认值) 如果项目未设置高度或设为auto，将占满整个容器的高度。
        #6.align-content属性规定了多行元素的对齐方式，如果只有一行，则不起作用
            flex-start紧贴左边对齐
            flex-end 紧贴右边对齐
            center 居中对齐
            space-between 垂直两端对齐，水平的间隔平均分布。
            space-around 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
            stretch(默认值) 轴线占满整个交叉轴。
        #元素的属性
            order 规定了元素的排列顺序。数值越小，排列越靠前，默认为0。
            flex-grow 定义了元素的放大比例，默认为0；
            flex-shrink 定义了元素的缩小比例，默认值是1。
            flex-basis 定义了在分配多余空间之前，元素占据的空间，浏览器根据这个计算浏览器是否还有多余空间，它的默认值为auto,即项目的本来大小。
            flex 是flex-grow、flex-shrink和flex-basis的简写，默认值为0 1 auto。后两个属性可选。
            align-self 属性允许单个元素有与其他元素不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

    vertical-align 为什么没有绝对垂直居中？
        内联元素：元素的垂直中心点和行框盒子基线（字符x底边缘）往上1/2 x-height处对齐，即字符x的交叉点。
        table-cell 元素：单元格填充盒子相对于外面的表格行居中对齐。
        然而，所有字体中，字符x的位置都是偏下一点，所以不是绝对垂直居中。font-size：0就对齐了。

    line-height 的具体含义是什么？
        行距 = line-height -font-size. 上边距向下取整，上边距向上取整。

    移动端适配，rem布局的优缺点：等比
    
    1px：渐变、图片、阴影、scale、height: 0.5px，viewport
    
    清除浮动
        .box:after{
            content: '';
            display: block;
            clear: both;
        }
        overflow:hidden 因为要计算内容全部高度才能确定在什么位置hidden，浮动的高度就要被计算进去，达成了清理浮动的目标
    
    栅格
        人为的把网页中的一行，等比例划分,比如将一行划分为 12 等分。然后在每个格子里进行页面开发，这就栅格化。

84、网络、安全

    POST 和 GET 的区别
        GET在浏览器回退时是无害的，而POST会再次提交请求 *
        GET请求会被浏览器主动缓存，而POST不会，除非手动设置 *
        GET请求参数会被完整保留在浏览器的历史记录里，而POST中的参数不会被保留 *
        GET请求在URL中传送的参数是有长度限制的，而POST没有限制 *
        GET参数通过URL传递，POST放在Request body中 *
        GET请求只能进行 url 编码，而POST支持多种编码方式
        GET产生的URL地址可以被收藏，而POST不可以
        对参数的数据类型，GET只接受ASCII字符，而POST没有限制
        GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
    
    PUT 和POST方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用），而POST方法是非幂等的。

    304协商缓存
        浏览器缓存分为强制缓存和协商缓存，优先读取强制缓存。
        强制缓存分为expires和cache-control，而expires是一个特定的时间，是比较旧的标准和cache-control通常是一个具体的时间长度，比较新，优先级也比较高。
        而协商缓存包括etag和last-modified，last-modified的设置标准是资源的上次修改时间，而etag是为了应对资源修改时间可能很频繁的情况出现的，是基于资源的内容计算出来的值，因此优先级也较高。
        协商缓存与强制缓存的区别在于强制缓存不需要访问服务器，返回结果是200，协商缓存需要访问服务器，如果命中缓存的话，返回结果是304。
    
        客户端向服务器发出请求，请求资源
        服务器返回资源，并通过响应头决定缓存策略
        客户端根据响应头的策略决定是否缓存资源（这里假设是），并将响应头与资源缓存下来
        在客户端再次请求且命中资源的时候，此时客户端去检查上次缓存的缓存策略，根据策略的不同、是否过期等判断是直接读取本地缓存还是与服务器协商缓存

    HTTP由三个部分组成：对报文进行描述的起始行（start line）、包含属性的首部（header）块，以及可选的，包含数据的主体（body）部分。

    三次握手和四次挥手原理
    所谓三次握手(Three-way Handshake)，是指建立一个 TCP 连接时，需要客户端和服务器总共发送3个包。
    TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，也叫做改进的三次握手。客户端或服务器均可主动发起挥手动作，在 socket 编程中，任何一方执行 close() 操作即可产生挥手操作。

    TCP有哪些手段保证可靠交付
    1、将数据截断为合理的长度。
    应用数据被分割成TCP认为最适合发送的数据块。这和UDP完全不同，应用程序产生的数据报长度将保持不变。
    2、超时重发
    当TCP发出一个段后，它启动一个定时器，等待目的端确认收到这个报文段。如果不能及时收到一个确认，将重发这个报文段。
    3、对于收到的请求，给出确认响应
    当TCP收到发自TCP连接另一端的数据，它将发送一个确认。这个确认不是立即发送，通常将推迟几分之一秒。(之所以推迟，可能是要对包做完整校验)
    4、校验出包有错，丢弃报文段，不给出响应，TCP发送数据端，超时时会重发数据
    TCP将保持它首部和数据的检验和。这是一个端到端的检验和，目的是检测数据在传输过程中的任何变化。 如果收到段的检验和有差错，TCP将丢弃这个报文段和不确认收到此报文段。 （希望发端超时并重发）
    5、对失序数据进行重新排序，然后才交给应用层
    既然TCP报文段作为IP数据报来传输，而IP数据报的到达可能会失序，因此TCP报文段的到达也可能会失序。 如果必要，TCP将对收到的数据进行重新排序，将收到的数据以正确的顺序交给应用层。
    6、对于重复数据，能够丢弃重复数据
    既然IP数据报会发生重复，TCP的接收端必须丢弃重复的数据。
    7、TCP还能提供流量控制。
    TCP连接的每一方都有固定大小的缓冲空间。
    TCP的接收端只允许另一端发送接收端缓冲区所能接纳的数据。这将防止较快主机致使较慢主机的缓冲区溢出。TCP使用的流量控制协议是可变大小的滑动窗口协议。

    
    HTTPS的加密原理
        某网站拥有用于非对称加密的公钥A、私钥A’。
        浏览器像网站服务器请求，服务器把公钥A明文给传输浏览器。
        浏览器随机生成一个用于对称加密的密钥X，用公钥A加密后传给服务器。
        服务器拿到后用私钥A’解密得到密钥X。
        这样双方就都拥有密钥X了，且别人无法知道它。之后双方所有数据都用密钥X加密解密。

    直播协议都有什么？
        hls，rtmp，http flv，rtsp
    
    HTTP2.0
        二进制帧层与多路复用 头部压缩（Hpack） 流的优先级 Server Push

     Chrome 浏览器包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程。2个页面属于同一站点的话，并且从a页面中打开的b页面，那么他们也会共用一个渲染进程，否则新开一个渲染进程。

85、接雨水

    var trap = function(height) {
        let max = 0;
        let maxIndex = 0;
        for(let i=0;i<height.length;i++){
            if( height[i] > max){
                max = height[i]
                maxIndex = i;
            }
        }

        let left = height[0];
        let area = 0;
        for(let i=0;i<maxIndex;i++){
            if( height[i] > left ){
                left = height[i]
            }else{
                area += (left - height[i] )
            }
        }
        let right = height[height.length-1];
        for (let i = height.length-1; i > maxIndex; i--) {
            if (height[i] > right) {
                right = height[i]
            } else {
                area += (right - height[i])
            }
        }
        return area;
    };

86、加油站

    var canCompleteCircuit = function(gas, cost) {
        let total = 0;
        let station = 0;
        let current = 0;
        for (let i = 0; i < gas.length; i++) {
            total += gas[i] -cost[i]
            current += gas[i] -cost[i]
            if (current < 0){
            current = 0;
            station = i+1;
        }
        }
        return total >= 0 ? station : -1;
    };

87、scheduleTask(实现一个同时执行若干个任务的调度任务器)
    
    export function Schedule() {
        this.tasks = [];
        this.max = 2;
        setTimeout(() => {
            this.run();
        }, 0)
    }

    Schedule.prototype.addTask = function (task) {
        this.tasks.push(task);

    }

    Schedule.prototype.run = function () {
        if (this.tasks.length === 0) {
            return;
        }
        let size = Math.min(this.max, this.tasks.length);
        for (let i = 0; i < size; i++) {
            let task = this.tasks.shift();
            this.max--;
            task().then((res) => {
                this.max++;
                this.run();
            }).catch((err) => {
                this.max++;
                this.run();
            })
        }
    }

    有 8 个图片资源的 url，已经存储在数组 urls 中（即urls = [‘http://example.com/1.jpg', …., ‘http://example.com/8.jpg']），而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。

    var urls = [ ];
    function loadImg(url) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = function () {
                console.log('一张图片加载完成');
                resolve();
            }
            img.onerror = reject
            img.src = url
        })
    };
    var count = 0;
    //对加载图片的函数做处理，计数器叠加计数
    function bao(){
        count++;
        console.log("并发数:",count)
        //条件判断，urls长度大于0继续，小于等于零说明图片加载完成
        if(urls.length>0&&count<=3){
        //shift从数组中取出连接
            loadImg(urls.shift()).then(()=>{
            //计数器递减
                count--
                //递归调用
                }).then(bao)
        }
    }
    function async1(){
    //循环开启三次
        for(var i=0;i<3;i++){
            bao();
        }
    }
    async1()

    function sendParallel(urls = [], num = 2) {
        let size = Math.min(urls.length, num);
        for (let i = 0; i < size; i++) {
            let url = urls.shift();
            num--;
            fetch(url)
                .then(res => {
                    sendParallel(urls, num + 1);
                })
                .catch(error => {
                    sendParallel(urls, num + 1);
                });
        }
    }

88、将一个同步callback包装成promise形式

    function toPromiseFunction(fn) {
        function promiseFunction(...args) {
            let promise = new Promise((resolve, reject) => {
                try {
                    fn(...args, function(...innerArgs) {
                        resolve(innerArgs);   
                        // 注意，由于resolve只能传一个参数，所以把多参数包成数组
                    })
                } catch(e) {
                    reject(e);
                }
            });
            return promise;
        }
        // 第一次调用，返回闭包函数。二次调用才生效。
        return promiseFunction;
    }