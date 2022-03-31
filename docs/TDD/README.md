# TDD做测试驱动开发-vue版
Test Driven Design(TDD)
https://www.jianshu.com/p/3fdf9bdfb276

寻找答案Stack Overflow
#### 步骤
1.写一个失败的测试
2.写一个刚好让测试通过的代码
3.重构上面的代码

### 原则
1.没有测试之前不要写任何代码
2.一次只写一个刚好失败的测试，作为新功能的描述
3.不写任何多余的产品代码

TDD 写出的代码的验证逻辑针对的是独立的代码块，可能不是系统中的业务完整功能。用测试先行的方法写出的漂亮的代码也可能做出的功能不是客户想要的（因为需求理解的错误所导致）。因此，使用 「验收驱动测试开发(ATDD)」是很有必要。

### 验收驱动测试开发——ATDD(Acceptance Test Driven Development
传统的做法：要给系统加新的特性，开发人员会按照文档开发，测试，最给交给客户验收。
ATDD：在编码前先明确新特性的验收标准，将验收标准转换成测试用例（代码），再编写代码让测试通过，当所有的验收条件都满足，也就意味着这个功能完整的实现

尽管Kent Beck曾对ATDD提示出质疑，却为2012年出版的《ATDD by Example》写了推荐序，ATDD也早成为公认的做法。相比后端，前端更适合ATDD

### 测试条件格式

```js
Given(如果)
指定的状态，通常是指给出的条件
When(当)
触发一个动作或是事件
Then(则)
对期望结果的验证

```
写JS不用像写Java把函数名写很长
```js
it('Given a = 1 and b = 2, When execute sum(), Then result 3', () => {
    // ...
})

// 如果团队习惯用中文，可以这样
it('如果： a = 1 and b = 2, 当： 执行sum(), 则：结果是3')
```
### 实践
#### 安装环境
```js
vue create vue-tdd-demo
```
勾选 Unit Testing （单元测试），后面按照自己喜好来选择, 这里选择 Jest 作为测试框架

安装好之后运行 npm run test ，刚安装的项目就会报错
不能识别import这种
在jest.config.js或是package.json中找到transformIgnorePatterns这个配置
```js
transformIgnorePatterns: [
    '/node_modules/',
    '/node_modules/(?!vue-awesome)', // 添加此行
],
```

