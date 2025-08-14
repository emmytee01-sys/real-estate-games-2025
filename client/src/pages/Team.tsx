import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Heart } from 'lucide-react';

const TeamContainer = styled.div`
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const TeamMemberCard = styled(motion.div)`
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
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 3rem;
    color: var(--dark-bg);
    font-weight: 700;
  }
  
  h3 {
    color: var(--primary-green);
    margin-bottom: 0.5rem;
  }
  
  .position {
    color: var(--gray);
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .description {
    color: var(--gray);
    line-height: 1.6;
    font-size: 0.9rem;
  }
`;

const Team: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const teamMembers = [
    {
      name: "Amuda Marygold",
      position: "Project Director & Event Convenier",
      avatar: "AM",
      description: "Leading the vision and execution of The Real Estate Games with passion and expertise."
    },
    {
      name: "Victor Adaha",
      position: "Director of Corporate Communications",
      avatar: "VA",
      description: "Managing all corporate communications and public relations for the event."
    },
    {
      name: "Oladapo Emmanuel",
      position: "Director of Sports",
      avatar: "OE",
      description: "Overseeing all sports activities and ensuring fair competition standards."
    },
    {
      name: "Okeowo Bolarinwa",
      position: "Head of Production",
      avatar: "OB",
      description: "Managing the technical and production aspects of the event."
    },
    {
      name: "Wale Samson",
      position: "Head of Technical",
      avatar: "WS",
      description: "Ensuring all technical requirements and infrastructure are properly managed."
    },
    {
      name: "Oduwale Taye",
      position: "Head of Operations",
      avatar: "OT",
      description: "Coordinating day-to-day operations and logistics for seamless event execution."
    }
  ];

  return (
    <TeamContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="text-green">Team</span>
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the dedicated professionals behind The Real Estate Games, committed to creating 
            an unforgettable experience for all participants.
          </motion.p>
        </Header>

        <TeamGrid ref={ref}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="avatar">{member.avatar}</div>
              <h3>{member.name}</h3>
              <div className="position">{member.position}</div>
              <p className="description">{member.description}</p>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamContainer>
  );
};

export default Team; 