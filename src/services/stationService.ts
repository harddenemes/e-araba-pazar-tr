
import api from './api';

export interface ChargingPoint {
  type: string;
  power: number;
  status: 'available' | 'occupied' | 'offline' | 'maintenance';
}

export interface ChargingStation {
  id: string;
  name: string;
  operator: string;
  location: {
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
    city: string;
  };
  chargePoints: ChargingPoint[];
  amenities: string[];
  pricing: string;
  openingHours: string;
  photos: string[];
}

// Get all charging stations
export const getAllStations = async () => {
  try {
    const response = await api.get('/stations');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch charging stations' };
  }
};

// Get charging station by ID
export const getStationById = async (id: string) => {
  try {
    const response = await api.get(`/stations/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch station details' };
  }
};

// Get nearby charging stations
export const getNearbyStations = async (latitude: number, longitude: number, distance: number = 10) => {
  try {
    const response = await api.get(`/stations/nearby?latitude=${latitude}&longitude=${longitude}&distance=${distance}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch nearby stations' };
  }
};
