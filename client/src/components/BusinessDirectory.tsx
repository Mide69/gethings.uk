import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Filter, MapPin, Star, Phone, Globe } from 'lucide-react';
import { colors } from '../styles/GlobalStyle';
import { Business } from '../types';

const DirectoryContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const SearchSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
`;

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px rgba(34, 139, 34, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
  }
`;

const FilterButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1e7e1e;
    transform: translateY(-2px);
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: ${colors.dark};
    font-size: 1.8rem;
  }

  .count {
    color: #666;
    font-size: 1rem;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
`;

const ViewButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.active ? colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const BusinessGrid = styled.div<{ view: 'grid' | 'list' }>`
  display: grid;
  grid-template-columns: ${props => props.view === 'grid' 
    ? 'repeat(auto-fit, minmax(350px, 1fr))' 
    : '1fr'};
  gap: ${props => props.view === 'grid' ? '2rem' : '1rem'};
`;

const BusinessCard = styled.div<{ view: 'grid' | 'list' }>`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  display: ${props => props.view === 'list' ? 'flex' : 'block'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
`;

const CardImage = styled.div<{ view: 'grid' | 'list'; image: string }>`
  width: ${props => props.view === 'list' ? '200px' : '100%'};
  height: ${props => props.view === 'list' ? '150px' : '220px'};
  background: url(${props => props.image}) center/cover;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(34, 139, 34, 0.1), rgba(255, 215, 0, 0.1));
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${colors.secondary};
  color: ${colors.dark};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 1;
`;

const CountryFlag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${colors.accent};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 1;
`;

const CardContent = styled.div<{ view: 'grid' | 'list' }>`
  padding: ${props => props.view === 'list' ? '1.5rem' : '2rem'};
  flex: 1;
`;

const BusinessName = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${colors.dark};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const Category = styled.span`
  background: ${colors.primary};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Description = styled.p`
  color: #666;
  margin: 1rem 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;

  svg {
    color: ${colors.primary};
    flex-shrink: 0;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;

  .stars {
    color: ${colors.secondary};
  }

  .rating-text {
    color: #666;
    font-size: 0.9rem;
  }
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ContactButton = styled.button`
  flex: 1;
  padding: 0.6rem;
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  background: transparent;
  color: ${colors.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  &:hover {
    background: ${colors.primary};
    color: white;
  }

  &.primary {
    background: ${colors.primary};
    color: white;

    &:hover {
      background: #1e7e1e;
    }
  }
`;

interface BusinessDirectoryProps {
  businesses: Business[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const categories = [
  'All Categories', 'Restaurant', 'Fashion & Clothing', 'Beauty & Personal Care',
  'Grocery & Food', 'Technology', 'Arts & Crafts', 'Financial Services'
];

const cities = [
  'All Cities', 'London', 'Manchester', 'Birmingham', 'Glasgow', 'Leeds', 'Liverpool'
];

const BusinessDirectory: React.FC<BusinessDirectoryProps> = ({
  businesses,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCity,
  onCityChange
}) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || business.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || business.location.city === selectedCity;
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <DirectoryContainer>
      <SearchSection>
        <SearchGrid>
          <SearchInput>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search businesses, services, or keywords..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </SearchInput>
          
          <Select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
          
          <Select value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Select>
          
          <FilterButton>
            <Filter size={18} />
            Filter
          </FilterButton>
        </SearchGrid>
      </SearchSection>

      <ResultsHeader>
        <div>
          <h2>Business Directory</h2>
          <div className="count">{filteredBusinesses.length} businesses found</div>
        </div>
        
        <ViewToggle>
          <ViewButton active={view === 'grid'} onClick={() => setView('grid')}>
            Grid
          </ViewButton>
          <ViewButton active={view === 'list'} onClick={() => setView('list')}>
            List
          </ViewButton>
        </ViewToggle>
      </ResultsHeader>

      <BusinessGrid view={view}>
        {filteredBusinesses.map((business) => (
          <BusinessCard key={business._id} view={view}>
            <CardImage 
              view={view} 
              image={business.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'}
            >
              {business.featured && <FeaturedBadge>Featured</FeaturedBadge>}
              <CountryFlag>{business.country}</CountryFlag>
            </CardImage>
            
            <CardContent view={view}>
              <BusinessName>{business.name}</BusinessName>
              <Category>{business.category}</Category>
              <Description>{business.description}</Description>
              
              <BusinessInfo>
                <InfoItem>
                  <MapPin size={16} />
                  <span>{business.location.city}, {business.location.postcode}</span>
                </InfoItem>
                
                {business.contact.phone && (
                  <InfoItem>
                    <Phone size={16} />
                    <span>{business.contact.phone}</span>
                  </InfoItem>
                )}
                
                {business.contact.website && (
                  <InfoItem>
                    <Globe size={16} />
                    <span>Visit Website</span>
                  </InfoItem>
                )}
              </BusinessInfo>

              <Rating>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(business.rating) ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {business.rating.toFixed(1)} ({business.reviews.length} reviews)
                </span>
              </Rating>

              <ContactButtons>
                <ContactButton className="primary">
                  View Details
                </ContactButton>
                <ContactButton>
                  Contact
                </ContactButton>
              </ContactButtons>
            </CardContent>
          </BusinessCard>
        ))}
      </BusinessGrid>
    </DirectoryContainer>
  );
};

export default BusinessDirectory;