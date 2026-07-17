import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Car, Utensils, Heart, Eye, Dumbbell, Shield, BookOpen, Wind, ArrowRight, Sparkles } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  type: string;
  badge?: string;
}

const amenityConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  wifi:       { icon: <Wifi className="w-3 h-3" />,      label: "WiFi",     color: "text-blue-500" },
  parking:    { icon: <Car className="w-3 h-3" />,       label: "Parking",  color: "text-purple-500" },
  meals:      { icon: <Utensils className="w-3 h-3" />,  label: "Meals",    color: "text-green-500" },
  gym:        { icon: <Dumbbell className="w-3 h-3" />,  label: "Gym",      color: "text-red-500" },
  security:   { icon: <Shield className="w-3 h-3" />,    label: "Security", color: "text-yellow-600" },
  library:    { icon: <BookOpen className="w-3 h-3" />,  label: "Library",  color: "text-indigo-500" },
  ac:         { icon: <Wind className="w-3 h-3" />,      label: "AC",       color: "text-cyan-500" },
  laundry:    { icon: <Sparkles className="w-3 h-3" />,  label: "Laundry",  color: "text-pink-500" },
};

const typeColors: Record<string, string> = {
  PG:     "bg-orange-500/90 text-white",
  Flat:   "bg-blue-500/90 text-white",
  Hostel: "bg-purple-500/90 text-white",
};

const badgeColors: Record<string, string> = {
  "Top Rated": "bg-yellow-400 text-yellow-900",
  "Premium":   "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  "New":       "bg-green-500 text-white",
  "Popular":   "bg-blue-500 text-white",
};

const PropertyCard = ({
  id, title, location, price, rating, reviewCount, image, amenities, type, badge
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const displayAmenities = amenities.slice(0, 4);

  return (
    <Link to={`/property/${id}`} className="block h-full">
      <Card className="group h-full overflow-hidden border border-border/60 bg-card hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-500 rounded-2xl">

        {/* Image */}
        <div className="relative overflow-hidden h-52 sm:h-56">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Top-left: Type badge */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${typeColors[type] ?? "bg-gray-600/90 text-white"}`}>
              {type}
            </span>
            {badge && (
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${badgeColors[badge] ?? "bg-gray-600/90 text-white"}`}>
                {badge}
              </span>
            )}
          </div>

          {/* Top-right: Like + Eye buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${isLiked ? "bg-red-500 text-white shadow-lg shadow-red-500/40" : "bg-white/90 text-gray-700 hover:bg-white"}`}
              aria-label="Save property"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white backdrop-blur-md transition-all duration-300 hover:scale-110"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom: Price pill */}
          <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-lg">
            <span className="text-base font-bold text-orange-500">₹{price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground ml-1">/mo</span>
          </div>

          {/* Bottom: Rating pill */}
          <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl px-2.5 py-1.5 flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 sm:p-5 flex flex-col gap-3">
          <div>
            <h3 className="font-bold text-base sm:text-lg leading-snug group-hover:text-orange-500 transition-colors duration-200 line-clamp-2 text-card-foreground">
              {title}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-orange-400" />
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Amenity chips */}
          <div className="flex flex-wrap gap-1.5">
            {displayAmenities.map((amenity) => {
              const key = amenity.toLowerCase().replace(/\s+/g, "");
              const config = amenityConfig[key];
              return (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-secondary/60 dark:bg-secondary/40 text-muted-foreground"
                >
                  {config ? <span className={config.color}>{config.icon}</span> : null}
                  {config ? config.label : amenity}
                </span>
              );
            })}
            {amenities.length > 4 && (
              <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-md bg-secondary/60 dark:bg-secondary/40 text-muted-foreground">
                +{amenities.length - 4} more
              </span>
            )}
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between pt-1 border-t border-border/60 mt-1">
            <span className="text-xs text-muted-foreground">
              {reviewCount} reviews
            </span>
            <Button
              size="sm"
              className="text-xs font-semibold h-8 px-4 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-orange-500/30 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 gap-1"
              onClick={(e) => e.preventDefault()}
            >
              View Details <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;