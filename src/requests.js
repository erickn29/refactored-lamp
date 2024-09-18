import axios from 'axios';
import main from './main';

const baseUrl = "http://localhost:8000"
const apiVersion = "/api/v1"

export default async function request(
  method = "GET",
  url = `${baseUrl}${apiVersion}/user/me/`,
  data = {},
  headers = { 'Content-Type': 'application/json' },
  params = {},
) {
  try {
    const response = await axios({
      method: method,
      url: `${baseUrl}${apiVersion}${url}`,
      data: data,
      headers: { ...(headers || {}), 'Content-Type': 'application/json' },
      params: params,
    })
    if (response.status >= 200 && response.status < 300) {
      return response
    }
  } catch (error) {
    if (error.response.status == 401) {
      if (localStorage.getItem("refresh_token")) {
        const refreshResponse = await axios({
          method: 'POST',
          url: `${baseUrl}${apiVersion}/auth/token/refresh/`,
          data: { token: localStorage.getItem("refresh_token") },
          headers: {},
          params: {},
        })
        const access_token = refreshResponse.data.access_token;
        const refresh_token = refreshResponse.data.refresh_token;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        location.reload();
      } else {
        main.$router.push('/login');
      }
    }
    console.log(error)
  }
}