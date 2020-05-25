const {getClient} = require('./cache-connect');
const KEY = "api:globalId";

module.exports = {
    async getId(){
        const client = getClient();
        return new Promise((resolve, reject) => {
            client.incr(KEY, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    }
}