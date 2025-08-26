import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Eye, EyeOff, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../styles/GlobalStyle';

const RegisterContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 20px;
`;

const RegisterCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  text-align: center;
  color: ${colors.dark};
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${colors.dark};
`;

const InputWrapper = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const Input = styled.input<{ hasIcon?: boolean }>`
  width: 100%;
  padding: 0.75rem ${props => props.hasIcon ? '3rem' : '1rem'} 0.75rem ${props => props.hasIcon ? '3rem' : '1rem'};
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
  }

  &.error {
    border-color: ${colors.error};
  }
`;

const Select = styled.select<{ hasIcon?: boolean }>`
  width: 100%;
  padding: 0.75rem ${props => props.hasIcon ? '3rem' : '1rem'} 0.75rem ${props => props.hasIcon ? '3rem' : '1rem'};
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
  }

  &.error {
    border-color: ${colors.error};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #1e7e1e;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;

  a {
    color: ${colors.primary};
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RoleInfo = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'customer' | 'vendor';
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const watchRole = watch('role');
  const watchPassword = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      await registerUser(data.name, data.email, data.password, data.role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Join Gethings</Title>
        <Subtitle>Create your account to get started</Subtitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Full Name</Label>
            <InputWrapper>
              <User size={20} />
              <Input
                type="text"
                hasIcon
                className={errors.name ? 'error' : ''}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
              />
            </InputWrapper>
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Email Address</Label>
            <InputWrapper>
              <Mail size={20} />
              <Input
                type="email"
                hasIcon
                className={errors.email ? 'error' : ''}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </InputWrapper>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Account Type</Label>
            <InputWrapper>
              <UserCheck size={20} />
              <Select
                hasIcon
                className={errors.role ? 'error' : ''}
                {...register('role', { required: 'Please select an account type' })}
              >
                <option value="">Select account type</option>
                <option value="customer">Customer - Browse and contact businesses</option>
                <option value="vendor">Vendor - List and manage my business</option>
              </Select>
            </InputWrapper>
            {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
            
            {watchRole && (
              <RoleInfo>
                {watchRole === 'customer' 
                  ? 'As a customer, you can browse businesses, contact vendors, and leave reviews.'
                  : 'As a vendor, you can create business listings, manage your profile, and respond to customer messages.'
                }
              </RoleInfo>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <InputWrapper>
              <Lock size={20} />
              <Input
                type={showPassword ? 'text' : 'password'}
                hasIcon
                className={errors.password ? 'error' : ''}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Confirm Password</Label>
            <InputWrapper>
              <Lock size={20} />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                hasIcon
                className={errors.confirmPassword ? 'error' : ''}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === watchPassword || 'Passwords do not match'
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
          </InputGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </Form>

        <LinkText>
          Already have an account? <Link to="/login">Sign in here</Link>
        </LinkText>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;