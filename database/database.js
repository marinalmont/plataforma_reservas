const mongoose = require('mongoose');

const conexionBD = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/plataformaReservas', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
};

module.exports = conexionBD;
