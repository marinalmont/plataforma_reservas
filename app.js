const express = require('express');
const bodyParser = require('body-parser');
const conexionBD = require('./database/database');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = 3000;

// Conexión a la base de datos
conexionBD();

// Middleware
app.use(bodyParser.json());
app.use('/reservations', reservationRoutes);

// Configuración del servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
