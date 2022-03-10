# 类
```js
// 
class Dog {
    // 实例的属性必须具有初始值,或构造函数中初始化
    name: string; // “类的成员属性”都是实例属性，而不是原型属性，“类的成员方法”都是“原型”方法
    constructor (name: string) { // 构造函数增加了注解
        this.name = name
    }
    // name: string = 'aa'; // “类的成员属性”都是实例属性，而不是原型属性，“类的成员方法”都是“原型”方法
    // constructor (name: string) { // 构造函数增加了注解
    //     // this.name = name
    // }
    public run () {}
    private pri () {}
    protected pro () {}
    readonly legs: number = 4
    static food: string = 'bone'
}
console.log(Dog.prototype, 'prototype') // 可以看到方法，和构造函数，但是没有属性
const dog = new Dog('wang')
console.log(dog, 'dog') // name属性只在实例上，不在原型上
dog.run()
// dog.pri() // 报错，因为pri为私有成员
// dog.pro() // 报错
console.log(Dog.food)
// console.log(dog.food) // 报错，不能通过实例访问

class Husky extends Dog {
    color: string;
    constructor (name: string, color: string) { // 派生类的构造函数，必须包含super调用，是 ES6中的强行规定,super代表父级的实例
        // 必须包含super调用，是 ES6中的强行规定,super代表父级的实例
        super(name) // 父类有name,子类也要有name
        this.color = color // this一定要super之后，
        this.pro() // 子类中可以访问被保存的成员
    }
}

// 类的成员修饰符， ts对es的扩展
// public公用成员，他的含义是对所有人可见
// private类的私有成员，只能被类的本身被调用,而不能被类的实例调用，也不用被子类调用
// protected 受保护成员，在类或子类中访问，不能在实例中访问
// readonly只读属性,必须被初始化
// static 静态成员,只能通过类名来访问,也可以继承
const husky = new Husky('husky', 'red')
husky.run()
// husky.pri() 子类中也不能调用pri
// husky.pro() // 报错
console.log(Husky.food)
// console.log(husky.food) // 报错，不能通过实例访问

// private constructor,这样就不能被实例化，也不能被继承
class Dog {
    // 实例的属性必须具有初始值,或构造函数中初始化
    name: string; // “类的成员属性”都是实例属性，而不是原型属性，“类的成员方法”都是“原型”方法
    private constructor (name: string) { // 构造函数增加了注解
        this.name = name
    }
    public run () { this.pri() }
    private pri () { console.log(11) }
}
// const dog = new Dog() // 报错

// protected constructor 给构造函数使用,只能继承，不能被实例化,相当于声明了一个基类
class Dog {
    // 实例的属性必须具有初始值,或构造函数中初始化
    name: string; // “类的成员属性”都是实例属性，而不是原型属性，“类的成员方法”都是“原型”方法
    protected constructor (name: string) { // 构造函数增加了注解
        this.name = name
    }
    public run () {}
    private pri () {}
}
// const dog = new Dog() // 报错，不能被实例化,可以继承

// 类的成员可以添加修饰符，构造函数的参数可以添加修饰符：将参数自动变成了实例的属性，这样就省略了在类中的定义了
class Husky extends Dog {
    // color: string; public color,所以可以去掉
    constructor (name: string, public color: string) { // 派生类的构造函数，必须包含super调用，是 ES6中的强行规定,super代表父级的实例
        super(name) // 父类有name,子类也要有name
        // this.color = color // public color,所以可以去掉
        this.pro() // 子类中可以访问被保存的成员
    }
}


```
# 理解原型属性和原型方法,跟实例属性和实例方法有啥区别
```tip
JS继承是原型式继承，所有的属性和方法都是共享的，不想共享的就放在构造函数中（也就是自己的实例属性和方法）。当调用实例的属性和方法时，先向实例自身中去找，找不到再到原型链中去找
```

# 派生类必须调用super，调用super之后才能使用this
### Class的继承跟之前js的原型继承不一样，现在Class继承后的子类没有this，需要用父类的this
``` js
// 传统 JavaScript 的继承
function dog (name) {
    this.name = name
    console.log(this.name, 'dog')
}
function husky (name) {
    dog.call(this, name)
}
husky('Husky'); // 它拥有了dog的属性和方法，实现了继承
```

