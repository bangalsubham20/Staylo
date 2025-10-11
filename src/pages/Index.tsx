import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/Layout/PageLayout";
import PropertyCard from "@/components/PropertyCard";
import { Search, Shield, MapPin, Users, ArrowRight, Star, TrendingUp, Sparkles } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [propertiesVisible, setPropertiesVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === featuresRef.current) {
              setFeaturesVisible(true);
            } else if (entry.target === propertiesRef.current) {
              setPropertiesVisible(true);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (propertiesRef.current) observer.observe(propertiesRef.current);

    return () => observer.disconnect();
  }, []);

  // Mock data for featured properties
  const featuredProperties = [
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
    }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary dark:from-background-dark dark:via-background-dark dark:to-background-dark text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Trusted by 10,000+ students</span>
            </div>
            
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent animate-pulse">
                  Student Home
                </span>
              </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover comfortable, affordable accommodation near your campus. 
              Connect with verified owners and book with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/properties">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    <Search className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Browse Properties
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link to="/student/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                  >
                    Get Started
                  </Button>
                </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white/80">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-white/80">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/80">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 mb-6 text-sm font-medium text-blue-700 dark:text-blue-300">
              <Sparkles className="w-4 h-4" />
              <span>Why Choose Staylo?</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
              We make finding student accommodation simple, safe, and stress-free with our comprehensive platform
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              {
                icon: Search,
                title: "Smart Search",
                description: "AI-powered filters help you find the perfect match based on location, budget, and preferences",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Verified Properties",
                description: "Every property and owner is thoroughly verified for your safety and peace of mind",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: MapPin,
                title: "Location Insights",
                description: "Detailed maps and insights about nearby facilities, transport, and campus distance",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Student Community",
                description: "Connect with fellow students, read reviews, and make informed decisions together",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="group text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section ref={propertiesRef} className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${propertiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 rounded-full px-4 py-2 mb-6 text-sm font-medium text-green-700 dark:text-green-300">
              <Star className="w-4 h-4" />
              <span>Featured Properties</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
              Handpicked for You
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300 max-w-2xl mx-auto">
              Discover our carefully curated selection of student-friendly accommodations
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-300 ${propertiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {featuredProperties.map((property, index) => (
              <div 
                key={property.id}
                className="group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/properties">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 group"
              >
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse" />
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 text-sm font-medium">
              <Star className="w-4 h-4" />
              <span>Join 10,000+ Happy Students</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Find Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Perfect Home?
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students who have found their perfect accommodation through Staylo. 
              Start your journey today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/student/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-semibold group"
                >
                  Sign Up as Student
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/owner/signup">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
                >
                  List Your Property
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">4.9/5</div>
                <div className="text-white/80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-white/80">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
                <div className="text-white/80">Verified Properties</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PageLayout>
  );
};

export default Index;
