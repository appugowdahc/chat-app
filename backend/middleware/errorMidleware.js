const notFound = function(req,res,next){
    const error = new Error(`Requested url ${req.originalUrl} Not Found in the server.`);
    res.status(404);
    next(error);
};

const errorHandler = function(error,req,res,next){
    const statusCode = res.statusCode === 200? 500 :  res.statusCode;
    res.status(statusCode);
    res.json({
        message : error.message,
        stack: process.env.NODE_DEV === 'production' ? null :error.stack,
    })
};

module.exports = {errorHandler,notFound}