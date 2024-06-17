const Reservation = require('../routes/models/Reservation');
const nodemailer = require('nodemailer');
const { isValidReservationTime, validateReservationOverlap } = require('../middleware/validateReservation');

const maxCapacity = 30; // Capacidad máxima del restaurante

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Crear reserva
exports.createReservation = async (req, res) => {
    try {
        const { serviceName, date, time, numberOfPeople, userEmail } = req.body;
        const reservationDate = new Date(date);

        if (!isValidReservationTime(reservationDate, time)) {
        return res.status(400).send('Las reservas solo se permiten de 11:00 a 15:00 h los fines de semana y de 13:00 a 15:00 h de lunes a viernes.');
        }

        // Verificar capacidad total y solapamiento de reservas
        const isAvailable = await validateReservationOverlap(Reservation, reservationDate, time, 1.5, numberOfPeople);

        if (!isAvailable) {
        return res.status(400).send('Capacidad máxima de 30 comensales excedida o conflicto de tiempo.');
        }

        const reservation = new Reservation({ serviceName, date, time, numberOfPeople, userEmail });
        await reservation.save();

        // Enviar notificación
        const mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'Reserva Confirmada',
        text: `Tu reserva para ${serviceName} el ${date} a las ${time} para ${numberOfPeople} personas ha sido confirmada.`
        };
        transporter.sendMail(mailOptions);

        res.status(201).send('Reserva creada exitosamente.');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Editar reserva
exports.editReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { serviceName, date, time, numberOfPeople, userEmail } = req.body;
        const reservationDate = new Date(date);

        if (!isValidReservationTime(reservationDate, time)) {
        return res.status(400).send('Las reservas solo se permiten de 11:00 a 15:00 h los fines de semana y de 13:00 a 15:00 h de lunes a viernes.');
        }

        // Verificar capacidad total y solapamiento de reservas
        const isAvailable = await validateReservationOverlap(Reservation, reservationDate, time, 1.5, numberOfPeople);

        if (!isAvailable) {
        return res.status(400).send('Capacidad máxima de 30 comensales excedida o conflicto de tiempo.');
        }

        const reservation = await Reservation.findByIdAndUpdate(id, { serviceName, date, time, numberOfPeople, userEmail }, { new: true });

        // Enviar notificación
        const mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'Reserva Actualizada',
        text: `Tu reserva para ${serviceName} el ${date} a las ${time} para ${numberOfPeople} personas ha sido actualizada.`
        };
        transporter.sendMail(mailOptions);

        res.send('Reserva actualizada exitosamente.');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Cancelar reserva
exports.cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByIdAndDelete(id);

        // Enviar notificación
        const mailOptions = {
        from: 'your-email@gmail.com',
        to: reservation.userEmail,
        subject: 'Reserva Cancelada',
        text: `Tu reserva para ${reservation.serviceName} el ${reservation.date} a las ${reservation.time} ha sido cancelada.`
        };
        transporter.sendMail(mailOptions);

        res.send('Reserva cancelada exitosamente.');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Mostrar disponibilidad
exports.checkAvailability = async (req, res) => {
    try {
        const { date, time } = req.query;
        const reservationDate = new Date(date);

        if (!isValidReservationTime(reservationDate, time)) {
        return res.status(400).send('Las reservas solo se permiten de 11:00 a 15:00 h los fines de semana y de 13:00 a 15:00 h de lunes a viernes.');
        }

        // Verificar solapamiento de reservas
        const isAvailable = await validateReservationOverlap(Reservation, reservationDate, time, 1.5, 0);

        if (isAvailable) {
        return res.status(200).send('Disponible');
        } else {
        return res.status(200).send('No disponible');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};



