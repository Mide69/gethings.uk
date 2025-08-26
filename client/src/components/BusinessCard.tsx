import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MapPin, Star, Crown } from 'lucide-react';
import { Business } from '../types';
import { colors } from '../styles/GlobalStyle';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const BusinessImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${colors.secondary};
  color: ${colors.dark};
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const BusinessName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.dark};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const Category = styled.span`
  background: ${colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Description = styled.p`
  color: #666;
  margin: 1rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${colors.secondary};
  font-weight: 500;
`;

const Country = styled.span`
  background: ${colors.accent};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
  margin-top: 0.5rem;
  display: inline-block;
`;

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <Card>
      <Link to={`/business/${business._id}`}>
        <ImageContainer>
          <BusinessImage 
            src={business.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'} 
            alt={business.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400';
            }}
          />
          {business.featured && (
            <FeaturedBadge>
              <Crown size={12} />
              Featured
            </FeaturedBadge>
          )}
        </ImageContainer>
        
        <CardContent>
          <BusinessName>{business.name}</BusinessName>
          <Category>{business.category}</Category>
          
          <Description>{business.description}</Description>
          
          <LocationInfo>
            <MapPin size={16} />
            <span>{business.location.city}, {business.location.postcode}</span>
          </LocationInfo>
          
          <Rating>
            <Star size={16} fill="currentColor" />
            <span>{business.rating.toFixed(1)} ({business.reviews.length} reviews)</span>
          </Rating>
          
          <Country>{business.country}</Country>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BusinessCard;