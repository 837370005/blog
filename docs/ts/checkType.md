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