import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Car, Utensils, Heart, Eye } from "lucide-react";

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
}

const PropertyCard = ({ 
  id, 
  title, 
  location, 
  price, 
  rating, 
  reviewCount, 
  image, 
  amenities, 
  type 
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'parking':
        return <Car className="w-3 h-3" />;
      case 'meals':
        return <Utensils className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
        <Link to={`/properties/${id}`}>
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full border-0 bg-card/90 dark:bg-card/90 backdrop-blur-sm">
        <div className="relative overflow-hidden">
          <div className="relative">
            <img 
              src={image} 
              alt={title}
              className={`w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-all duration-700 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 text-gray-600 hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white backdrop-blur-sm transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          
              <Badge
                variant="secondary"
                className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-card/90 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 shadow-lg border-0"
              >
                {type}
              </Badge>

              {/* Rating badge */}
              <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-semibold shadow-lg">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span>{rating}</span>
              </div>
        </div>
        
        <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="font-bold text-lg sm:text-xl group-hover:text-primary transition-colors line-clamp-2 flex-1 tracking-tight text-card-foreground">
              {title}
            </h3>
          </div>

          <div className="flex items-center text-muted-foreground text-sm mb-4 group-hover:text-foreground transition-colors">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              {amenities.slice(0, 3).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center text-muted-foreground bg-secondary/20 rounded-full p-2 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                >
                  {getAmenityIcon(amenity)}
                </div>
              ))}
              {amenities.length > 3 && (
                <span className="text-xs text-muted-foreground bg-secondary/20 rounded-full px-2 py-1">
                  +{amenities.length - 3}
                </span>
              )}
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                ₹{price.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;