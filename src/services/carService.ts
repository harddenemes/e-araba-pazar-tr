
import { calculateBatteryHealth } from '@/lib/carUtils';

// Araç tipi tanımı
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  range: {
    new: number;  // Yeni araçtaki menzil (km)
    current: number; // Şu anki menzil (km)
  };
  batteryCapacity: number; // kWh
  batteryHealth?: number; // Hesaplanmış değer (%)
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

// Mock veritabanı
const cars: Car[] = [
  {
    id: '1',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 1750000,
    km: 15000,
    range: {
      new: 450,
      current: 410,
    },
    batteryCapacity: 75,
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İstanbul, Kadıköy',
    images: [
      'https://placehold.co/800x600/ECEFF1/263238?text=Tesla+Model+3+2022',
      'https://placehold.co/800x600/ECEFF1/263238?text=Tesla+Model+3+Interior',
    ],
    description: 'Sahibinden temiz Tesla Model 3, Long Range, Beyaz iç mekan, FSD donanımlı.',
    sellerId: '1',
    sellerName: 'Ahmet Yılmaz',
    sellerPhone: '+90 533 123 4567',
    sellerEmail: 'ahmet@example.com',
    views: 145,
    likes: 24,
    status: 'active',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    brand: 'Porsche',
    model: 'Taycan',
    year: 2021,
    price: 3250000,
    km: 25000,
    range: {
      new: 400,
      current: 350,
    },
    batteryCapacity: 93.4,
    chargeTypes: ['Type 2', 'CCS', 'CHAdeMO'],
    location: 'Ankara, Çankaya',
    images: [
      'https://placehold.co/800x600/ECEFF1/263238?text=Porsche+Taycan+2021',
      'https://placehold.co/800x600/ECEFF1/263238?text=Taycan+Interior',
    ],
    description: 'Porsche Taycan 4S, Mavi, Premium Paket, Panoramik cam tavan.',
    sellerId: '2',
    sellerName: 'Mehmet Demir',
    sellerPhone: '+90 544 567 8901',
    sellerEmail: 'mehmet@example.com',
    views: 203,
    likes: 37,
    status: 'active',
    createdAt: '2024-02-22',
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'i4',
    year: 2023,
    price: 1250000,
    km: 8000,
    range: {
      new: 520,
      current: 500,
    },
    batteryCapacity: 83.9,
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İzmir, Konak',
    images: [
      'https://placehold.co/800x600/ECEFF1/263238?text=BMW+i4+2023',
      'https://placehold.co/800x600/ECEFF1/263238?text=BMW+i4+Interior',
    ],
    description: 'BMW i4 eDrive40, Dış renk Siyah, İç mekan Bej deri, M Sport paket.',
    sellerId: '3',
    sellerName: 'Ayşe Kara',
    sellerPhone: '+90 555 789 0123',
    sellerEmail: 'ayse@example.com',
    views: 98,
    likes: 15,
    status: 'active',
    createdAt: '2024-04-01',
  },
  {
    id: '4',
    brand: 'Audi',
    model: 'e-tron GT',
    year: 2022,
    price: 2450000,
    km: 18000,
    range: {
      new: 490,
      current: 450,
    },
    batteryCapacity: 93.4,
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İstanbul, Beşiktaş',
    images: [
      'https://placehold.co/800x600/ECEFF1/263238?text=Audi+e-tron+GT+2022',
      'https://placehold.co/800x600/ECEFF1/263238?text=e-tron+GT+Interior',
    ],
    description: 'Audi e-tron GT quattro, Gri, RS iç mekan, B&O ses sistemi.',
    sellerId: '4',
    sellerName: 'Ali Yıldız',
    sellerPhone: '+90 532 345 6789',
    sellerEmail: 'ali@example.com',
    views: 176,
    likes: 29,
    status: 'active',
    createdAt: '2024-03-15',
  },
];

// Tüm araçları getir
export const getAllCars = () => {
  return cars.map(car => ({
    ...car,
    batteryHealth: calculateBatteryHealth(car.km, car.range.new)
  }));
};

// ID'ye göre araç getir
export const getCarById = (id: string) => {
  const car = cars.find(car => car.id === id);
  if (car) {
    return {
      ...car,
      batteryHealth: calculateBatteryHealth(car.km, car.range.new)
    };
  }
  return null;
};

