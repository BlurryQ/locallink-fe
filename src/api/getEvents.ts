import baseURL from "./api";

export default async function getEvents() {
  const response = await baseURL.get(`/events`)
  return response.data;
}