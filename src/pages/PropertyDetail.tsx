import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { 
  MapPin, 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Calendar,
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock property data - in real app, fetch by ID
  const property = {
    id: id || "1",
    title: "Modern PG near IIT Campus",
    location: "Powai, Mumbai",
    address: "123, Hiranandani Gardens, Powai, Mumbai - 400076",
    price: 15000,
    rating: 4.8,
    reviewCount: 124,
    type: "PG",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e460b1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["WiFi", "Meals", "Parking", "Gym", "Laundry", "Security", "Study Room"],
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
    navigate(`/payment/${property.id}`);
  };

  const handleContactOwner = () => {
    // In real app, this would open a chat or call functionality
    console.log("Contacting owner:", property.owner.phone);
  };

  return (
    <div className="min-h-screen bg-secondary/5 dark:bg-background-dark">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-5 sm:py-8 pb-20 sm:pb-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 sm:mb-6 hover:bg-secondary/20"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Back</span>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden border-0 sm:border">
                <div className="relative">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-96 object-cover"
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
                  <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4 flex gap-1.5 xs:gap-2 overflow-x-auto pb-1">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index ? 'border-primary' : 'border-white/50'
                        } shadow-md`}
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
              <Card className="border-0 sm:border">
                <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                    <div>
                      <CardTitle className="text-xl xs:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">
                        {property.title}
                      </CardTitle>
                      <div className="flex items-start text-muted-foreground mb-2 xs:mb-3 text-sm">
                        <MapPin className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{property.address}</span>
                      </div>
                      <div className="flex items-center flex-wrap gap-2 xs:gap-3">
                        <div className="flex items-center">
                          <Star className="w-3.5 h-3.5 fill-primary text-primary mr-1" />
                          <span className="font-semibold text-sm">{property.rating}</span>
                          <span className="text-muted-foreground text-xs ml-1">({property.reviewCount} reviews)</span>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          {property.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left sm:text-right mt-3 sm:mt-0">
                      <div className="text-xl xs:text-2xl font-bold text-primary">
                        ₹{property.price.toLocaleString()}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">per month</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {property.description}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1.5 bg-secondary/10 rounded-lg p-1.5 xs:p-2 sm:p-3">
                          <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">House Rules</h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {property.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-muted-foreground">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nearby Places */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Nearby Places</h3>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                      {property.nearby.map((place, index) => (
                        <div key={index} className="flex items-center justify-between p-2 xs:p-2.5 sm:p-3 bg-secondary/10 rounded-lg">
                          <div>
                            <div className="font-medium text-xs sm:text-sm">{place.name}</div>
                            <div className="text-xs text-muted-foreground">{place.type}</div>
                          </div>
                          <div className="text-xs font-medium text-primary">{place.distance}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Fixed to bottom on mobile, normal sidebar on desktop */}
            <div className="space-y-4 sm:space-y-6">
              {/* Sticky booking button on mobile */}
              <div className="fixed bottom-0 left-0 right-0 bg-background p-3 border-t border-border z-10 flex gap-3 lg:hidden">
                <Button
                  onClick={handleContactOwner}
                  variant="outline"
                  className="flex-1 py-5 text-sm"
                >
                  <Phone className="w-4 h-4 mr-1.5" />
                  Contact
                </Button>
                <Button
                  onClick={handleBookNow}
                  className="flex-1 bg-primary hover:bg-primary-dark py-5 text-sm"
                >
                  <DollarSign className="w-4 h-4 mr-1.5" />
                  Book Now
                </Button>
              </div>
              
              {/* Owner Info */}
              <Card className="border-0 sm:border">
                <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2">
                  <CardTitle className="text-base">Property Owner</CardTitle>
                </CardHeader>
                <CardContent className="px-3 sm:px-6 py-2 sm:py-4 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{property.owner.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-primary text-primary mr-1" />
                        {property.owner.rating} • {property.owner.propertiesCount} properties
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 hidden lg:block">
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
              <Card className="border-0 sm:border">
                <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2">
                  <CardTitle className="text-base">Pricing Details</CardTitle>
                </CardHeader>
                <CardContent className="px-3 sm:px-6 py-2 sm:py-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Rent</span>
                    <span className="font-semibold text-sm">₹{property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Security Deposit</span>
                    <span className="font-semibold text-sm">₹{property.deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Maintenance</span>
                    <span className="font-semibold text-sm">₹{property.maintenance.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm sm:text-base font-bold">
                    <span>Total (First Month)</span>
                    <span className="text-primary">
                      ₹{(property.price + property.deposit + property.maintenance).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="border-0 sm:border mb-16 sm:mb-0">
                <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2">
                  <CardTitle className="text-base">Availability</CardTitle>
                </CardHeader>
                <CardContent className="px-3 sm:px-6 py-2 sm:py-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{property.availability}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Book Now Button - Only visible on desktop */}
              <Button
                onClick={handleBookNow}
                size="lg"
                className="w-full bg-primary hover:bg-primary-dark text-base py-5 shadow-lg hidden lg:flex"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
