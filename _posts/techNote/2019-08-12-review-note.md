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

    async 和 defer 都是异步的，使用 async 标志的脚本文件一旦加载完成，会立即执行；而使用了 defer 标记的脚本文件，需要在 DOMContentLoaded 事件之前执行。

