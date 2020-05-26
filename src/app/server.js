const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const configs = require("../../config");
const shortUrlService = require("../services/shortenUrl-service"); 
const errorHandlerMiddleware = require("../app/middlewares/errorHandler-middleware");

const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(errorHandlerMiddleware);

router
    .post("/shortenUrls",async  ctx => {
        const { originUrl } = ctx.request.body;
        const shortenKey = await shortUrlService.generateShortKey(originUrl);
        const shortenUrl = `${configs.baseShortUrl.host}/${shortenKey}`;
        ctx.status = 200;
        ctx.body = {shortenUrl};
    })
    .get("/shortenUrls/:shortenKey",async ctx => {
        const shortenKey = ctx.params.shortenKey;
        const originUrl = await shortUrlService.getOriginUrl(shortenKey);
        ctx.redirect(originUrl);
    });

app.use(router.routes());
module.exports = app;