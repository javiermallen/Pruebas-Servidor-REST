const express = require('express')
const cors    = require('cors')
const { conexionDB } = require( '../database/config' )

class Server {
    constructor(){
        this.app           = express();
        this.port          = process.env.PORT;
        //Creación del objeto de las rutas
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
        }
        // this.rutasUsuarios = '/api/usuarios';
        // this.authPath      = '/api/auth';

        //Conectar a la base de datos
        this.conectarBD();
        //Middlewares:Son funcionalidades que se añaden a nuestro servidor web
        this.middlewares();
        //Rutas de mi server
        this.routes();

    }
    async conectarBD(){
        await conexionDB();
    }
    middlewares(){
        //CORS
        this.app.use( cors() );
        //Lectura del body de una petición post o put
        this.app.use( express.json() );
        //Acceso al directorio público
        this.app.use( express.static( 'public' ) );
    }
    routes(){
        //Las rutas las tenmos en la carpeta routers
        this.app.use( this.paths.auth, require( '../routers/auth' ) );
        this.app.use( this.paths.categorias, require( '../routers/categorias' ) );
        this.app.use( this.paths.usuarios, require( '../routers/usuarios' ) );
    }
    listen(){
        this.app.listen( this.port, () =>{
            console.log( `Escuchando por el puerto ${ this.port }` )
        })
    }

}

module.exports = Server;