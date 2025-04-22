
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Phone, 
  Mail, 
  Heart, 
  Share, 
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PropertyType } from '../types/property';
import { getPropertyById } from '../services/propertyService';

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    const loadProperty = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const data = await getPropertyById(id);
          setProperty(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading property:', error);
        setIsLoading(false);
      }
    };
    
    loadProperty();
  }, [id]);
  
  const nextImage = () => {
    if (property) {
      setActiveImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevImage = () => {
    if (property) {
      setActiveImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-6"></div>
                
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div>
                <div className="h-64 bg-gray-300 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Property Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <Link to="/properties" className="hover:underline">Properties</Link>
              <span>/</span>
              <span>{property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}</span>
              <span>/</span>
              <span>{property.location.city}, {property.location.state}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location.address}, {property.location.city}, {property.location.state}, {property.location.zipCode}</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
        
        {/* Property Images */}
        <div className="mb-8 relative">
          <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={property.images[activeImageIndex]}
              alt={`Property ${activeImageIndex + 1}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={property.listingType === 'sale' ? 'bg-primary' : 'bg-secondary'}>
              For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
            </Badge>
            <Badge variant="outline" className="bg-white">
              {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
            </Badge>
          </div>
          
          {property.images.length > 1 && (
            <>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {property.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 
                    ${index === activeImageIndex ? 'border-primary' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-3xl font-bold text-primary">
                    {property.listingType === 'sale' 
                      ? `$${property.price.toLocaleString()}` 
                      : `$${property.price.toLocaleString()}/mo`
                    }
                  </h2>
                  <div className="flex items-center text-gray-600 mt-2 sm:mt-0">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Listed on {new Date(property.listedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="font-semibold">{property.bedrooms}</span>
                    <span className="text-sm text-gray-500">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="font-semibold">{property.bathrooms}</span>
                    <span className="text-sm text-gray-500">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="font-semibold">{property.size.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">Sq Ft</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-6 w-6 text-gray-500 mb-1" />
                    <span className="font-semibold">{property.location.city}</span>
                    <span className="text-sm text-gray-500">{property.location.state}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About This Property</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {property.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Property Location</h3>
                    <div className="aspect-ratio rounded-lg overflow-hidden border mb-4">
                      <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-500">
                        <p>Map view would be displayed here</p>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mb-2">Address</h4>
                    <p className="text-gray-700 mb-4">
                      {property.location.address}, {property.location.city}, {property.location.state}, {property.location.zipCode}
                    </p>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View on Google Maps
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Contact Card */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Seller</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="font-medium">{property.seller.name}</p>
                  <div className="flex items-center mt-2 text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${property.seller.phone}`} className="hover:text-primary">
                      {property.seller.phone}
                    </a>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${property.seller.email}`} className="hover:text-primary">
                      {property.seller.email}
                    </a>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Your Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="I'm interested in this property and would like to know more..."
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetailPage;
