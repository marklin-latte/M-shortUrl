const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const configs = require('./config');
const shortUrlService = require('./src/services/shorentUrl-service'); 

const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(async (ctx, next) => {
    try {
        await next();
      } catch (error) {
        ctx.throw(error.httpCode || 500, error.message);
      }
});

router
    .post('/shortenUrls',async  ctx => {
        const { originUrl } = ctx.request.body;
        const shortenKey = await shortUrlService.generateShortKey(originUrl);
        const shortenUrl = `${configs.baseShortUrl.host}/${shortenKey}`;
        ctx.status = 200;
        ctx.body = {shortenUrl};
    })
    .get('/shortenUrls/:shortenKey',async ctx => {
        const shortenKey = ctx.params.shortenKey;
        const originUrl = await shortUrlService.getOriginUrl(shortenKey);
        ctx.redirect(originUrl);
    });

app.use(router.routes());
module.exports = app;