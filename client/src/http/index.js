import axios from 'axios';

//export const API_URL = 'http://localhost:5000/api';
export const API_URL = '/api';
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    timeout: 2000
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;

})

$api.interceptors.response.use((config) => {
    return config;
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status == 401) {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        }
        else{ throw error}
    }
)

export default $api;