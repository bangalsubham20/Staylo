import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { getMyBookings } from "@/lib/api";
import type { Booking } from "@/lib/api";
import {
  Search,
  Heart,
  MessageCircle,
  Settings,
  MapPin,
  Calendar,
  TrendingUp,
  Home,
  Bookmark,
  ClipboardList,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ── Status badge helper ──────────────────────────────────────────────
const statusMeta: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  CONFIRMED: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", icon: CheckCircle2 },
  PENDING:   { label: "Pending",   color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",   icon: Clock },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",           icon: XCircle },
};

const StatusBadge = ({ status }: { status: string }) => {
  const meta = statusMeta[status?.toUpperCase()] ?? {
    label: status,
    color: "bg-gray-100 text-gray-600",
    icon: ClipboardList,
  };
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.color}`}>
      <Icon className="w-3 h-3" />
      {meta.label}
    </span>
  );
};

// ── Booking card ─────────────────────────────────────────────────────
const BookingCard = ({ booking }: { booking: Booking }) => {
  const moveIn = new Date(booking.moveInDate).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  const created = new Date(booking.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className="flex gap-4 p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800 transition-colors group">
      {/* Property image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        {booking.property?.image ? (
          <img
            src={booking.property.image}
            alt={booking.property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug truncate">
            {booking.property?.title ?? "Property"}
          </h4>
          <StatusBadge status={booking.status} />
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{booking.property?.location ?? "—"}</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Move-in: <strong className="text-gray-800 dark:text-gray-200">{moveIn}</strong>
          </span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            ₹{booking.amount?.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-400">
          <span>Booking #{booking.bookingCode}</span>
          <span>·</span>
          <span>Booked on {created}</span>
        </div>
      </div>
    </div>
  );
};

// ── Skeleton loaders ─────────────────────────────────────────────────
const BookingSkeleton = () => (
  <div className="flex gap-4 p-4">
    <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
);

// ── Main page ────────────────────────────────────────────────────────
const StudentDashboard = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery<Booking[]>({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
    retry: 1,
  });

  // Derived stats
  const confirmedCount = bookings.filter((b) => b.status?.toUpperCase() === "CONFIRMED").length;
  const pendingCount   = bookings.filter((b) => b.status?.toUpperCase() === "PENDING").length;
  const totalSpent     = bookings
    .filter((b) => b.status?.toUpperCase() === "CONFIRMED")
    .reduce((sum, b) => sum + (b.amount ?? 0), 0);

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Get first name
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* ── Welcome Header ─────────────────────────────────── */}
          <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 ring-2 ring-orange-500/30 ring-offset-2 ring-offset-background">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
                  {user?.name
                    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                    : "S"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {greeting}, {firstName}! 👋
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                  Ready to find your perfect student accommodation?
                </p>
              </div>
            </div>
            <Link to="/properties">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-blue-500/25 transition-all duration-300 gap-2"
              >
                <Search className="w-4 h-4" />
                Browse Properties
              </Button>
            </Link>
          </div>

          {/* ── Stats Row ──────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Bookings",
                value: isLoading ? "—" : bookings.length,
                icon: ClipboardList,
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50 dark:bg-blue-500/10",
              },
              {
                label: "Confirmed",
                value: isLoading ? "—" : confirmedCount,
                icon: CheckCircle2,
                gradient: "from-emerald-500 to-green-500",
                bg: "bg-emerald-50 dark:bg-emerald-500/10",
              },
              {
                label: "Pending",
                value: isLoading ? "—" : pendingCount,
                icon: Clock,
                gradient: "from-amber-500 to-orange-500",
                bg: "bg-amber-50 dark:bg-amber-500/10",
              },
              {
                label: "Total Spent",
                value: isLoading ? "—" : `₹${totalSpent.toLocaleString("en-IN")}`,
                icon: TrendingUp,
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
              { to: "/properties", label: "Search Properties", sub: "Find your perfect home", icon: Search, gradient: "from-blue-500 to-purple-500" },
              { to: "/student/profile", label: "My Profile",          sub: "Update your details",   icon: Settings,     gradient: "from-purple-500 to-pink-500" },
              { to: "/properties",     label: "Saved Properties",     sub: "View your favourites",  icon: Heart,        gradient: "from-green-500 to-emerald-500" },
              { to: "/contact",        label: "Contact Support",      sub: "Get help anytime",      icon: MessageCircle,gradient: "from-orange-500 to-red-500" },
            ].map(({ to, label, sub, icon: Icon, gradient }) => (
              <Link to={to} key={label}>
                <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm h-full">
                  <CardContent className="p-5 text-center">
                    <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* ── My Bookings ─────────────────────────────────────── */}
          <Card className="border-0 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  <ClipboardList className="w-5 h-5 text-blue-500" />
                  My Bookings
                  {!isLoading && bookings.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs font-semibold">
                      {bookings.length}
                    </Badge>
                  )}
                </CardTitle>
                {!isLoading && bookings.length > 0 && (
                  <Link to="/student/bookings" className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Loading */}
              {isLoading && (
                <div className="space-y-2 divide-y divide-gray-100 dark:divide-gray-700/50">
                  {[1, 2, 3].map((i) => <BookingSkeleton key={i} />)}
                </div>
              )}

              {/* Error */}
              {isError && (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-3">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Couldn't load bookings</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {(error as Error)?.message ?? "Please check your connection and try again."}
                  </p>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && !isError && bookings.length === 0 && (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Bookmark className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    No bookings yet
                  </h3>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-5 max-w-xs">
                    Start exploring properties and book your perfect student home.
                  </p>
                  <Link to="/properties">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2">
                      <Sparkles className="w-4 h-4" />
                      Explore Properties
                    </Button>
                  </Link>
                </div>
              )}

              {/* Booking list */}
              {!isLoading && !isError && bookings.length > 0 && (
                <div className="space-y-2 divide-y divide-gray-100 dark:divide-gray-700/50">
                  {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── CTA Banner ──────────────────────────────────────── */}
          {!isLoading && bookings.length === 0 && (
            <div className="mt-6">
              <Card className="border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                <CardContent className="p-8 relative">
                  <h3 className="text-2xl font-bold mb-2">Find your perfect home 🏠</h3>
                  <p className="text-blue-100 mb-6 max-w-md">
                    Browse thousands of verified properties near your campus — PGs, flats, hostels & more.
                  </p>
                  <Link to="/properties">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold shadow-lg">
                      <Search className="w-5 h-5 mr-2" />
                      Start Searching
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
