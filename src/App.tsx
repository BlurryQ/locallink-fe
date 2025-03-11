import './App.css';
import { Routes, Route } from 'react-router-dom';

// components
import Footer from './components/Footer';
import Header from './components/Header';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
