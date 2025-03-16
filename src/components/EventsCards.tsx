import '../styles/eventsCard.css';
import { EventType } from '../types/EventType';
import logo from '../assets/logo.png';
import formatEventTime from '../utils/formatEventTime';
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';

export default function EventsCard({ event }: { event: EventType }) {
  const image: string = event.image_url === 'default' ? logo : event.image_url;
  const eventPrice: string =
    event.price === 0 ? 'Free' : `£${(event.price / 100).toFixed(2)}`;

  return (
    <a href={'/events/' + event.id}>
      <ul>
        <li>{capitalizeFirstLetterOfEachWord(event.name)}</li>
        <li>{formatEventTime(event.start)}</li>
        {/* <li>End: {formatEventTime(event.end)}</li> */}
        <li>
          <img src={image} alt="Event image" className="placeholder" />
        </li>
        <ul className="location">
          Location:
          <li>{event.location.name}</li>
          <li>{event.location.street}</li>
          <li>{event.location.city}</li>
        </ul>
        <li>{eventPrice}</li>
      </ul>
    </a>
  );
}
