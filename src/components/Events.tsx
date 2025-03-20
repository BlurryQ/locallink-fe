import '../styles/events.css';
import { useEffect, useState } from 'react';

// api
import { getEventByOrganiser, getEvents } from '../apis/events.api';

// type
import { EventType } from '../types/EventType';
import EventsCard from './EventsCards';

// spinner
import Lottie from 'lottie-react';
import searching from '../assets/spinners/searching.json';
import { useUser } from '../context/UserContext';

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  const url: string = window.location.pathname;
  const usersEventsOnly: boolean = url.split('/')[2] === 'mine';

  useEffect(() => {
    async function fetchEvents() {
      if (!user.id) return;
      try {
        setLoading(true);
        if (usersEventsOnly) {
          const data = await getEventByOrganiser(user.id);
          setEvents(data.events);
        } else {
          const data = await getEvents();
          setEvents(data.events);
        }
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
        {!loading && events.length > 0 ? (
          events.map((event: EventType) => {
            return (
              <div key={event.id} className="events-card">
                <EventsCard event={event} usersEvents={usersEventsOnly} />
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
