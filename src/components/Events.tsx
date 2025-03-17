import '../styles/events.css';
import { useEffect, useState } from 'react';

// api
import getEvents from '../api/getEvents';

// type
import { EventType } from '../types/EventType';
import EventsCard from './EventsCards';

// spinner
import Lottie from 'lottie-react';
import searching from '../assets/spinners/searching.json';

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data.events);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ width: '300px', margin: 'auto' }}>
          <Lottie animationData={searching} loop={true} />
        </div>
      ) : null}
      <div className="events-list">
        {!loading && events.length > 1 ? (
          events.map((event: EventType) => {
            return (
              <div key={event.id} className="events-card">
                <EventsCard event={event} />
              </div>
            );
          })
        ) : (
          /* improve below */
          <>No events found</>
        )}
      </div>
    </>
  );
}
