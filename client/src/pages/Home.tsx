import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Target, 
  Heart,
  ArrowRight,
  Play,
  Star,
  Award
} from 'lucide-react';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,255,136,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroText = styled.div`
  h1 {
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--white) 0%, var(--primary-green) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .subtitle {
    font-size: 1.25rem;
    color: var(--gray);
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .highlight {
    color: var(--primary-green);
    font-weight: 600;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Link)`
  background: var(--primary-green);
  color: var(--dark-bg);
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  box-shadow: var(--shadow-green);
  
  &:hover {
    background: var(--primary-green-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4);
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: var(--white);
  padding: 1rem 2rem;
  border: 2px solid var(--primary-green);
  border-radius: var(--border-radius);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-green);
    color: var(--dark-bg);
    transform: translateY(-2px);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const LogoShield = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
  border: 3px solid #4ade80;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 20px 40px rgba(74, 222, 128, 0.2);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
    border-radius: 17px;
    z-index: 1;
  }
`;

const LogoImage = styled.img`
  position: relative;
  z-index: 2;
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 15px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  color: var(--primary-green);
  opacity: 0.6;
`;

const FeaturesSection = styled.section`
  padding: 6rem 0;
  background: var(--dark-bg-secondary);
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 4rem;
  
  .text-green {
    color: var(--primary-green);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: var(--dark-bg);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(0, 255, 136, 0.1);
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-green);
    transform: translateY(-5px);
    box-shadow: var(--shadow-green);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: var(--primary-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--dark-bg);
  font-size: 1.5rem;
`;

const EventDetailsSection = styled.section`
  padding: 6rem 0;
  background: var(--dark-bg);
`;

const EventDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const EventDetailCard = styled(motion.div)`
  background: var(--dark-bg-secondary);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  text-align: center;
  border: 1px solid rgba(0, 255, 136, 0.1);
  
  .icon {
    color: var(--primary-green);
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--primary-green);
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: var(--gray);
    font-weight: 500;
  }
`;

const CTAButton = styled(Link)`
  background: var(--primary-green);
  color: var(--dark-bg);
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  box-shadow: var(--shadow-green);
  margin-top: 2rem;
  
  &:hover {
    background: var(--primary-green-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4);
  }
`;

const Home: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <Trophy size={24} />,
      title: "Competitive Spirit",
      description: "Foster collaboration and friendly competition within the real estate industry"
    },
    {
      icon: <Users size={24} />,
      title: "Networking",
      description: "Connect with top-tier real estate brands and professionals nationwide"
    },
    {
      icon: <Target size={24} />,
      title: "Strategic Partnerships",
      description: "Secure strategic sponsorship and partnerships for your brand"
    },
    {
      icon: <Star size={24} />,
      title: "Media Exposure",
      description: "Maximum buzz across Nigeria's business, lifestyle, and sports media"
    },
    {
      icon: <Award size={24} />,
      title: "Premier Event",
      description: "Position as the premier fitness and networking event for the industry"
    },
    {
      icon: <Heart size={24} />,
      title: "Community Building",
      description: "Drive public engagement and establish the NREG brand as an annual landmark"
    }
  ];

  const eventDetails = [
    {
      icon: <Calendar size={32} />,
      value: "17th & 18th",
      label: "24th & 25th October 2025"
    },
    {
      icon: <MapPin size={32} />,
      value: "Mobolaji Johnson",
      label: "Stadium (Onikan)"
    },
    {
      icon: <Users size={32} />,
      value: "30 Companies",
      label: "Expected Participants"
    },
    {
      icon: <Trophy size={32} />,
      value: "10M Naira",
      label: "Cash Prize Pool"
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              THE REAL ESTATE GAMES
            </motion.h1>
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A first-of-its-kind inter-company sporting and networking event for real estate professionals. 
              <span className="highlight"> Beyond The Game</span> - promoting wellness, networking, and unity in Nigeria's built environment sector.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HeroButtons>
                <PrimaryButton to="/registration">
                  Register Your Team
                  <ArrowRight size={20} />
                </PrimaryButton>
                <SecondaryButton to="/ticket-booking">
                  <Play size={20} />
                  Book a seat for free
                </SecondaryButton>
              </HeroButtons>
            </motion.div>
          </HeroText>

          <HeroVisual>
            <LogoContainer
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <LogoShield>
                <LogoImage 
                  src="/game.png" 
                  alt="Real Estate Games Logo"
                />
              </LogoShield>
            </LogoContainer>

            <FloatingElements>
              <FloatingElement
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ top: '10%', left: '10%' }}
              >
                ⚽
              </FloatingElement>
              <FloatingElement
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ top: '20%', right: '15%' }}
              >
                🏆
              </FloatingElement>
              <FloatingElement
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                style={{ bottom: '30%', left: '5%' }}
              >
                🏃
              </FloatingElement>
            </FloatingElements>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      <FeaturesSection ref={ref}>
        <SectionContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Why <span className="text-green">Real Estate Games</span>?
          </SectionTitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </SectionContainer>
      </FeaturesSection>

      <EventDetailsSection>
        <SectionContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Event <span className="text-green">Details</span>
          </SectionTitle>
          
          <EventDetailsGrid>
            {eventDetails.map((detail, index) => (
              <EventDetailCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="icon">{detail.icon}</div>
                <div className="value">{detail.value}</div>
                <div className="label">{detail.label}</div>
              </EventDetailCard>
            ))}
          </EventDetailsGrid>
          
          <motion.div
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CTAButton to="/registration">
              Join the Competition
              <ArrowRight size={20} />
            </CTAButton>
          </motion.div>
        </SectionContainer>
      </EventDetailsSection>
    </HomeContainer>
  );
};

export default Home; 