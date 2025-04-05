
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Car,
  Battery,
  Zap,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  BarChart,
  LayoutGrid,
  X,
  PlusCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import BatteryHealthIndicator from '@/components/cars/BatteryHealthIndicator';
import { Card, CardContent } from '@/components/ui/card';
import { calculateBatteryHealth } from '@/lib/carUtils';

// Sample car data
const sampleCars = [
  {
    id: '1',
    title: 'Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 850000,
    km: 15000,
    range: { new: 510, current: 480 },
    batteryCapacity: 75,
    chargeTime: { fast: 30, normal: 240 },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İstanbul',
    imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=Tesla+Model+3',
    motorPower: '350 kW',
    acceleration: '3.3 saniye',
    topSpeed: '261 km/s',
    weight: '1850 kg'
  },
  {
    id: '2',
    title: 'BMW i4',
    brand: 'BMW',
    model: 'i4',
    year: 2023,
    price: 1250000,
    km: 8000,
    range: { new: 520, current: 510 },
    batteryCapacity: 83.9,
    chargeTime: { fast: 35, normal: 260 },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'Ankara',
    imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=BMW+i4',
    motorPower: '400 kW',
    acceleration: '3.9 saniye',
    topSpeed: '225 km/s',
    weight: '2215 kg'
  },
  {
    id: '3',
    title: 'Porsche Taycan',
    brand: 'Porsche',
    model: 'Taycan',
    year: 2022,
    price: 3200000,
    km: 12000,
    range: { new: 450, current: 420 },
    batteryCapacity: 93.4,
    chargeTime: { fast: 22, normal: 270 },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'İzmir',
    imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=Porsche+Taycan',
    motorPower: '560 kW',
    acceleration: '2.8 saniye',
    topSpeed: '260 km/s',
    weight: '2380 kg'
  },
  {
    id: '4',
    title: 'Audi e-tron GT',
    brand: 'Audi',
    model: 'e-tron GT',
    year: 2022,
    price: 2850000,
    km: 10000,
    range: { new: 480, current: 460 },
    batteryCapacity: 93.4,
    chargeTime: { fast: 25, normal: 250 },
    chargeTypes: ['Type 2', 'CCS'],
    location: 'Bursa',
    imageUrl: 'https://placehold.co/600x400/ECEFF1/263238?text=Audi+e-tron+GT',
    motorPower: '475 kW',
    acceleration: '3.3 saniye',
    topSpeed: '245 km/s',
    weight: '2340 kg'
  },
];

