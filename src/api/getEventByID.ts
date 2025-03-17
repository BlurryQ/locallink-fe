// api
import baseURL from "./api";


export default async function getEventByID(id: string) {
  const response = await baseURL.get(`/events/` + id)
  return response.data;
}