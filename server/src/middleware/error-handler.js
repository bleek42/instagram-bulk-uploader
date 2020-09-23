const { NODE_ENV } = require('../config');

const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendProdError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

const errorHandler = (req, res, next, err) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Internal server error!';
    return (NODE_ENV === 'production' ? sendProdError(res, err) : sendDevError(res, err));
};

module.exports = errorHandler;