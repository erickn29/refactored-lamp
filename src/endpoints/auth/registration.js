import request from "@/requests";
import loginRequest from "@/endpoints/auth/login"

export default async function registrationRequest(email, password) {
  try {
    const response = await request(
      "post",
      "/user/",
      { email: email, password: password },
      {},
      {},
    )
    if (response.status === 201) {
      try {
        const loginResponse = await loginRequest(email, password)
        if (
          loginResponse.status === 200 &&
          loginResponse.data.access_token !== null &&
          loginResponse.data.refresh_token !== null
        ) {
          return true;
        } else {
          console.log(loginResponse)
          return false;
        }
      } catch (error) {
        console.log(error)
        return false;
      }
    } else {
      console.log(response)
      return false;
    }
  } catch (error) {
    if (error.response.data.msg == "Ошибка создания объекта") {
      console.error("Пользователь с данным email уже существует");
    } else {
      console.error(error);
    }
    return false;
  }
}