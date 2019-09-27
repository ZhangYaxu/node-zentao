const Zentao = require('./index');

module.exports = function(config) {
    const zentao = Zentao(config);
    return async function(ctx, next) {
        const url = ctx.url;
        if (!url.startsWith(zentao.apiPrefix)) {
            await next();
        } else if (url.startsWith(zentao.apiPrefix + '/projects')) {
            ctx.body = await zentao.getProjects();
        } else if (url.startsWith(zentao.apiPrefix + '/users')) {
            ctx.body = await zentao.getUsers();
        } else {
            ctx.status = 404;
            ctx.body = 'Not Found!';
        }
    }
}
