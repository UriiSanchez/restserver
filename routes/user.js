const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido,emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');

const router = Router();

router.get('/', userGet);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom((role) => esRoleValido(role)),
    validarCampos
], userPut);
router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    check('password','El password debe de tener mínimo 6 letras').isLength({min: 6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom((role) => esRoleValido(role)),
    validarCampos
], userPost);

router.patch('/', userPatch);
router.delete('/:id',[
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], userDelete);

module.exports = router;