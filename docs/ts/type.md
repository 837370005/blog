# typeScript的类型

https://www.typescriptlang.org/play 可以看到ts怎么编译到js
```js
// 原始类型
let bool: boolean = true
let num: number = 123
let str: string = 'abc'

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number | string> = [1, 2, 3, '4']

// 元组
let tuple: [number, string] = [0, '1']
// 元组的越界问题
tuple.push(2) // 没有问题
console.log(tuple) // 没有问题
tuple[2] // 报错，不能越界访问


// 函数， 
let add = (x: number, y: number): number => x + y
let add = (x: number, y: number) => x + y // 返回类型可以不写
let compute: (x: number, y: number) => number // 函数类型，但没有具体的实现
compute = (a, b) => a + b // 不用指定参数的类型

// 对象
let obj: object = {x: 1, y: 2}
obj.x = 3 // 这样是不行的。因为这里只是简的定义object类型
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 3 // 这样指定了具体的类型就可以了

// symbol,下面两种都是可以的
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2) // false

// undefined, null
let un: undefined = undefined // 只能赋值自己，不能赋值其它的
let un: null = null
let nums: number = 7
// 下面两个都会报错，
nums = undefined 
nums = null
(1) // 但是ts官网文档说，undefined,null是任何类型的子类型。所以我们要在tsconfig.json设置一下
"strictNullChecks": false,
(2) let nums: number | undefined | null = 7


// void
//没有任何值的函数
let noReturn = () => {} // void是一种操作符，它会让任何的表达式返回undefined,返回undefined最简单的方式是void 0
// undefined不是保留字，可以自定义变量undefined,覆盖全局的undefined,所以函数写，void保证返回undefined
(function () {
    console.log(undefined) // undefined
    var undefined = 0;
    console.log(undefined) // 0
})()

// any
// 如果都是any就没有必要用ts
let x
x = 1
x = []
x = () => {}

// never
let error = () => {
    throw new Error('error') // 函数抛出错误
}
let endless = () => {
    while(true){} // // 死循环,永远没有返回
}

// 枚举： 一组有名字的常量集合
// 解决的问题,(1)可读性差： 很难记住数字的含义 （2）可维护差: 硬编码，牵一发动全身
function initByRole (role) {
    if (role === 1 || role === 2) {
        // do sth
    } else if (role === 3 || role === 4) {
        // do sth
    } else {
        // do sth
    }
}
// 枚举 解决
enum Role {
    Developer,
    Adminer,
    Guest,
    Owner,
    Productor
}
function initRole (role: number) {
    switch (role) {
        case Role.Developer:
            console.log('开发者');
            break;
        case Role.Adminer:
            console.log('管理员');
            break;
        case Role.Guest:
            console.log('游客');
            break;
        case Role.Owner:
            console.log('Owner');
            break;
        default:
            console.log('产品');
            break;

    }
}
initRole(2)



// 数字枚举
enum Role {
    Repoter,
    Developer = 3,
    Owner,
    Guest
}
console.log(Role.Repoter) // 0
console.log(Role.Owner) // 4
console.log(Role[0]) // Repoter
//  实现原理 // https://www.typescriptlang.org/play
    "use strict";
    var Role;
    (function (Role) {
        Role[Role["reper"] = 0] = "reper";
        Role[Role["voter"] = 1] = "voter";
        Role[Role["guest"] = 2] = "guest";
    })(Role || (Role = {}));

// 字符串枚举
enum Message {
    Success = "恭喜您",
    Error = "失败"
}
// 实现原理,没有反向映射
var Message;
(function (Message) {
    Message["Success"] = "\u606D\u559C\u60A8";
    Message["Error"] = "\u5931\u8D25";
})(Message || (Message = {}));

// 异构枚举: 数字枚举和字符枚举，这样容易混淆，不建议使用
enum Answer {
    N,
    Y = "Yes"
}

// 枚举成员,分成两类： 
// 一类：const member,常量：第1种，没有初始值的情况 ，第2种，对已有成员的引用 第3种，表达式，运行时，计算
// 二类：computed,计算，被保留到执行时，再计算
enum Char {
    // const 直接
    a,
    b = Char.a,
    c = 1 + 3,
    // computed,执行时
    d = Math.random(),
    e = '123'.length
    // computed后面一定要赋初始值，不然报错
    f // 报错
}
Char.a = 2 // 报错，枚举成员的值是不能被修改的


// 常量枚举: 当我们不需要一个对象， 而需要对象的值的时候，减少到编译环境的代码
const enum Month {
    Jan,
    Feb,
    Mar
}
let month = [Month.Jan, Month.Feb, Month.Mar]
// 编译后： 
let month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */];


// 枚举类型
enum E {a, b}
enum F {a = 0, b = 1}
enum G {a = 'apple', b = 'banana'}
let e: E = 3
let f: F = 3
e == f // 类型不同，不可以比较

let e1: E.a = 1
let e2: E.b
e1 == e2 // 成员不同，也不可以比较

let e3: E.a = 1
e1 == e3 // 可以比较

let g1: G = G.b // 字符串枚举的取值只能是枚举成员的类型
let g2: G.a = G.a // 只能是它自身



```