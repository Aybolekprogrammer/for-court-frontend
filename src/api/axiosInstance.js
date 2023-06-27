import axios from 'axios'

const data = localStorage.getItem('token')
const token = `Token ${data}`


const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        Authorization: token
    }, 
})

export default axiosInstance;