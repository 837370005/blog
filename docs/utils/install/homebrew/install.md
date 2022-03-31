# 安装homebrew
官网地址
:::tip
https://brew.sh/index_zh-cn
:::
```js
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```doc
curl: (7) Failed to connect to raw.githubusercontent.com port 443 after 7 ms: Connection refused
// 原因是地址被墙了
```

### 解决方案

1.raw.githubusercontent.com在在线查询ip，就能查到ip: 185.199.109.133

2.替换系统的host文件
注意:最好复制一份出来在更改

file -> 前往 -> 前往文件夹 -> /etc -> hosts (复制一份) -> 添加

```js

185.199.109.133 raw.githubusercontent.com

````

3.终端  
```js
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
````