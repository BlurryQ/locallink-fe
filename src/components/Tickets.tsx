import '../styles/tickets.css';
import { TicketType } from '../types/TicketType';
import { useUser } from '../context/UserContext';
import getTicketDetails from '../api/getTicketDetails';
import TicketsCard from './TicketsCard';
import { useEffect, useState } from 'react';

export default function Tickets() {
  const [tickets, setTickets] = useState<TicketType[] | []>([]);
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  useEffect(() => {
    const requestTickets = async (userID: string) => {
      try {
        const res = await getTicketDetails(userID);
        setTickets(res.tickets);
      } catch (err) {
        console.log(err);
      }
    };

    if (!user) return;
    else if (user.id) requestTickets(user.id);
  }, []);

  return (
    <div className="tickets">
      {tickets.length > 0
        ? tickets.map((ticket) => (
            <TicketsCard key={ticket.ticket_id} ticket={ticket} />
          ))
        : null}
    </div>
  );
}
