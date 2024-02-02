import $api from "../http/index";

export default class AuthService {
    static async login(email, password){
        const res = await $api.post('/auth/login', {email, password})
        return res.data
    }
    static async registration(email, password, name){
        const res = await $api.post('/auth/registration', {email, password, name})
        return res.data
    }
    static async logout(){
        const res = await $api.post('/auth/logout')
        return res.data
    }
    static async checkAuth(){
        const res = await $api.get('/auth/refresh')
        return res.data
    }
    static async sendResetPasswordEmail(email){
        const res = await $api.put('/auth/reset',{email})
        return res.data
    }
}