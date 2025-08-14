import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  ArrowUp,
  Shield
} from 'lucide-react';

const FooterContainer = styled.footer`
  background: var(--dark-bg);
  border-top: 1px solid rgba(0, 255, 136, 0.1);
  padding: 4rem 0 2rem;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: var(--primary-green);
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  p {
    color: var(--gray);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--gray);
  
  .icon {
    color: var(--primary-green);
    flex-shrink: 0;
  }
  
  a {
    color: var(--gray);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-green);
    }
  }
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  a {
    color: var(--gray);
    text-decoration: none;
    transition: var(--transition);
    padding: 0.25rem 0;
    
    &:hover {
      color: var(--primary-green);
      transform: translateX(5px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: var(--dark-bg-secondary);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray);
  text-decoration: none;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-green);
    color: var(--dark-bg);
    border-color: var(--primary-green);
    transform: translateY(-2px);
    box-shadow: var(--shadow-green);
  }
`;

const BankInfo = styled.div`
  background: var(--dark-bg-secondary);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-top: 1rem;
  
  h4 {
    color: var(--primary-green);
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .bank-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--gray);
    
    .detail {
      display: flex;
      justify-content: space-between;
      
      .label {
        font-weight: 500;
      }
      
      .value {
        color: var(--white);
      }
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(0, 255, 136, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .heart-icon {
    color: var(--primary-green);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const ScrollToTop = styled(motion.button)`
  background: var(--primary-green);
  color: var(--dark-bg);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-green);
  
  &:hover {
    background: var(--primary-green-light);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4);
  }
`;

const AdminLink = styled(Link)`
  color: var(--gray);
  text-decoration: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  opacity: 0.7;
  
  &:hover {
    color: var(--primary-green);
    opacity: 1;
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Events' },
    { path: '/team', label: 'Team' },
    { path: '/sponsorship', label: 'Sponsorship' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>About The Real Estate Games</h3>
            <p>
              A first-of-its-kind inter-company sporting and networking event for real estate professionals. 
              Promoting wellness, networking, and unity in Nigeria's built environment sector.
            </p>
            <SocialLinks>
              <SocialLink href="https://instagram.com/marygold_official" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="https://instagram.com/marygold_tv" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="https://facebook.com/marygoldproduction" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="https://twitter.com/marygoldprod" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <QuickLinks>
              {quickLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </QuickLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Information</h3>
            <ContactInfo>
              <ContactItem>
                <Mail className="icon" size={20} />
                <a href="mailto:marygoldmedia11@gmail.com">marygoldmedia11@gmail.com</a>
              </ContactItem>
              <ContactItem>
                <Phone className="icon" size={20} />
                <a href="tel:+2348147128597">+234 814 712 8597</a>
              </ContactItem>
              <ContactItem>
                <Phone className="icon" size={20} />
                <a href="tel:+2348122903836">+234 812 290 3836</a>
              </ContactItem>
              <ContactItem>
                <MapPin className="icon" size={20} />
                <span>Lagos, Nigeria</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>

          <FooterSection>
            <h3>Bank Details</h3>
            <BankInfo>
              <h4>Payment Information</h4>
              <div className="bank-details">
                <div className="detail">
                  <span className="label">Account Number:</span>
                  <span className="value">2001999834</span>
                </div>
                <div className="detail">
                  <span className="label">Account Name:</span>
                  <span className="value">Marygold Production</span>
                </div>
                <div className="detail">
                  <span className="label">Bank:</span>
                  <span className="value">FCMB</span>
                </div>
              </div>
            </BankInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Copyright>
              <Heart className="heart-icon" size={16} />
              <span>© 2025 Marygold Production. All rights reserved.</span>
            </Copyright>
            
            <AdminLink to="/admin/login" title="Admin Panel">
              <Shield size={14} />
              Admin
            </AdminLink>
          </div>
          
          <ScrollToTop
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </ScrollToTop>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 