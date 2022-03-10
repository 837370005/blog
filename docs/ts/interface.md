# 对象类型接口
```js
interface List {
    id: number;
    name: string;
}
interface Result {
    data: List[]
}

let result = {
    data: [
        {
            id: 1, name: '小明', sex: '男' // 但是接口返回一般会超过我们的预期，
        },
        {
            id: 2, name: '小花'
        }
    ]
}
function render (result: Result) {
    result.data.forEach((value) => {
        console.log(value.id, value.name)
    })
}
render(result)
// 但是接口返回一般会超过我们的预期
// 我们会看到并没有提示有问题，因为这是TS采取了鸭式变形法, 这是一种动态语言风格， 一个比较形象的说法：一只鸟，他长得像鸭子，叫起像鸭子 ，那我们就可以叫它鸭子,回到TS，传入的对象满足接口的条件，也可以通过类型检查。
// 如果直接传入对象字面量，ts就会额外的字段进行检查

（1）把对象字面量赋值给一个变量
    let result = {
        data: [
            {
                id: 1, name: '小明', sex: '男' // 但是接口返回一般会超过我们的预期，
            },
            {
                id: 2, name: '小花'
            }
        ]
    }
    render(result)
（2）使用类型断言: 
    a. as
        render({
            data: [
                {
                    id: 1, name: '小明', sex: '男' // 但是接口返回一般会超过我们的预期，
                },
                {
                    id: 2, name: '小花'
                }
            ]
        } as Result)
    b.<Result> // 这个方式，在react中会产生歧义
        render(<Result>{
            data: [
                {
                    id: 1, name: '小明', sex: '男' // 但是接口返回一般会超过我们的预期，
                },
                {
                    id: 2, name: '小花'
                }
            ]
        })  
    c.当只有数据只有一行时报错解决方法：as unknown as Result或者用字符串索引签名
    render({
        data: [
            {
                id: 1, name: '小明', sex: '男' // 这里也不会通过检查，
            },
        ]
    } as unknown as Result)
（3）字符串索引签名
    interface List {
        id: number;
        name: string;
        [x: string]: any; // 字符串索引签名：用任意字符去索引List,可以得到任意的结果。
    }

// 可选属性
 interface List {
    id: number;
    name: string;
    age?: number;
}
// 只读属性
 interface List {
    readonly id: number;
    name: string;
    age?: number;
}
value.id ++; // 这样就会报错，id是只读的


// 用数字索引的接口:用任意的数字去索引StringArray,都会得到一个string;相当于一个字符串数组
interface  StringArray {
    [index: number]: string;
}
let chars: StringArray = ['A', 'B']
// 用字符串去索引一个接口：
interface Names {
    [x: string]: string;
    // y: number;// 这样是不可以的
    // 两种索引签名是可以混用的,这样的意思是，这样即可以用字符串去索引也可以用数字去索引
    // 注意，数字索引签名返回值是字符串索引签名返回值的子类型，这是因为js会进行类型转换，将number转成string,保持类型的一致
    [y: number]: string;
    // [x: string]: any; // 这样就兼容
    // [y: number]: number;我们取一个与number兼容的类型，比如any
}
let names: Names = {
    name: 'aaa'
} // 对象不会报错

// let namess: Names = ['a', 'b'] // 报错

```