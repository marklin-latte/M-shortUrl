module.exports = async (ctx, next) => {
    try {
        await next();
      } catch (error) {
        ctx.throw(error.httpCode || 500, error.message);
      }
}
