import '../styles/eventsCard.css';
import { format } from 'date-fns';
import { EventType } from '../types/EventType';
import logo from '../assets/logo.png';

export default function EventsCard({ event }: { event: EventType }) {
  // TODO move this to utils
  const formatEventTime = (date: Date): string => {
    const time = new Date(date);
    const localTime = new Date(
      time.getTime() + time.getTimezoneOffset() * 60 * 1000
    );
    return format(localTime, 'kk:mm EEE MMM do yyyy');
  };

  const start: string = formatEventTime(event.start);
  const end: string = formatEventTime(event.end);
  const image: string = event.image_url === 'default' ? logo : event.image_url;

  return (
    <a href={event.id}>
      <ul>
        <li>
          <img src={image} alt="Event image" className="opaque" />
        </li>
        <li>Name: {event.name}</li>
        <li>Start: {start}</li>
        <li>End: {end}</li>
        <ul className="location">
          Location:
          <li>Name: {event.location.name}</li>
          <li>Street: {event.location.street}</li>
          <li>City: {event.location.city}</li>
        </ul>
      </ul>
    </a>
  );
}
