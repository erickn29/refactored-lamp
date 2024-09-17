import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

export function request(options, headers = {}) {
  const { url, method, data, params } = options;
  return new Promise((resolve, reject) => {
    api({
      method,
      url,
      data,
      params,
      headers: {
        ...headers,
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
