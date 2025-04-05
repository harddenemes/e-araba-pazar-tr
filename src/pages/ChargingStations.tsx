
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Zap, Filter, Phone, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// This is a sample data for charging stations
const sampleStations = [
  {
    id: 1,
    name: 'ZES Şarj İstasyonu',
    address: 'Beşiktaş, İstanbul',
    chargeTypes: ['AC', 'DC', 'CCS'],
    power: {
      ac: 22,
      dc: 180
    },
    available: 2,
    total: 4,
    distance: 1.2,
    phone: '+90 850 222 39 37',
    status: 'active'
  },
  {
    id: 2,
    name: 'Eşarj İstasyonu',
    address: 'Kadıköy, İstanbul',
    chargeTypes: ['AC', 'Type 2'],
    power: {
      ac: 11,
      dc: null
    },
    available: 0,
    total: 2,
    distance: 3.5,
    phone: '+90 850 277 37 27',
    status: 'active'
  },
  {
    id: 3,
    name: 'Sharz.net İstasyonu',
    address: 'Maltepe, İstanbul',
    chargeTypes: ['AC', 'DC', 'CCS', 'CHAdeMO'],
    power: {
      ac: 22,
      dc: 120
    },
    available: 3,
    total: 6,
    distance: 6.8,
    phone: '+90 850 255 72 79',
    status: 'active'
  },
  {
    id: 4,
    name: 'Voltrun Şarj İstasyonu',
    address: 'Ataşehir, İstanbul',
    chargeTypes: ['AC', 'Type 2'],
    power: {
      ac: 7,
      dc: null
    },
    available: 1,
    total: 2,
    distance: 8.3,
    phone: '+90 850 333 88 65',
    status: 'maintenance'
  },
  {
    id: 5,
    name: 'Tesla Supercharger',
    address: 'Levent, İstanbul',
    chargeTypes: ['DC', 'Tesla'],
    power: {
      ac: null,
      dc: 250
    },
    available: 4,
    total: 8,
    distance: 4.1,
    phone: null,
    status: 'active'
  }
];

