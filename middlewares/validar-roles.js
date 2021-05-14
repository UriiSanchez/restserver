const { response } = require("express")

const esAdminRole = (req, res = response, next) => {
    if(!req.usuarioAutenticate){
        return res.status(500).json( {
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }
    const {role, nombre} = req.usuarioAutenticate;
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es un administrador`
        });
    }
    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        const {usuarioAutenticate} = req;
        if(!usuarioAutenticate){
            return res.status(500).json( {
                msg: 'Se requiere verificar el role sin validar el token primero'
            });
        }
        if(!roles.includes(usuarioAutenticate.role)) {
            return res.status(401).json( {
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}