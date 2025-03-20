import '../styles/eventForm.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// api
import getLongAndLatFromPostcode from '../apis/third-party/postcodes.api';
import { getEventByID, patchEvent, postEvent } from '../apis/events.api';
// import { postImageWithID } from '../apis/storage.api';

// context
import { useUser } from '../context/UserContext';

// images
import logo from '../assets/logo.png';

// types
import { EventType } from '../types/EventType';

// utils
import addOneHour from '../utils/addOneHour';

export default function EventForm() {
  const { eventID } = useParams();
  const currentTime: Date = new Date();
  const [eventName, setEventName] = useState<string>('');
  const [eventStart, setEventStart] = useState<Date>(currentTime);
  const [eventEnd, setEventEnd] = useState<Date>(addOneHour(currentTime));
  const [eventLocationName, setEventLocationName] = useState<string>('');
  const [eventLocationStreet, setEventLocationStreet] = useState<string>('');
  const [eventLocationCity, setEventLocationCity] = useState<string>('');
  const [eventLocationPostcode, setEventLocationPostcode] =
    useState<string>('');
  const [eventLocationCountry, setEventLocationCountry] = useState<string>('');
  const [eventCapacity, setEventCapacity] = useState<number>(1);
  const [eventDetails, setEventDetails] = useState<string>('');
  const [eventPrice, setEventPrice] = useState<string>('0');
  const [eventCategory, setEventCategory] = useState<string>('');
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  const getEventData = async (id: string) => {
    const event: EventType = await getEventByID(id);
    if (event) setAllEventDetails(event);
  };

  const setAllEventDetails = (event: EventType) => {
    setEventName(event.name);
    setEventStart(new Date(event.start));
    setEventEnd(new Date(event.end));
    setEventLocationName(event.location.name);
    setEventLocationStreet(event.location.street);
    setEventLocationCity(event.location.city);
    setEventLocationPostcode(event.location.postcode);
    setEventLocationCountry(event.location.country);
    setEventCapacity(event.capacity);
    setEventDetails(event.details);
    setEventPrice(String(event.price));
    setEventCategory(event.category);
  };

  useEffect(() => {
    if (eventID) {
      try {
        getEventData(eventID);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setEventImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const clearImageSelection = () => {
    setEventImage(null);
    setImageUrl(null);
  };

  const createEventObject = async (): Promise<EventType> => {
    const locationCoords = await getLongAndLatFromPostcode(
      eventLocationPostcode
    );
    const { latitude, longitude } = locationCoords;
    return {
      name: eventName,
      start: eventStart,
      end: eventEnd,
      location: {
        name: eventLocationName,
        street: eventLocationStreet,
        city: eventLocationCity,
        country: eventLocationCountry,
        postcode: eventLocationPostcode,
        coords: {
          lat: latitude,
          long: longitude,
        },
      },
      organiser: user.id || '',
      capacity: eventCapacity,
      details: eventDetails,
      status: 'upcoming',
      price: Number(eventPrice),
      category: eventCategory,
      /* TODO image URL after uplaod */
      image_url: imageUrl || 'default',
    };
  };

  const handleSubmit = async () => {
    const event: EventType = await createEventObject();
    if (!event.organiser) {
      console.error({ error: 'no user id' });
      return;
    }

    // if (!user.id || !eventImage) return;
    // const sendImage = await postImageWithID(user.id, eventImage);
    // console.log('sendImage', sendImage);

    try {
      if (eventID) {
        const result = await patchEvent(eventID, event);
        console.log(result);
      } else {
        const result = await postEvent(event);
        console.log(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="event-form">
      <h3>{eventID ? 'Edit' : 'Create a new'} event</h3>
      <form
        id="eventForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <img
          src={imageUrl || logo}
          alt="Selected"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        <label htmlFor="image-upload">Upload Image:</label>
        <div>
          <input
            type="file"
            id="image-upload"
            name="image-upload"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]; // Get the selected file
              if (file) handleImageChange(e);
            }}
          />
          {imageUrl ? (
            <button onClick={clearImageSelection}>Clear Selection</button>
          ) : null}
        </div>

        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          minLength={3}
          maxLength={64}
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
          required
        />

        <label htmlFor="start">Start Date and Time:</label>
        <input
          type="datetime-local"
          id="start"
          name="start"
          onChange={(e) => {
            const eventStartDate = new Date(e.target.value);
            setEventStart(eventStartDate);
            setEventEnd(addOneHour(eventStartDate));
          }}
          value={eventStart.toISOString().slice(0, 16)}
          required
        />

        <label htmlFor="end">End Date and Time:</label>
        <input
          type="datetime-local"
          id="end"
          name="end"
          onChange={(e) => {
            const eventEndDate = new Date(e.target.value);
            setEventEnd(eventEndDate);
          }}
          value={eventEnd.toISOString().slice(0, 16)}
          required
        />

        <label htmlFor="location-name">Building Name:</label>
        <input
          type="text"
          id="location-name"
          name="location-name"
          onChange={(e) => setEventLocationName(e.target.value)}
          value={eventLocationName}
        />
        <label htmlFor="location-street">Street:</label>
        <input
          type="text"
          id="location-street"
          name="location-street"
          onChange={(e) => setEventLocationStreet(e.target.value)}
          value={eventLocationStreet}
          required
        />
        <label htmlFor="location-city">City:</label>
        <input
          type="text"
          id="location-city"
          name="location-city"
          onChange={(e) => setEventLocationCity(e.target.value)}
          value={eventLocationCity}
          required
        />
        <label htmlFor="location-postcode">Postcode/ Zip:</label>
        <input
          type="text"
          id="location-postcode"
          name="location-postcode"
          onChange={(e) => setEventLocationPostcode(e.target.value)}
          value={eventLocationPostcode}
          required
        />
        <label htmlFor="location-country">Country:</label>
        <input
          type="text"
          id="location-country"
          name="location-country"
          onChange={(e) => setEventLocationCountry(e.target.value)}
          value={eventLocationCountry}
          required
        />

        <label htmlFor="capacity">Capacity:</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          min={1}
          onChange={(e) => setEventCapacity(Number(e.target.value))}
          value={eventCapacity}
          required
        />

        <label htmlFor="details">Event Details:</label>
        <textarea
          id="details"
          name="details"
          maxLength={2048}
          rows={5}
          cols={25}
          onChange={(e) => setEventDetails(e.target.value)}
          value={eventDetails}
          required
        ></textarea>

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          onChange={(e) => setEventPrice(e.target.value)}
          value={eventPrice}
          required
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          maxLength={32}
          onChange={(e) => setEventCategory(e.target.value)}
          value={eventCategory}
          required
        />

        <button type="submit" className="create-event">
          {eventID ? 'Edit Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
