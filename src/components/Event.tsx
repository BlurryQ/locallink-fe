import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventType } from '../types/EventType';
import getEventByID from '../api/getEventByID';
import logo from '../assets/logo.png';

export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <>
      {loading ? 'loading' : null}
      {!loading && event ? (
        <ul>
          <li>
            <strong>Image:</strong>{' '}
            <img
              src={event.image_url === 'default' ? logo : event.image_url}
              alt="Event image"
              style={{ width: '200px' }}
            />
          </li>
          <li>
            <strong>Name:</strong> {event.name}
          </li>
          <li>
            <strong>Start:</strong> {event.start.toLocaleString()}
          </li>
          <li>
            <strong>End:</strong> {event.end.toLocaleString()}
          </li>
          <li>
            <strong>Location:</strong>
            <ul>
              <li>
                <strong>Name:</strong> {event.location.name}
              </li>
              <li>
                <strong>Street:</strong> {event.location.street}
              </li>
              <li>
                <strong>City:</strong> {event.location.city}
              </li>
              <li>
                <strong>Country:</strong> {event.location.country}
              </li>
              <li>
                <strong>Postcode:</strong> {event.location.postcode}
              </li>
            </ul>
          </li>
          <li>
            <strong>Organiser:</strong> {event.organiser}
          </li>
          <li>
            <strong>Capacity:</strong> {event.capacity}
          </li>
          <li>
            <strong>Details:</strong> {event.details}
          </li>
          <li>
            <strong>Status:</strong> {event.status}
          </li>
          <li>
            <strong>Price:</strong> ${event.price.toFixed(2)}
          </li>
          <li>
            <strong>Category:</strong> {event.category}
          </li>
        </ul>
      ) : null}
    </>
  );
}
