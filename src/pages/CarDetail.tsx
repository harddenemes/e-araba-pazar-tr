
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Battery,
  Calendar,
  Clock,
  Heart,
  MapPin,
  Phone,
  User,
  Mail,
  ChevronRight,
  Info,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { calculateBatteryHealth } from '@/lib/carUtils';

// This is a sample car to display when we don't have real data
const sampleCar = {
  id: '1',
  title: 'Tesla Model 3 Performance',
  brand: 'Tesla',
  model: 'Model 3 Performance',
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
  location: 'İstanbul, Kadıköy',
  description: `
    2022 model Tesla Model 3 Performance. Orijinal 15.000 KM'de. Tam şarjda 480 KM menzil. 
    Beyaz dış renk, siyah iç döşeme. Cam tavan, premium ses sistemi, ısıtmalı koltuklar ve 
    son yazılım güncellemelerine sahip. Araç İstanbul Kadıköy'de görülebilir. Sadece ciddi 
    alıcılar arasın.
  `,
  features: [
    'Cam Tavan',
    'Premium Ses Sistemi',
    'Isıtmalı Koltuklar',
    'Otopilot',
    'Hızlı Şarj Desteği',
    '19" Jantlar',
    'Beyaz Dış Renk',
    'Siyah İç Döşeme'
  ],
  seller: {
    name: 'Ahmet Yılmaz',
    phone: '+90 532 123 45 67',
    email: 'ahmet@example.com',
    type: 'Bireysel'
  },
  images: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1536617621572-1d5f1e6269a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1594950975203-eef42babfb6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1562053343-2e5a4668e339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlc2xhJTIwbW9kZWwlMjAzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  ],
  createdAt: '2023-04-01',
  updatedAt: '2023-04-05',
  status: 'active',
  views: 423,
  favorites: 26
};

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  // In a real app, we would fetch the car data based on the ID
  // For now, we'll just use our sample data
  const car = sampleCar;
  
  const batteryHealth = calculateBatteryHealth(car.km, car.range.new);
  const formattedPrice = new Intl.NumberFormat('tr-TR').format(car.price);
  
  const getBatteryHealthColor = (health: number) => {
    if (health >= 80) return 'bg-green';
    if (health >= 60) return 'bg-blue';
    if (health >= 40) return 'bg-orange';
    return 'bg-red-500';
  };
  
  const getBatteryHealthText = (health: number) => {
    if (health >= 80) return 'Mükemmel';
    if (health >= 60) return 'İyi';
    if (health >= 40) return 'Orta';
    return 'Zayıf';
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-light-gray py-3 px-4">
        <div className="container mx-auto">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-green">Ana Sayfa</Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <Link to="/" className="text-gray-600 hover:text-green">Araçlar</Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-gray-900">{car.brand} {car.model}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
              <div className="relative aspect-[16/9]">
                <img 
                  src={car.images[currentImage]} 
                  alt={car.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {car.images.map((image, index) => (
                <button 
                  key={index}
                  className={`rounded-lg overflow-hidden border-2 ${
                    currentImage === index ? 'border-green' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img src={image} alt={`${car.title} - ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
            
            {/* Car Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Araç Açıklaması</h2>
              <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
            </div>
            
            {/* Car Features */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Araç Özellikleri</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-2 text-green">
                      <Zap size={16} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Car Info */}
          <div className="space-y-6">
            {/* Car Title and Price */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{car.title}</h1>
                  <p className="text-gray-500">{car.year} • {car.km.toLocaleString('tr-TR')} km</p>
                </div>
                <button 
                  onClick={toggleFavorite}
                  className="bg-white p-2 rounded-full shadow-md"
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <div className="mt-6">
                <p className="text-3xl font-bold text-green">
                  {formattedPrice} ₺
                </p>
              </div>
              
              {/* Contact Buttons */}
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-green hover:bg-opacity-90 flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{car.seller.phone}</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>E-posta Gönder</span>
                </Button>
              </div>
              
              {/* Safety Notice */}
              <div className="mt-4 bg-orange/10 rounded-md p-3 flex">
                <AlertTriangle className="h-5 w-5 text-orange mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Güvenliğiniz için ödemenizi aracı görmeden yapmayın ve araç sahibiyle güvenli bir ortamda buluşun.
                </p>
              </div>
            </div>
            
            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-3 flex items-center">
                <MapPin size={18} className="mr-2 text-green" />
                Konum
              </h3>
              <p className="text-gray-700">{car.location}</p>
              
              <div className="mt-4 h-40 bg-gray-200 rounded-md">
                {/* Here we would integrate an actual map */}
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  Harita Yükleniyor...
                </div>
              </div>
            </div>
            
            {/* Battery Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-4">Batarya Bilgileri</h3>
              
              <div className="space-y-4">
                {/* Battery Health */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Batarya Sağlığı</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${
                        batteryHealth >= 80 ? 'text-green' :
                        batteryHealth >= 60 ? 'text-blue' :
                        batteryHealth >= 40 ? 'text-orange' : 'text-red-500'
                      }`}>
                        {getBatteryHealthText(batteryHealth)} ({batteryHealth}%)
                      </span>
                    </div>
                  </div>
                  <div className="battery-indicator">
                    <div 
                      className={`battery-level ${getBatteryHealthColor(batteryHealth)}`} 
                      style={{ width: `${batteryHealth}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Battery Capacity */}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Batarya Kapasitesi</span>
                  <span className="text-sm font-medium">{car.batteryCapacity} kWh</span>
                </div>
                
                {/* Range */}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Menzil (WLTP)</span>
                  <span className="text-sm font-medium">{car.range.current} km</span>
                </div>
                
                {/* Charge Types */}
                <div>
                  <span className="text-sm text-gray-600 block mb-2">Şarj Tipleri</span>
                  <div className="flex flex-wrap gap-2">
                    {car.chargeTypes.map((type, index) => (
                      <Badge key={index} variant="secondary" className="bg-light-gray">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Charge Times */}
                <div>
                  <span className="text-sm text-gray-600 block mb-2">Şarj Süreleri</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-light-gray rounded-md p-3 text-center">
                      <span className="block text-xs text-gray-500">Hızlı Şarj</span>
                      <span className="font-medium">{car.chargeTime.fast}dk</span>
                    </div>
                    <div className="bg-light-gray rounded-md p-3 text-center">
                      <span className="block text-xs text-gray-500">Normal Şarj</span>
                      <span className="font-medium">{car.chargeTime.normal}dk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Seller Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-3 flex items-center">
                <User size={18} className="mr-2 text-green" />
                Satıcı Bilgileri
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">İsim</span>
                  <span className="text-sm font-medium">{car.seller.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">İlan Türü</span>
                  <Badge variant="secondary" className="bg-light-gray">
                    {car.seller.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">İlan Tarihi</span>
                  <span className="text-sm font-medium">{car.createdAt}</span>
                </div>
              </div>
            </div>
            
            {/* Battery Health Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-3">
                <Info size={18} className="mr-2 text-blue" />
                <h3 className="font-bold">Batarya Sağlığı Hakkında</h3>
              </div>
              <p className="text-sm text-gray-600">
                Batarya sağlığı, elektrikli aracın bataryasının ne kadar iyi durumda olduğunu gösteren bir değerdir. 
                Bu değer, kullanım kilometresi ve orijinal menzil değerleri baz alınarak hesaplanır.
              </p>
            </div>
          </div>
        </div>
        
        {/* Related Cars Section - Usually at the bottom of the page */}
        {/* ... Could be implemented in the future ... */}
      </div>
    </Layout>
  );
};

export default CarDetail;
