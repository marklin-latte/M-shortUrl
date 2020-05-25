module.exports = {
    "server":{
        "port": 3000
    },
    "cache": {
        "host": process.env.REDIS_HOST || "127.0.0.1",
        "port": process.env.REDIS_PORT || 6379,
        "expireTime": 36000
    },
    "db": {
        "host": process.env.MONGODB_HOST || "127.0.0.1",
        "port": process.env.MONGODB_PORT || 27017,
        "name" : process.env.MONGODB_DBNAME || "testing",
        "user": process.env.MONGODB_USER,
        "pwd": process.env.MONGODB_PWD
    },
    "baseShortUrl" : {
        "host" : "127.0.0.1:3000/shortenUrls",
    }
}