const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno de servidor 500');
};

module.exports = errorHandler;
