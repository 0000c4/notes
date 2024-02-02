import $api from "../http/index";
export default class noteService {
    static async add(note) {
        try {
            const res = await $api.post('/note', note)
            return { data: res.data, status: res.status }

        } catch (error) {
            return error
        }

    }
    static async edit(note) {
        try {
            const res = await $api.put('/note', note)
            return { data: res.data, status: res.status }
        } catch (error) {
            return error
        }
    }
    static async delete(note) {
        try {
            const res = await $api.delete('/note', { params: { id: note._id } })
            return { data: res.data, status: res.status }
        } catch (error) {
            return error
        }
    }
    static async get() {
        try {
            const res = await $api.get('/note')
            return { data: res.data, status: res.status }
        } catch (error) {
            return error
        }

    }
}