const { peticion, respuesta } = require( 'express' );
const bcrypt = require('bcryptjs');

const Usuario = require( '../models/usuario' );

const usuariosGet = async ( req = peticion, res = respuesta ) => {
    const { limite =  5, desde } = req.query;
    const query                  = { estado:true }

    // const usuarios = await Usuario.find( query )
    //     .skip( Number( desde ) )
    //     .limit( Number( limite ));
    
    // const total = await Usuario.countDocuments( query );
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number( limite ))
    ])

    res.json( { 
        total,
        usuarios 
    } ) 
}

const usuariosPost = async ( req = peticion, res = respuesta ) => {

    const { nombre, email, password, google, rol, estado } = req.body;
    const usuario  = new Usuario( { nombre, email, password, google, rol, estado } );
    
    //Encriptiamos la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );    

    //Grabamos los datos
    await usuario.save();
    res.json({
        usuario
    })
}

const usuariosPut = async( req, res = respuesta ) => {
    const { id } = req.params;
    const { _id, password, email, google, ...resto } = req.body;
    if( password ){
        //Encriptiamos la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        respuesta: "Petición PUT a mi api/usuarios",
        usuario
    })

}
const usuariosDelete = async ( req = peticion, res = respuesta ) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )

    res.json({
        usuario
    })
}
const usuariosPatch = ( req, res = respuesta ) => {
    res.json({
        respuesta: 'Petición PATCH a mi api/usuarios'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}