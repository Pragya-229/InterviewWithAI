import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://interviewai-brn4.onrender.com"

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

// Add token from localStorage to Authorization header if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Store token in localStorage on successful login/register for fallback in incognito mode
api.interceptors.response.use((response) => {
    const url = response.config.url || ""
    if (response.data?.token && (url.includes("/auth/login") || url.includes("/auth/register"))) {
        try {
            localStorage.setItem("authToken", response.data.token)
        } catch (err) {
            console.warn("Could not save token to localStorage", err)
        }
    }
    return response
}, (error) => {
    return Promise.reject(error)
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        throw err

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        throw err
    }

}

export async function logout() {
    try {
        localStorage.removeItem("authToken")
        const response = await api.get("/api/auth/logout")
        return response.data

    } catch (err) {
        throw err
    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")
        console.log(response.data)
        return response.data

    } catch (err) {
        throw err
    }

}