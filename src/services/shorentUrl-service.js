const shortenUrlModel = require('../models/shortenUrl-model');
const globalIdCache = require('../caches/globalId-cache');
const shortenUrlCache = require('../caches/shortenUrl-cache');
const parser = require('../../libs/base62-pareser');
const ResoureNotFindError = require('../errors/resourceNotFind-error');

module.exports = {
    /**
     * @async
     * @param {String} originUrl
     * @return {String} shorten url key
     */
    async generateShortKey(originUrl){
        const globalId = await globalIdCache.getId(); 
        const shortenKey = parser.encode(globalId);
        // todo:add to bloom filter
        await shortenUrlModel.insertShortenURL({
            baseId: globalId,
            originUrl,
            key: shortenKey
        });
        await shortenUrlCache.set(shortenKey, originUrl);
        return shortenKey;
    },
    /**
     * @async
     * @param {String} shortUrlKey
     * @returns {String} origin url
     */
    async getOriginUrl(shortUrlKey){
        // todo: bool filter check 
        const cache = await shortenUrlCache.get(shortUrlKey);
        if(cache){
            shortenUrlCache.updateEmpireTime(shortUrlKey);
            return cache;
        }

        const res = await shortenUrlModel.getOriginUrl(shortUrlKey); 
        if(!res){
            throw new ResoureNotFindError("the short url is not find");
        }
        await shortenUrlCache.setCache(shortenKey, res.originUrl);
        return res.originUrl;
    }
}