// api
import baseURL from "./api";


export default async function getTicketDetails(ticketID: string) {
  const response = await baseURL.get(`tickets/events/` + ticketID)
  return response.data;
}