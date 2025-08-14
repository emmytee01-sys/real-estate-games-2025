import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Target, 
  Users, 
  Award, 
  Globe, 
  TrendingUp, 
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Trophy,
  Zap
} from 'lucide-react';

const AboutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%);
  color: white;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(74,222,128,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #4ade80, #22c55e, #16a34a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #e5e5e5;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Section = styled(motion.section)`
  margin: 6rem 0;
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #4ade80;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #e5e5e5;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const VisionMissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const VisionMissionCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
  border: 2px solid rgba(74, 222, 128, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    border-color: #4ade80;
    box-shadow: 0 20px 40px rgba(74, 222, 128, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4ade80, #22c55e);
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #4ade80;
  margin-bottom: 1rem;
`;

const CardContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #e5e5e5;
`;

const ObjectivesSection = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 4rem 2rem;
  margin-top: 4rem;
  border: 1px solid rgba(74, 222, 128, 0.1);
`;

const ObjectivesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ObjectiveCard = styled(motion.div)`
  background: rgba(74, 222, 128, 0.05);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #4ade80;
    box-shadow: 0 10px 30px rgba(74, 222, 128, 0.15);
  }
`;

const ObjectiveIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const ObjectiveTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4ade80;
  margin-bottom: 1rem;
`;

const ObjectiveText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #e5e5e5;
`;

const ActivitiesSection = styled.div`
  margin-top: 4rem;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ActivityCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
  border: 2px solid rgba(74, 222, 128, 0.2);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: #4ade80;
    box-shadow: 0 15px 35px rgba(74, 222, 128, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #4ade80, #22c55e);
  }
`;

const ActivityIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: block;
`;

const ActivityTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  color: #4ade80;
  margin-bottom: 1rem;
`;

const ActivityDescription = styled.p`
  font-size: 1rem;
  color: #e5e5e5;
  line-height: 1.6;
`;

const EventDetailsSection = styled.div`
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%);
  border-radius: 25px;
  padding: 4rem 2rem;
  margin-top: 4rem;
  border: 2px solid rgba(74, 222, 128, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
  position: relative;
  z-index: 2;
`;

const DetailItem = styled(motion.div)`
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem 1.5rem;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #4ade80;
    box-shadow: 0 10px 25px rgba(74, 222, 128, 0.15);
  }
`;

const DetailIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const DetailLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #4ade80;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DetailValue = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #e5e5e5;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 3rem auto 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(74, 222, 128, 0.3);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  color: rgba(74, 222, 128, 0.1);
  font-size: 2rem;
`;

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const objectives = [
    {
      icon: <Users size={24} />,
      title: "Foster Collaboration",
      text: "Build collaborative relationships within the real estate industry and society"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Create Maximum Buzz",
      text: "Generate excitement across Nigeria's business, lifestyle, and sports media"
    },
    {
      icon: <Award size={24} />,
      title: "Premier Positioning",
      text: "Establish the Games as the premier fitness and networking event"
    },
    {
      icon: <Star size={24} />,
      title: "Attract Top Talent",
      text: "Bring together top-tier real estate brands and professionals nationwide"
    },
    {
      icon: <Heart size={24} />,
      title: "Strategic Partnerships",
      text: "Secure strategic sponsorship and valuable partnerships"
    },
    {
      icon: <Globe size={24} />,
      title: "Digital Virality",
      text: "Drive public engagement and create digital virality"
    },
    {
      icon: <Target size={24} />,
      title: "Brand Establishment",
      text: "Establish the NREG brand as an annual landmark event"
    },
    {
      icon: <Zap size={24} />,
      title: "Industry Innovation",
      text: "Promote innovation and growth in the real estate sector"
    }
  ];

  const activities = [
    { icon: "⚽", title: "Football", description: "Competitive football matches bringing together real estate professionals in friendly competition" },
    { icon: "🏃", title: "Athletics", description: "Track and field events including sprints, relays, and team athletics competitions" },
    { icon: "🔄", title: "Tug of War", description: "Team building activity promoting collaboration and unity among participants" },
    { icon: "🎭", title: "Match Pass", description: "Special tribute and recognition ceremony for Governor and distinguished dignitaries" },
    { icon: "⭐", title: "Celebrities", description: "Live appearances and exclusive hangouts with Nigerian celebrities and influencers" },
    { icon: "🍽️", title: "Dinner Party", description: "Networking dinner with industry leaders and stakeholders" },
  ];

  const eventDetails = [
    { icon: <Calendar size={24} />, label: "Date", value: "October 2025" },
    { icon: <MapPin size={24} />, label: "Venue", value: "Mobolaji Johnson Arena, Onikan, Lagos, Nigeria" },
    { icon: <Users size={24} />, label: "Participants", value: "500+ Professionals" },
    { icon: <Trophy size={24} />, label: "Duration", value: "2 Days" },
  ];

  return (
    <AboutContainer>
      <HeroSection>
        <FloatingElements>
          <FloatingElement
            animate={{ y: [0, -20, 0], rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: '20%', left: '10%' }}
          >
            ⚽
          </FloatingElement>
          <FloatingElement
            animate={{ y: [0, 20, 0], rotate: [360, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: '60%', right: '15%' }}
          >
            🏆
          </FloatingElement>
          <FloatingElement
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: '30%', right: '30%' }}
          >
            🏃
          </FloatingElement>
        </FloatingElements>
        
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Real Estate Games 2025
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            An innovative sporting and networking event that brings together stakeholders from across 
            the public and private sectors to engage in sports, exhibitions, idea exchange, and 
            relationship-building in a non-formal, wellness-focused atmosphere.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <Content>
        <Section
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader>
            <SectionTitle>Vision & Mission</SectionTitle>
            <SectionSubtitle>
              Our guiding principles that drive the Real Estate Games forward
            </SectionSubtitle>
          </SectionHeader>

          <VisionMissionGrid>
            <VisionMissionCard
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <CardIcon>
                <Target size={32} />
              </CardIcon>
              <CardTitle>Vision</CardTitle>
              <CardContent>
                To build a collaborative, healthy, and innovative real estate ecosystem through 
                sports and strategic networking, fostering industry growth and community development.
              </CardContent>
            </VisionMissionCard>

            <VisionMissionCard
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <CardIcon>
                <Award size={32} />
              </CardIcon>
              <CardTitle>Mission</CardTitle>
              <CardContent>
                To foster industry wellness, inter-agency collaboration, and policy-aligned growth 
                through an engaging, annual sports and networking event that unites the sector.
              </CardContent>
            </VisionMissionCard>
          </VisionMissionGrid>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle>Our Objectives</SectionTitle>
            <SectionSubtitle>
              Strategic goals that drive the success of Real Estate Games 2025
            </SectionSubtitle>
          </SectionHeader>

          <ObjectivesSection>
            <ObjectivesGrid>
              {objectives.map((objective, index) => (
                <ObjectiveCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <ObjectiveIcon>{objective.icon}</ObjectiveIcon>
                  <ObjectiveTitle>{objective.title}</ObjectiveTitle>
                  <ObjectiveText>{objective.text}</ObjectiveText>
                </ObjectiveCard>
              ))}
            </ObjectivesGrid>
          </ObjectivesSection>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionHeader>
            <SectionTitle>Event Activities</SectionTitle>
            <SectionSubtitle>
              Exciting activities and competitions that make the Real Estate Games unique
            </SectionSubtitle>
          </SectionHeader>

          <ActivitiesSection>
            <ActivitiesGrid>
              {activities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <ActivityIcon>{activity.icon}</ActivityIcon>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityDescription>{activity.description}</ActivityDescription>
                </ActivityCard>
              ))}
            </ActivitiesGrid>
          </ActivitiesSection>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>Event Details</SectionTitle>
            <SectionSubtitle>
              Everything you need to know about the Real Estate Games 2025
            </SectionSubtitle>
          </SectionHeader>

          <EventDetailsSection>
            <DetailsGrid>
              {eventDetails.map((detail, index) => (
                <DetailItem
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <DetailIcon>{detail.icon}</DetailIcon>
                  <DetailLabel>{detail.label}</DetailLabel>
                  <DetailValue>{detail.value}</DetailValue>
                </DetailItem>
              ))}
            </DetailsGrid>

            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/registration'}
            >
              Register Your Team
              <ArrowRight size={20} />
            </CTAButton>
          </EventDetailsSection>
        </Section>
      </Content>
    </AboutContainer>
  );
};

export default About; 