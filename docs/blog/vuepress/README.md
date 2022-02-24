## 快速搭建博客  
1.使用你喜欢的包管理器进行初始化
```sh
npm init # yarn init
```
2.安装vuepress  
我们已经不再推荐全局安装 VuePress
```sh
yarn add -D vuepress@next # npm install -D vuepress@next
```  
:::tip
要安装@next，不然出来的样式不对
:::  
:::warning 注意  
如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn (opens new window)而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
:::

