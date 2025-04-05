
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Battery, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { calculateBatteryHealth } from '@/lib/carUtils';

export interface Car {
  id: string;
  title: string;
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
  chargeTime: {
    fast: number;
    normal: number;
  };
  chargeTypes: string[];
  location: string;
  imageUrl: string;
  isFavorite?: boolean;
}

interface CarCardProps {
  car: Car;
  onFavorite?: (id: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onFavorite }) => {
  const batteryHealth = calculateBatteryHealth(car.km, car.range.new);
  const formattedPrice = new Intl.NumberFormat('tr-TR').format(car.price);
  
  const getBatteryHealthColor = (health: number) => {
    if (health >= 80) return 'bg-green';
    if (health >= 60) return 'bg-blue';
    if (health >= 40) return 'bg-orange';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover">
      <div className="relative">
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={onFavorite ? () => onFavorite(car.id) : undefined}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
        >
          <Heart className={`h-5 w-5 ${car.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
          <Badge variant="outline" className="bg-green text-white border-0">
            {car.year}
          </Badge>
        </div>
        
        <p className="text-2xl font-bold text-dark-gray mb-3">
          {formattedPrice} ₺
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{car.location}</span>
        </div>
        
        <div className="space-y-3 mb-4">
          {/* Battery health indicator */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Batarya Sağlığı</span>
            <span className="text-sm font-medium">{batteryHealth}%</span>
          </div>
          <div className="battery-indicator">
            <div 
              className={`battery-level ${getBatteryHealthColor(batteryHealth)}`} 
              style={{ width: `${batteryHealth}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <Battery size={16} className="mr-1 text-gray-500" />
              <span className="text-sm">{car.range.current} km</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-gray-500" />
              <span className="text-sm">{car.chargeTime.fast}dk hızlı şarj</span>
            </div>
          </div>
        </div>
        
        <Link to={`/cars/${car.id}`}>
          <Button className="w-full bg-dark-gray hover:bg-opacity-90">
            <span>Detayları Gör</span>
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
