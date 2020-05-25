const server = require('./server');
const configs = require('./config');
server.listen(configs.server.port);