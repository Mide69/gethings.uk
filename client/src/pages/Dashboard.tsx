import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, MessageSquare, Store, Mail } from 'lucide-react';
import { businessAPI, messageAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../styles/GlobalStyle';
import BusinessForm from '../components/BusinessForm';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const Header = styled.div`
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    color: ${colors.dark};
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-weight: 500;
  color: ${props => props.active ? colors.primary : '#666'};
  border-bottom: 2px solid ${props => props.active ? colors.primary : 'transparent'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${colors.primary};
  }
`;

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: ${colors.dark};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const AddButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  transition: background 0.3s ease;

  &:hover {
    background: #1e7e1e;
  }
`;

const BusinessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BusinessCard = styled.div`
  border: 2px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-2px);
  }
`;

const BusinessImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BusinessContent = styled.div`
  padding: 1.5rem;

  h3 {
    color: ${colors.dark};
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const BusinessActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'danger' ? `
    background: ${colors.error};
    color: white;
    &:hover { background: #c82333; }
  ` : `
    background: ${colors.primary};
    color: white;
    &:hover { background: #1e7e1e; }
  `}
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageCard = styled.div<{ read: boolean }>`
  padding: 1.5rem;
  border: 2px solid ${props => props.read ? '#eee' : colors.primary};
  border-radius: 8px;
  background: ${props => props.read ? 'white' : '#f8f9ff'};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
  }

  .subject {
    font-weight: 600;
    color: ${colors.dark};
    margin-bottom: 0.25rem;
  }

  .from {
    color: #666;
    font-size: 0.9rem;
  }

  .date {
    color: #999;
    font-size: 0.8rem;
  }

  .message {
    color: #666;
    line-height: 1.5;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  svg {
    margin-bottom: 1rem;
    color: #ccc;
  }
`;

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user?.role === 'vendor' ? 'businesses' : 'messages');
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  
  const queryClient = useQueryClient();

  const { data: businesses, isLoading: businessesLoading } = useQuery({
    queryKey: ['vendor-businesses'],
    queryFn: businessAPI.getVendorBusinesses,
    enabled: user?.role === 'vendor',
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => messageAPI.getMessages('received'),
  });

  const deleteBusiness = useMutation({
    mutationFn: businessAPI.deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-businesses'] });
    },
  });

  const markAsRead = useMutation({
    mutationFn: messageAPI.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const handleDeleteBusiness = (id: string) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      deleteBusiness.mutate(id);
    }
  };

  const handleEditBusiness = (business: any) => {
    setEditingBusiness(business);
    setShowBusinessForm(true);
  };

  const handleCloseForm = () => {
    setShowBusinessForm(false);
    setEditingBusiness(null);
  };

  const handleMarkAsRead = (messageId: string) => {
    markAsRead.mutate(messageId);
  };

  return (
    <DashboardContainer>
      <Header>
        <h1>Welcome back, {user?.name}!</h1>
        <p>
          {user?.role === 'vendor' 
            ? 'Manage your business listings and respond to customer messages.'
            : 'View your messages and discover new businesses.'
          }
        </p>
      </Header>

      <TabContainer>
        {user?.role === 'vendor' && (
          <Tab 
            active={activeTab === 'businesses'} 
            onClick={() => setActiveTab('businesses')}
          >
            <Store size={20} />
            My Businesses
          </Tab>
        )}
        <Tab 
          active={activeTab === 'messages'} 
          onClick={() => setActiveTab('messages')}
        >
          <MessageSquare size={20} />
          Messages
        </Tab>
      </TabContainer>

      {activeTab === 'businesses' && user?.role === 'vendor' && (
        <Section>
          <SectionHeader>
            <h2>
              <Store size={24} />
              My Businesses
            </h2>
            <AddButton onClick={() => setShowBusinessForm(true)}>
              <Plus size={18} />
              Add Business
            </AddButton>
          </SectionHeader>

          {businessesLoading ? (
            <div>Loading businesses...</div>
          ) : (businesses && businesses.length > 0) ? (
            <BusinessGrid>
              {businesses.map((business: any) => (
                <BusinessCard key={business._id}>
                  <BusinessImage 
                    src={business.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'} 
                    alt={business.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400';
                    }}
                  />
                  <BusinessContent>
                    <h3>{business.name}</h3>
                    <p>{business.description}</p>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {business.location.city}, {business.location.postcode}
                    </div>
                    <BusinessActions>
                      <ActionButton onClick={() => handleEditBusiness(business)}>
                        <Edit size={14} />
                        Edit
                      </ActionButton>
                      <ActionButton 
                        variant="danger" 
                        onClick={() => handleDeleteBusiness(business._id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </ActionButton>
                    </BusinessActions>
                  </BusinessContent>
                </BusinessCard>
              ))}
            </BusinessGrid>
          ) : (
            <EmptyState>
              <Store size={48} />
              <h3>No businesses yet</h3>
              <p>Create your first business listing to get started.</p>
            </EmptyState>
          )}
        </Section>
      )}

      {activeTab === 'messages' && (
        <Section>
          <SectionHeader>
            <h2>
              <Mail size={24} />
              Messages
            </h2>
          </SectionHeader>

          {messagesLoading ? (
            <div>Loading messages...</div>
          ) : (messages && messages.length > 0) ? (
            <MessageList>
              {messages.map((message: any) => (
                <MessageCard 
                  key={message._id} 
                  read={message.read}
                  onClick={() => !message.read && handleMarkAsRead(message._id)}
                >
                  <div className="header">
                    <div>
                      <div className="subject">{message.subject}</div>
                      <div className="from">From: {message.sender.name}</div>
                      <div className="from">Business: {message.business.name}</div>
                    </div>
                    <div className="date">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="message">{message.message}</div>
                </MessageCard>
              ))}
            </MessageList>
          ) : (
            <EmptyState>
              <MessageSquare size={48} />
              <h3>No messages yet</h3>
              <p>Messages from customers will appear here.</p>
            </EmptyState>
          )}
        </Section>
      )}

      <Modal show={showBusinessForm}>
        <ModalContent>
          <BusinessForm 
            business={editingBusiness}
            onClose={handleCloseForm}
            onSuccess={() => {
              handleCloseForm();
              queryClient.invalidateQueries({ queryKey: ['vendor-businesses'] });
            }}
          />
        </ModalContent>
      </Modal>
    </DashboardContainer>
  );
};

export default Dashboard;