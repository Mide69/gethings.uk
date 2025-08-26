import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Crown, MapPin, Users } from 'lucide-react';
import { businessAPI } from '../services/api';
import { BusinessFilters } from '../types';
import { colors } from '../styles/GlobalStyle';
import BusinessCard from '../components/BusinessCard';
import SearchFilters from '../components/SearchFilters';

const HeroSection = styled.section`
  background: linear-gradient(rgba(34, 139, 34, 0.8), rgba(30, 126, 30, 0.8)), url('https://res.cloudinary.com/faksam-soft/image/upload/v1756227014/tektribe/ankara_bc63bt.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const StatsSection = styled.section`
  background: white;
  padding: 3rem 0;
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
  padding: 1.5rem;
  
  .icon {
    background: ${colors.primary};
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  }

  .number {
    font-size: 2rem;
    font-weight: bold;
    color: ${colors.primary};
    margin-bottom: 0.5rem;
  }

  .label {
    color: #666;
    font-weight: 500;
  }
`;

const Section = styled.section`
  padding: 3rem 0;
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
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const BusinessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const LoadMoreButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  margin: 2rem auto;
  display: block;
  transition: background 0.3s ease;

  &:hover {
    background: #1e7e1e;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
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

const Home: React.FC = () => {
  const [filters, setFilters] = useState<BusinessFilters>({
    search: '',
    category: 'all',
    city: 'all',
    page: 1,
    limit: 12
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [city, setCity] = useState('all');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['businesses', filters],
    queryFn: () => {
      console.log('Fetching businesses with filters:', filters);
      return businessAPI.getBusinesses(filters);
    },
    retry: 3,
    retryDelay: 1000,
  });

  const { data: featuredData } = useQuery({
    queryKey: ['featured-businesses'],
    queryFn: () => businessAPI.getBusinesses({ featured: true, limit: 6 }),
  });

  const handleFilter = () => {
    setFilters({
      ...filters,
      search: searchTerm || undefined,
      category: category === 'all' ? undefined : category,
      city: city === 'all' ? undefined : city,
      page: 1
    });
  };

  const handleLoadMore = () => {
    setFilters(prev => ({
      ...prev,
      page: (prev.page || 1) + 1
    }));
  };

  useEffect(() => {
    handleFilter();
  }, []);

  if (error) {
    console.error('Error loading businesses:', error);
    return <div>Error loading businesses: {error.message}</div>;
  }

  return (
    <>
      <HeroSection>
        <HeroContent>
          <h1>Discover African Businesses Across the UK</h1>
          <p>
            Connect with authentic African vendors, services, and products in your local area. 
            From traditional cuisine to modern services, find what you're looking for.
          </p>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <div className="icon">
              <Users size={24} />
            </div>
            <div className="number">100+</div>
            <div className="label">African Businesses</div>
          </StatCard>
          <StatCard>
            <div className="icon">
              <MapPin size={24} />
            </div>
            <div className="number">15+</div>
            <div className="label">UK Cities</div>
          </StatCard>
          <StatCard>
            <div className="icon">
              <Crown size={24} />
            </div>
            <div className="number">50+</div>
            <div className="label">African Countries</div>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      {featuredData?.businesses?.length > 0 && (
        <Section id="featured">
          <div className="container">
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
          </div>
        </Section>
      )}

      <Section>
        <div className="container">
          <SectionHeader>
            <h2>All Businesses</h2>
            <p>Browse our complete directory of African businesses across the UK</p>
          </SectionHeader>

          <SearchFilters
            searchTerm={searchTerm}
            category={category}
            city={city}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategory}
            onCityChange={setCity}
            onFilter={handleFilter}
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <BusinessGrid>
                {data?.businesses?.map((business: any) => (
                  <BusinessCard key={business._id} business={business} />
                ))}
              </BusinessGrid>

              {data?.businesses?.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                  No businesses found matching your criteria. Try adjusting your filters.
                </div>
              )}

              {data?.currentPage < data?.totalPages && (
                <LoadMoreButton onClick={handleLoadMore}>
                  Load More Businesses
                </LoadMoreButton>
              )}
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default Home;