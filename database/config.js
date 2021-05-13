const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:true
        });
        console.log('Base de datos online');
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicar la base de datos');
    }
}

module.exports = {
    dbConnection
}