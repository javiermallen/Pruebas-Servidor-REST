require('dotenv').config()

const Server = require( './models/server.js' )

 
const servidor = new Server();

servidor.listen()