import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Layout/Navbar";
import { getMyBookings } from "@/lib/api";
import type { Booking } from "@/lib/api";
import {
  MapPin,
  Calendar,
  Home,
  Bookmark,
  ClipboardList,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Sparkles
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
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${meta.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {meta.label}
    </span>
  );
};

// ── Detailed Booking Card ───────────────────────────────────────────
const DetailedBookingCard = ({ booking }: { booking: Booking }) => {
  const moveIn = new Date(booking.moveInDate).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
  const created = new Date(booking.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <Card className="overflow-hidden border-0 bg-white/80 dark:bg-gray-800/60 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-64 h-48 sm:h-auto flex-shrink-0 relative bg-gray-100 dark:bg-gray-800">
          {booking.property?.image ? (
            <img
              src={booking.property.image}
              alt={booking.property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Home className="w-10 h-10 text-white" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight pr-4">
                {booking.property?.title ?? "Unknown Property"}
              </h3>
              <span className="text-lg font-extrabold text-orange-600 dark:text-orange-500 whitespace-nowrap">
                ₹{booking.amount?.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{booking.property?.location ?? "Location not specified"}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5" /> Move-in Date
                </p>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{moveIn}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                  <CreditCard className="w-3.5 h-3.5" /> Payment Method
                </p>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 capitalize">
                  {booking.paymentMethod?.replace(/_/g, " ") || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">
            <div className="text-xs text-gray-400 dark:text-gray-500 flex flex-col sm:flex-row sm:gap-3">
              <span>Booking ID: <strong className="font-medium text-gray-600 dark:text-gray-400">#{booking.bookingCode}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Booked on {created}</span>
            </div>
            
            <Link to={`/property/${booking.property?.id}`}>
              <Button size="sm" variant="outline" className="w-full sm:w-auto hover:bg-orange-50 hover:text-orange-600 border-gray-200 dark:border-gray-700">
                View Property <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ── Skeleton Loader ──────────────────────────────────────────────────
const DetailedBookingSkeleton = () => (
  <Card className="overflow-hidden border-0 bg-white/80 dark:bg-gray-800/60 shadow-sm">
    <div className="flex flex-col sm:flex-row">
      <Skeleton className="w-full sm:w-64 h-48 sm:h-auto rounded-none" />
      <div className="flex-1 p-5 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-4 w-1/3" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
        <div className="pt-4 flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>
    </div>
  </Card>
);

const MyBookings = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 pb-12">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          {/* ── Header ──────────────────────────────────────────── */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/student/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                My Bookings
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage and view details of all your accommodation bookings
              </p>
            </div>
          </div>

          {/* ── Content ─────────────────────────────────────────── */}
          <div className="space-y-6">
            
            {/* Loading State */}
            {isLoading && (
              <>
                {[1, 2, 3].map((i) => (
                  <DetailedBookingSkeleton key={i} />
                ))}
              </>
            )}

            {/* Error State */}
            {isError && (
              <Card className="border-0 bg-red-50/50 dark:bg-red-500/5 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Failed to load bookings
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                    {(error as Error)?.message ?? "An unexpected error occurred while fetching your bookings. Please try again later."}
                  </p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Refresh Page
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!isLoading && !isError && bookings.length === 0 && (
              <Card className="border-0 bg-white/80 dark:bg-gray-800/60 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full flex items-center justify-center mb-6">
                    <Bookmark className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    No bookings found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-lg">
                    You haven't made any bookings yet. Start exploring properties to find your perfect student home.
                  </p>
                  <Link to="/properties">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2 shadow-lg hover:shadow-blue-500/30">
                      <Sparkles className="w-5 h-5" />
                      Explore Properties
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Bookings List */}
            {!isLoading && !isError && bookings.length > 0 && (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <DetailedBookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
