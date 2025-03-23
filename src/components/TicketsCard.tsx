import '../styles/ticketCard.css';
import { useState } from 'react';

// api
import { redirectToGoogleAuthForCode } from '../apis/third-party/google.api';

// types
import { TicketType } from '../types/TicketType';

// utils
import addToCalendar from '../utils/addToCalendar';
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';
import formatEventTime from '../utils/formatEventTime';
import getImage from '../utils/getImage';

export default function TicketsCard({ ticket }: { ticket: TicketType }) {
  const [addedToCalendar, setAddedToCalendar] = useState<string>('');
  if (!ticket) return;

  const addEventToCalendar = async (e: any) => {
    e.preventDefault();
    const googleToken: string | null = localStorage.getItem('google_token');
    if (!googleToken) await redirectToGoogleAuthForCode();
    else {
      const res: any = await addToCalendar(googleToken, ticket);
      setAddedToCalendar(res.status === 200 ? 'success' : 'failure');
    }
  };

  const addedToCalendarClass: string = addedToCalendar
    ? addedToCalendar
    : 'invisible';

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
          <img
            src={getImage(ticket.category || 'default')}
            alt={`${ticket.category || 'Default'} image`}
          />
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
        <li className={addedToCalendarClass}>
          Added to calendar: {addedToCalendar}{' '}
        </li>
        <li className={addedToCalendarClass}>
          {addedToCalendar === 'failure'
            ? 'If this continues try signing out and back in again'
            : ''}
        </li>
      </ul>
    </a>
  );
}
