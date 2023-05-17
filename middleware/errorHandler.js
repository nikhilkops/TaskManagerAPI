const {CustomAPIError} = require('../errors/custom-error')
const errorHandler = (err, req, res, next) =>
{  
    console.log(err)

    if(err instanceof CustomAPIError)
    {
        return res.status(err.status).json({err:err,message:err.message})
    }
    return res.status(err.status).json({ message:`Something went wrong`})
}

module.exports = errorHandler