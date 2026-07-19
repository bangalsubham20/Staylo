import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import PageLayout from "@/components/Layout/PageLayout";
import { getProperty, getPropertyBookedDates } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { 
  MapPin, 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Users,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Shield,
  Camera,
  ArrowLeft,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { data: propertySummary, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id as string),
    enabled: !!id
  });

  const { data: bookedDates = [] } = useQuery<string[]>({
    queryKey: ['property-booked-dates', id],
    queryFn: () => getPropertyBookedDates(id as string),
    enabled: !!id
  });

  // Convert booked date strings (YYYY-MM-DD) to Date objects for the Calendar
  const disabledDays = bookedDates.map(d => new Date(d + 'T00:00:00'));

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !propertySummary) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold text-red-500">Property not found</h2>
          <Button onClick={() => navigate('/properties')} className="mt-4">Back to Properties</Button>
        </div>
      </PageLayout>
    );
  }

  const property = {
    id: propertySummary.id,
    title: propertySummary.title,
    location: propertySummary.location,
    address: "123, Hiranandani Gardens, Powai, Mumbai - 400076",
    price: propertySummary.price,
    rating: propertySummary.rating,
    reviewCount: propertySummary.reviewCount,
    type: propertySummary.type,
    images: [
      propertySummary.image,
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e460b1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: [...new Set([...propertySummary.amenities, "Gym", "Laundry", "Security", "Study Room"])],
    description: "A modern and well-furnished PG accommodation located in the heart of Powai, just 5 minutes walk from IIT Mumbai. Perfect for students and working professionals looking for a comfortable and secure living space.",
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@example.com",
      rating: 4.9,
      propertiesCount: 12
    },
    availability: "Available from 1st March 2024",
    deposit: 30000,
    maintenance: 2000,
    rules: [
      "No smoking or alcohol",
      "Visitors allowed till 10 PM",
      "Monthly rent due by 5th of each month",
      "Maintenance charges extra"
    ],
    nearby: [
      { name: "IIT Mumbai", distance: "0.5 km", type: "University" },
      { name: "Powai Lake", distance: "1.2 km", type: "Recreation" },
      { name: "Hiranandani Hospital", distance: "0.8 km", type: "Hospital" },
      { name: "Metro Station", distance: "1.5 km", type: "Transport" }
    ]
  };

  const handleBookNow = () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    navigate(`/payment/${property.id}?date=${dateStr}`);
  };

  const handleContactOwner = () => {
    // In real app, this would open a chat or call functionality
    console.log("Contacting owner:", property.owner.phone);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-secondary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  
                  {/* Image Navigation */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Image Thumbnails */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index ? 'border-primary' : 'border-white/50'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Property Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground mb-2">
                        {property.title}
                      </CardTitle>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{property.address}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                          <span className="font-semibold">{property.rating}</span>
                          <span className="text-muted-foreground ml-1">({property.reviewCount} reviews)</span>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {property.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        ₹{property.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">House Rules</h3>
                    <ul className="space-y-2">
                      {property.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nearby Places */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Nearby Places</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.nearby.map((place, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                          <div>
                            <div className="font-medium">{place.name}</div>
                            <div className="text-sm text-muted-foreground">{place.type}</div>
                          </div>
                          <div className="text-sm font-medium text-primary">{place.distance}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Owner Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Owner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{property.owner.name}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-primary text-primary mr-1" />
                        {property.owner.rating} • {property.owner.propertiesCount} properties
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={handleContactOwner}
                      className="w-full bg-primary hover:bg-primary-dark"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Owner
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-semibold">₹{property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-semibold">₹{property.deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="font-semibold">₹{property.maintenance.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total (First Month)</span>
                    <span className="text-primary">
                      ₹{(property.price + property.deposit + property.maintenance).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Move-in Date</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-3">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={[
                      { before: new Date() },
                      ...disabledDays
                    ]}
                    className="rounded-md border w-full"
                  />
                  {selectedDate ? (
                    <p className="text-sm text-center font-medium text-primary">
                      ✓ Moving in on {selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">
                      Greyed-out dates are already booked. Select an available date to proceed.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Book Now Button */}
              <Button
                onClick={handleBookNow}
                disabled={!selectedDate}
                size="lg"
                className="w-full bg-primary hover:bg-primary-dark text-lg py-6 disabled:opacity-50"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                {selectedDate ? 'Book Now' : 'Select a Date to Book'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PropertyDetail;
