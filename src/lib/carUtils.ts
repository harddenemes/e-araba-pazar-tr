
// Helper function to calculate battery health
export const calculateBatteryHealth = (usedKm: number, newRange: number): number => {
  const estimated = 100 - ((usedKm / newRange) * 20);
  return Math.max(0, Math.min(100, Math.round(estimated)));
};

// Filter cars by various criteria
export const filterCars = (cars: any[], filters: any) => {
  return cars.filter(car => {
    // Filter by brand if specified
    if (filters.brand && car.brand !== filters.brand) return false;
    
    // Filter by model if specified
    if (filters.model && car.model !== filters.model) return false;
    
    // Filter by price range
    if (filters.priceMin && car.price < filters.priceMin) return false;
    if (filters.priceMax && car.price > filters.priceMax) return false;
    
    // Filter by year range
    if (filters.yearMin && car.year < filters.yearMin) return false;
    if (filters.yearMax && car.year > filters.yearMax) return false;
    
    // Filter by km range
    if (filters.kmMin && car.km < filters.kmMin) return false;
    if (filters.kmMax && car.km > filters.kmMax) return false;
    
    // Filter by battery health
    if (filters.batteryHealthMin) {
      const health = calculateBatteryHealth(car.km, car.range.new);
      if (health < filters.batteryHealthMin) return false;
    }
    
    // Filter by chargeType if specified
    if (filters.chargeType && !car.chargeTypes.includes(filters.chargeType)) return false;
    
    return true;
  });
};

// Get unique brands from car list
export const getUniqueBrands = (cars: any[]) => {
  return Array.from(new Set(cars.map(car => car.brand))).sort();
};

// Get unique models for a specific brand
export const getUniqueModels = (cars: any[], brand: string) => {
  return Array.from(new Set(
    cars.filter(car => car.brand === brand).map(car => car.model)
  )).sort();
};

// Get unique charge types from car list
export const getUniqueChargeTypes = (cars: any[]) => {
  const allTypes: string[] = [];
  cars.forEach(car => {
    car.chargeTypes.forEach((type: string) => {
      if (!allTypes.includes(type)) {
        allTypes.push(type);
      }
    });
  });
  return allTypes.sort();
};

// Get unique locations from car list
export const getUniqueLocations = (cars: any[]) => {
  return Array.from(new Set(cars.map(car => car.location))).sort();
};
