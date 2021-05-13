const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', userGet);
router.put('/:id', userPut);
router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    check('password','El password debe de tener mínimo 6 letras').isLength({min: 6}),
    check('correo','El correo no es válido').isEmail(),
    check('role','No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], userPost);
router.patch('/', userPatch);
router.delete('/', userDelete);

module.exports = router;