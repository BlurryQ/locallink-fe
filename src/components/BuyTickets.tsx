import '../styles/buyTickets.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { EventType } from '../types/EventType';
import postTickets from '../api/postTickets';

export default function BuyTickets({
  event,
  redirect,
}: {
  event: EventType;
  redirect: string;
}) {
  const [error, setError] = useState<string>('');
  const [ticketQty, setTicketQty] = useState<number>(event.ticket_qty || 1);
  const navigate = useNavigate();
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;
  const price = event.price;

  const handleGetTickets = async () => {
    if (ticketQty < 1) return setError('Invalid amount of tickets selected');
    if (!user.id) return setError('Please log in to get tickets');
    event.ticket_qty = ticketQty;
    const state: any = { state: { event } };
    // navigate('/cart', state);
    if (redirect === '/tickets') {
      const results: boolean[] = await postTickets(user.id, event, ticketQty);
      console.log('results', results);
      if (results.includes(false)) {
        const failedTickets = results.filter(
          (result) => result === false
        ).length;
        setError(failedTickets + 'tickets failed. Please try again');
        setTicketQty(failedTickets);
        return;
      }
    }
    navigate(redirect, state);
  };

  const updateTicketQty = (e: any) => {
    setTicketQty(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGetTickets();
      }}
      className="column buy-tickets"
    >
      <label className="column">
        Tickets:
        <input
          type="number"
          value={ticketQty}
          min="1"
          onChange={updateTicketQty}
        />
      </label>
      <p>Total: £{((ticketQty * price) / 100).toFixed(2)}</p>
      <button type="submit">Get ticket(s)</button>
      <p className={`error ${error ? '' : 'invisible'}`}>
        {error ? error : 'placeholder'}
      </p>
    </form>
  );
}
