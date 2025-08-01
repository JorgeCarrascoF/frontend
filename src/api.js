import axios from 'axios';

export const testApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000,
})


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})