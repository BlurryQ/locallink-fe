import '../styles/event.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// apis
import { getEventByID } from '../apis/events.api';

// components
import BuyTickets from './BuyTickets';

// types
import { EventType } from '../types/EventType';

// utils
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';
import formatEventTime from '../utils/formatEventTime';
import getImage from '../utils/getImage';

export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // if event exists and is more than 0 format it, else "Free"
  let totalCost: string =
    event && event.price > 0 ? (event.price / 100).toFixed(2) : 'Free';

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

  return (
    <>
      {loading ? 'loading' : null}
      {!loading && event ? (
        <ul className="event">
          <li className="title">
            {capitalizeFirstLetterOfEachWord(event.name)}
          </li>
          <li>
            <img
              src={getImage(event.category)}
              alt={`${event.category} image`}
            />
          </li>
          <li>Start: {formatEventTime(event.start)}</li>
          <li>End: {formatEventTime(event.end)}</li>
          <li>Ticket Price: £{totalCost}</li>
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
          <BuyTickets event={event} redirect={'/cart'} />
        </ul>
      ) : null}
    </>
  );
}
