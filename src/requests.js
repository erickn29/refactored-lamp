import axios from 'axios';

const baseUrl = "http://localhost:8000"
const apiVersion = "/api/v1"

export default async function request(method, url, data, headers, params) {
    try {
        const response = await axios({
            method: method,
            url: `${baseUrl}${apiVersion}${url}`,
            data: data,
            headers: {...(headers || {}), 'Content-Type': 'application/json'},
            params: params,
        })
        return response
    } catch (error) {
        console.error(error)
    }
}