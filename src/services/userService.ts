
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
}

interface UserUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
}

// Mock data for development
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '555-123-4567',
  location: 'Istanbul',
  avatarUrl: 'https://i.pravatar.cc/150?u=johndoe',
  joinDate: '2023-01-15',
};

// Define the valid status types to match the ProfileManagement component expectations
type ListingStatus = 'active' | 'pending' | 'sold' | 'suspended';

const mockListings = [
  {
    id: '1',
    title: 'Tesla Model 3',
    status: 'active' as ListingStatus,
    views: 245,
    likes: 15,
    createdAt: '2023-05-10',
  },
  {
    id: '2',
    title: 'BMW i4',
    status: 'pending' as ListingStatus,
    views: 122,
    likes: 8,
    createdAt: '2023-06-05',
  },
  {
    id: '3',
    title: 'Audi e-tron',
    status: 'sold' as ListingStatus,
    views: 350,
    likes: 25,
    createdAt: '2023-04-20',
  },
];

const mockFavorites = [
  {
    id: '101',
    title: 'Mercedes EQC',
    price: 850000,
    imageUrl: 'https://via.placeholder.com/300x200?text=Mercedes+EQC',
  },
  {
    id: '102',
    title: 'Volkswagen ID.4',
    price: 650000,
    imageUrl: 'https://via.placeholder.com/300x200?text=VW+ID.4',
  },
];

// Authentication Services
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await api.post('/users/register', userData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// User Profile Services - using mock data for now
export const getCurrentUser = () => {
  // Return mock data for development
  return mockUser;
};

export const updateUserProfile = (userId: string, userData: UserUpdateData) => {
  // For development, just return a success response with the updated user data
  return {
    success: true,
    user: { ...mockUser, ...userData }
  };
};

export const updatePassword = (userId: string, currentPassword: string, newPassword: string) => {
  // For development, just return a success response
  return {
    success: true,
    message: 'Password updated successfully'
  };
};

// User Listings & Favorites - using mock data for now
export const getUserListings = () => {
  // Return mock data for development
  return mockListings;
};

export const getUserFavorites = () => {
  // Return mock data for development
  return mockFavorites;
};

// Password Reset
export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/users/forgotPassword', { email });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Request failed' };
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await api.patch(`/users/resetPassword/${token}`, { password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Reset failed' };
  }
};

// Two-Factor Authentication
export const toggleTwoFactor = async () => {
  try {
    const response = await api.patch('/users/toggleTwoFactor');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Request failed' };
  }
};
