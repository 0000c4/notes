const User = require('../models/User');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const TokenService = require('../service/token-service')
const MailService = require('../service/mail-service')
const ApiError = require('../exceptions/api-error')
class UserService {
    async registration(email, password, name) {
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest('user already exists')
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();
        const user = await User.create({ name, email, password: hashPassword, activationLink });
        await MailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/auth/activate/${activationLink}`)

        const UserDto = { id: user._id, email: user.email, name: user.name, isActivated: user.isActivated };
        const tokens = TokenService.generateTokens(UserDto);
        await TokenService.saveToken(UserDto.id, tokens.refreshToken);
        return { ...tokens, user: UserDto }
    }
    async activate(activationLink){
        const user = await User.findOne({activationLink});
        if(!user){
            throw ApiError.BadRequest('invalid activation link');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password){
        const user = await User.findOne({email});
        if(!user){
            throw ApiError.BadRequest('user with this email not found');
        }
        if(user.isActivated == false){
            throw ApiError.BadRequest('check your email and activate account or it will be deleted from 24h');
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if(!passCompare){
            throw ApiError.BadRequest('invalid password');
        }
        const UserDto = { id: user._id, email: user.email, name: user.name, isActivated: user.isActivated };
        const tokens = TokenService.generateTokens(UserDto);
        await TokenService.saveToken(UserDto.id, tokens.refreshToken);
        return { ...tokens, user: UserDto }
    }

    async logout(refreshToken){
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnathorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        console.log({userData, tokenFromDb})
        if(!userData || !tokenFromDb){
            throw ApiError.UnathorizedError();
        }
        const user = await User.findOne({_id: tokenFromDb.user})
        const UserDto = { id: user._id, email: user.email, name: user.name, isActivated: user.isActivated };
        const tokens = TokenService.generateTokens(UserDto);
        await TokenService.saveToken(UserDto.id, tokens.refreshToken, refreshToken);
        return { ...tokens, user: UserDto }
    }

    async resetPassword(password, link){
        const user = await User.findOne({activationLink: link});
        if(!user){
            throw ApiError.BadRequest('invalid activation link');
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4(); //update link to protect against reuse
        user.password = hashPassword;
        user.activationLink = activationLink;

        await TokenService.removeAllTokens(user._id);
        await user.save();
        return {message: "password was reset successfully", status: 200 };


    }
    
    async sendResetPassword(email){
        const user = await User.findOne({email});
        if(!user){
            throw ApiError.BadRequest('user not found');
        }
        const activationLink = uuid.v4();
        user.activationLink = activationLink;
        await user.save();

        await MailService.sendResetMail(user.email, `${process.env.SERVER_URL}/api/auth/reset/${activationLink}`)

        return {message: "reset password email sent", status: 200 };


    }
}
module.exports = new UserService();