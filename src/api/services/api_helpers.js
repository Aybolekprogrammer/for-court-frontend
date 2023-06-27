import axiosInstance from "../axiosInstance.js";

export async function Get(url, config = {}) {
    return axiosInstance.get(url, {...config}).then(response => response.data)
}

export async function Post(url, data, config = {}) {
    return axiosInstance.post(url, {...data}, {...config}).then(response => response.data)
}