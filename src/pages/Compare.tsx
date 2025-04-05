
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Battery,
  Clock,
  Fuel,
  Zap,
  AlertTriangle,
  BarChart4,
  Trash2,
  Plus,
  Search,
  RefreshCw,
} from 'lucide-react';
import { calculateBatteryHealth } from '@/lib/carUtils';

// Sample car data for comparison
const carOptions = [
  {
    id: '1',
    title: 'Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    variant: 'Long Range',
    year: 2022,
    price: 850000,
    batteryCapacity: 75,
    range: 510,
    acceleration: 4.2,
    topSpeed: 233,
    power: 340,
    chargeTime: {
      fast: 30,
      normal: 420
    },
    dimension: {
      length: 4694,
      width: 1849,
      height: 1443,
      wheelbase: 2875,
      weight: 1847
    },
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '2',
    title: 'BMW i4',
    brand: 'BMW',
    model: 'i4',
    variant: 'eDrive40',
    year: 2022,
    price: 1750000,
    batteryCapacity: 83.9,
    range: 520,
    acceleration: 5.7,
    topSpeed: 190,
    power: 250,
    chargeTime: {
      fast: 35,
      normal: 510
    },
    dimension: {
      length: 4783,
      width: 1852,
      height: 1448,
      wheelbase: 2856,
      weight: 2125
    },
    imageUrl: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJtdyUyMGk0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '3',
    title: 'Hyundai IONIQ 5',
    brand: 'Hyundai',
    model: 'IONIQ 5',
    variant: '72.6 kWh AWD',
    year: 2023,
    price: 1200000,
    batteryCapacity: 72.6,
    range: 480,
    acceleration: 5.1,
    topSpeed: 185,
    power: 225,
    chargeTime: {
      fast: 20,
      normal: 390
    },
    dimension: {
      length: 4635,
      width: 1890,
      height: 1605,
      wheelbase: 3000,
      weight: 2020
    },
    imageUrl: 'https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHl1bmRhaSUyMGlvbmlxJTIwNXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
];

const Compare = () => {
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleAddCar = (carId: string) => {
    if (selectedCars.length < 3 && !selectedCars.includes(carId)) {
      setSelectedCars([...selectedCars, carId]);
    }
  };
  
  const handleRemoveCar = (carId: string) => {
    setSelectedCars(selectedCars.filter(id => id !== carId));
  };
  
  const clearComparison = () => {
    setSelectedCars([]);
  };
  
  // Get detailed car data from selected car IDs
  const selectedCarData = selectedCars.map(id => 
    carOptions.find(car => car.id === id)
  ).filter(car => car !== undefined) as typeof carOptions;
  
  // Filter car options based on search query
  const filteredCarOptions = searchQuery 
    ? carOptions.filter(car => 
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : carOptions;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-header-gradient text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Elektrikli Araç Karşılaştırma
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Farklı elektrikli araç modellerini teknik özellikleri, performans değerleri ve fiyatlarıyla karşılaştırın.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        {/* Car Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Araç Seçimi</h2>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2 w-full"
                type="text"
                placeholder="Marka veya model ara"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Car Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredCarOptions.map(car => (
              <div key={car.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={car.imageUrl} 
                    alt={car.title} 
                    className="w-16 h-16 rounded-md object-cover mr-4" 
                  />
                  <div>
                    <h3 className="font-medium">{car.title}</h3>
                    <p className="text-sm text-gray-500">{car.variant} • {car.year}</p>
                  </div>
                </div>
                <Button 
                  variant={selectedCars.includes(car.id) ? "secondary" : "default"}
                  size="sm"
                  onClick={() => selectedCars.includes(car.id) ? handleRemoveCar(car.id) : handleAddCar(car.id)}
                  disabled={selectedCars.length >= 3 && !selectedCars.includes(car.id)}
                >
                  {selectedCars.includes(car.id) ? (
                    <Trash2 size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </Button>
              </div>
            ))}
          </div>
          
          {/* Selection Controls */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {selectedCars.length} / 3 araç seçildi
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearComparison}
                disabled={selectedCars.length === 0}
              >
                <RefreshCw size={16} className="mr-2" />
                Temizle
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedCars.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Karşılaştırma Tablosu</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-light-gray">
                    <th className="p-4 text-left font-semibold">Özellik</th>
                    {selectedCarData.map(car => (
                      <th key={car.id} className="p-4 text-center font-semibold">
                        <div className="flex flex-col items-center">
                          <img 
                            src={car.imageUrl} 
                            alt={car.title} 
                            className="w-20 h-20 rounded-md object-cover mb-2" 
                          />
                          <span>{car.brand} {car.model}</span>
                          <span className="text-sm text-gray-500 font-normal">{car.variant}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Marka / Model</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.brand} {car.model}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-light-gray/50">
                    <td className="p-4 font-medium">Fiyat</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center font-bold">
                        {new Intl.NumberFormat('tr-TR').format(car.price)} ₺
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Model Yılı</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.year}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Battery Section */}
                  <tr className="border-t bg-dark-gray text-white">
                    <td colSpan={selectedCarData.length + 1} className="p-3 font-semibold">
                      <div className="flex items-center">
                        <Battery className="mr-2" />
                        Batarya ve Menzil
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Batarya Kapasitesi</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.batteryCapacity} kWh
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-light-gray/50">
                    <td className="p-4 font-medium">Menzil (WLTP)</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.range} km
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Hızlı Şarj Süresi</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.chargeTime.fast} dakika
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-light-gray/50">
                    <td className="p-4 font-medium">Normal Şarj Süresi</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.chargeTime.normal} dakika
                      </td>
                    ))}
                  </tr>
                  
                  {/* Performance Section */}
                  <tr className="border-t bg-green text-white">
                    <td colSpan={selectedCarData.length + 1} className="p-3 font-semibold">
                      <div className="flex items-center">
                        <Zap className="mr-2" />
                        Performans
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Güç</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.power} kW
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-light-gray/50">
                    <td className="p-4 font-medium">0-100 km/s Hızlanma</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.acceleration} saniye
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Maksimum Hız</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.topSpeed} km/s
                      </td>
                    ))}
                  </tr>
                  
                  {/* Dimensions Section */}
                  <tr className="border-t bg-blue text-white">
                    <td colSpan={selectedCarData.length + 1} className="p-3 font-semibold">
                      <div className="flex items-center">
                        <BarChart4 className="mr-2" />
                        Boyutlar ve Ağırlık
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Uzunluk</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.dimension.length} mm
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-light-gray/50">
                    <td className="p-4 font-medium">Genişlik</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.dimension.width} mm
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Yükseklik</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.dimension.height} mm
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-light-gray/50">
                    <td className="p-4 font-medium">Aks Mesafesi</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.dimension.wheelbase} mm
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Ağırlık</td>
                    {selectedCarData.map(car => (
                      <td key={car.id} className="p-4 text-center">
                        {car.dimension.weight} kg
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-orange mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Karşılaştırma İçin Araç Seçiniz</h3>
            <p className="text-gray-600 mb-6">
              Karşılaştırma yapmak için yukarıdan en az bir araç seçiniz.
              En fazla 3 aracı aynı anda karşılaştırabilirsiniz.
            </p>
          </div>
        )}
      </div>
      
      {/* Tips Section */}
      {selectedCars.length > 0 && (
        <section className="bg-light-gray py-12 px-4 mb-8">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Karşılaştırma İpuçları</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold mb-2">Menzil Değerlendirmesi</h3>
                <p className="text-gray-600">
                  WLTP değerleri ideal koşullarda ölçülür. Gerçek dünya koşullarında menzil,
                  hava sıcaklığı, sürüş tarzı ve yol koşullarına göre %20-30 daha düşük olabilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold mb-2">Şarj Süreleri</h3>
                <p className="text-gray-600">
                  Şarj süreleri, bataryanın %20'den %80'e şarj edilme süresini ifade eder.
                  %80'den sonra şarj hızı bataryayı korumak için düşürülür.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-2">Toplam Sahip Olma Maliyeti</h3>
                <p className="text-gray-600">
                  Elektrikli araç satın alırken sadece ilk alım fiyatını değil, şarj maliyetleri,
                  bakım, sigorta ve muhtemel batarya değişim maliyetlerini de göz önünde bulundurun.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Compare;
