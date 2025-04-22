
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { PropertyType } from '../types/property';

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="property-card overflow-hidden">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className={property.listingType === 'sale' ? 'bg-primary' : 'bg-secondary'}>
            For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
          </Badge>
          <Badge variant="outline" className="bg-white">
            {property.propertyType}
          </Badge>
        </div>
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-gray-600 hover:text-rose-500 transition-colors">
          <Heart className="h-5 w-5" />
        </button>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.location.city}, {property.location.state}</span>
        </div>
        
        <Link to={`/property/${property.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        
        <p className="text-2xl font-bold text-primary">
          {property.listingType === 'sale' 
            ? `$${property.price.toLocaleString()}` 
            : `$${property.price.toLocaleString()}/mo`
          }
        </p>
        
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-1 text-gray-500">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Square className="h-4 w-4" />
            <span>{property.size} sqft</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 text-sm text-gray-500">
        <p>Listed on {new Date(property.listedDate).toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
