//Necesitamos el Router y el express validator
const { Router } = require( 'express' );
const { check }  = require( 'express-validator' );

//Necesitamos mostrar los errores
const { validarCampos } = require('../middlewares/validar-campos');

//Importamos el controlador del login
const { login, googleSignin } = require('../controllers/auth');

//Instanciamos el Router
const router = Router();

//Llamomos al controlador, está petición va a ser una petición POST
//Tenemos que seguir la ruta /api/auth/login, en el servidor tenemos /api/auth
//Por lo tanto faltaría la última parte
router.post( '/login', [
    check( 'email', 'El correo no es válido' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    validarCampos
], login )
//Creamos la ruta para el usuario que se valida con Google
router.post('/google', [
	check( 'id_token', 'El id_token es necesario' ).not().isEmpty(),
	validarCampos
], googleSignin );

//Exportamos el router
module.exports = router;