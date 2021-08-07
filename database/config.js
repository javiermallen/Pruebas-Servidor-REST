const mongoose = require( 'mongoose' )

const conexionDB = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_CONEX, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false        
        });
        
        console.log( 'Conectado correctamente a la base de datos' )

    } catch (error) {
        console.log( error )
        throw new Error ( 'No se podido inicializar la base de datos' )
    }
}

module.exports = {
    conexionDB
}