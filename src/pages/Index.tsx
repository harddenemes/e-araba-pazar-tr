
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import CarCard, { Car } from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import { Button } from '@/components/ui/button';
import { Zap, ChevronRight, TrendingUp, Info, MapPin } from 'lucide-react';
import { filterCars, getUniqueBrands, getUniqueModels, getUniqueLocations, getUniqueChargeTypes } from '@/lib/carUtils';

// Sample car data
const sampleCars: Car[] = [
  {
    id: '1',
    title: 'Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 850000,
    km: 15000,
    range: {
      new: 510,
      current: 480
    },
    batteryCapacity: 75,
    chargeTime: {
      fast: 30,
      normal: 180
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '2',
    title: 'Porsche Taycan',
    brand: 'Porsche',
    model: 'Taycan',
    year: 2023,
    price: 3250000,
    km: 5000,
    range: {
      new: 450,
      current: 440
    },
    batteryCapacity: 93,
    chargeTime: {
      fast: 25,
      normal: 200
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'Ankara',
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc7e9e5151?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9yc2NoZSUyMHRheWNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '3',
    title: 'BMW i4',
    brand: 'BMW',
    model: 'i4',
    year: 2022,
    price: 1750000,
    km: 12000,
    range: {
      new: 520,
      current: 490
    },
    batteryCapacity: 80,
    chargeTime: {
      fast: 35,
      normal: 210
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İzmir',
    imageUrl: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJtdyUyMGk0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '4',
    title: 'Hyundai IONIQ 5',
    brand: 'Hyundai',
    model: 'IONIQ 5',
    year: 2023,
    price: 1200000,
    km: 8000,
    range: {
      new: 480,
      current: 460
    },
    batteryCapacity: 72,
    chargeTime: {
      fast: 20,
      normal: 170
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHl1bmRhaSUyMGlvbmlxJTIwNXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '5',
    title: 'Volkswagen ID.4',
    brand: 'Volkswagen',
    model: 'ID.4',
    year: 2022,
    price: 1350000,
    km: 18000,
    range: {
      new: 520,
      current: 480
    },
    batteryCapacity: 77,
    chargeTime: {
      fast: 30,
      normal: 200
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'Bursa',
    imageUrl: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dnclaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '6',
    title: 'Audi e-tron GT',
    brand: 'Audi',
    model: 'e-tron GT',
    year: 2023,
    price: 3100000,
    km: 6000,
    range: {
      new: 490,
      current: 480
    },
    batteryCapacity: 93,
    chargeTime: {
      fast: 25,
      normal: 210
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'Ankara',
    imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXVkaSUyMGV0cm9uJTIwZ3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '7',
    title: 'Kia EV6',
    brand: 'Kia',
    model: 'EV6',
    year: 2022,
    price: 1250000,
    km: 14000,
    range: {
      new: 510,
      current: 480
    },
    batteryCapacity: 77,
    chargeTime: {
      fast: 18,
      normal: 190
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İzmir',
    imageUrl: 'https://images.unsplash.com/photo-1647538663895-dd965c4c219e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lhJTIwZXY2fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '8',
    title: 'Mercedes-Benz EQS',
    brand: 'Mercedes-Benz',
    model: 'EQS',
    year: 2023,
    price: 3750000,
    km: 4000,
    range: {
      new: 700,
      current: 690
    },
    batteryCapacity: 107,
    chargeTime: {
      fast: 35,
      normal: 240
    },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1630990825464-236ec7d536c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2VkZXMlMjBlcXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
];

const Index = () => {
  const [cars, setCars] = useState<Car[]>(sampleCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(sampleCars);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique values for filters
  const brands = getUniqueBrands(cars);
  const models = getUniqueModels(cars, ''); // Will be updated when brand is selected
  const locations = getUniqueLocations(cars);
  const chargeTypes = getUniqueChargeTypes(cars);

  const handleFilterChange = (filters: any) => {
    const filtered = filterCars(cars, {
      brand: filters.brand,
      model: filters.model,
      priceMin: filters.priceRange[0],
      priceMax: filters.priceRange[1],
      yearMin: filters.yearRange[0],
      yearMax: filters.yearRange[1],
      kmMin: filters.kmRange[0],
      kmMax: filters.kmRange[1],
      batteryHealthMin: filters.batteryHealthMin,
      location: filters.location,
      chargeType: filters.chargeType,
    });
    setFilteredCars(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredCars(cars);
      return;
    }
    
    const searchLower = term.toLowerCase();
    const searchResults = cars.filter(car => {
      return (
        car.brand.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.title.toLowerCase().includes(searchLower) ||
        car.location.toLowerCase().includes(searchLower)
      );
    });
    
    setFilteredCars(searchResults);
  };

  const handleFavorite = (id: string) => {
    const updatedCars = cars.map(car => 
      car.id === id ? { ...car, isFavorite: !car.isFavorite } : car
    );
    setCars(updatedCars);
    
    // Also update filtered cars
    const updatedFilteredCars = filteredCars.map(car => 
      car.id === id ? { ...car, isFavorite: !car.isFavorite } : car
    );
    setFilteredCars(updatedFilteredCars);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-header-gradient text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Türkiye'nin İlk Elektrikli Araç Pazarı
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Çevre dostu elektrikli araçları bulun, karşılaştırın ve satın alın. Geleceğe bugünden adım atın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <Button className="bg-white text-dark-gray hover:bg-light-gray">
              Araç Ara
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-dark-gray">
              Araç Karşılaştır
            </Button>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 px-4 bg-light-gray">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-green rounded-full p-3 mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Elektrikli Araçlar</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Yeni ve ikinci el tüm elektrikli araç modellerini keşfedin. Batarya sağlığı, menzil ve şarj detaylarıyla birlikte.
              </p>
              <a href="#" className="text-green flex items-center hover:underline">
                Araçları Keşfet
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-orange rounded-full p-3 mr-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Şarj İstasyonları</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Türkiye'deki tüm şarj istasyonlarının haritasına ulaşın. Konumları, şarj tipleri ve müsaitlik durumlarını görün.
              </p>
              <a href="#" className="text-orange flex items-center hover:underline">
                Haritayı Görüntüle
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-blue rounded-full p-3 mr-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Karşılaştırma</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Farklı elektrikli araç modellerini yan yana karşılaştırın. Teknik özellikler, performans ve fiyat analizlerini inceleyin.
              </p>
              <a href="#" className="text-blue flex items-center hover:underline">
                Araçları Karşılaştır
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Car Listings */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            <div className="md:w-1/4">
              <CarFilters 
                brands={brands}
                models={models}
                locations={locations}
                chargeTypes={chargeTypes}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearch}
              />
              
              {/* Battery Health Info */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center mb-4">
                  <Info size={20} className="mr-2 text-blue" />
                  <h3 className="text-lg font-medium">Batarya Sağlığı Nedir?</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Batarya sağlığı, aracın orijinal menzilinin ne kadarını koruduğunu gösterir. 
                  Kilometre ve orijinal menzil değerleri kullanılarak hesaplanır.
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Mükemmel</span>
                    <span className="text-sm text-green">&gt;80%</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">İyi</span>
                    <span className="text-sm text-blue">60-80%</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Orta</span>
                    <span className="text-sm text-orange">40-60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Zayıf</span>
                    <span className="text-sm text-red-500">&lt;40%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Car Listings */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Elektrikli Araçlar{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({filteredCars.length} araç)
                  </span>
                </h2>
                <div className="hidden md:block">
                  {/* Sort options could be added here */}
                </div>
              </div>

              {filteredCars.length > 0 ? (
                <div className="listing-grid">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} onFavorite={handleFavorite} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center shadow-md">
                  <p className="text-lg text-gray-600 mb-4">
                    Aramanıza uygun sonuç bulunamadı.
                  </p>
                  <p className="text-gray-500">
                    Lütfen farklı filtreleme seçenekleri deneyiniz.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-gray text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Elektrikli Aracınızı Satmak mı İstiyorsunuz?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Elektrikli aracınızı binlerce potansiyel alıcıya ulaştırın. Ücretsiz ilan verin ve hızlı satın.
          </p>
          <Button className="bg-green hover:bg-opacity-90 text-lg px-8 py-6">
            Ücretsiz İlan Ver
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
