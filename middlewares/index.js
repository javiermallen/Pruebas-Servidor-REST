

const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRole = require('../middlewares/validar-role');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validarRole,
}