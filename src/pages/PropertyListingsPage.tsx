
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PropertyCard from '../components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Filter,
  Search,
  Building2,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Home
} from 'lucide-react';
import { PropertyType, PropertyFilters } from '../types/property';
import { getProperties } from '../services/propertyService';

const PropertyListingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Get initial filter values from URL params
  const initialFilters: PropertyFilters = {
    location: queryParams.get('location') || '',
    propertyType: queryParams.get('propertyType') || 'all',
    listingType: queryParams.get('listingType') || 'all',
    minPrice: queryParams.get('minPrice') ? Number(queryParams.get('minPrice')) : undefined,
    maxPrice: queryParams.get('maxPrice') ? Number(queryParams.get('maxPrice')) : undefined,
    bedrooms: queryParams.get('bedrooms') ? Number(queryParams.get('bedrooms')) : undefined,
    bathrooms: queryParams.get('bathrooms') ? Number(queryParams.get('bathrooms')) : undefined,
  };
  
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Load properties based on filters
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        const data = await getProperties(filters);
        setProperties(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading properties:', error);
        setIsLoading(false);
      }
    };
    
    loadProperties();
  }, [filters]);
  
  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  // Apply filters
  const applyFilters = () => {
    const updatedFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    };
    
    // Update URL with new filter params
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value !== undefined && value !== '' && value !== 'all') {
        params.append(key, String(value));
      }
    }
    
    navigate(`/properties?${params.toString()}`);
    setFilters(updatedFilters);
    
    // Hide filters on mobile after applying
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: 'all',
      listingType: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
    });
    setPriceRange([0, 2000000]);
    navigate('/properties');
    
    // Hide filters on mobile after resetting
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (field: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Property Listings</h1>
              <p className="text-gray-600 mt-2">
                {isLoading ? 'Loading properties...' : `${properties.length} properties found`}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 md:hidden" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
              <Card className="sticky top-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Filters</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetFilters}
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Reset
                    </Button>
                    <Button 
                      className="md:hidden" 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Location Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter city, state or zip"
                        className="pl-9"
                        value={filters.location || ''}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Property Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <Select 
                      value={filters.propertyType || 'all'} 
                      onValueChange={(value) => handleFilterChange('propertyType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Listing Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">For Sale/Rent</label>
                    <Select 
                      value={filters.listingType || 'all'} 
                      onValueChange={(value) => handleFilterChange('listingType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Listings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Listings</SelectItem>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Price Range</label>
                      <div className="text-sm text-gray-500">
                        ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                      </div>
                    </div>
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={2000000}
                      step={10000}
                      onValueChange={handlePriceChange}
                    />
                  </div>
                  
                  {/* Bedrooms Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bedrooms</label>
                    <Select 
                      value={filters.bedrooms?.toString() || ''} 
                      onValueChange={(value) => handleFilterChange('bedrooms', value ? parseInt(value) : undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Bathrooms Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bathrooms</label>
                    <Select 
                      value={filters.bathrooms?.toString() || ''} 
                      onValueChange={(value) => handleFilterChange('bathrooms', value ? parseInt(value) : undefined)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    onClick={applyFilters}
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Property Listings */}
            <div className="md:w-3/4">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <Card key={index} className="animate-pulse">
                      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                      <CardContent className="p-4 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <Card className="p-10 text-center">
                  <CardContent className="pt-6">
                    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <Home className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">No properties found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any properties that match your search criteria. Try adjusting your filters.
                    </p>
                    <Button onClick={resetFilters} variant="outline">
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyListingsPage;
