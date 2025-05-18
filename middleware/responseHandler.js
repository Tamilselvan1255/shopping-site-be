const sendSuccess = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).send({
        status: "Success",
        message,
        data
    })
};

const sendError = (res, error, statusCode ) => {
    return res.status(statusCode).send({
        status: "Fail",
        error: error || "Internal server error"
    })
};

module.exports = {sendSuccess, sendError};