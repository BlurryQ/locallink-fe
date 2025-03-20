import '../styles/cart.css';
import { useLocation } from 'react-router-dom';

// images
import formatEventTime from '../utils/formatEventTime';
import BuyTickets from './BuyTickets';
import capitalizeFirstLetterOfEachWord from '../utils/capitaliseFirstLetterOfEachWord';
import getImage from '../utils/getImage';

export default function Cart() {
  const location = useLocation();
  if (!location.state) return <h2>Your cart is empty</h2>;
  const { event } = location.state;

  return (
    <>
      <h2 className="order-screen">Cart</h2>
      <div className="cart">
        <div>
          <h3 className="title">
            {capitalizeFirstLetterOfEachWord(event.name)}
          </h3>
          <img
            src={getImage(event.image_url)}
            alt="Event image"
            className={event.image_url === 'default' ? 'placeholder' : ''}
          />
        </div>
        <div className="column date-location">
          <p className="date">{formatEventTime(event.start)}</p>
          <div className="location">
            <p>{event.location.name}</p>
            <p>{event.location.street}</p>
            <p>{event.location.city}</p>
          </div>
        </div>
        <BuyTickets event={event} redirect={'/tickets'} />
      </div>
    </>
  );
}
