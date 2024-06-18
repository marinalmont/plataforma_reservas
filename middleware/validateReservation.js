const isValidReservationTime = (date, time) => {
    const reservationHour = parseInt(time.split(':')[0]);
    const dayOfWeek = date.getDay();

    // Horarios permitidos para las reservas
    const isLunchTimeWeekday = reservationHour >= 13 && reservationHour < 15 && (dayOfWeek >= 1 && dayOfWeek <= 5);
    const isLunchTimeWeekend = reservationHour >= 11 && reservationHour < 15 && (dayOfWeek === 0 || dayOfWeek === 6);

    if (isLunchTimeWeekday || isLunchTimeWeekend) {
        return true;
    }
    return false;
};

module.exports = isValidReservationTime;

const validateReservationOverlap = async (Reservation, reservationDate, time, duration, numberOfPeople) => {
    const startTime = new Date(reservationDate);
    startTime.setHours(time.split(':')[0]);
    startTime.setMinutes(time.split(':')[1]);

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + duration);

    const overlappingReservations = await Reservation.find({
        date: reservationDate,
        time: {
            $gte: startTime,
            $lt: endTime
        }
    });

    const totalPeople = overlappingReservations.reduce((sum, reservation) => sum + reservation.numberOfPeople, 0);

    return (totalPeople + numberOfPeople) <= 30; // Capacidad máxima de 30 comensales
};

module.exports = validateReservationOverlap;

