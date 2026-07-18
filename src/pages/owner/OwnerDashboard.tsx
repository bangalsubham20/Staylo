import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { getOwnerProperties, getOwnerBookings, deleteOwnerProperty } from "@/lib/api";
import type { OwnerProperty, Booking } from "@/lib/api";
import { 
  Plus, 
  Eye, 
  Edit, 
  Settings, 
  MapPin, 
  Star, 
  Home,
  MessageCircle,
  DollarSign,
  ClipboardList,
  Trash2,
  AlertCircle,
  ArrowRight
} from "lucide-react";

// ── Property Skeleton ───────────────────────────────────────────────
const PropertySkeleton = () => (
  <div className="flex gap-4 p-4">
    <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
);

// ── Booking/Inquiry Skeleton ─────────────────────────────────────────
const InquirySkeleton = () => (
  <div className="p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl space-y-2">
    <div className="flex justify-between items-start">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-1/4" />
    </div>
    <Skeleton className="h-3 w-1/2" />
    <Skeleton className="h-8 w-20 mt-2" />
  </div>
);

const OwnerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch Owner Properties
  const {
    data: properties = [],
    isLoading: isPropsLoading,
    isError: isPropsError
  } = useQuery<OwnerProperty[]>({
    queryKey: ["owner-properties"],
    queryFn: getOwnerProperties,
    retry: 1,
  });

  // Fetch Owner Bookings
  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
  } = useQuery<Booking[]>({
    queryKey: ["owner-bookings"],
    queryFn: getOwnerBookings,
    retry: 1,
  });

  // Delete Property Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteOwnerProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-properties"] });
      toast({
        title: "Property Deleted",
        description: "The property has been successfully removed.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Failed to delete",
        description: err.message || "An error occurred while deleting the property.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteProperty = (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteMutation.mutate(id);
    }
  };

  // Derived stats
  const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
  const activeBookings = bookings.filter((b) => b.status?.toUpperCase() === "CONFIRMED").length;
  const pendingInquiries = bookings.filter((b) => b.status?.toUpperCase() === "PENDING");
  
  // Assuming revenue comes from confirmed bookings (this might need to be adjusted based on business logic)
  const monthlyRevenue = bookings
    .filter((b) => b.status?.toUpperCase() === "CONFIRMED")
    .reduce((sum, b) => sum + (b.amount ?? 0), 0);

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0] ?? "Partner";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* ── Welcome Header ─────────────────────────────────── */}
          <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 ring-2 ring-orange-500/30 ring-offset-2 ring-offset-background">
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-lg font-bold">
                  {user?.name
                    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                    : "O"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {greeting}, {firstName}! 🏠
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                  Manage your properties and track your business growth
                </p>
              </div>
            </div>
            <Button
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-md hover:shadow-orange-500/25 transition-all duration-300 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </Button>
          </div>

          {/* ── Stats Cards ────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Properties",
                value: isPropsLoading ? "—" : properties.length,
                icon: Home,
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50 dark:bg-blue-500/10",
              },
              {
                label: "Total Views",
                value: isPropsLoading ? "—" : totalViews,
                icon: Eye,
                gradient: "from-green-500 to-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-500/10",
              },
              {
                label: "Active Bookings",
                value: isBookingsLoading ? "—" : activeBookings,
                icon: ClipboardList,
                gradient: "from-orange-500 to-red-500",
                bg: "bg-orange-50 dark:bg-orange-500/10",
              },
              {
                label: "Total Revenue",
                value: isBookingsLoading ? "—" : `₹${monthlyRevenue.toLocaleString("en-IN")}`,
                icon: DollarSign,
                gradient: "from-purple-500 to-pink-500",
                bg: "bg-purple-50 dark:bg-purple-500/10",
              },
            ].map(({ label, value, icon: Icon, gradient, bg }) => (
              <Card key={label} className={`border-0 shadow-sm ${bg}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
                    </div>
                    <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Quick Actions ───────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Add Property",      sub: "List a new home",       icon: Plus,          gradient: "from-orange-500 to-red-500" },
              { label: "Manage Listings",   sub: "Edit your properties",  icon: Edit,          gradient: "from-blue-500 to-cyan-500" },
              { label: "Messages",          sub: "Chat with students",    icon: MessageCircle, gradient: "from-green-500 to-emerald-500" },
              { label: "Account Settings",  sub: "Manage profile",        icon: Settings,      gradient: "from-purple-500 to-pink-500", to: "/owner/profile" },
            ].map(({ label, sub, icon: Icon, gradient, to }) => {
              const content = (
                <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm h-full">
                  <CardContent className="p-5 text-center">
                    <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
                  </CardContent>
                </Card>
              );
              return to ? <Link to={to} key={label}>{content}</Link> : <div key={label}>{content}</div>;
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── My Properties ────────────────────────────────────── */}
            <Card className="lg:col-span-2 border-0 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm">
              <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800/60">
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg">
                  <Home className="w-5 h-5 text-orange-500" />
                  My Properties
                  {!isPropsLoading && properties.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs font-semibold">
                      {properties.length}
                    </Badge>
                  )}
                </CardTitle>
                {!isPropsLoading && properties.length > 0 && (
                  <Button variant="ghost" size="sm" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                    View all <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {isPropsLoading && (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                    {[1, 2].map((i) => <PropertySkeleton key={i} />)}
                  </div>
                )}
                
                {isPropsError && (
                  <div className="flex flex-col items-center py-10 text-center px-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-3">
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Failed to load properties</p>
                  </div>
                )}

                {!isPropsLoading && !isPropsError && properties.length === 0 && (
                  <div className="flex flex-col items-center py-12 text-center px-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-500/10 dark:to-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <Home className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      No properties listed yet
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-5 max-w-xs">
                      Start earning by listing your property for students.
                    </p>
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white gap-2">
                      <Plus className="w-4 h-4" />
                      Add Your First Property
                    </Button>
                  </div>
                )}

                {!isPropsLoading && !isPropsError && properties.length > 0 && (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                    {properties.map((property) => (
                      <div key={property.id} className="flex flex-col sm:flex-row gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="w-full sm:w-28 sm:h-24 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                          {property.image ? (
                            <img 
                              src={property.image} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                              <Home className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 truncate">{property.title}</h4>
                            <Badge variant={property.status?.toUpperCase() === 'ACTIVE' ? 'default' : 'secondary'} className={property.status?.toUpperCase() === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 shadow-none border-0' : ''}>
                              {property.status || 'Active'}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3" />
                            {property.location}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            <div className="flex items-center gap-1 font-medium">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              {property.rating || 'New'}
                            </div>
                            <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                              ₹{property.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-gray-500 flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {property.views || 0} views
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col justify-end gap-2 mt-2 sm:mt-0">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteProperty(property.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ── Recent Bookings / Inquiries ──────────────────────── */}
            <Card className="border-0 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm">
              <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800/60">
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg">
                  <ClipboardList className="w-5 h-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {isBookingsLoading && (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => <InquirySkeleton key={i} />)}
                  </div>
                )}

                {!isBookingsLoading && bookings.length === 0 && (
                  <div className="py-8 text-center">
                    <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No activity yet</p>
                    <p className="text-xs text-gray-400 mt-1">When students book or inquire, they'll show up here.</p>
                  </div>
                )}

                {!isBookingsLoading && bookings.length > 0 && (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => {
                      const date = new Date(booking.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short"
                      });
                      
                      return (
                        <div key={booking.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                          <div className="flex items-start justify-between mb-1.5">
                            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate pr-2">
                              {booking.user?.name || "Student"}
                            </h4>
                            <span className="text-[10px] text-gray-500 whitespace-nowrap bg-white dark:bg-gray-900 px-2 py-0.5 rounded-full border border-gray-100 dark:border-gray-800">
                              {date}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
                            {booking.property?.title || "Property"}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className={`text-[10px] border-0 px-2 py-0.5 font-medium ${
                              booking.status?.toUpperCase() === 'CONFIRMED' 
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'
                                : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                            }`}>
                              {booking.status || 'PENDING'}
                            </Badge>
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              ₹{booking.amount?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    
                    {bookings.length > 5 && (
                      <Button variant="ghost" className="w-full text-xs text-blue-600 mt-2 h-8">
                        View all activity
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── Call to Action ──────────────────────────────────────── */}
          {!isPropsLoading && properties.length === 0 && (
            <div className="mt-8 text-center max-w-2xl mx-auto">
              <Card className="border-0 bg-gradient-to-r from-orange-600 to-red-600 text-white overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')] opacity-20 mix-blend-overlay bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent" />
                <CardContent className="p-8 sm:p-10 relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Ready to list your property?</h3>
                  <p className="text-orange-100/90 mb-6 max-w-md mx-auto text-sm sm:text-base">
                    Connect with thousands of students looking for accommodation and start earning today.
                  </p>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl">
                    <Plus className="w-5 h-5 mr-2" />
                    List Your First Property
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
