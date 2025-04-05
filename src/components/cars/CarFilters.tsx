
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface CarFiltersProps {
  brands: string[];
  models: string[];
  locations: string[];
  chargeTypes: string[];
  onFilterChange: (filters: any) => void;
  onSearchChange: (searchTerm: string) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({
  brands,
  models,
  locations,
  chargeTypes,
  onFilterChange,
  onSearchChange,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    priceRange: [0, 5000000] as [number, number],
    yearRange: [2015, new Date().getFullYear()] as [number, number],
    kmRange: [0, 200000] as [number, number],
    batteryHealthMin: 0,
    location: '',
    chargeType: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchTerm);
  };

  const resetFilters = () => {
    const resetValues = {
      brand: '',
      model: '',
      priceRange: [0, 5000000] as [number, number],
      yearRange: [2015, new Date().getFullYear()] as [number, number],
      kmRange: [0, 200000] as [number, number],
      batteryHealthMin: 0,
      location: '',
      chargeType: '',
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search form */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <div className="relative">
          <Input
            className="pl-10 pr-4 py-2 w-full"
            type="text"
            placeholder="Marka, model veya anahtar kelime ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full px-3">
            Ara
          </Button>
        </div>
      </form>

      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          variant="outline"
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center">
            <Filter size={16} className="mr-2" />
            <span>Filtreler</span>
          </div>
          {mobileFiltersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Filter content - displayed on desktop and conditionally on mobile */}
      <div className={`filter-content ${mobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
        <Accordion type="multiple" className="space-y-4">
          {/* Brand and Model */}
          <AccordionItem value="brand-model">
            <AccordionTrigger className="text-md font-medium">Marka & Model</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Marka</label>
                  <Select 
                    value={filters.brand} 
                    onValueChange={(value) => handleFilterChange('brand', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Tümü</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Model</label>
                  <Select 
                    value={filters.model} 
                    onValueChange={(value) => handleFilterChange('model', value)}
                    disabled={!filters.brand}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Önce marka seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Tümü</SelectItem>
                        {models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-md font-medium">Fiyat Aralığı</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">{filters.priceRange[0].toLocaleString('tr-TR')} ₺</span>
                  <span className="text-sm">{filters.priceRange[1].toLocaleString('tr-TR')} ₺</span>
                </div>
                <Slider
                  defaultValue={filters.priceRange}
                  min={0}
                  max={5000000}
                  step={50000}
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Year Range */}
          <AccordionItem value="year">
            <AccordionTrigger className="text-md font-medium">Yıl Aralığı</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">{filters.yearRange[0]}</span>
                  <span className="text-sm">{filters.yearRange[1]}</span>
                </div>
                <Slider
                  defaultValue={filters.yearRange}
                  min={2010}
                  max={new Date().getFullYear()}
                  step={1}
                  value={filters.yearRange}
                  onValueChange={(value) => handleFilterChange('yearRange', value as [number, number])}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Kilometer Range */}
          <AccordionItem value="kilometer">
            <AccordionTrigger className="text-md font-medium">Kilometre</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">{filters.kmRange[0].toLocaleString('tr-TR')} km</span>
                  <span className="text-sm">{filters.kmRange[1].toLocaleString('tr-TR')} km</span>
                </div>
                <Slider
                  defaultValue={filters.kmRange}
                  min={0}
                  max={200000}
                  step={5000}
                  value={filters.kmRange}
                  onValueChange={(value) => handleFilterChange('kmRange', value as [number, number])}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Battery Health */}
          <AccordionItem value="battery">
            <AccordionTrigger className="text-md font-medium">Batarya Sağlığı</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">En az {filters.batteryHealthMin}%</span>
                  <span className="text-sm">100%</span>
                </div>
                <Slider
                  defaultValue={[filters.batteryHealthMin]}
                  min={0}
                  max={100}
                  step={5}
                  value={[filters.batteryHealthMin]}
                  onValueChange={(value) => handleFilterChange('batteryHealthMin', value[0])}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Location */}
          <AccordionItem value="location">
            <AccordionTrigger className="text-md font-medium">Konum</AccordionTrigger>
            <AccordionContent>
              <Select 
                value={filters.location} 
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Şehir seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tümü</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>

          {/* Charge Types */}
          <AccordionItem value="charge-type">
            <AccordionTrigger className="text-md font-medium">Şarj Tipi</AccordionTrigger>
            <AccordionContent>
              <Select 
                value={filters.chargeType} 
                onValueChange={(value) => handleFilterChange('chargeType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Şarj tipi seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tümü</SelectItem>
                    {chargeTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Reset Filters Button */}
        <Button 
          variant="outline"
          onClick={resetFilters}
          className="w-full mt-6"
        >
          Filtreleri Sıfırla
        </Button>
      </div>
    </div>
  );
};

export default CarFilters;
