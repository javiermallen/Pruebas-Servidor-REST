//Requerimos la respusta y la petición para que nos salga la ayuda
const { request, response } = require( 'express' );
//Requerimos bcriptsjs
const bcrypt                = require('bcryptjs');

//Requerimos la colección de la base de datos
const Usuario          = require( '../models/usuario' );
const { generarJWT }   = require( '../helpers/generar-jwt')
const { googleVerify } = require ( '../helpers/google-verify' )

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

//Controlador de la ruta de Google
const googleSignin = async( req = request, res = response ) => {
	
    //Capturamos el id_toker
    const id_token = req.body;
    
    //const { nombre, img, email } =  await googleVerify( id_token );
    //console.log( nombre, img, email );
    // res.json({
	// 	msg: 'Todo correcto - Google Signin',
    //     id_token
	// })
    
    
    // try {
    //     res.json({
    //         msg: 'Funciona'
    //     })
    // } catch (error) {
    //   console.log( error )  
    // }
   
    try {
        const { nombre, img, email } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                email,
                password: 'XD',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }


}
module.exports = { 
    login,
    googleSignin
}