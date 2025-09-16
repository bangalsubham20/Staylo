import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, SlidersHorizontal, Check } from "lucide-react";

interface MobileFiltersProps {
  onApplyFilters: (filters: {
    location: string;
    propertyType: string;
    priceRange: string;
    searchQuery: string;
  }) => void;
  initialFilters?: {
    location: string;
    propertyType: string;
    priceRange: string;
    searchQuery: string;
  };
}

export default function MobileFilters({ 
  onApplyFilters,
  initialFilters = { location: "", propertyType: "", priceRange: "", searchQuery: "" }
}: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: initialFilters.location,
    propertyType: initialFilters.propertyType,
    priceRange: initialFilters.priceRange,
    searchQuery: initialFilters.searchQuery,
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 w-full sm:hidden h-10"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] sm:h-[75vh] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5" />
            Filter Properties
          </SheetTitle>
          <SheetDescription>
            Customize your search to find the perfect accommodation
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(85vh-10rem)]">
          {/* Search Query */}
          <div className="space-y-2">
            <Label htmlFor="mobile-search" className="text-sm font-medium">Search</Label>
            <Input 
              id="mobile-search"
              placeholder="Search by location, college..."
              value={filters.searchQuery}
              onChange={(e) => handleChange('searchQuery', e.target.value)}
              className="h-10"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="mobile-location" className="text-sm font-medium">Location</Label>
            <Select 
              value={filters.location} 
              onValueChange={(value) => handleChange('location', value)}
            >
              <SelectTrigger id="mobile-location" className="h-10">
                <SelectValue placeholder="Select city" />
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

          {/* Property Type */}
          <div className="space-y-2">
            <Label htmlFor="mobile-type" className="text-sm font-medium">Property Type</Label>
            <Select 
              value={filters.propertyType} 
              onValueChange={(value) => handleChange('propertyType', value)}
            >
              <SelectTrigger id="mobile-type" className="h-10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pg">PG</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="mess">Mess/Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label htmlFor="mobile-price" className="text-sm font-medium">Price Range</Label>
            <Select 
              value={filters.priceRange} 
              onValueChange={(value) => handleChange('priceRange', value)}
            >
              <SelectTrigger id="mobile-price" className="h-10">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10000">₹0 - ₹10K</SelectItem>
                <SelectItem value="10000-20000">₹10K - ₹20K</SelectItem>
                <SelectItem value="20000-30000">₹20K - ₹30K</SelectItem>
                <SelectItem value="30000+">₹30K+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* More filter options could be added here */}
        </div>
        <div className="p-4 border-t flex gap-3 bg-background/95 sticky bottom-0">
          <Button 
            variant="outline" 
            className="flex-1 h-11" 
            onClick={() => {
              setFilters({ location: "", propertyType: "", priceRange: "", searchQuery: "" });
            }}
          >
            Reset
          </Button>
          <Button 
            className="flex-1 h-11 bg-primary hover:bg-primary-dark text-white"
            onClick={handleApplyFilters}
          >
            <Check className="w-4 h-4 mr-2" /> Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}