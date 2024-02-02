const { validationResult } = require('express-validator')
const UserService = require('../service/user-service')
const ApiError = require('../exceptions/api-error')
class UserController {
    async registration(req, res, next) {
        try {
            console.log(req.body)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('ошибка при валидации', errors.array()))
            }
            const { email, password, name } = req.body
            const userData = await UserService.registration(email, password, name)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            console.log({ activationLink });
            await UserService.activate(activationLink);
            res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies; //grab current refresh token for update and check validation
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async sendResetPassword(req, res, next){
        try {
            const {email} = req.body
            const userData = await UserService.sendResetPassword(email);
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async resetPassword(req, res, next) {
        try {
            const { password, link } = req.body;
            const userData = await UserService.resetPassword(password, link);
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();