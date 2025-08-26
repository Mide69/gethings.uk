export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor';
}

export interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: {
    city: string;
    postcode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  image: string;
  owner?: User;
  featured: boolean;
  rating: number;
  reviews: Review[];
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  _id: string;
  sender: User;
  recipient: User;
  business: Business;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'customer' | 'vendor') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface BusinessFilters {
  search?: string;
  category?: string;
  city?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}