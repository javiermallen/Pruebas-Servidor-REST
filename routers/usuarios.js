const { Router } = require( 'express' );
const { check }  = require( 'express-validator' );

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT }    = require( '../middlewares/validar-jwt' );
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require( '../controllers/usuarios' );
const { esRoleValido, emailExiste, existeUsuarioPorId }  = require( '../helpers/db-validators' );

const router = Router();

router.get( '/' , usuariosGet )
router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password debe de tener más de 6 letras' ).isLength({ min: 6 }),
    check( 'email', 'El correo no es válido' ).isEmail(),
    check( 'email' ).custom( ( email ) => emailExiste( email ) ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check( 'rol' ).custom( ( rol ) => esRoleValido( rol ) ), //esRoleValido
    validarCampos
], usuariosPost )
router.put( '/:id', [
    check( 'id', 'No es un ID válido').isMongoId(),
    check( 'id' ).custom( ( id ) => existeUsuarioPorId( id ) ),
    check( 'rol' ).custom( ( rol ) => esRoleValido( rol ) ), //esRoleValido
    validarCampos 
], usuariosPut )
router.delete( '/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check( 'id', 'No es un ID válido').isMongoId(),
    check( 'id' ).custom( ( id ) => existeUsuarioPorId( id ) ),  
    validarCampos
], usuariosDelete )
router.patch( '/', usuariosPatch )

module.exports = router;