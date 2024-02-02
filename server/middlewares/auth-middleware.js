const ApiError = require('../exceptions/api-error');
const TokenService = require('../service/token-service')
module.exports = function(req,res,next){
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnathorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnathorizedError());
        }
        const userData = TokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnathorizedError());
        }
        req.user = userData;
        next();
    } catch (error) {
        
    }
}