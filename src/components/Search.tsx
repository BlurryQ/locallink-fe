import { useState } from 'react';
import '../styles/search.css';
import { EventType } from '../types/EventType';
import { getEvents } from '../apis/events.api';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [matchingEvents, setMatchingEvents] = useState<EventType[]>([]);

  const handleSearch = async (e: any) => {
    const text: string = e.target.value;
    setSearchTerm(text);
    if (!text || text.length < 3) return setMatchingEvents([]);
    if (searchTerm.length < 3) return;
    const allEvents: { events: EventType[] } = await getEvents();
    const events: EventType[] = allEvents.events;
    const filteredEvents: EventType[] = events.filter((event: EventType) => {
      const lowerCaseName: string = event.name.toLocaleLowerCase();
      return lowerCaseName.includes(searchTerm.toLocaleLowerCase());
    });
    setMatchingEvents(filteredEvents);
  };

  return (
    <div className="search">
      <input
        className="search-bar"
        type="text"
        placeholder="Search concerts, conferences, meet ups and more"
        onChange={handleSearch}
        autoFocus
      />
      <ul className="search-results">
        {matchingEvents.length > 0
          ? matchingEvents.map((event) => {
              return (
                <li key={event.id}>
                  <a
                    href={`https://locallink-fe.netlify.app/events/${event.id}`}
                  >
                    {event.name}
                  </a>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
