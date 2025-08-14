import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy,
  Star,
  Award
} from 'lucide-react';

const EventsContainer = styled.div`
  min-height: 100vh;
  padding: 120px 0 4rem;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-bg-secondary) 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    margin-bottom: 1rem;
  }
  
  .subtitle {
    color: var(--gray);
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Section = styled.section`
  margin-bottom: 6rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 3rem;
  
  .text-green {
    color: var(--primary-green);
  }
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ActivityCard = styled(motion.div)`
  background: var(--dark-bg);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-green);
    transform: translateY(-5px);
    box-shadow: var(--shadow-green);
  }
  
  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: var(--primary-green);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--gray);
    line-height: 1.6;
  }
`;

const ScheduleSection = styled.div`
  background: var(--dark-bg);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  margin-top: 3rem;
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DaySchedule = styled.div`
  h3 {
    color: var(--primary-green);
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const EventItem = styled.div`
  background: var(--dark-bg-secondary);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  .time {
    color: var(--primary-green);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .title {
    color: var(--white);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .description {
    color: var(--gray);
    font-size: 0.9rem;
  }
`;

const PrizesSection = styled.div`
  margin-top: 4rem;
`;

const PrizesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PrizeCard = styled(motion.div)`
  background: var(--dark-bg);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  text-align: center;
  
  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h4 {
    color: var(--primary-green);
    margin-bottom: 1rem;
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 0.5rem;
  }
  
  .description {
    color: var(--gray);
    line-height: 1.6;
  }
`;

const Events: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const activities = [
    {
      icon: "⚽",
      title: "Football",
      description: "Competitive football matches between real estate companies"
    },
    {
      icon: "🏃",
      title: "Athletics",
      description: "Track and field events including sprints and relays"
    },
    {
      icon: "🔄",
      title: "Tug of War",
      description: "Team strength and coordination competition"
    },
    {
      icon: "🏀",
      title: "Basketball",
      description: "Fast-paced basketball tournaments"
    },
    {
      icon: "🎾",
      title: "Table Tennis",
      description: "Individual and team table tennis competitions"
    },
    {
      icon: "🏆",
      title: "Awards Ceremony",
      description: "Grand celebration and prize distribution"
    }
  ];

  const day1Schedule = [
    {
      time: "8:00 AM",
      title: "Registration & Check-in",
      description: "Team registration and event briefing"
    },
    {
      time: "9:00 AM",
      title: "Opening Ceremony",
      description: "Welcome address and event kickoff"
    },
    {
      time: "10:00 AM",
      title: "Football Matches",
      description: "Group stage football competitions"
    },
    {
      time: "2:00 PM",
      title: "Athletics Events",
      description: "Track and field competitions"
    },
    {
      time: "4:00 PM",
      title: "Tug of War",
      description: "Team strength competitions"
    },
    {
      time: "6:00 PM",
      title: "Day 1 Wrap-up",
      description: "Results announcement and team dinner"
    }
  ];

  const day2Schedule = [
    {
      time: "9:00 AM",
      title: "Basketball Tournament",
      description: "Basketball quarter-finals and semi-finals"
    },
    {
      time: "11:00 AM",
      title: "Table Tennis",
      description: "Individual and team table tennis"
    },
    {
      time: "2:00 PM",
      title: "Football Finals",
      description: "Championship football matches"
    },
    {
      time: "4:00 PM",
      title: "Awards Ceremony",
      description: "Prize distribution and recognition"
    },
    {
      time: "6:00 PM",
      title: "After Party",
      description: "Celebration at Orientals Hotel"
    }
  ];

  const prizes = [
    {
      icon: "🏆",
      title: "Golden Trophy",
      value: "Championship Trophy",
      description: "Exclusive championship trophy for the winning team"
    },
    {
      icon: "🥇",
      title: "Golden Medal",
      value: "Winner's Medal",
      description: "Prestigious gold medals for all winning team members"
    },
    {
      icon: "💰",
      title: "Cash Prize",
      value: "10M Naira",
      description: "Substantial cash prize pool for winning teams"
    },
    {
      icon: "📺",
      title: "Media Tour",
      value: "Radio & TV",
      description: "Exclusive media publicity tour for winners"
    }
  ];

  return (
    <EventsContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Event <span className="text-green">Activities</span>
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Each company competes in team-based games designed to test skills, build camaraderie, 
            and create unforgettable experiences.
          </motion.p>
        </Header>

        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Sports <span className="text-green">Activities</span>
          </SectionTitle>
          
          <ActivitiesGrid>
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="icon">{activity.icon}</div>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </Section>

        <Section ref={ref}>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Event <span className="text-green">Schedule</span>
          </SectionTitle>
          
          <ScheduleSection>
            <ScheduleGrid>
              <DaySchedule>
                <h3>Day 1 - October 17th, 2025</h3>
                {day1Schedule.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <EventItem>
                      <div className="time">{event.time}</div>
                      <div className="title">{event.title}</div>
                      <div className="description">{event.description}</div>
                    </EventItem>
                  </motion.div>
                ))}
              </DaySchedule>
              
              <DaySchedule>
                <h3>Day 2 - October 18th, 2025</h3>
                {day2Schedule.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <EventItem>
                      <div className="time">{event.time}</div>
                      <div className="title">{event.title}</div>
                      <div className="description">{event.description}</div>
                    </EventItem>
                  </motion.div>
                ))}
              </DaySchedule>
            </ScheduleGrid>
          </ScheduleSection>
        </Section>

        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Prizes & <span className="text-green">Rewards</span>
          </SectionTitle>
          
          <PrizesSection>
            <PrizesGrid>
              {prizes.map((prize, index) => (
                <PrizeCard
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="icon">{prize.icon}</div>
                  <h4>{prize.title}</h4>
                  <div className="value">{prize.value}</div>
                  <div className="description">{prize.description}</div>
                </PrizeCard>
              ))}
            </PrizesGrid>
          </PrizesSection>
        </Section>
      </Container>
    </EventsContainer>
  );
};

export default Events; 