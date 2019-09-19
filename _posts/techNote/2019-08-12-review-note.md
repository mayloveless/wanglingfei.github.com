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
    多次：依然记录最小值，但是是多段之和，段与段的分割是，后面的比前面的值小。相当于只记录单调递增的部分。

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