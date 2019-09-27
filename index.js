const configDefault = require('./config.default');
const axios = require('axios');

const pasrseJson = function(result) {
    if (!result || !result.data) {
        return;
    }
    try {
        return JSON.parse(result.data.data);
    } catch (error) {
        console.error(error.message, result.data);
        return;
    }
}

const Zentao = function(config) {
    Zentao.config = Object.assign({}, configDefault, config);
    Zentao.axios = axios.create({
        timeout: Zentao.config.timeout,
        baseURL: Zentao.config.server,
        transformRequest: function(data) {
            return data && Object.keys(data).map(key => encodeURIComponent(key || '') + '=' + encodeURIComponent(data[key] || '')).join('&');
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            Referer: Zentao.config.server,
        },
    });
    Zentao.axios.interceptors.request.use(function(config) {
        config.params = config.params || {};
        config.params.t = 'json';
        const { sessionName = 'zentaosid', sessionID } = Zentao.session || {};
        if (sessionID) {
            config.params[sessionName] = sessionID;
        }
        return config;
    });
    return Zentao;
}

Zentao.login = async function() {
    delete Zentao.session;
    let result = await Zentao.axios.get('/', { // m=api&f=getSessionID
        params: {
            m: 'api',
            f: 'getSessionID',
        },
    });
    result = pasrseJson(result);
    Zentao.session = result;
    const { account, password } = Zentao.config;
    result = await Zentao.axios.post('/?m=user&f=login&t=json', { account, password, keepLogin: 'on' }, { //m=user&f=login
        params: {
            // m: 'user',
            // f: 'login',
        },
    });
    // result = pasrseJson(result);
    return result.data.user;
}

Zentao.getUsers = async function() { // m=company&f=browse
    let result = await Zentao.axios.get('/', {
        params: {
            m: 'company',
            f: 'browse',
        },
    });
    result = pasrseJson(result);
    return result;
}

Zentao.getProjects = async function() { // m=project&f=index&t=json
    let result = await Zentao.axios.get('/', {
        params: {
            m: 'project',
            f: 'index',
        },
    });
    result = pasrseJson(result);
    return result;
}

module.exports = Zentao;
