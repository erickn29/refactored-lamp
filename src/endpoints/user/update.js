import request from "@/requests";
import main from "@/main";

export default async function updateUser(
  first_name,
  last_name,
  email,
  password,
) {
  const response = await request(
    "put",
    "/user/",
    {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    },
    { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
    {},
  )
  return response
}