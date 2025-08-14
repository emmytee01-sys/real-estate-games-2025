import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Menu, X, Heart } from 'lucide-react';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  transition: var(--transition);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--white);
  text-decoration: none;
  
  .heart-icon {
    color: var(--primary-green);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? 'var(--primary-green)' : 'var(--white)'};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-green);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: var(--primary-green);
    transition: var(--transition);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const CTAButton = styled(Link)`
  background: var(--primary-green);
  color: var(--dark-bg);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  box-shadow: var(--shadow-green);
  
  &:hover {
    background: var(--primary-green-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 255, 136, 0.4);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--dark-bg);
  border-top: 1px solid rgba(0, 255, 136, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? 'var(--primary-green)' : 'var(--white)'};
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-green);
  }
`;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Events' },
    { path: '/team', label: 'Team' },
    { path: '/sponsorship', label: 'Sponsorship' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        background: isScrolled ? 'rgba(26, 26, 26, 0.98)' : 'rgba(26, 26, 26, 0.95)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
      }}
    >
      <NavContent>
        <Logo to="/">
          <Heart className="heart-icon" size={24} />
          MARYGOLD PRODUCTION
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
          <CTAButton to="/registration">Register Now</CTAButton>
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </NavContent>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            ))}
            <CTAButton to="/registration" onClick={() => setIsMobileMenuOpen(false)}>
              Register Now
            </CTAButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar; 