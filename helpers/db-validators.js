const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido =  async (role = '') => {
    console.log(role)
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
};

const emailExiste = async (correo = '') => {
    const exist = await Usuario.findOne({correo});
    if(exist){
        throw new Error(`El correo ya se encuentrá registrado`);
    }
};

const existeUsuarioPorId = async (id) => {
    const existeUser = await Usuario.findOne({id});
    console.log(existeUser)
    if(!existeUser){
        throw new Error(`El id no existe`);
    }
};

module.exports  = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}