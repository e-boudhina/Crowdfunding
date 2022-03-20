// Middlewares are simply functions that executes during requests cycle
const errorHandler = (err, req, res, next) => {

    // if there is already an error from the incoming request than pass it else make a default 500 one
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message,
        //show error only on development mode
        // when yo are in production you do not want normal users to see them
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {errorHandler}
