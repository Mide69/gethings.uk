import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Crown, MapPin, Users, Search } from 'lucide-react';
import { businessAPI } from '../services/api';
import { colors } from '../styles/GlobalStyle';
import BusinessCard from '../components/BusinessCard';
import BusinessDirectory from '../components/BusinessDirectory';

const HeroSection = styled.section`
  background: linear-gradient(rgba(34, 139, 34, 0.8), rgba(30, 126, 30, 0.8)), 
              url('https://res.cloudinary.com/faksam-soft/image/upload/v1756227014/tektribe/ankara_bc63bt.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    h1 { font-size: 2.5rem; }
    p { font-size: 1.1rem; }
  }
`;

const SearchBox = styled.div`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 50px;
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);

  input {
    flex: 1;
    border: none;
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 50px;
    outline: none;
  }

  button {
    background: ${colors.primary};
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }
`;

const StatsSection = styled.section`
  background: white;
  padding: 4rem 0;
  border-bottom: 1px solid #eee;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  
  .icon {
    background: ${colors.primary};
    color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  }

  .number {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${colors.primary};
    margin-bottom: 0.5rem;
  }

  .label {
    color: #666;
    font-weight: 500;
    font-size: 1.1rem;
  }
`;

const Section = styled.section`
  padding: 4rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    color: ${colors.dark};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const BusinessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid ${colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.error};
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #666;
  font-size: 1.1rem;
`;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: businesses, isLoading, error } = useQuery({
    queryKey: ['businesses'],
    queryFn: () => businessAPI.getBusinesses({}),
  });

  const { data: featuredData } = useQuery({
    queryKey: ['featured-businesses'],
    queryFn: () => businessAPI.getBusinesses({ featured: true, limit: 6 }),
  });

  const filteredBusinesses = businesses?.businesses?.filter((business: any) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) {
    return <ErrorMessage>Unable to load businesses. Please try again later.</ErrorMessage>;
  }

  return (
    <>
      <HeroSection>
        <HeroContent>
          <h1>Discover African Businesses Across the UK</h1>
          <p>
            Connect with authentic African vendors, services, and products in your local area.
          </p>
          <SearchBox>
            <input
              type="text"
              placeholder="Search businesses, services, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <Search size={20} />
              Search
            </button>
          </SearchBox>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <div className="icon">
              <Users size={28} />
            </div>
            <div className="number">100+</div>
            <div className="label">African Businesses</div>
          </StatCard>
          <StatCard>
            <div className="icon">
              <MapPin size={28} />
            </div>
            <div className="number">15+</div>
            <div className="label">UK Cities</div>
          </StatCard>
          <StatCard>
            <div className="icon">
              <Crown size={28} />
            </div>
            <div className="number">50+</div>
            <div className="label">African Countries</div>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      {featuredData?.businesses && featuredData.businesses.length > 0 && (
        <Section>
          <Container>
            <SectionHeader>
              <h2>
                <Crown size={32} />
                Featured Businesses
              </h2>
              <p>Discover our handpicked selection of exceptional African businesses</p>
            </SectionHeader>
            <BusinessGrid>
              {featuredData.businesses.map((business: any) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </BusinessGrid>
          </Container>
        </Section>
      )}

      {isLoading ? (
        <Section>
          <Container>
            <LoadingSpinner />
          </Container>
        </Section>
      ) : businesses?.businesses ? (
        <BusinessDirectory
          businesses={businesses.businesses}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory="All Categories"
          onCategoryChange={() => {}}
          selectedCity="All Cities"
          onCityChange={() => {}}
        />
      ) : (
        <Section>
          <Container>
            <EmptyState>
              No businesses available.
            </EmptyState>
          </Container>
        </Section>
      )}
    </>
  );
};

export default Home;