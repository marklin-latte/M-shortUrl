const mongo = require('mongodb').MongoClient;
const configs = require('../../config');
const url = `mongodb://${configs.db.user}:${configs.db.pwd}@${configs.db.host}:${configs.db.port}`;

module.exports = {
    getClient(){
        return new Promise((resolve, reject) => {
            mongo.connect(url, { useUnifiedTopology: true } , function (err, client) {
                if(err) {
                    reject(err);
                }
                resolve(client);
            });
        });
    }
}