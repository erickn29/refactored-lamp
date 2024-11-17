import request from "@/requests";
import main from "@/main";

export default async function verifyEmail(token) {
  const response = await request(
    "post",
    "/user/verify-email/",
    {
      "token": token
    },
    {},
    {},
  )
  return response
}