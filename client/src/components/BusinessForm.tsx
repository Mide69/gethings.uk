import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { X, Upload, Save } from 'lucide-react';
import { businessAPI } from '../services/api';
import { Business } from '../types';
import { colors } from '../styles/GlobalStyle';

const FormContainer = styled.div`
  padding: 2rem;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;

  h2 {
    color: ${colors.dark};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

  &.error {
    border-color: ${colors.error};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
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

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
  }

  &.error {
    border-color: ${colors.error};
  }
`;

const FileUpload = styled.div`
  border: 2px dashed #e1e5e9;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
    background: #f8f9ff;
  }

  input {
    display: none;
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  
  img {
    max-width: 200px;
    max-height: 150px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: 0.875rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
`;

const Button = styled.button<{ variant?: 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  ${props => props.variant === 'secondary' ? `
    background: #f8f9fa;
    color: #666;
    border: 2px solid #e1e5e9;
    &:hover { background: #e9ecef; }
  ` : `
    background: ${colors.primary};
    color: white;
    border: none;
    &:hover:not(:disabled) { background: #1e7e1e; }
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `}
`;

const categories = [
  'Restaurant',
  'Fashion & Clothing',
  'Beauty & Personal Care',
  'Grocery & Food',
  'Logistics & Shipping',
  'Financial Services',
  'Technology',
  'Arts & Crafts',
  'Jewelry & Accessories',
  'Education & Culture',
  'Travel & Tourism',
  'Automotive',
  'Entertainment',
  'Community Services',
  'Music & Instruments',
  'Industrial Services'
];

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'Ethiopia', 'Somalia', 'South Africa', 'Zimbabwe',
  'Uganda', 'Tanzania', 'Rwanda', 'Cameroon', 'Senegal', 'Ivory Coast', 'Mali',
  'Burkina Faso', 'Togo', 'Benin', 'Guinea', 'Sierra Leone', 'Liberia', 'Gambia',
  'Cape Verde', 'Mauritania', 'Chad', 'Central African Republic', 'Gabon',
  'Equatorial Guinea', 'Democratic Republic of Congo', 'Republic of Congo',
  'Angola', 'Namibia', 'Botswana', 'Zambia', 'Malawi', 'Mozambique', 'Madagascar',
  'Mauritius', 'Seychelles', 'Comoros', 'Djibouti', 'Eritrea', 'Sudan', 'South Sudan',
  'Lesotho', 'Eswatini'
];

interface BusinessFormProps {
  business?: Business | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  description: string;
  category: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  website: string;
  country: string;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ business, onClose, onSuccess }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const createMutation = useMutation({
    mutationFn: businessAPI.createBusiness,
    onSuccess: () => {
      onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => 
      businessAPI.updateBusiness(id, data),
    onSuccess: () => {
      onSuccess();
    },
  });

  useEffect(() => {
    if (business) {
      reset({
        name: business.name,
        description: business.description,
        category: business.category,
        city: business.location.city,
        postcode: business.location.postcode,
        phone: business.contact.phone || '',
        email: business.contact.email || '',
        website: business.contact.website || '',
        country: business.country,
      });
      setImagePreview(business.image || '');
    }
  }, [business, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (business) {
      updateMutation.mutate({ id: business._id, data: formData as any });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <FormContainer>
      <FormHeader>
        <h2>{business ? 'Edit Business' : 'Add New Business'}</h2>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
      </FormHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Business Name *</Label>
          <Input
            type="text"
            className={errors.name ? 'error' : ''}
            {...register('name', { required: 'Business name is required' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Description *</Label>
          <Textarea
            className={errors.description ? 'error' : ''}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label>Category *</Label>
            <Select
              className={errors.category ? 'error' : ''}
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Country *</Label>
            <Select
              className={errors.country ? 'error' : ''}
              {...register('country', { required: 'Country is required' })}
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Select>
            {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>City *</Label>
            <Input
              type="text"
              className={errors.city ? 'error' : ''}
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Postcode *</Label>
            <Input
              type="text"
              className={errors.postcode ? 'error' : ''}
              {...register('postcode', { required: 'Postcode is required' })}
            />
            {errors.postcode && <ErrorMessage>{errors.postcode.message}</ErrorMessage>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              {...register('phone')}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              {...register('email')}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label>Website</Label>
          <Input
            type="url"
            placeholder="https://..."
            {...register('website')}
          />
        </FormGroup>

        <FormGroup>
          <Label>Business Image</Label>
          <FileUpload onClick={() => document.getElementById('image-upload')?.click()}>
            <Upload size={32} color="#666" />
            <p>Click to upload an image</p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FileUpload>
          {imagePreview && (
            <ImagePreview>
              <img src={imagePreview} alt="Preview" />
            </ImagePreview>
          )}
        </FormGroup>

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save size={18} />
            {isLoading ? 'Saving...' : business ? 'Update Business' : 'Create Business'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default BusinessForm;