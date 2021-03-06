# ES6,CommonJS, AMD, CMD的区别
### 运行和编译的概念
编译包括编译和链接两步
编译，把代码翻译成机器能识别的代码和某个中间状态的语言
链接，是把编译成的二进制文件，组合成为一个系统可以执行的可执行文件
运行
把编译出来的可执行文件代码在系统中执行的过程，此时被装载到内在中

ES6,CommonJS, AMD, CMD指的是一种规范
#### CommonJS为在浏览器环境之外构建JS生态系统而产生的项目，比如服务器和桌面环境中
加载机制：

模块可多次加载，但模块的运行只在第一次加载时，运行结果被缓存了，以后再加载，就直接读取缓存结果。

通过require()同步加载依赖，导出API输出到当前模块,多个模块不能并行加载。

输入的是值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

应用：

服务器端的Node.js遵循CommonJS规范，Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用

#### AMD 、CMD
AMD（Asynchronous Module Definition）异步模块加载，AMD 里，require 分全局 require 和局部 require。

CMD（Common Module Definition） 通用模块加载，提供模块定义及按需执行模块。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动

优劣：

AMD | 速度快 | 会浪费资源 | 预先加载所有的依赖，直到使用的时候才执行
CMD | 只有真正需要才加载依赖 | 性能较差 | 直到使用的时候才定义依赖
#### ES6
使用export或export default导出，import导入。

import是编译时调用，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

import是解构过程，本质是输入接口，不允许在加载模块的脚本里面，改写接口。

import命令具有提升效果，会提升到整个模块的头部，首先执行。

import语句会执行所加载的模块，因此可以有下面的写法。
#### import和require的区别
ue模块引入使用import，node模块引入使用require

遵循规范

require 是 AMD规范引入方式
import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法（最好去看文档）
加载

require是运行时调用，在运行时确定模块的依赖关系，得到模块对象及输入/输出的变量，无法进行静态优化。所以require的是运行的结果，把结果赋值给某个变量。
通过require引入基础数据类型时，属于复制该变量。
通过require引入复杂数据类型时，数据浅拷贝该对象。
import是编译时调用，支持编译时静态分析，不需要的方法就不会加载，便于JS引入宏和类型检验，不能包含运行才知道结果的表达式等