import request from "@/requests";
import main from "@/main";

export default async function exitUser() {
  const response = await request(
    "get",
    "/user/exit/",
    {},
    { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
    {},
  )
  return response
}