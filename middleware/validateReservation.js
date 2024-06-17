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


