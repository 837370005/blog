# 函数类型接口
```js
(1) function
function add (x: number, y: number): number {

}
(2) 变量
let add: (x: number, y: number) => number
add = (a, b) => a + b 
// add(1) // 这样就会报错，形参和实参要一致
add(1, 2)

(3) 接口interface
interface Add {
    (x: number, y: number): number
}
let add: Add = (a, b) => a + b 

(4) 类型别名type
type Add = (x: number, y: number) => number
let add: Add = (a, b) => a + b 


// 联合类型
interface Lib {
    (): void;
    version: string;
    doSomething(): void;
}
let lib: Lib = () => {

}

// let lib: Lib = () => {} // 这样还是会报错，所以我们要用断言
let lib: Lib = (() => {}) as Lib 
lib.version = '1.0.0'
lib.doSomething = () => {}

// 对全局暴露了变量一个lib,它是一个单例,如果我们创建多个lib呢？我们就用一个函数封装一下
function getLib () {
    let lib: Lib = (() => {}) as Lib 
    lib.version = '1.0.0'
    lib.doSomething = () => {}
    return lib
}
let lib1 = getLib()
lib1()
lib1.doSomething()


// 可选参数，在必选参数之后, z: number就会报错　
// function add1 (x: number, y?: number, z: number) {
function add1 (x: number, y?: number) {
    return y ? x + y : x
}
// 参数的默认值
function add2 (a: number, b = 0, c: number, d = 1) {
    return a + b + c + d
}
// 如果第二个参数是undefined，不传的话,b就取默认值,在必选参数之后的有默认值的参数，可以不用传
add2(1, undefined, 3)

// 现在都是固定参数，如果参数不固定，那我们可以用剩余参数,剩余参数是数组
function add3(a: number, ...reset: number[]) {
    return a + reset.reduce((pre, cur) => pre + cur)
}
add3(1, 2, 3, 4, 5)


// 函数重载，在静态语言类型中呢。比如C++, JAVA函数重载。函数名称相同，但是参数不同，实现了函数重载,好处：不需要为了相似功能的函数，选用不同的函数名称，这样增强了函数的可读性。在TS中重载，有一些不同
// 因为不是很方便，函数重载在实际应用中使用的比较少，一般会用联合类型或泛型代替。
// 另外，函数重载的声明只用于类型检查阶段，在编译后会被删除
function add8(...reset: number[]): number;
function add8(...reset: string[]): string;
// 最宽泛的定义
function add8(...reset: any[]): any{ 
    let first = reset[0];
    if (typeof first === 'number') {
        return reset.reduce((pre, cur) => pre + cur)
    } else if (typeof first === 'string'){
        return reset.join('')
    } else {
        return undefined
    }
}
console.log(add8(), '09') // undefined， // 因为any所以可以不用传参
console.log(add8(1, 3), '09')

```