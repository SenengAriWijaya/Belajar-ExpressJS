const response = (statusCode, data, message, res) => {
    res.json(statusCode, [
        {
            payload: data,
            message,          
            metadata: {
                prev: "",
                next: "",
                current: "",
            },
        }
    ])






    // res.status(statusCode).json({
    //     payload: {
    //         status_code: statusCode,
    //         datas: data
    //     },
    //     message: message,
    //     pagination: {
    //         prev: "",
    //         next: "",
    //         max: ""
    //     }
    // })
}

module.exports = response