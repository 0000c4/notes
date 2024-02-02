const nodemailer = require('nodemailer')
class MailService{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'tvxpressvideo@gmail.com',
                pass: 'rilxalepfddbairh'
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: 'tvxpressvideo@gmail.com',
            to,
            subject: 'n0tes account activation',
            text: '',
            html: `<div>
                    <h1>To activate your account follow the link</h1>
                    <a href="${link}">${link}</a>
                </div>`

        })
    }

    async sendResetMail(to, link){
        await this.transporter.sendMail({
            from: 'tvxpressvideo@gmail.com',
            to,
            subject: 'notes reset password',
            text: '',
            html: `<div>
                    <h1>follow link to reset password</h1>
                    <a href="${link}">${link}</a>
                </div>`

        })
    }
}
module.exports = new MailService();