``` js
// ES6 的继承
class Animal {
    constructor (name) {
        this.name = name
    }
}

class Dog extends Animal {
    constructor (name) {
        super(name) // super的作用就是调用父类Animal的构造函数来初始化子类Dog,等价于 Animal.call(this, ...)
        // 也就是说，只有相关的实例属性被绑定到this后，才能调用this.xxx
    }
}
```


### 抽象类
####  es没有引用抽象类，ts抽象类是对es的扩展，抽象类不能被实例化，只能被继承

```js
abstract class Aminal {
    eat () {
        console.log('eat111')
    }
    abstract run(): void; // 抽象方法，编译后，这个就没有了。
}
// let an = new Aminal();// 抽象类不能被实例化
class Dogs extends Aminal {
    constructor (public name: string) { // public name 可以省去定义name
        super()
    }
    run() {
        console.log('run')
    }
}
const dogs = new Dogs('wang')
dogs.eat()
dogs.run()
```

::: tip
好处：抽离出一些事物的共性，有利于代码的复用和扩展，还可以实现多态
:::

### 多态：在父类中定义一个抽象方法，在多个子类中对这个方法有不同的实现，在程序运行中，根据不同的对象执行不同的操作，这样实现了运行时的绑定
```js
abstract class Aminal {
    eat (){

    }
    abstract run(): void; // 抽象方法，编译后，这个就没有了。方法abstract,类也要abstract
}
// let an = new Aminal();// 抽象类不能被实例化
class Dogs extends Aminal {
    constructor (public name: string) {
        super()
       
    }
    run() {
        console.log('dog run')
    }
}
const dogs = new Dogs('wang')
dogs.eat()


class Cat extends Aminal {
    run(){
        console.log('cat run')
    }
}
const cat = new Cat()

const aminals: Aminal[]= [dogs, cat]; // 不需要每一个都单独去调用
aminals.forEach((i) => {
    i.run()
})

class Workflow {
    step1 () {
        return this
    }
    step2() {
        return this
    }
}
new Workflow().step1().step2()// 实例化的对象可以调用方法1，方法2。链式调用。
// 在继承的时候，this可以表现出多态：即可以是父类型，也可以是子类型
class Myflow extends Workflow{
    next(){
        return this
    }
}
new Myflow().step1().step2()
new Myflow().next().step1().next().step2()

```
对比TS和ES中的类，TS把ES中的一些缺失都补回来了，这样TS更像一门面对对象语言

## 类和接口间的关系
```js
interface Human {
    // new (): void // 接口中也不能约束构造函数
    name: string;
    eat(): void
}
class Asian implements Human {
    // constructor (private name: string) { 接口只能约束类的公有成员,不能是私有的
    constructor (public name: string) {

    }
    eat() {
        console.log('eat')
    }
    run(){

    }
}
```
:::tip
 1.类和接口中的成员必须一致  
 2.类中可以有自己私有成员run  
 3.接口只能约束类的公有成员:  
    (1).类中的属性不能是私有的  
    (2)接口中也不能约束构造函数  
:::

#### 接口继承
接口可以继承，也可以继承多个接口

```js
interface Man extends Human {
    sleep(): void
}

interface Child {
    cry(): void
}

interface Boy extends Man, Child { // 继承多个接口时用逗号分开
    cy(): void
}

let boy: Boy = {
    name: '',
    sleep() {},
    cry() {},
    cy(){},
    eat(){}
}

```
### 接口继承类
相当于，接口把类的成员都抽象出来了，只有类的成员结构，而没有具体的实现
定义类

```js 
class Auto {
    state = 1
    // private state1 = 2 // 下面C类就会报错，Bus不会,但是不能访问
    // protected state2 = 3 // 下面C类就会报错，Bus不会,但是能访问
}
interface AutoInterface extends Auto { // 这个接口中就隐含了state属性

}
class C implements AutoInterface {
    state = 1 // 只需要有state属性就可以了
}
class Bus extends Auto implements AutoInterface{ // 这里面就没有实现state了，因为它是auto的子类，自然继承了state属性。额外注意：接口在抽离类的成员的时候，不仅抽离公共成员，私有成员，受保存成员
    show() {
        // console.log(this.state1) // 私有成员，所以报错
    }
}

```

:::tip
    抽象类中可以包括方法的实现，也可以只声明不实现；而在接口中只能声明，不包含实现。
:::

