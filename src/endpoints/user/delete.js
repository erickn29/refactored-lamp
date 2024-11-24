import request from "@/requests";
import main from "@/main";

export default async function deleteUser() {
  const response = await request(
    "delete",
    "/user/",
    {},
    { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
    {},
  )
  return response
}