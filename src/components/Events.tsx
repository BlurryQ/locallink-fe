import '../styles/events.css';
import { useEffect, useState } from 'react';

// api
import { getEventByOrganiser, getEvents } from '../apis/events.api';

// component
import LottieLoader from './LottieLoader';

// context
import { useUser } from '../context/UserContext';

// types
import { EventType } from '../types/EventType';
import EventsCard from './EventsCards';

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  // get URL and check if /events/mine (users events) or not
  const url: string = window.location.pathname;
  const usersEventsOnly: boolean = url.split('/')[2] === 'mine';

  useEffect(() => {
    setLoading(true);
    async function fetchEvents() {
      try {
        if (usersEventsOnly && user.id) {
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
      {loading ? <LottieLoader type="searching" /> : null}
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
          <h3 className="none-found">No events found</h3>
        )}
      </div>
    </>
  );
}
