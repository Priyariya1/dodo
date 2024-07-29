import axios from 'axios'

const API_URL ='http://localhost:5000'

export const register = async (email,password)=>{
    return axios.post(`${API_URL}/register`,{email,password})
}

export const login = async (email,password)=>{
    return axios.post(`${API_URL}/login`,{email,password})
}