# 类型检查
###1.基础类型推断

从右侧推断出左侧的类型
```js
let a = 1; // 从右1推出a是number
const a = 1 // a: 1 // const 定义的，不可修改
const obj = {
    a: 1 // a: number // obj 是地址引用，地址不可改变，但 str 的值是可以改变的，所以是 string 类型
}
let obj = {
    str: 'abc' // readonly str // 推断出了只读
} as const
let b = [1, null] // 从右推出b 是 number | null 
let c = (x = 1) => x + 1 // 从右推出左C为number

```

从左推断出右侧
```js 
window.onkeydown = (event) => { // 从左的onkeydown推出event: KeyboardEvent
  console.log(event.key) // 在输入event.时后面会出现event的属性
}
```

### 类型兼容
当一个类型Y可以被赋值给另一个类型X时，我们就可以说类型X兼容Y
X兼容Y：
X（目标类） = Y (源类型)

```js
let s: string = 'a'
s = null // 这里要去掉tsconfig.json "strictNullChecks": false, 
```

#### 接口的兼容性
```js
interface X {
    a: any;
    b: any;
}

interface Y {
    a: any;
    b: any;
    c: any;
}

let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}

x = y // x兼容y
// y = x // 但是y不兼容x
```
:::tip
总结：接口相互兼容，成员少的会兼容成员多的
:::


#### 函数兼容性
出现在两个函数相互赋值的情况下

1.函数作为参数时
```js
type Handler = (a: number, b: number) => void
function hot (handler: Handler) { // hanlder目标
  return handler
}
let handler1 = (a: number) => {}
hot(handler1) 
let handler2 = (a: number, b: number, c: number) => {}
hot(handler2) // 源
1）参数：目标函数要比源多
2）可选参数和剩余参数
handler2 = handler1
// handler1 = handler2 报错

a = b
a.固定参数，是可以兼容可选参数和剩余参数 
b.
a = c
```

:::tip
接口之间的兼容性，函数之间的兼容性，正好是相反的
:::


### 可选参数和剩余参数
```js
let a = (p1: number, p2: number) => {}
let b = (p1?: number, p2?: number) => {}
let c = (...args: number[]) => {}
a = b
a = c
// b = a 不兼容
// b = c // 不兼容 也可以修改 "strictFunctionTypes": false, 
// 剩余参数可以兼容固定参数和可选参数
c = a
c = b
```

### 参数类型
参数多的要兼容参数少的
```js
interface X {
    a: string;
    b: string;
}

interface Y {
    a: string;
    b: string;
    c: string;
}
let p = (point: X) => {}
let q = (point: Y) => {}
// p = q
q = p
```
函数参数之间可以相互赋值的情况，叫做函数参数的双向协变， 这种情况，允许我们把一个精确的类型赋给一个不精确的类型，（这样很方便，不需要把不精确的断言）参数少的可以赋值给参数多的


### 返回值类型
```js
let f = () => ({name: 'Aclie'})
let g = () => ({name: 'Aclie', age: 11})

f = g // 成员少的要兼容成员多的
// g = f 不兼容，
```

### 函数重载
```js
function overload (a: number, b: number): number;
function overload (a: string, b: string): string;
// function overload (a: any, b: any, c: any): any {} // 报错，参数少的不能兼容参数多的
function overload (a: any): any {} // 参数多的兼容参数少的
```