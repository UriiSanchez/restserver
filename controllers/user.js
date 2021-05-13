const { response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const userGet = (req, res = response) => {
    const params = req.query;
    res.json({msj:'get API - controlador',params});
};

const userPost = async (req, res) => {
    
    const {nombre, correo, password, role} = req.body; 
    const user = new Usuario({
        nombre, correo,password, role
    });

    // Verificar si el mail existe
    const existeEmail = await Usuario.findOne({correo});
     if(existeEmail){
        return res.status(400).json({
            msj: 'El correo ya se encuentrá registrado'});
     }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();
    res.json({msj:'post  API - controlador', user});
}

const userPut = (req, res) => {
    const id = req.params.id;
    res.json({msj:'put API - controlador',id});
}

const userPatch = (req, res) => {
    res.json({msj:'patch API - controlador'});
}

const userDelete = (req, res) => {
    res.json({msj:'delete API - controlador'});
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}