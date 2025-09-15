import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Layout/Header";
import { 
  Search, 
  Heart, 
  MessageCircle, 
  Settings, 
  Bell, 
  MapPin, 
  Star, 
  Calendar,
  TrendingUp,
  Users,
  Home,
  Bookmark
} from "lucide-react";

const StudentDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for dashboard
  const recentSearches = [
    { id: 1, location: "Powai, Mumbai", type: "PG", price: "₹15,000", date: "2 days ago" },
    { id: 2, location: "Koramangala, Bangalore", type: "Flat", price: "₹25,000", date: "1 week ago" },
    { id: 3, location: "Sector 62, Noida", type: "Mess", price: "₹8,000", date: "2 weeks ago" }
  ];

  const savedProperties = [
    {
      id: 1,
      title: "Modern PG near IIT Campus",
      location: "Powai, Mumbai",
      price: 15000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Cozy 2BHK Apartment",
      location: "Koramangala, Bangalore",
      price: 25000,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/5 dark:from-background-dark dark:via-background-dark dark:to-background-dark">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Ready to find your perfect student accommodation?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/properties">
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Search Properties</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Find your perfect home</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Saved Properties</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View your favorites</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Messages</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chat with owners</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Searches */}
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <TrendingUp className="w-5 h-5" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSearches.map((search) => (
                    <div key={search.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{search.location}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{search.type} • {search.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{search.date}</p>
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                          Search Again
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Properties */}
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <Bookmark className="w-5 h-5" />
                  Saved Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedProperties.map((property) => (
                    <div key={property.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{property.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{property.location}</p>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{property.rating}</span>
                          <span className="text-sm font-bold text-blue-600">₹{property.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to find your perfect home?</h3>
                <p className="text-blue-100 mb-6">Browse thousands of verified properties near your campus</p>
                <Link to="/properties">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                    <Search className="w-5 h-5 mr-2" />
                    Start Searching
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
