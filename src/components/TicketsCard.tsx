import '../styles/ticketCard.css';
import logo from '../assets/logo.png';
import formatEventTime from '../utils/formatEventTime';
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';
import { TicketType } from '../types/TicketType';

export default function TicketsCard({ ticket }: { ticket: TicketType }) {
  if (!ticket) return;
  const image: string =
    ticket.image_url === 'default' ? logo : ticket.image_url || logo;

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
      </ul>
    </a>
  );
}
