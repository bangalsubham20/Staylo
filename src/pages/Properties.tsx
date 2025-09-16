import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import PropertyCard from "@/components/PropertyCard";
import MobileFilters from "@/components/MobileFilters";
import { Search, Filter, MapPin } from "lucide-react";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  // Mock data for properties
  const properties = [
    {
      id: "1",
      title: "Modern PG near IIT Campus",
      location: "Powai, Mumbai",
      price: 15000,
      rating: 4.8,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      amenities: ["WiFi", "Meals", "Parking"],
      type: "PG"
    },
    {
      id: "2",
      title: "Cozy 2BHK Apartment",
      location: "Koramangala, Bangalore",
      price: 25000,
      rating: 4.6,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      amenities: ["WiFi", "Parking", "Gym"],
      type: "Flat"
    },
    {
      id: "3",
      title: "Hostel with Mess Facility",
      location: "Sector 62, Noida",
      price: 8000,
      rating: 4.4,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1555854877-bab0e460b1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      amenities: ["Meals", "WiFi", "Laundry"],
      type: "Mess"
    },
    {
      id: "4",
      title: "Shared Flat near Delhi University",
      location: "North Campus, Delhi",
      price: 12000,
      rating: 4.5,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      amenities: ["WiFi", "Parking", "Security"],
      type: "Flat"
    },
    {
      id: "5",
      title: "Premium PG with AC",
      location: "Bandra, Mumbai",
      price: 20000,
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      amenities: ["AC", "WiFi", "Meals", "Gym"],
      type: "PG"
    },
    {
      id: "6",
      title: "Budget Hostel for Students",
      location: "Kota, Rajasthan",
      price: 6000,
      rating: 4.2,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      amenities: ["WiFi", "Study Room", "Library"],
      type: "Mess"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/5 dark:bg-background-dark">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Find Your Perfect Accommodation
            </h1>
            
            {/* Mobile Filters */}
            <MobileFilters 
              onApplyFilters={(filters) => {
                setSearchQuery(filters.searchQuery);
                setLocation(filters.location);
                setPropertyType(filters.propertyType);
                setPriceRange(filters.priceRange);
              }}
              initialFilters={{
                searchQuery,
                location,
                propertyType,
                priceRange
              }}
            />
          </div>
          
          {/* Mobile Search */}
          <div className="relative mb-4 sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-10 h-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Card className="p-3 sm:p-4 lg:p-6 shadow-medium hidden sm:block">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                <div className="col-span-1 sm:col-span-2 xl:col-span-2">
                  <Label htmlFor="search" className="text-sm font-medium text-foreground">Search Properties</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by location, college..."
                      className="pl-10 h-10 sm:h-11"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="mt-1 h-10 sm:h-11">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground">Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="mt-1 h-10 sm:h-11">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pg">PG</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="mess">Mess/Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground">Price</Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="mt-1 h-10 sm:h-11">
                      <SelectValue placeholder="Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10000">₹0 - ₹10K</SelectItem>
                      <SelectItem value="10000-20000">₹10K - ₹20K</SelectItem>
                      <SelectItem value="20000-30000">₹20K - ₹30K</SelectItem>
                      <SelectItem value="30000+">₹30K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-6">
                <Button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary hover:bg-primary-dark text-white h-11">
                  <Filter className="w-4 h-4" />
                  <span>Apply Filters</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto h-11">
                  <MapPin className="w-4 h-4" />
                  <span>Map View</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-muted-foreground">
            Showing {properties.length} properties
          </p>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-base">
            Load More Properties
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;