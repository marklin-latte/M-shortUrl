const shortenUrlModel = require("../models/shortenUrl-model");
const globalIdCache = require("../caches/globalId-cache");
const shortenUrlCache = require("../caches/shortenUrl-cache");
const bloomFilterCache = require("../caches/bloomFilter-cache");

const parser = require("../../libs/base62-parser");
const validations = require("../../libs/validation-tool");

const ResourceNotFindError = require("../errors/resourceNotFind-error");
const ResourceInvalidError = require("../errors/resourceInvalid-error");

module.exports = {
    /**
     * @async
     * @param {String} originUrl
     * @return {String} shorten url key
     * @throws {ResourceInvalidError}
     */
    async generateShortKey(originUrl){
        if(!validations.isValidUrl(originUrl)){
            throw new ResourceInvalidError("Invalid URL"); 
        }

        const globalId = await globalIdCache.getId(); 
        const shortenKey = parser.encode(globalId);

        await shortenUrlModel.insertShortenURL({
            baseId: globalId,
            originUrl,
            key: shortenKey
        });
        await shortenUrlCache.set(shortenKey, originUrl);
        bloomFilterCache.add(shortenKey);
        return shortenKey;
    },
    /**
     * @async
     * @param {String} shortUrlKey
     * @returns {String} origin url
     * @throws {ResoureNotFindError}
     */
    async getOriginUrl(shortUrlKey){

        if(!bloomFilterCache.check(shortUrlKey)){
            throw new ResourceNotFindError("the short url is not find");
        }

        const cache = await shortenUrlCache.get(shortUrlKey);
        if(cache){
            shortenUrlCache.updateEmpireTime(shortUrlKey);
            return cache;
        }

        const res = await shortenUrlModel.getOriginUrl(shortUrlKey); 
        if(!res){
            throw new ResourceNotFindError("the short url is not find");
        }

        await shortenUrlCache.setCache(shortenKey, res.originUrl);
        return res.originUrl;
    }
}