const {getClient} = require('./db-connect');
const COLLECTION_NAME = "ShortenUrls";
const configs = require('../../config');

module.exports = {
    /**
     * @param {Object} shortenUrl
     * @param {Integer} shortenUrl.baseId
     * @param {String} shortenUrl.originUrl 
     * @param {String} shortenUrl.key
     */
    async insertShortenURL(shortenUrl){
        const client = await getClient();
        const db = client.db(configs.db.name);
        return new Promise((resolve, reject) => {
            db.collection(COLLECTION_NAME, (err, collection) => {
                if(err) reject(err);

                collection.insertOne,({
                    "baseId": shortenUrl.id, 
                    "originUrl": shortenUrl.originUrl,
                    "shortenKey": shortenUrl.key,
                    "createdAt": Date.now(),
                    "deletedAt": 0 
                })
                client.close();
                resolve();
            });
        });
    },
    /**
     * @param {String} shortenKey
     */
    async getOriginUrl(shortenKey){
        const client = await getClient();
        const db = client.db(configs.db.name);
        return new Promise((resolve, reject) => {
            db.collection(COLLECTION_NAME).findOne({
                shortenKey
            }, (err, res) => {
                if(err) reject(err);

                resolve(res);
            });
        });
    }
}