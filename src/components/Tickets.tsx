import '../styles/tickets.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// components
import LottieLoader from './LottieLoader';
import TicketsCard from './TicketsCard';

// context
import { useUser } from '../context/UserContext';

// types
import { TicketType } from '../types/TicketType';

// utils
import getTickets from '../utils/getTickets';
import postEventToCalendar from '../utils/postEventToCalendar';

export default function Tickets() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const [tickets, setTickets] = useState<TicketType[] | []>([]);
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  useEffect(() => {
    setLoading(true);
    if (!user) return setLoading(false);
    else if (user.id) getTickets(user.id, setTickets);
    setLoading(false);

    // check if we have search param from Google callback
    const code = searchParams.get('code');
    if (code) postEventToCalendar(code);
  }, []);

  return (
    <>
      {loading ? <LottieLoader type="searching" /> : null}
      <div className="tickets">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketsCard key={ticket.ticket_id} ticket={ticket} />
          ))
        ) : (
          <h3 className="none-found">No tickets found</h3>
        )}
      </div>
    </>
  );
}