const ChargingStations = () => {
  const [selectedStation, setSelectedStation] = React.useState<number | null>(null);
  const [filterType, setFilterType] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  
  const handleStationClick = (id: number) => {
    setSelectedStation(id);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would filter the stations based on the search query
  };
  
  const filteredStations = sampleStations.filter(station => {
    // Filter by charge type if selected
    if (filterType && !station.chargeTypes.includes(filterType)) {
      return false;
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        station.name.toLowerCase().includes(query) ||
        station.address.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green';
      case 'maintenance':
        return 'bg-orange';
      default:
        return 'bg-gray-400';
    }
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-header-gradient text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Şarj İstasyonları Haritası
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Türkiye'deki tüm elektrikli araç şarj istasyonlarını keşfedin. Konumları, şarj tipleri ve müsaitlik durumlarını görün.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto">
            <div className="relative">
              <Input
                className="pl-10 pr-4 py-6 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70"
                type="text"
                placeholder="Şehir, ilçe veya konum ara"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              <Button type="submit" className="absolute right-1 top-1 bottom-1 bg-white text-dark-gray hover:bg-light-gray">
                Ara
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Content - Map and Stations */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Filters and Station List */}
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center">
                    <Filter size={18} className="mr-2" />
                    Filtrele
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Charge Type Filter */}
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Şarj Tipi</label>
                    <Select 
                      value={filterType}
                      onValueChange={setFilterType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tümü" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="">Tümü</SelectItem>
                          <SelectItem value="AC">AC</SelectItem>
                          <SelectItem value="DC">DC</SelectItem>
                          <SelectItem value="Type 2">Type 2</SelectItem>
                          <SelectItem value="CCS">CCS</SelectItem>
                          <SelectItem value="CHAdeMO">CHAdeMO</SelectItem>
                          <SelectItem value="Tesla">Tesla</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* More filters can be added here */}
                </div>
              </div>
              
              {/* Station List */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold">
                    Şarj İstasyonları ({filteredStations.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                  {filteredStations.length > 0 ? (
                    filteredStations.map((station) => (
                      <div 
                        key={station.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedStation === station.id ? 'bg-light-gray' : ''
                        }`}
                        onClick={() => handleStationClick(station.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{station.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin size={14} className="mr-1" />
                              <span>{station.address}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(station.status)}>
                            {station.status === 'active' ? 'Aktif' : 'Bakımda'}
                          </Badge>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {station.chargeTypes.map((type, index) => (
                              <Badge key={index} variant="secondary" className="bg-light-gray">
                                {type}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center mt-2 text-sm">
                            <Zap size={14} className="mr-1 text-green" />
                            <span className="text-gray-700 mr-4">
                              {station.available}/{station.total} müsait
                            </span>
                            <span className="text-gray-500">
                              {station.distance} km uzaklıkta
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Şarj istasyonu bulunamadı.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Side - Map */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md h-[600px] overflow-hidden">
                {/* In a real app, we would integrate an actual map here */}
                {/* For now, we'll show a placeholder with an iframe from esarj.com */}
                <div className="relative w-full h-full">
                  <iframe 
                    src="about:blank" 
                    title="Şarj İstasyonları Haritası" 
                    className="w-full h-full border-0"
                  ></iframe>
                  
                  {/* Overlay with placeholder text */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-center p-4">
                    <div>
                      <p className="text-gray-500 mb-4">
                        Bu alanda gerçek bir harita entegrasyonu olacak. E-şarj, Sharz.net veya benzeri 
                        servislerden iframe ile sağlanabilir.
                      </p>
                      <a 
                        href="https://www.esarj.com/sarj-istasyonlarimiz/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue flex items-center justify-center"
                      >
                        E-şarj haritasını görüntüle
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selected Station Details */}
              {selectedStation && (
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  {(() => {
                    const station = sampleStations.find(s => s.id === selectedStation);
                    if (!station) return null;
                    
                    return (
                      <>
                        <h2 className="text-xl font-bold mb-2">{station.name}</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin size={16} className="mr-1" />
                          <span>{station.address}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Station Info */}
                          <div>
                            <h3 className="font-medium mb-3">İstasyon Bilgileri</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Durum</span>
                                <Badge className={getStatusColor(station.status)}>
                                  {station.status === 'active' ? 'Aktif' : 'Bakımda'}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Müsait Soket</span>
                                <span>{station.available}/{station.total}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">AC Güç</span>
                                <span>{station.power.ac ? `${station.power.ac} kW` : 'Yok'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">DC Güç</span>
                                <span>{station.power.dc ? `${station.power.dc} kW` : 'Yok'}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Contact Info */}
                          <div>
                            <h3 className="font-medium mb-3">İletişim Bilgileri</h3>
                            {station.phone ? (
                              <div className="flex items-center">
                                <Phone size={16} className="mr-2 text-green" />
                                <span>{station.phone}</span>
                              </div>
                            ) : (
                              <p className="text-gray-500">İletişim bilgisi mevcut değil</p>
                            )}
                            <Button className="w-full mt-4 bg-green hover:bg-opacity-90">
                              Yol Tarifi Al
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="bg-light-gray py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Şarj Tipleri Hakkında</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-3 flex items-center text-lg">
                  <div className="bg-green rounded-full p-2 mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  AC Şarj
                </h3>
                <p className="text-gray-600">
                  Alternatif akım (AC) şarj istasyonları, araçları daha yavaş şarj eder ve genellikle 
                  3.7kW ile 22kW arasında güç sağlar. Ev ve iş yerlerinde yaygın olarak kullanılır.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-3 flex items-center text-lg">
                  <div className="bg-blue rounded-full p-2 mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  DC Şarj
                </h3>
                <p className="text-gray-600">
                  Doğru akım (DC) şarj istasyonları, araçları çok daha hızlı şarj eder ve 50kW ile 350kW 
                  arasında güç sağlar. Uzun yolculuklarda tercih edilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-3 flex items-center text-lg">
                  <div className="bg-orange rounded-full p-2 mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  Şarj Konnektörleri
                </h3>
                <p className="text-gray-600">
                  Type 2, CCS, CHAdeMO ve Tesla Supercharger gibi farklı şarj konnektörleri mevcuttur. 
                  Aracınızın desteklediği konnektör tiplerini kontrol etmeniz önemlidir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-3 flex items-center text-lg">
                  <div className="bg-dark-gray rounded-full p-2 mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  Şarj İstasyonu Ağları
                </h3>
                <p className="text-gray-600">
                  Türkiye'de ZES, Eşarj, Sharz.net ve Voltrun gibi farklı şarj istasyonu ağları 
                  bulunmaktadır. Çoğu, kendi uygulamaları üzerinden şarj işlemi yapmanıza olanak sağlar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ChargingStations;
