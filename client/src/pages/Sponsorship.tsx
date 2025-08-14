import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Crown, Star, Award, CheckCircle } from 'lucide-react';

const SponsorshipContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 80px 20px 40px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled(motion.section)`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4ade80;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SubTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #4ade80;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #e5e5e5;
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const PackageCard = styled(motion.div)<{ isPremium?: boolean }>`
  background: ${props => props.isPremium 
    ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(74, 222, 128, 0.1) 100%)' 
    : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${props => props.isPremium ? '#4ade80' : 'rgba(74, 222, 128, 0.3)'};
  border-radius: 20px;
  padding: 40px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(74, 222, 128, 0.2);
  }
`;

const PackageHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const PackageIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #4ade80;
`;

const PackageTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #4ade80;
  margin-bottom: 10px;
`;

const PackagePrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4ade80;
  margin-bottom: 10px;
`;

const PackageSubtitle = styled.div`
  font-size: 1rem;
  color: #e5e5e5;
  font-style: italic;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const BenefitItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #e5e5e5;
  padding-left: 25px;
  position: relative;
  
  &:before {
    content: "✓";
    color: #4ade80;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: -15px;
  right: 20px;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ContactSection = styled.div`
  background: rgba(74, 222, 128, 0.1);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  margin-top: 60px;
  border: 1px solid rgba(74, 222, 128, 0.3);
`;

const ContactButton = styled(motion.button)`
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(74, 222, 128, 0.3);
  }
`;

const Sponsorship: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const packages = [
    {
      icon: <Crown size={48} />,
      title: "PLATINUM PACKAGE",
      price: "₦100,000,000",
      subtitle: "Designated as HEADLINE SPONSOR - 'Powered by Your Brand'",
      benefits: [
        "Exclusive branding on all event materials",
        "Exclusive Booth/activation stand at the event",
        "Custom Activation (e.g branded obstacle or VIP Lounge)",
        "Top tier visibility across all media platforms and influencer campaign",
        "Brand presentation at the opening and closing ceremonies",
        "30 complimentary seat slots",
        "VIP seating and branded gift packages for company executives",
        "5 Minutes branded video showcase on screen during the event",
        "Inclusion in post event documentary and photobook"
      ],
      isPremium: true
    },
    {
      icon: <Star size={48} />,
      title: "CO-SPONSOR POSITION",
      price: "Contact Us",
      subtitle: "Prominent Partnership Opportunity",
      benefits: [
        "Prominent logo placement on event materials, media banners & jersey",
        "Booth/activation stand at the event",
        "Top tier visibility across all media platforms and influencer campaign",
        "20 complimentary seat slots",
        "5 Minutes branded video showcase on screen during the event",
        "Inclusion in post event documentary and photobook",
        "VIP seating and branded gift packages for company executives"
      ],
      isPremium: false
    },
    {
      icon: <Award size={48} />,
      title: "GOLD SPONSORSHIP",
      price: "Contact Us",
      subtitle: "Premium Partnership Package",
      benefits: [
        "Shared branding across social media and event screens",
        "Recognition in event program and welcome speech",
        "10 complimentary seat slots",
        "Booth/activation stand at the event",
        "Reserved seating for representatives"
      ],
      isPremium: false
    }
  ];

  return (
    <SponsorshipContainer>
      <Content>
        <Section
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>Sponsorship Opportunities</SectionTitle>
          <Text>
            Join us as a sponsor and be part of the most innovative sporting and networking event 
            in the Nigerian real estate industry. Our sponsorship packages offer unparalleled 
            visibility and engagement opportunities with industry leaders and professionals.
          </Text>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SubTitle>Why Sponsor Real Estate Games 2025?</SubTitle>
          <Text>
            The Real Estate Games 2025 offers sponsors unique opportunities to connect with 
            decision-makers, showcase their brand to a targeted audience, and demonstrate 
            their commitment to industry wellness and collaboration.
          </Text>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PackagesGrid>
            {packages.map((pkg, index) => (
              <PackageCard
                key={index}
                isPremium={pkg.isPremium}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                {pkg.isPremium && <PremiumBadge>Most Popular</PremiumBadge>}
                <PackageHeader>
                  <PackageIcon>{pkg.icon}</PackageIcon>
                  <PackageTitle>{pkg.title}</PackageTitle>
                  <PackagePrice>{pkg.price}</PackagePrice>
                  <PackageSubtitle>{pkg.subtitle}</PackageSubtitle>
                </PackageHeader>
                <BenefitsList>
                  {pkg.benefits.map((benefit, benefitIndex) => (
                    <BenefitItem key={benefitIndex}>{benefit}</BenefitItem>
                  ))}
                </BenefitsList>
              </PackageCard>
            ))}
          </PackagesGrid>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ContactSection>
            <SubTitle>Ready to Partner With Us?</SubTitle>
            <Text>
              Contact our sponsorship team to discuss custom packages and opportunities 
              that align with your brand objectives and budget.
            </Text>
            <ContactButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Sponsorship Team
            </ContactButton>
          </ContactSection>
        </Section>
      </Content>
    </SponsorshipContainer>
  );
};

export default Sponsorship; 