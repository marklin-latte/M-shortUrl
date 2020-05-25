const config = require("../../config");
const redis = require("redis");

module.exports = {
    getClient(){
        return redis.createClient(config.cache);
    }
}