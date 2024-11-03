import request from "@/requests";

export default async function meRequest() {
  if (localStorage.getItem("access_token")) {
    const response = await request(
      "get",
      "/user/me/",
      {},
      { "Authorization": `Bearer ${localStorage.getItem("access_token")}` },
      {},
    )
    return response
  }
}