const ComparisonTable = ({ cars }: { cars: any[] }) => {
  // Check if we have cars to compare
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Henüz karşılaştırma için araç seçilmedi.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-3 font-medium text-gray-500">Özellik</th>
            {cars.map((car) => (
              <th key={car.id} className="py-4 px-3 text-center">{car.brand} {car.model}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Images */}
          <tr>
            <td className="py-4 px-3 border-b font-medium text-gray-500">Görsel</td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">
                <img 
                  src={car.imageUrl} 
                  alt={car.title}
                  className="w-full h-36 object-cover rounded-md inline-block"
                />
              </td>
            ))}
          </tr>

          {/* Year */}
          <tr className="bg-gray-50">
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              Yıl
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">{car.year}</td>
            ))}
          </tr>

          {/* Price */}
          <tr>
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              Fiyat
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center font-bold">
                {new Intl.NumberFormat('tr-TR').format(car.price)} ₺
              </td>
            ))}
          </tr>

          {/* Mileage */}
          <tr className="bg-gray-50">
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <LayoutGrid className="h-4 w-4 text-gray-400" />
              Kilometre
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">
                {new Intl.NumberFormat('tr-TR').format(car.km)} km
              </td>
            ))}
          </tr>

          {/* Battery Health */}
          <tr>
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Battery className="h-4 w-4 text-gray-400" />
              Batarya Sağlığı
            </td>
            {cars.map((car) => {
              const batteryHealth = calculateBatteryHealth(car.km, car.range.new);
              return (
                <td key={car.id} className="py-4 px-3 border-b">
                  <div className="w-full px-2">
                    <BatteryHealthIndicator batteryHealth={batteryHealth} size="sm" />
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Range */}
          <tr className="bg-gray-50">
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-400" />
              Menzil
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">
                <div>Yeni: {car.range.new} km</div>
                <div>Mevcut: {car.range.current} km</div>
              </td>
            ))}
          </tr>

          {/* Battery Capacity */}
          <tr>
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Battery className="h-4 w-4 text-gray-400" />
              Batarya Kapasitesi
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">{car.batteryCapacity} kWh</td>
            ))}
          </tr>

          {/* Charging Time */}
          <tr className="bg-gray-50">
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              Şarj Süresi
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">
                <div>Hızlı: {car.chargeTime.fast} dk</div>
                <div>Normal: {car.chargeTime.normal} dk</div>
              </td>
            ))}
          </tr>

          {/* Charge Types */}
          <tr>
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-400" />
              Şarj Tipleri
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">
                {car.chargeTypes.join(', ')}
              </td>
            ))}
          </tr>

          {/* Location */}
          <tr className="bg-gray-50">
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              Konum
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">{car.location}</td>
            ))}
          </tr>

          {/* Motor Power */}
          <tr>
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-400" />
              Motor Gücü
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">{car.motorPower}</td>
            ))}
          </tr>

          {/* Acceleration */}
          <tr className="bg-gray-50">
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-gray-400" />
              0-100 km/s Hızlanma
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">{car.acceleration}</td>
            ))}
          </tr>

          {/* Top Speed */}
          <tr>
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <Car className="h-4 w-4 text-gray-400" />
              Maksimum Hız
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">{car.topSpeed}</td>
            ))}
          </tr>

          {/* Weight */}
          <tr className="bg-gray-50">
            <td className="py-4 px-3 border-b font-medium text-gray-500 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-gray-400" />
              Ağırlık
            </td>
            {cars.map((car) => (
              <td key={car.id} className="py-4 px-3 border-b text-center">{car.weight}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Compare = () => {
  const [selectedCars, setSelectedCars] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  // Function to add a car to comparison
  const addCarToComparison = (car: any) => {
    if (selectedCars.find(c => c.id === car.id)) {
      return; // Car already in comparison
    }
    if (selectedCars.length >= 3) {
      return; // Max 3 cars allowed
    }
    setSelectedCars([...selectedCars, car]);
  };

  // Function to remove a car from comparison
  const removeCarFromComparison = (carId: string) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId));
  };

  // Function to clear all cars from comparison
  const clearComparison = () => {
    setSelectedCars([]);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="bg-header-gradient text-white rounded-lg p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Araç Karşılaştırma</h1>
          <p className="mt-2 opacity-90">
            Elektrikli araçları yan yana karşılaştırarak size en uygun olan aracı bulun.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Karşılaştırma Seçenekleri</h2>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Karşılaştırılan Araçlar: </span>
              <span className="font-bold">{selectedCars.length}/3</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearComparison}
                disabled={selectedCars.length === 0}
              >
                Temizle
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
              >
                {viewMode === 'table' ? (
                  <><LayoutGrid className="h-4 w-4 mr-1" /> Grid Görünümü</>
                ) : (
                  <><BarChart className="h-4 w-4 mr-1" /> Tablo Görünümü</>
                )}
              </Button>
            </div>
          </div>

          {selectedCars.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCars.map(car => (
                <div 
                  key={car.id} 
                  className="flex items-center gap-2 bg-gray-100 rounded-full py-1 px-3"
                >
                  <span>{car.brand} {car.model}</span>
                  <button onClick={() => removeCarFromComparison(car.id)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Cars Comparison */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Karşılaştırma</h2>
          </div>
          {viewMode === 'table' ? (
            <ComparisonTable cars={selectedCars} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {selectedCars.map(car => (
                <Card key={car.id}>
                  <CardContent className="p-6">
                    <div className="relative">
                      <img 
                        src={car.imageUrl} 
                        alt={car.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white rounded-full p-1"
                        onClick={() => removeCarFromComparison(car.id)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold mt-4">{car.brand} {car.model}</h3>
                    <p className="text-2xl font-bold text-green mt-1">
                      {new Intl.NumberFormat('tr-TR').format(car.price)} ₺
                    </p>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <div>
                        <BatteryHealthIndicator 
                          batteryHealth={calculateBatteryHealth(car.km, car.range.new)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{car.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <LayoutGrid className="h-4 w-4 text-gray-500" />
                          <span>{new Intl.NumberFormat('tr-TR').format(car.km)} km</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Battery className="h-4 w-4 text-gray-500" />
                          <span>{car.batteryCapacity} kWh</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-gray-500" />
                          <span>{car.range.current} km menzil</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{car.chargeTime.fast} dk hızlı şarj</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{car.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-dark-gray hover:bg-opacity-90">
                      Detayları Gör
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Available Cars for Comparison */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Karşılaştırmaya Eklenebilecek Araçlar</h2>
            <p className="text-gray-600 text-sm mt-1">
              Karşılaştırmak istediğiniz araçları seçin (en fazla 3 araç karşılaştırılabilir)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {sampleCars.map(car => {
              const isSelected = selectedCars.some(c => c.id === car.id);
              const isDisabled = selectedCars.length >= 3 && !isSelected;
              
              return (
                <Card key={car.id} className={`relative ${isSelected ? 'ring-2 ring-green' : ''}`}>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-green text-white rounded-full p-1 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <img 
                      src={car.imageUrl} 
                      alt={car.title}
                      className={`w-full h-32 object-cover rounded-md ${isDisabled ? 'opacity-50' : ''}`}
                    />
                    <h3 className="text-base font-bold mt-3 truncate">{car.brand} {car.model}</h3>
                    <p className="text-lg font-bold text-green mt-1">
                      {new Intl.NumberFormat('tr-TR').format(car.price)} ₺
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Battery className="h-3 w-3" />
                        <span>{car.batteryCapacity} kWh</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>{car.range.current} km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{car.location}</span>
                      </div>
                    </div>
                    
                    <Button
                      className={`w-full mt-3 ${
                        isSelected 
                          ? 'bg-green hover:bg-green/90' 
                          : isDisabled 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-dark-gray hover:bg-opacity-90'
                      }`}
                      onClick={() => {
                        if (!isDisabled) {
                          isSelected 
                            ? removeCarFromComparison(car.id)
                            : addCarToComparison(car);
                        }
                      }}
                      disabled={isDisabled}
                    >
                      {isSelected ? (
                        <>Kaldır</>
                      ) : (
                        <><PlusCircle className="h-4 w-4 mr-1" /> Karşılaştır</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
