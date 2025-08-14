import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Registration from './pages/Registration';
import TicketBooking from './pages/TicketBooking';
import Sponsorship from './pages/Sponsorship';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Events from './pages/Events';

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>The Real Estate Games - Beyond The Game</title>
        <meta name="description" content="A first-of-its-kind inter-company sporting and networking event for real estate professionals." />
      </Helmet>
      
      <div className="App">
        <Navbar />
        <main>
                  <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/ticket-booking" element={<TicketBooking />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App; 