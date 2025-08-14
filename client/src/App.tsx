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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>The Real Estate Games - Beyond The Game</title>
        <meta name="description" content="A first-of-its-kind inter-company sporting and networking event for real estate professionals." />
      </Helmet>
      
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <main>
                <About />
              </main>
              <Footer />
            </>
          } />
          <Route path="/registration" element={
            <>
              <Navbar />
              <main>
                <Registration />
              </main>
              <Footer />
            </>
          } />
          <Route path="/ticket-booking" element={
            <>
              <Navbar />
              <main>
                <TicketBooking />
              </main>
              <Footer />
            </>
          } />
          <Route path="/sponsorship" element={
            <>
              <Navbar />
              <main>
                <Sponsorship />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main>
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/team" element={
            <>
              <Navbar />
              <main>
                <Team />
              </main>
              <Footer />
            </>
          } />
          <Route path="/events" element={
            <>
              <Navbar />
              <main>
                <Events />
              </main>
              <Footer />
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App; 