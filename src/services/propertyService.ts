
import { PropertyType, PropertyFilters } from '../types/property';

// Mock property data
const mockProperties: PropertyType[] = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    description: 'Beautiful modern apartment with stunning ocean views. This spacious unit features high-end finishes, an open floor plan, and a private balcony overlooking the water. The building offers amenities including a fitness center, pool, and 24-hour doorman.',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    propertyType: 'apartment',
    listingType: 'sale',
    features: ['Ocean View', 'Balcony', 'Central AC', 'Fitness Center', 'Pool'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      address: '123 Oceanview Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
      country: 'USA'
    },
    listedDate: '2023-05-15T00:00:00.000Z',
    seller: {
      id: 'seller1',
      name: 'Ocean Realty Group',
      email: 'contact@oceanrealty.com',
      phone: '(305) 555-1234'
    }
  },
  {
    id: '2',
    title: 'Luxury Suburban Family Home',
    description: 'Gorgeous family home in a prestigious suburb. This home features a gourmet kitchen with top-of-the-line appliances, hardwood floors throughout, a spacious backyard with a built-in BBQ, and a three-car garage.',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3.5,
    size: 2800,
    propertyType: 'house',
    listingType: 'sale',
    features: ['Backyard', 'Garage', 'Fireplace', 'Hardwood Floors', 'Stainless Steel Appliances'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560440021-33f9b867899d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      address: '456 Maple St',
      city: 'Scottsdale',
      state: 'AZ',
      zipCode: '85251',
      country: 'USA'
    },
    listedDate: '2023-06-02T00:00:00.000Z',
    seller: {
      id: 'seller2',
      name: 'Premier Homes',
      email: 'info@premierhomes.com',
      phone: '(480) 555-9876'
    }
  },
  {
    id: '3',
    title: 'Downtown Loft with City Views',
    description: 'Stylish urban loft in the heart of downtown. Features exposed brick walls, high ceilings, large windows with city views, and modern finishes. Walking distance to restaurants, shops, and entertainment.',
    price: 2500,
    bedrooms: 1,
    bathrooms: 1,
    size: 950,
    propertyType: 'condo',
    listingType: 'rent',
    features: ['City View', 'Exposed Brick', 'High Ceilings', 'Stainless Steel Appliances', 'Washer/Dryer'],
    images: [
      'https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609347744403-2cb4dac4e2c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      address: '789 Urban Ave, Unit 5B',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60611',
      country: 'USA'
    },
    listedDate: '2023-07-10T00:00:00.000Z',
    seller: {
      id: 'seller3',
      name: 'Urban Living Properties',
      email: 'rentals@urbanliving.com',
      phone: '(312) 555-4321'
    }
  },
  {
    id: '4',
    title: 'Waterfront Property with Private Dock',
    description: 'Exclusive waterfront property with breathtaking views and private boat dock. This stunning home offers luxurious living spaces, floor-to-ceiling windows, a gourmet kitchen, and multiple outdoor entertaining areas.',
    price: 1250000,
    bedrooms: 5,
    bathrooms: 4,
    size: 4200,
    propertyType: 'house',
    listingType: 'sale',
    features: ['Waterfront', 'Private Dock', 'Pool', 'Outdoor Kitchen', 'Home Theater'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      address: '123 Lakefront Dr',
      city: 'Lake Tahoe',
      state: 'NV',
      zipCode: '89449',
      country: 'USA'
    },
    listedDate: '2023-04-20T00:00:00.000Z',
    seller: {
      id: 'seller4',
      name: 'Luxury Lake Properties',
      email: 'sales@luxurylake.com',
      phone: '(775) 555-8765'
    }
  },
  {
    id: '5',
    title: 'Cozy Studio in Historic District',
    description: 'Charming studio apartment in the heart of the historic district. Recently renovated with modern amenities while preserving historic character. Walkable to cafes, shops, and public transportation.',
    price: 1200,
    bedrooms: 0,
    bathrooms: 1,
    size: 550,
    propertyType: 'apartment',
    listingType: 'rent',
    features: ['Historic Building', 'Renovated', 'Hardwood Floors', 'High Ceilings', 'Pet Friendly'],
    images: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630699144867-57639aae9dae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560185009-5bf9f2849488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      address: '321 Heritage Ln, Apt 2C',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'USA'
    },
    listedDate: '2023-07-05T00:00:00.000Z',
    seller: {
      id: 'seller5',
      name: 'Historic District Rentals',
      email: 'rentals@historicdistrict.com',
      phone: '(617) 555-3456'
    }
  },
  {
    id: '6',
    title: 'Mountain View Cabin Retreat',
    description: 'Rustic yet modern cabin with panoramic mountain views. Features a stone fireplace, vaulted ceilings, large deck, and updated kitchen. Perfect for year-round vacation home or rental property.',
    price: 375000,
    bedrooms: 3,
    bathrooms: 2,
    size: 1800,
    propertyType: 'house',
    listingType: 'sale',
    features: ['Mountain View', 'Fireplace', 'Deck', 'Updated Kitchen', 'Hiking Trails'],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604014838811-4ae1722e5a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    location: {
      address: '456 Alpine Way',
      city: 'Aspen',
      state: 'CO',
      zipCode: '81611',
      country: 'USA'
    },
    listedDate: '2023-06-15T00:00:00.000Z',
    seller: {
      id: 'seller6',
      name: 'Mountain Properties LLC',
      email: 'info@mountainproperties.com',
      phone: '(970) 555-6789'
    }
  }
];

