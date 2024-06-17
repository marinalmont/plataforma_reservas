const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    userEmail: { type: String, required: true }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
