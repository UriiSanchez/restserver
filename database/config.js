const mongoose = require('mongoose');
const dbConn = process.env.MONGODB_CNN || 'mongodb+srv://user_node_urii:7IhVyyc37jYq334u@cluster0.xzyuv.mongodb.net/cafe'

const dbConnection = async () => {
    try {
        const result = await mongoose.connect(dbConn, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:true
        });
        console.log('Base de datos online');
    } catch (error) {
        // console.log(error)
        throw new Error('Error al inicar la base de datos');
    }
}

module.exports = {
    dbConnection
}