import './App.css';
import { Routes, Route } from 'react-router-dom';

// components
import Footer from './components/Footer';
import Header from './components/Header';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Events from './components/Events';
import Event from './components/Event';
import { UserProvider } from './context/UserContext';
import Cart from './components/Cart';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Header />
        <Routes>
          {/* <Route path="/" element={<h1>HOME</h1>} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          {/* add page not found */}
        </Routes>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
