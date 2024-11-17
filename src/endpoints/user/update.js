import request from "@/requests";
import main from "@/main";

export default async function updateUser(userObject) {
  const response = await request(
    "put",
    "/user/",
    {
      "token": token
    },
    {},
    {},
  )
  return response
}