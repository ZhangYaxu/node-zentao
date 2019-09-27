# Node.js client for ZentaoPMS API

禅道 API

## Usage

```js
const Zentao = require('./index');
const zentao = Zentao({
    // server: 'http://localhost:8888/zentaopms/www/',
    // account: 'admin',
    // password: '1qaz2wsx',
});

let data = await zentao.login(); // 登录，初始化 session
data = await zentao.getProjects(); // 获取项目列表
data = await zentao.getUsers(); // 获取用户列表
```

## Ref

- api机制简介 <http://devel.cnezsoft.com/book/extension/api-intro-43.html>
- 登录验证的api <http://devel.cnezsoft.com/book/extension/api-auth-44.html>
- 第三方应用配置免密登录禅道 <https://www.zentao.net/book/zentaopmshelp/344.html>

## Bug

- TODO: noGDLib 请用手机浏览器访问