// Filtreleme fonksiyonu
export const filterCars = (filters: any) => {
  let filteredCars = [...cars];
  
  // Marka filtresi
  if (filters.brand) {
    filteredCars = filteredCars.filter(car => car.brand === filters.brand);
  }
  
  // Model filtresi
  if (filters.model) {
    filteredCars = filteredCars.filter(car => car.model === filters.model);
  }
  
  // Fiyat aralığı filtresi
  if (filters.priceRange && Array.isArray(filters.priceRange)) {
    filteredCars = filteredCars.filter(car => 
      car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );
  }
  
  // Yıl aralığı filtresi
  if (filters.yearRange && Array.isArray(filters.yearRange)) {
    filteredCars = filteredCars.filter(car => 
      car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1]
    );
  }
  
  // Kilometre aralığı filtresi
  if (filters.kmRange && Array.isArray(filters.kmRange)) {
    filteredCars = filteredCars.filter(car => 
      car.km >= filters.kmRange[0] && car.km <= filters.kmRange[1]
    );
  }
  
  // Batarya sağlığı filtresi
  if (filters.batteryHealthMin !== undefined) {
    filteredCars = filteredCars.filter(car => {
      const health = calculateBatteryHealth(car.km, car.range.new);
      return health >= filters.batteryHealthMin;
    });
  }
  
  // Konum filtresi
  if (filters.location) {
    filteredCars = filteredCars.filter(car => 
      car.location.includes(filters.location)
    );
  }
  
  // Şarj tipi filtresi
  if (filters.chargeType) {
    filteredCars = filteredCars.filter(car => 
      car.chargeTypes.includes(filters.chargeType)
    );
  }
  
  // Arama terimi
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(searchLower) ||
      car.model.toLowerCase().includes(searchLower) ||
      car.description.toLowerCase().includes(searchLower) ||
      car.location.toLowerCase().includes(searchLower)
    );
  }
  
  // Batarya sağlığı değerini ekleyerek sonuçları döndür
  return filteredCars.map(car => ({
    ...car,
    batteryHealth: calculateBatteryHealth(car.km, car.range.new)
  }));
};

// Araç karşılaştırma için araçları getir
export const getCarsForComparison = (carIds: string[]) => {
  return carIds.map(id => {
    const car = getCarById(id);
    return car;
  }).filter(car => car !== null) as Car[];
};

// Yeni araç ekle
export const addCar = (carData: Omit<Car, 'id' | 'createdAt' | 'views' | 'likes' | 'status'>) => {
  const newCar: Car = {
    ...carData,
    id: `car-${Date.now()}`,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    status: 'pending'
  };
  
  cars.push(newCar);
  return newCar;
};

// Araç güncelle
export const updateCar = (id: string, carData: Partial<Car>) => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex !== -1) {
    cars[carIndex] = { ...cars[carIndex], ...carData };
    return {
      ...cars[carIndex],
      batteryHealth: calculateBatteryHealth(cars[carIndex].km, cars[carIndex].range.new)
    };
  }
  
  return null;
};

// Araç durumunu güncelle
export const updateCarStatus = (id: string, status: Car['status']) => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex !== -1) {
    cars[carIndex].status = status;
    return cars[carIndex];
  }
  
  return null;
};

// Araç görüntüleme sayısını arttır
export const incrementCarView = (id: string) => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex !== -1) {
    cars[carIndex].views += 1;
    return cars[carIndex].views;
  }
  
  return null;
};

// Araç beğeni sayısını güncelle
export const toggleCarLike = (id: string, userId: string) => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex !== -1) {
    // Gerçek uygulamada bir beğeni tablosu olur ve kullanıcı daha önce beğenmiş mi kontrol edilir
    // Burada sadece sayıyı arttırıyoruz
    cars[carIndex].likes += 1;
    return cars[carIndex].likes;
  }
  
  return null;
};

// Benzersiz markaları getir
export const getUniqueBrands = () => {
  return Array.from(new Set(cars.map(car => car.brand))).sort();
};

// Markaya göre benzersiz modelleri getir
export const getUniqueModels = (brand?: string) => {
  if (brand) {
    return Array.from(new Set(
      cars.filter(car => car.brand === brand).map(car => car.model)
    )).sort();
  }
  return Array.from(new Set(cars.map(car => car.model))).sort();
};

// Benzersiz şarj tiplerini getir
export const getUniqueChargeTypes = () => {
  const allTypes: string[] = [];
  cars.forEach(car => {
    car.chargeTypes.forEach(type => {
      if (!allTypes.includes(type)) {
        allTypes.push(type);
      }
    });
  });
  return allTypes.sort();
};

// Benzersiz konumları getir
export const getUniqueLocations = () => {
  return Array.from(new Set(cars.map(car => car.location))).sort();
};
