import React from 'react';
import styled from 'styled-components';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { colors } from '../styles/GlobalStyle';

const FooterContainer = styled.footer`
  background: ${colors.dark};
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: ${colors.secondary};
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p, a {
    color: #ccc;
    line-height: 1.6;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: ${colors.secondary};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: ${colors.primary};
      transform: translateY(-2px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #444;
  color: #999;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Gethings</h3>
          <p>
            Connecting African vendors across the UK with customers who value authentic 
            products and services. Discover the rich diversity of African businesses 
            in your local area.
          </p>
          <SocialLinks>
            <a href="#" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="/">Home</a>
            <a href="/register">Register Your Business</a>
            <a href="/login">Login</a>
            <a href="#featured">Featured Businesses</a>
          </div>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ContactItem>
            <Mail size={16} />
            <span>info@gethings.uk</span>
          </ContactItem>
          <ContactItem>
            <Phone size={16} />
            <span>+44 20 1234 5678</span>
          </ContactItem>
          <ContactItem>
            <MapPin size={16} />
            <span>London, United Kingdom</span>
          </ContactItem>
        </FooterSection>

        <FooterSection>
          <h3>Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="/?category=restaurant">Restaurants</a>
            <a href="/?category=fashion">Fashion & Clothing</a>
            <a href="/?category=beauty">Beauty & Personal Care</a>
            <a href="/?category=grocery">Grocery & Food</a>
            <a href="/?category=services">Services</a>
          </div>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <div className="container">
          <p>&copy; 2024 Gethings. All rights reserved. Empowering African businesses across the UK.</p>
        </div>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;