//Requerimos la respusta y la petición para que nos salga la ayuda
const { request, response } = require( 'express' );
//Requerimos bcriptsjs
const bcrypt                = require('bcryptjs');

//Requerimos la colección de la base de datos
const Usuario        = require( '../models/usuario' );
const { generarJWT } = require( '../helpers/generar-jwt')

const login = async( req = request, resp = response ) => {
    const { email, password } = req.body; 
    
    try {
        //Comprobamos que el usuario se encuentra en la base de datos
        const usuario = await Usuario.findOne( { email } )
        if( !usuario ){
            return resp.status( 400 ).json( {
                //Añadimos al final correo para que en desarrollo sepamos diferenciarlo
                //Pero en producción cuanta menos información demos mejor
                msg: 'El Usario / Password son incorrectos - Correo'
            } )
        }
        //Verificamos el estado del usuario sea true
        if( !usuario.estado ){
            return resp.status( 400 ).json( {
            //Añadimos al final correo para que en desarrollo sepamos diferenciarlo
            //Pero en producción cuanta menos información demos mejor
            msg: 'El Usario / Password son incorrectos - Correo'
            } )
        }
        //Verificamos que la contraseña sea la correcta
        const emailValido = bcrypt.compareSync( password, usuario.password );
        if( !emailValido ) {
            return resp.status( 400 ).json( {
                //Añadimos al final correo para que en desarrollo sepamos diferenciarlo
                //Pero en producción cuanta menos información demos mejor
                msg: 'El Usario / Password son incorrectos - Password'
                } )
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        resp.json({
            usuario,
            token
        })    
    } catch ( error ) {
        console.log( error );
        resp.status( 500 ).json( {
            msg: 'Ha surgido un error, pongase en contacto con el administrador'
        } ) 
    }
}

module.exports = { login }