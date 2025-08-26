import React from 'react';
import styled from 'styled-components';
import { Search, Filter } from 'lucide-react';
import { colors } from '../styles/GlobalStyle';

const FilterContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${colors.dark};
  font-size: 0.9rem;
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${colors.primary};
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
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
`;

const FilterButton = styled.button`
  background: ${colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #1e7e1e;
  }
`;

interface SearchFiltersProps {
  searchTerm: string;
  category: string;
  city: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onFilter: () => void;
}

const categories = [
  'All Categories',
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

const cities = [
  'All Cities',
  'London',
  'Manchester',
  'Birmingham',
  'Glasgow',
  'Leeds',
  'Liverpool',
  'Edinburgh',
  'Bristol',
  'Sheffield',
  'Leicester',
  'Coventry',
  'Nottingham',
  'Cambridge'
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  category,
  city,
  onSearchChange,
  onCategoryChange,
  onCityChange,
  onFilter
}) => {
  return (
    <FilterContainer>
      <FilterGrid>
        <InputGroup>
          <Label>Search businesses</Label>
          <SearchInput>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name, description, or keyword..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onFilter()}
            />
          </SearchInput>
        </InputGroup>

        <InputGroup>
          <Label>Category</Label>
          <Select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>
                {cat}
              </option>
            ))}
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>City</Label>
          <Select value={city} onChange={(e) => onCityChange(e.target.value)}>
            {cities.map((c) => (
              <option key={c} value={c === 'All Cities' ? 'all' : c}>
                {c}
              </option>
            ))}
          </Select>
        </InputGroup>

        <FilterButton onClick={onFilter}>
          <Filter size={18} />
          Filter
        </FilterButton>
      </FilterGrid>
    </FilterContainer>
  );
};

export default SearchFilters;