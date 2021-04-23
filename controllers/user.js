const { response} = require('express');

const userGet = (req, res = response) => {
    const params = req.query;
    res.json({msj:'get API - controlador',params});
};

const userPost = (req, res) => {
    const body = req.body; 
    res.json({msj:'post  API - controlador', body});
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