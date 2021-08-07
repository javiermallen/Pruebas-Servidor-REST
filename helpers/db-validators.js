const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async( rol = '' ) => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( email ) => {
    //Comprobamos que el correo no este ya en la base de datos
    const emailExiste = await Usuario.findOne( { email } );
    //Hacemos un condicional con el emailExiste
    if( emailExiste ) {
        throw new Error( `La dirección de correo ${ email } ya esta usada en la base datos` )
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}

