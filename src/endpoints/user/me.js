import request from "@/requests";
import main from "@/main";

export default async function meRequest(login_redirect) {
  if (localStorage.getItem("access_token") && login_redirect === true) {
    const response = await request(
      "get",
      "/user/me/",
      {},
      { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
      {},
    )
    return response
  } else {
    return true
  }
}