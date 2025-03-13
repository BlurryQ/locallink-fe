import '../styles/event.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// apis
import getEventByID from '../api/getEventByID';

// context
import { useUser } from '../context/UserContext';

// images
import logo from '../assets/logo.png';

// types
import { EventType } from '../types/EventType';

// utils
import formatEventTime from '../utils/formatEventTime';
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';

export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  // TODO create function to get image for eventCard too (run in return)

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getEventByID(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, []);

  const handleTicketAddition = async () => {
    // log in error
    if (!user.id) return;

    console.log('clicked with userID', user.id);
    // run payment

    // post ticket
  };

  return (
    <>
      {loading ? 'loading' : null}
      {!loading && event ? (
        <ul className="event">
          <li>Organiser: {event.organiser}</li>
          {/* <li>Capacity: {event.capacity}</li> */}
          <li>
            <img
              src={event.image_url === 'default' ? logo : event.image_url}
              alt="Event image"
              className="placeholder"
            />
          </li>
          <li>{capitalizeFirstLetterOfEachWord(event.name)}</li>
          <li>Start: {formatEventTime(event.start)}</li>
          <li>End: {formatEventTime(event.end)}</li>
          <li>Price: ${(event.price / 100).toFixed(2)}</li>
          <li>
            <ul className="location">
              Location:
              <li>Name: {event.location.name}</li>
              <li>Street: {event.location.street}</li>
              <li>City: {event.location.city}</li>
              <li>Country: {event.location.country}</li>
              <li>Postcode: {event.location.postcode}</li>
            </ul>
          </li>
          <li>Details: {event.details}</li>
          {/* <li>Status: {event.status}</li> */}
          {/* <li>Category: {event.category}</li> */}
          <button
            type="button"
            className="add-ticket"
            onClick={handleTicketAddition}
          >
            Add to Cart
          </button>
        </ul>
      ) : null}
    </>
  );
}
