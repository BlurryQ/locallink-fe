import '../styles/eventsCard.css';

// images
import logo from '../assets/logo.png';

// types
import { EventType } from '../types/EventType';

// utils
import formatEventTime from '../utils/formatEventTime';
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';

export default function EventsCard({
  event,
  usersEvents = false,
}: {
  event: EventType;
  usersEvents: boolean;
}) {
  const image: string = event.image_url === 'default' ? logo : event.image_url;
  const eventPrice: string =
    event.price === 0 ? 'Free' : `£${(event.price / 100).toFixed(2)}`;

  const editEvent = (e: any) => {
    e.preventDefault();
    window.location.href = '/events/edit/' + event.id;
  };

  return (
    <a href={'/events/' + event.id}>
      {usersEvents ? (
        <button onClick={editEvent} className="edit">
          Edit
        </button>
      ) : null}
      <ul>
        <li className="title">{capitalizeFirstLetterOfEachWord(event.name)}</li>
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
        <li className="price">{eventPrice}</li>
      </ul>
    </a>
  );
}