// Get all properties with optional filtering
export const getProperties = (filters?: PropertyFilters): Promise<PropertyType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProperties = [...mockProperties];
      
      if (filters) {
        if (filters.propertyType && filters.propertyType !== 'all') {
          filteredProperties = filteredProperties.filter(p => p.propertyType === filters.propertyType);
        }
        
        if (filters.listingType && filters.listingType !== 'all') {
          filteredProperties = filteredProperties.filter(p => p.listingType === filters.listingType);
        }
        
        if (filters.minPrice) {
          filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
        }
        
        if (filters.maxPrice) {
          filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
        }
        
        if (filters.bedrooms) {
          filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedrooms!);
        }
        
        if (filters.bathrooms) {
          filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.bathrooms!);
        }
        
        if (filters.location) {
          const locationLower = filters.location.toLowerCase();
          filteredProperties = filteredProperties.filter(p => 
            p.location.city.toLowerCase().includes(locationLower) ||
            p.location.state.toLowerCase().includes(locationLower) ||
            p.location.zipCode.includes(filters.location!) ||
            p.location.address.toLowerCase().includes(locationLower)
          );
        }
      }
      
      resolve(filteredProperties);
    }, 500); // Simulate network delay
  });
};

// Get a single property by ID
export const getPropertyById = (id: string): Promise<PropertyType | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const property = mockProperties.find(p => p.id === id) || null;
      resolve(property);
    }, 300);
  });
};

// Add a new property (in a real app, this would send data to a server)
export const addProperty = (property: Omit<PropertyType, 'id' | 'listedDate'>): Promise<PropertyType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProperty: PropertyType = {
        ...property,
        id: `${mockProperties.length + 1}`,
        listedDate: new Date().toISOString()
      };
      
      // In a real app, we would send this to the server
      // For this example, we'll just return the new property
      resolve(newProperty);
    }, 500);
  });
};

// Get featured properties (for homepage)
export const getFeaturedProperties = (): Promise<PropertyType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a subset of properties for featured section
      resolve(mockProperties.slice(0, 3));
    }, 300);
  });
};

// Get recent properties (newest listings)
export const getRecentProperties = (): Promise<PropertyType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = [...mockProperties].sort((a, b) => 
        new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
      );
      resolve(sorted.slice(0, 4));
    }, 300);
  });
};
