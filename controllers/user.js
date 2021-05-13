const { response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const userGet = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] =await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({total, usuarios});
};

const userPost = async (req, res) => {
    const {nombre, correo, password, role} = req.body; 
    const user = new Usuario({
        nombre, correo,password, role
    });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({user});
}

const userPut = async (req, res) => {
    const id = req.params.id;
    const {_id, password, google, ...resto} = req.body;
    // TODO validar contra BD
    if(password) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({usuario});
}

const userPatch = (req, res) => {
    res.json({msj:'patch API - controlador'});
}

const userDelete = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({usuario});
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}