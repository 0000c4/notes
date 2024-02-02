const ApiError = require('../exceptions/api-error');

module.exports = (err, req, res, next) =>{
    
    if(err instanceof ApiError){
        console.log(err);
        return res.status(err.status).json({message: err.message, errors: err.errors})      
    }
    console.log(err)
    return res.status(500).json({message: 'непредвиденная ошибка'})
}