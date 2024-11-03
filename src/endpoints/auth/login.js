import request from "@/requests";


export default async function loginRequest(email, password) {
  try {
    const response = await request(
      "post",
      "/auth/login/",
      { email: email, password: password },
      {},
      {},
    )
    if (
      response.status === 200 &&
      response.data.access_token !== null &&
      response.data.refresh_token !== null
    ) {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      return response
    } else {
      this.error = response.data.message;
    }
  }
  catch (error) {
    console.log(error)
  }
}