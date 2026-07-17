import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/Layout/PageLayout";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Filter, MapPin, Search, SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";

const Properties = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(6);
  const [showMap, setShowMap] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = properties.filter((property) => {
      const matchesQuery = !normalizedQuery || 
        [property.title, property.location, property.type, ...property.amenities].join(" ").toLowerCase().includes(normalizedQuery);
      const matchesLocation = location === "all" || property.location.toLowerCase().includes(location.toLowerCase());
      const matchesType = type === "all" || property.type.toLowerCase() === type.toLowerCase();
      
      let matchesPrice = true;
      if (priceRange === "under-10000") matchesPrice = property.price < 10000;
      else if (priceRange === "10000-20000") matchesPrice = property.price >= 10000 && property.price <= 20000;
      else if (priceRange === "over-20000") matchesPrice = property.price > 20000;

      return matchesQuery && matchesLocation && matchesType && matchesPrice;
    });

    return result.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // recommended
    });
  }, [location, priceRange, query, sort, type]);

  const clearFilters = () => {
    setQuery("");
    setLocation("all");
    setType("all");
    setPriceRange("all");
    setSort("recommended");
    setVisibleCount(6);
  };

  const hasFilters = query || location !== "all" || type !== "all" || priceRange !== "all";

  // Skeletons for loading state
  const Skeletons = () => (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="h-[400px] rounded-2xl skeleton" />
      ))}
    </div>
  );

  return (
    <PageLayout>
      <div className="bg-secondary/20 dark:bg-transparent min-h-screen pb-20">
        
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-950 border-b border-border pt-12 pb-8 sticky top-14 sm:top-16 z-30 shadow-sm">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Explore Properties</h1>
                <p className="text-muted-foreground">Find verified student homes perfectly suited to your needs.</p>
              </div>
              
              {/* Quick Filters / Search */}
              <div className="flex-1 max-w-2xl bg-gray-100 dark:bg-gray-900 rounded-xl p-1.5 flex items-center border border-border">
                <div className="flex-1 flex items-center px-3">
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <input
                    type="text"
                    placeholder="Search area, college..."
                    className="w-full bg-transparent border-none outline-none text-sm h-10"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setVisibleCount(6); }}
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="w-px h-6 bg-border mx-2" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-[140px] border-none bg-transparent shadow-none focus:ring-0">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any City</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="noida">Noida</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-[140px] bg-white dark:bg-gray-900 border-border rounded-lg">
                    <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pg">PG</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-[160px] bg-white dark:bg-gray-900 border-border rounded-lg">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Budget</SelectItem>
                    <SelectItem value="under-10000">Under ₹10k</SelectItem>
                    <SelectItem value="10000-20000">₹10k - ₹20k</SelectItem>
                    <SelectItem value="over-20000">Above ₹20k</SelectItem>
                  </SelectContent>
                </Select>

                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                    Clear
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowMap(!showMap)} 
                  className={`rounded-lg transition-colors ${showMap ? 'bg-orange-50 text-orange-600 border-orange-200' : ''}`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
                
                <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-1 border border-border">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mt-8">
          
          {showMap && (
            <div className="mb-8 rounded-2xl border border-border bg-gray-100 dark:bg-gray-900 h-[400px] flex items-center justify-center relative overflow-hidden animate-fade-in-up">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 dark:opacity-20 grayscale" />
              <div className="relative z-10 text-center bg-white/90 dark:bg-gray-950/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-sm">
                <MapPin className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Map View Unavailable</h3>
                <p className="text-sm text-muted-foreground">Interactive map requires a Google Maps API key to function. Showing {filteredProperties.length} results.</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">
              {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
            </h2>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 rounded-lg">
                <span className="text-muted-foreground mr-2 text-sm">Sort:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <Skeletons />
          ) : filteredProperties.length > 0 ? (
            <>
              <div className={`grid gap-6 animate-fade-in-up ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2 max-w-5xl mx-auto'
              }`}>
                {filteredProperties.slice(0, visibleCount).map((property, idx) => (
                  <div key={property.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in-up">
                    <PropertyCard {...property} />
                  </div>
                ))}
              </div>

              {visibleCount < filteredProperties.length && (
                <div className="text-center mt-12 animate-fade-in">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setVisibleCount((c) => c + 6)}
                    className="rounded-full px-8 bg-white dark:bg-gray-900 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Load More Properties
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white/50 dark:bg-gray-900/50 py-24 text-center animate-fade-in">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No properties found</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any properties matching your current filters. Try adjusting your search criteria.
              </p>
              <Button onClick={clearFilters} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Properties;
