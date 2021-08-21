const { Schema, model } = require( 'mongoose' );


const UsuarioSchema = Schema({
    //Cada uno de los elementos de la colección es un objeto con una serie de propiedades
    nombre: {
        //Tipos de datos a guardar
        type: String,
        //Si es requerido y podemo incluir un mensaje si no fuera requerido
        required: [ true, 'El nombre es obligatorio' ]
    },
    email: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        //Se puede añadir la propieda unique para decirle que es único
        unique: true
    },
    password: {
        type: String,
        require: [ true, 'El nombre es obligatorio' ]
    },
    google: {
        type: Boolean,
        //Me indica si el usario se ha creado usando la autentificación de Google
        default: false

    },
    rol: {
        type: String,
        required: true,
        //Es recomendable escribir los roles que puede haber
        enum: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    img: {
        //Para la imagen pasaremos una cadena de texto que no será obligatoria
        type: String
    },
    estado: {
        //Si es usuario valido sera true, sino será falso, también lo podriamos borrar
        type: Boolean,
        //Por defecto podrá acceder a la base de datos
        default: true
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id
    return usuario;
}
//Exportamos el modelo, como se llamara ese modelo, si ese modelo se llama usuario, Mongo le pondrá ese nombre más una s y el el esquema 
module.exports= model( 'Usuario', UsuarioSchema )