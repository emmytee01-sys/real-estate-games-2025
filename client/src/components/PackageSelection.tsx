import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Check, Crown, Star, Award, ArrowRight } from 'lucide-react';

const PackageSelectionContainer = styled.div`
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

const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled(motion.div)<{ $isSelected: boolean; $isPremium?: boolean }>`
  background: var(--dark-bg);
  border: 2px solid ${props => props.$isSelected ? 'var(--primary-green)' : 'rgba(0, 255, 136, 0.1)'};
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  position: relative;
  transition: var(--transition);
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary-green);
    transform: translateY(-5px);
    box-shadow: var(--shadow-green);
  }
  
  ${props => props.$isPremium && `
    &::before {
      content: '🏆 MOST POPULAR';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
      color: var(--dark-bg);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `}
`;

const PackageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
    color: var(--dark-bg);
  }
  
  h3 {
    color: var(--primary-green);
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: var(--gray);
    font-size: 0.9rem;
  }
`;

const PackageContent = styled.div`
  .section {
    margin-bottom: 1.5rem;
    
    h4 {
      color: var(--primary-green);
      margin-bottom: 0.75rem;
      font-size: 1rem;
    }
  }
  
  .games-list, .prizes-list {
    list-style: none;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      color: var(--gray);
      
      .check-icon {
        color: var(--primary-green);
        margin-right: 0.5rem;
        flex-shrink: 0;
      }
    }
  }
`;

const ContinueButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
  color: var(--dark-bg);
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-green);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

interface PackageSelectionProps {
  onPackageSelect: (packageData: {
    package: string;
    price: number;
    games: string[];
    prizes: string[];
  }) => void;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({ onPackageSelect }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'silver',
      name: 'Silver',
      price: 250000,
      icon: <Award size={32} />,
      games: [
        'Match Pass Parade',
        'Race',
        'Tug of War'
      ],
      prizes: [
        'Golden Medals 🏅',
        '₦2,000,000 Cash Prize',
        'Media Publicity Tour',
        '5 Jerseys',
        '20 Event Access Cards'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 500000,
      icon: <Star size={32} />,
      games: [
        'Football',
        'Match Pass Parade',
        'Tug of War'
      ],
      prizes: [
        'Golden Trophy',
        '₦5,000,000 Cash Reward',
        'Media Publicity Tour',
        '15 Jerseys',
        '40 Event Access Cards'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 1000000,
      icon: <Crown size={32} />,
      games: [
        'Football Race',
        'Match Pass Parade',
        'Tug of War'
      ],
      prizes: [
        'Golden Trophy',
        'Golden Medal 🏅',
        '₦8,000,000 Cash Prize',
        'Media Publicity Tour',
        '20 Jerseys',
        '60 Event Access Cards'
      ],
      isPremium: true
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleContinue = () => {
    if (selectedPackage) {
      const selected = packages.find(p => p.id === selectedPackage);
      if (selected) {
        onPackageSelect({
          package: selected.name,
          price: selected.price,
          games: selected.games,
          prizes: selected.prizes
        });
      }
    }
  };

  return (
    <PackageSelectionContainer>
      <Container>
        <Header>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Choose Your <span className="text-green">Application Package</span>
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Select the package that best suits your team's interests and budget. 
            Each package includes different games and exciting prizes.
          </motion.p>
        </Header>

        <PackageGrid>
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              $isSelected={selectedPackage === pkg.id}
              $isPremium={pkg.isPremium}
              onClick={() => handlePackageSelect(pkg.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <PackageHeader>
                <div className="icon">{pkg.icon}</div>
                <h3>{pkg.name}</h3>
                <div className="price">₦{(pkg.price / 1000).toLocaleString()}K</div>
                <div className="subtitle">Application Fee</div>
              </PackageHeader>

              <PackageContent>
                <div className="section">
                  <h4>Games Included:</h4>
                  <ul className="games-list">
                    {pkg.games.map((game, idx) => (
                      <li key={idx}>
                        <Check className="check-icon" size={16} />
                        {game}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h4>Winning Prizes:</h4>
                  <ul className="prizes-list">
                    {pkg.prizes.map((prize, idx) => (
                      <li key={idx}>
                        <Check className="check-icon" size={16} />
                        {prize}
                      </li>
                    ))}
                  </ul>
                </div>
              </PackageContent>
            </PackageCard>
          ))}
        </PackageGrid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <ContinueButton
            onClick={handleContinue}
            disabled={!selectedPackage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Registration
            <ArrowRight size={20} />
          </ContinueButton>
        </motion.div>
      </Container>
    </PackageSelectionContainer>
  );
};

export default PackageSelection; 