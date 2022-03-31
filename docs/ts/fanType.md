# 泛型

#### 函数不确定是什么类型，当传入参数时，确定类型
##### 1。泛型定义函数
 （1）函数重载 
```js
function log (val: string): string {}
function log (val: string[]): string[] {}
function log (val: any) { // 最宽泛的定义
    console.log(val)
    return val
}
```

（2）联合类型，最简单
```js
function log (val: string | string[]): string | string[] {
    console.log(val)
    return val
}
```

(3) any类型：丢失了一些信息
```js
function log(val: any) {

}
```
(4)泛型： 不预先确定数据类型，具体的类型在使用的时候才能确定
```js
function log<T>(val: T): T {
    console.log(val)
    return val
}

log<string[]>(['a', 'b'])
log(['c', 'd']) // 推荐
```

###### 2。不仅可以用泛型定义一个函数，还可以定义一个函数类型
```js
// 类型别名来定义一个泛型函数类型
type Log = <T>(val: T): T
let myLog: Log = log

```

###### 3。泛型接口
```js
// 接口属性的描述跟上面的差不多，同样需要去掉函数名称
interface Log {
    <T>(val: T): T
}
let myLog: Log = log

// 泛型约束了一个函数，也可以约束接口的其它的成员，
interface Log<T> {// 这样接口所有成员的都可以泛型变量的约束，注意：当泛型变量约束了整个接口之后，必须指定一个类型
    (val: T): T
}
// let myLog: Log = log // 缺少一个类型参数
let myLog: Log<number> = log // 指定一个类型


// 如果不指定类型，那我们在接口的定义中指定一个默认的类型
interface Log<T = string> { // T = string给一个默认值
    (val: T): T
}
let myLog: Log = log // 这样就不用指定类型
```

#### 4.泛型约束类
```js
class Log<T> {
    // static run (val: T) { // 报错，static成员不能用泛型
    run (val: T) {
        console.log(val)
        return val
    }
}
let log1 = new Log<number>()
log1.run(1)
let log2 = new Log() // 不指定类型，下面调用函数，可以传任意值
log2.run('2') // 
log2.run({a: '1'})



```
###### 5.类型约束
```js
interface Length {
  length: number
}
function log<T extends Length>(val: T): T { // T受到一定的约束，不再任何类型都可以传了，传的T，必须有length属性
  console.log(val, val.length) // 这里报错，不能直接打印val.length,要用类型约束,定义一个接口，T extends Length
  return val
}
```
