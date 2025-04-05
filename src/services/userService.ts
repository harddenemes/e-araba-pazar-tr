
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

// Authentication Services
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
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
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// User Profile Services
export const getCurrentUser = async () => {
  try {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    
    const response = await api.get('/users/me');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get user data' };
  }
};

export const updateUserProfile = async (userData: UserUpdateData) => {
  try {
    const response = await api.patch('/users/updateMe', userData);
    
    // Update stored user data
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Update failed' };
  }
};

export const updatePassword = async (passwordData: PasswordUpdateData) => {
  try {
    const response = await api.patch('/users/updatePassword', passwordData);
    
    // Update token if returned
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Password update failed' };
  }
};

// User Listings & Favorites
export const getUserListings = async () => {
  try {
    const response = await api.get('/users/myListings');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch listings' };
  }
};

export const getUserFavorites = async () => {
  try {
    const response = await api.get('/users/myFavorites');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch favorites' };
  }
};

// Password Reset
export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/users/forgotPassword', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Request failed' };
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await api.patch(`/users/resetPassword/${token}`, { password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Reset failed' };
  }
};

// Two-Factor Authentication
export const toggleTwoFactor = async () => {
  try {
    const response = await api.patch('/users/toggleTwoFactor');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Request failed' };
  }
};
