// api
import { getTicketDetails } from "../apis/tickets.api";

// types
import { TicketType } from "../types/TicketType";

export default async function getTickets(userID: string, setTickets: React.Dispatch<React.SetStateAction<[] | TicketType[]>>) {
    try {
      const res = await getTicketDetails(userID);
      setTickets(res.tickets);
    } catch (err) {
      console.log(err);
    }
  };
