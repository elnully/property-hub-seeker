
export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyType {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number; // in square feet
  propertyType: 'apartment' | 'house' | 'condo' | 'land' | 'commercial';
  listingType: 'sale' | 'rent';
  features: string[];
  images: string[];
  location: Location;
  listedDate: string;
  seller: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export interface PropertyFilters {
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
}
