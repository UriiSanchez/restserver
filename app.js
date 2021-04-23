require('dotenv').config();
const Server = require('./models/server');
// Se instancia la clase del servidor
const server = new Server();

// ejecuta el servidor
server.listen();
