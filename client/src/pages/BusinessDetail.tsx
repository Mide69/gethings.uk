import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Globe, Star, Send, ArrowLeft } from 'lucide-react';
import { businessAPI, messageAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../styles/GlobalStyle';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.primary};
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #1e7e1e;
  }
`;

const BusinessHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
`;

const BusinessImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BusinessName = styled.h1`
  font-size: 2.5rem;
  color: ${colors.dark};
  margin-bottom: 0.5rem;
`;

const Category = styled.span`
  background: ${colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  display: inline-block;
  width: fit-content;
`;

const Country = styled.span`
  background: ${colors.accent};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  width: fit-content;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #666;

  svg {
    color: ${colors.primary};
  }

  a {
    color: ${colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;

  .stars {
    color: ${colors.secondary};
  }
`;

const MessageSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-top: 3rem;
`;

const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${colors.dark};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
  }
`;

const SendButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #1e7e1e;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;

  a {
    color: ${colors.primary};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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

const BusinessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const { data: business, isLoading, error } = useQuery({
    queryKey: ['business', id],
    queryFn: () => businessAPI.getBusiness(id!),
    enabled: !!id,
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ businessId, subject, message }: { businessId: string; subject: string; message: string }) =>
      messageAPI.sendMessage(businessId, subject, message),
    onSuccess: () => {
      setSubject('');
      setMessage('');
      alert('Message sent successfully!');
    },
    onError: () => {
      alert('Failed to send message. Please try again.');
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !subject.trim() || !message.trim()) return;
    
    sendMessageMutation.mutate({
      businessId: id,
      subject: subject.trim(),
      message: message.trim(),
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !business) return <div>Business not found</div>;

  return (
    <Container>
      <BackButton to="/">
        <ArrowLeft size={20} />
        Back to Directory
      </BackButton>

      <BusinessHeader>
        <ImageContainer>
          <BusinessImage 
            src={business.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600'} 
            alt={business.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600';
            }}
          />
        </ImageContainer>

        <BusinessInfo>
          <div>
            <BusinessName>{business.name}</BusinessName>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <Category>{business.category}</Category>
              <Country>{business.country}</Country>
            </div>
          </div>

          <Description>{business.description}</Description>

          <Rating>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  fill={i < Math.floor(business.rating) ? 'currentColor' : 'none'} 
                />
              ))}
            </div>
            <span>{business.rating.toFixed(1)} ({business.reviews.length} reviews)</span>
          </Rating>

          <ContactInfo>
            <ContactItem>
              <MapPin size={20} />
              <span>{business.location.city}, {business.location.postcode}</span>
            </ContactItem>
            
            {business.contact.phone && (
              <ContactItem>
                <Phone size={20} />
                <a href={`tel:${business.contact.phone}`}>{business.contact.phone}</a>
              </ContactItem>
            )}
            
            {business.contact.email && (
              <ContactItem>
                <Mail size={20} />
                <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
              </ContactItem>
            )}
            
            {business.contact.website && (
              <ContactItem>
                <Globe size={20} />
                <a href={business.contact.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </ContactItem>
            )}
          </ContactInfo>
        </BusinessInfo>
      </BusinessHeader>

      <MessageSection>
        <h2 style={{ marginBottom: '1.5rem', color: colors.dark }}>Contact This Business</h2>
        
        {user ? (
          <MessageForm onSubmit={handleSendMessage}>
            <FormGroup>
              <Label>Subject</Label>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What would you like to discuss?"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
              />
            </FormGroup>

            <SendButton 
              type="submit" 
              disabled={sendMessageMutation.isPending || !subject.trim() || !message.trim()}
            >
              <Send size={18} />
              {sendMessageMutation.isPending ? 'Sending...' : 'Send Message'}
            </SendButton>
          </MessageForm>
        ) : (
          <LoginPrompt>
            <p>
              Please <Link to="/login">login</Link> or <Link to="/register">create an account</Link> to contact this business.
            </p>
          </LoginPrompt>
        )}
      </MessageSection>
    </Container>
  );
};

export default BusinessDetail;