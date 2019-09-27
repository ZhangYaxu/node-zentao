(async function() {
    const Zentao = require('./index');
    const zentao = Zentao({
        // server: 'http://localhost:8888/zentaopms/www/',
        // account: 'admin',
        // password: '1qaz2wsx',

    });

    let data = await zentao.login();
    console.log(JSON.stringify(data, null, 4));

    data = await zentao.getProjects();
    console.log(JSON.stringify(data, null, 4));

    data = await zentao.getUsers();
    console.log(JSON.stringify(data, null, 4));

})();
