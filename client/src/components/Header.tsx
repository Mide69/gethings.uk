import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../styles/GlobalStyle';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${colors.primary} 0%, #1e7e1e 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${colors.secondary};
  text-decoration: none;
  
  &:hover {
    color: white;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${colors.primary};
    flex-direction: column;
    padding: 2rem;
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    z-index: 1000;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.secondary};
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  background: rgba(255,255,255,0.1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Gethings</Logo>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          
          {user ? (
            <UserMenu>
              <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </NavLink>
              <UserButton onClick={handleLogout}>
                <User size={18} />
                {user.name}
                <LogOut size={16} />
              </UserButton>
            </UserMenu>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
            </>
          )}
        </NavLinks>

        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </MenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;