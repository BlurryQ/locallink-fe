import '../styles/ticketCard.css';
import { useState } from 'react';

// api
import { redirectToGoogleAuthForCode } from '../api/googleAPI';

// image
import logo from '../assets/logo.png';

// types
import { TicketType } from '../types/TicketType';

// utils
import formatEventTime from '../utils/formatEventTime';
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';
import addToCalendar from '../utils/addToCalendar';

export default function TicketsCard({ ticket }: { ticket: TicketType }) {
  const [addedToCalendar, setAddedToCalendar] = useState<string>('');
  if (!ticket) return;
  const image: string =
    ticket.image_url === 'default' ? logo : ticket.image_url || logo;

  const addEventToCalendar = async (e: any) => {
    e.preventDefault();
    const googleToken: string | null = localStorage.getItem('google_token');
    if (!googleToken) await redirectToGoogleAuthForCode();
    else {
      const res = await addToCalendar(googleToken, ticket);
      setAddedToCalendar(res.status === 200 ? 'success' : 'failure');
    }
  };

  return (
    <a href={'/events/' + ticket.event_id} className="ticket-card">
      <ul>
        <li className="title">
          {ticket.name ? capitalizeFirstLetterOfEachWord(ticket.name) : ''}
        </li>
        <li>
          {ticket.start
            ? formatEventTime(ticket.start)
            : 'Start time not available'}
        </li>
        <li>
          <img src={image} alt="Event image" className="placeholder" />
        </li>
        <li>
          Finish:{' '}
          {ticket.end ? formatEventTime(ticket.end) : 'End time not available'}
        </li>
        {ticket.location && (
          <ul className="location">
            <li>{ticket.location.name}</li>
            <li>{ticket.location.street}</li>
            <li>{ticket.location.city}</li>
          </ul>
        )}
        <li className="total-tickets">
          Tickets: {ticket.total_tickets ? ticket.total_tickets : ' '}
        </li>
        <li>
          <button onClick={addEventToCalendar}>Add to Calendar</button>
        </li>
        <li className={addedToCalendar ? addedToCalendar : 'invisible'}>
          Added to calendar: {addedToCalendar}
        </li>
      </ul>
    </a>
  );
}
