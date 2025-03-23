import './App.css';
import { Routes, Route } from 'react-router-dom';

// context
import { UserProvider } from './context/UserContext';

// components
import Header from './components/Header';
import Cart from './components/Cart';
import Events from './components/Events';
import Event from './components/Event';
import EventForm from './components/EventForm';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Tickets from './components/Tickets';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/events/mine" element={<Events />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/edit/:eventID" element={<EventForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
