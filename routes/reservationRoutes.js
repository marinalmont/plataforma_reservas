const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reservations', reservationController.createReservation);
router.put('/reservations/:id', reservationController.editReservation);
router.delete('/reservations/:id', reservationController.cancelReservation);
router.get('/availability', reservationController.checkAvailability);

module.exports = router;
