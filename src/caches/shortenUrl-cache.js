const {getClient} = require('./cache-connect');
const KEY = "api:shortenUrl";
const configs = require('../../config');

module.exports = {
    /**
     * @param {String} shortenKey
     * @param {String} originUrl 
     */
    async set(shortenKey, originUrl){
        const client = getClient();
        const key = `${KEY}:${shortenKey}`; 
        client.set(key, originUrl, "EX", configs.cache.expireTime);
    },
    /**
     * @param {String} shortenKey
     * @returns {String} origin url
     */
    async get(shortenKey){
        const client = getClient();
        const key = `${KEY}:${shortenKey}`;
        return new Promise((resolve, reject) => {
            client.get(key, (err, replay) => {
                if(err) reject(err);

                resolve(replay);
            })
        });
    },
    /**
     * @param {String} shortenKey
     */
    async updateEmpireTime(shortenKey){
        const client = getClient();
        const key = `${KEY}:${shortenKey}`;
        client.expire(key, configs.cache.expireTime);
    }
}