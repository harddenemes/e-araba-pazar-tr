
import api from './api';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  range: {
    new: number;
    current: number;
  };
  batteryCapacity: number;
  batteryHealth?: number;
  chargeTypes: string[];
  location: string;
  images: string[];
  description: string;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  views: number;
  likes: number;
  status: 'active' | 'pending' | 'sold' | 'suspended';
  createdAt: string;
}

export interface CarFilterOptions {
  brand?: string;
  model?: string;
  priceRange?: [number, number];
  yearRange?: [number, number];
  kmRange?: [number, number];
  batteryHealthMin?: number;
  location?: string;
  chargeType?: string;
  searchTerm?: string;
}

// Get all cars
export const getAllCars = async () => {
  try {
    const response = await api.get('/cars');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch cars' };
  }
};

// Get a car by ID
export const getCarById = async (id: string) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch car details' };
  }
};

// Filter cars
export const filterCars = async (filters: CarFilterOptions) => {
  try {
    // Convert filter object to query string
    const queryParams = new URLSearchParams();
    
    if (filters.brand) queryParams.append('brand', filters.brand);
    if (filters.model) queryParams.append('model', filters.model);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.chargeType) queryParams.append('chargeTypes', filters.chargeType);
    if (filters.searchTerm) queryParams.append('search', filters.searchTerm);
    if (filters.batteryHealthMin !== undefined) queryParams.append('batteryHealthMin', filters.batteryHealthMin.toString());
    
    if (filters.priceRange) {
      queryParams.append('price[gte]', filters.priceRange[0].toString());
      queryParams.append('price[lte]', filters.priceRange[1].toString());
    }
    
    if (filters.yearRange) {
      queryParams.append('year[gte]', filters.yearRange[0].toString());
      queryParams.append('year[lte]', filters.yearRange[1].toString());
    }
    
    if (filters.kmRange) {
      queryParams.append('km[gte]', filters.kmRange[0].toString());
      queryParams.append('km[lte]', filters.kmRange[1].toString());
    }
    
    const response = await api.get(`/cars?${queryParams.toString()}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to filter cars' };
  }
};

// Get filter options (brands, models, etc.)
export const getFilterOptions = async () => {
  try {
    const response = await api.get('/cars/filter-options');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch filter options' };
  }
};

// Car comparison
export const getCarsForComparison = async (carIds: string[]) => {
  try {
    const response = await api.post('/cars/compare', { carIds });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get comparison data' };
  }
};

// Add new car listing
export const addCar = async (carData: FormData) => {
  try {
    const response = await api.post('/cars', carData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add car listing' };
  }
};

// Update car listing
export const updateCar = async (id: string, carData: FormData) => {
  try {
    const response = await api.patch(`/cars/${id}`, carData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update car listing' };
  }
};

// Update car status
export const updateCarStatus = async (id: string, status: Car['status']) => {
  try {
    const response = await api.patch(`/cars/${id}/status`, { status });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update car status' };
  }
};

// Delete car listing
export const deleteCar = async (id: string) => {
  try {
    await api.delete(`/cars/${id}`);
    return true;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete car listing' };
  }
};

// Like a car
export const likeCar = async (id: string) => {
  try {
    const response = await api.post(`/cars/${id}/like`);
    return response.data.likes;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to like car' };
  }
};

// Favorites
export const toggleFavorite = async (carId: string) => {
  try {
    const response = await api.post(`/favorites/${carId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to toggle favorite status' };
  }
};

export const checkFavoriteStatus = async (carId: string) => {
  try {
    const response = await api.get(`/favorites/${carId}/status`);
    return response.data.isFavorite;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to check favorite status' };
  }
};