写一个登陆页
通常前端分两部分： 1.接口，2。页面
### 接口
#### 1.接口Service测试
请求模块使用[axios](https://github.com/axios/axios), [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter)一个辅助模块，帮助我们验证接口调用是否正确
#### 任务拆分
:::tip
登录 Service.login方法，接受对象(username, password),使用axios发送请求，url: /users/token,使用POST方式，返回一个response的Promise对象;


当输入调用Service.login({username: 'Ella', password: '123'}), 则axios post的数据则与参数相同
:::

#### 安装依赖
```js 
npm install axios
npm install axios-mock-adapter --save-dev
# or
yarn add axios
yarn add axios-mock-adapter -D
```

#### 编写测试
./spec/service.test.ts
```js
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { ServiceLogin } from '../src/user/login'

describe('Login Service', () => {
    it('Given 登录信息为 用户名 Ella， 密码 123456 When 执行ServiceLogin, Then 请求参数为 {username: Ella, password: 123456}的用户', async () => {
        const mock = new MockAdapter(axios);
        mock.onPost('/users/token').reply(200);

        const expectedResult = { username: 'Ella', password: '123456' }
        await ServiceLogin(expectedResult)

        expect(mock.history.post.length).toBe(1)
        console.log(mock.history.post[0].data)
        expect(mock.history.post[0].data).toBe(JSON.stringify(expectedResult))
    })
})
```

这里验证了传入的【参数】与POST的数据是否一致，并没有真正发网络请求，也没有必要。毕竟我们并不关心接口【此时】是否能通，只要后端按照我们的接口约定给出特定的返回即可。
此时运行 yarn run test:unit 缺少 service.js 文件
#### 创建文件
./src/user/login/service.js
```js
import axios from 'axios'

export const ServiceLogin = <T>(userMessage: T) => axios.post('users/token', userMessage)
```
再次运行 yarn run test:unit ，测试通过！

### 页面
#### 2.页面，组件
对于vue来说页面和组件是同一个东西，Vue提供了一个很方便的单元测试工具vue-test-untils
安装vue-test-untils
```js
npm install vue@next vue-loader vue-jest @vue/test-utils -D

```

##### 任务： 当用户访问页面时可以看到用户名，密码输入框和提交按钮，所以页面中只要包含这3个元素即可。
/tests/unit/Login.spec.ts
```js
import { shallowMount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

describe('Login Page', () => {
  it('When 用户访问登录页面，Then 看到用户名、密码输入框和提交按钮', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.find('input.username').exists()).toBeTruthy();
    expect(wrapper.find('input.password').exists()).toBeTruthy();
    expect(wrapper.find('button.submit').exists()).toBeTruthy();
  });
});
```
运行测试报错，缺少 @/login/index.vue 文件

/components/Login.vue
```html
<template>
  <ul>
    <li>
      用户名：<input type="text" class="username" v-model="user.username" />
    </li>
    <li>
      密码：<input type="text" class="password" v-model="user.password" />
    </li>
    <li><button class="submit" @click="onSubmit">提交</button></li>
  </ul>
</template>

```
再次运行 yarn run test:unit，通过！添加新的 case。

#### 3.任务：实现双向绑定，在input 中输入用户名为 谢小呆，密码为 123，vue 的 vm.user 为 {username: '谢小呆', password: '123'};
/tests/unit/Login.spec.ts
```js
import { shallowMount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

describe('Login Page', () => {
  it('When 用户访问登录页面，Then 看到用户名、密码输入框和提交按钮', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.find('input.username').exists()).toBeTruthy();
    expect(wrapper.find('input.password').exists()).toBeTruthy();
    expect(wrapper.find('button.submit').exists()).toBeTruthy();
  });
  it('Given 用户访问登录页面，When用户输入用户名为 Ella, 密码123456，Then页面中的user为{username: Ella, password: 123456}', () => {
    const wrapper = shallowMount(Login)
    wrapper.find('input.username').setValue('Ella')
    wrapper.find('input.password').setValue('123456')

    const expectedResult = { username: 'Ella', password: '123456' }
    expect(wrapper.vm.user).toEqual(expectedResult)
  })
});
```
运行测试，报错：
没有定义
Received:
      undefined
<string>来添加需要绑定的对象：</string>

/components/Login.vue
```html
<template>
  <ul>
    <li>
      用户名：<input type="text" class="username" v-model="user.username" />
    </li>
    <li>
      密码：<input type="text" class="password" v-model="user.password" />
    </li>
    <li><button class="submit" @click="onSubmit">提交</button></li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
const user = reactive({
  username: "",
  password: "",
});
</script>

```
测试通过！

#### 4.任务： 事件绑定，点击提交按钮，调用onSubmit方法，验证onSubmit是否被调用
验证方法需要安装sinon库
```js
npm i sinon D
# or
yarn add sinon -D
```


#### 5.任务：用户名和密码不输入，submit按钮为disabled,
```js
it('Given 用户登录页面， When用户不输入用户名和密码， Then Submit按钮为disabled and 点击submit也不会调用onsubmit', () => {
    const wrapper = shallowMount(Login)
    const onSubmit = sinon.stub()
    const submitBtn = wrapper.find('button.submit')
    submitBtn.trigger('click')

    expect(submitBtn.attributes('disabled')).toEqual('disabled')
    expect(onSubmit.call).toBeFalsy()
  })
```
测试失败
```js
expect(received).toEqual(expected) // deep equality

    Expected: "disabled"
    Received: undefined

      35 |     submitBtn.trigger('click')
      36 |
    > 37 |     expect(submitBtn.attributes('disabled')).toEqual('disabled')
         |                                              ^
      38 |     expect(onSubmit.call).toBeFalsy()
      39 |   })
      40 | });
```

```js
<template>
  <ul>
    <li>
      用户名：<input type="text" class="username" v-model="user.username" />
    </li>
    <li>
      密码：<input type="text" class="password" v-model="user.password" />
    </li>
    <li>
      <button id="foo" class="submit" @click="onSubmit" :disabled="!validate">
        提交
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
const user = reactive({
  username: "",
  password: "",
});
const disabled = true;
const onSubmit = () => {
  console.log("submit");
};
const validate = computed(() => user.username && user.password);
</script>

```


唉？又报错了！报错的 case 不是刚刚的这个，而是上一个 case 报错了。因添加了 validate 验证之后，在没有数据的情况下，点击按钮不会调用 onSubmit 方法。
```js
it('Given用户登录，用户输入用户名和密码，  When点击submit,Then onSubmit方法被调用', async () => {
    const wrapper = mount(Login)
    const onSubmit = sinon.stub();
    onSubmit(wrapper.vm, 'onSubmit');
    wrapper.find('input.username').setValue('Ella')
    wrapper.find('input.password').setValue('123456')
    await nextTick()
    wrapper.find('button.submit').trigger('click')
    expect(onSubmit.called).toBeTruthy();
  })
```
#### 6.任务：用户输入登录信息后提交，返回状态应该为 200，并且调用 loginSuccess() 方法