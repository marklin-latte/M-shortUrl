const server = require('./src/app/server');
const configs = require('./config');
server.listen(configs.server.port);