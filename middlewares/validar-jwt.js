const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');
const key = process.env.SECRETORPRIVATEKEY || 'Est03sMyPub1icK3y23@913'

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const {uid} = jwt.verify(token, key);
        const user = await usuario.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            });
        }

        if(!user.estado ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            });
        }
        req.usuarioAutenticate = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}