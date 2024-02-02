const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken }
    }
    async saveToken(userID, refreshToken, refreshTokenOld) {
        console.log({userID, refreshToken})
        const user = await Token.findOne({ user: userID });
        if (user) { //if user exists, update token

            if(refreshTokenOld){ //if refreshToken exists in cookies. update him.
                user.refreshToken = user.refreshToken.filter(token => token != refreshTokenOld)
            }
            else if(!refreshTokenOld){//if refreshToken not exists in cookies. push into array
                if(user.refreshToken.length >= 5){ //if refreshToken array is full, delete all expired tokens
                    console.log('check work')
                    user.refreshToken = user.refreshToken.filter(token => this.validateRefreshToken(token));

                    if(user.refreshToken.length >= 5){ //if expired tokens not exist, delete first element from array
                        user.refreshToken.shift();
                    }
                }
            }
            user.refreshToken.push(refreshToken);
            return await user.save();
        }
            const newUser = await Token.create({ user: userID, refreshToken: [refreshToken] }); //if user registers
            return newUser;
        
    }
    validateAccessToken(token){
        try {
            const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
            return tokenData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const tokenData = jwt.verify(token, process.env.REFRESH_SECRET);
            return tokenData;
        } catch (error) {
            return null;
        }
    }

    async findToken(refreshToken){
        console.log(refreshToken);
        const tokenData = await Token.findOne({refreshToken: refreshToken});
        return tokenData;
    }

    async removeToken(refreshToken){
        const tokenData = await Token.findOne({refreshToken: refreshToken}) //find document with current token in db
        tokenData.refreshToken = tokenData.refreshToken.filter(token => token != refreshToken);
        return await tokenData.save();
    }

    async removeAllTokens(userID){
        const tokenData = await Token.deleteOne({user: userID}) //find document and delete all tokens
        return tokenData;
    }
}

module.exports = new TokenService();