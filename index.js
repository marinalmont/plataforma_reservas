const express = require('express');
const conexionBD = require('./database/database');
const reservationRoutes = require('./routes/reservationRoutes');
const errorHandler = require('./middleware/errorHandler');


const app = express();
const PORT = 3000;

// Conexión a la base de datos
conexionBD();

// Middleware
app.use(express.json());
app.use(errorHandler);

//Rutas
app.use('/reservations', reservationRoutes);

// Configuración del servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
