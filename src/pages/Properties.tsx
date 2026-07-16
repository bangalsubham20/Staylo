import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/Layout/PageLayout";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Filter, MapPin, Search, SlidersHorizontal, X } from "lucide-react";

const Properties = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(4);
  const [showMap, setShowMap] = useState(false);

  const filteredProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = properties.filter((property) => {
      const matchesQuery = !normalizedQuery || [property.title, property.location, property.type, ...property.amenities].join(" ").toLowerCase().includes(normalizedQuery);
      const matchesLocation = location === "all" || property.location.toLowerCase().includes(location);
      const matchesType = type === "all" || property.type.toLowerCase() === type;
      const matchesPrice = priceRange === "all" || (priceRange === "under-10000" ? property.price < 10000 : priceRange === "10000-20000" ? property.price >= 10000 && property.price <= 20000 : property.price > 20000);
      return matchesQuery && matchesLocation && matchesType && matchesPrice;
    });
    return result.sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.reviewCount - a.reviewCount);
  }, [location, priceRange, query, sort, type]);

  const clearFilters = () => { setQuery(""); setLocation("all"); setType("all"); setPriceRange("all"); setSort("recommended"); setVisibleCount(4); };
  const hasFilters = query || location !== "all" || type !== "all" || priceRange !== "all";
  const updateFilter = (setter: (value: string) => void) => (value: string) => { setter(value); setVisibleCount(4); };

  return (
    <PageLayout>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mb-8"><p className="text-primary font-semibold mb-2">STUDENT ACCOMMODATION</p><h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Find a place that feels right.</h1><p className="mt-3 text-muted-foreground text-lg">Browse verified stays with transparent monthly pricing.</p></div>
        <Card className="mb-8 shadow-medium"><CardContent className="p-4 sm:p-6"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2"><Label htmlFor="search">Search</Label><div className="relative mt-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input id="search" className="pl-9" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(4); }} placeholder="Location, property or amenity"/></div></div>
          <div><Label>City</Label><Select value={location} onValueChange={updateFilter(setLocation)}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Any city</SelectItem><SelectItem value="mumbai">Mumbai</SelectItem><SelectItem value="bangalore">Bangalore</SelectItem><SelectItem value="delhi">Delhi</SelectItem><SelectItem value="noida">Noida</SelectItem><SelectItem value="kota">Kota</SelectItem></SelectContent></Select></div>
          <div><Label>Monthly budget</Label><Select value={priceRange} onValueChange={updateFilter(setPriceRange)}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Any budget</SelectItem><SelectItem value="under-10000">Under ₹10,000</SelectItem><SelectItem value="10000-20000">₹10,000–₹20,000</SelectItem><SelectItem value="over-20000">Over ₹20,000</SelectItem></SelectContent></Select></div>
        </div><div className="mt-4 flex flex-wrap gap-3"><Select value={type} onValueChange={updateFilter(setType)}><SelectTrigger className="w-36"><SlidersHorizontal className="w-4 h-4 mr-2"/><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All types</SelectItem><SelectItem value="pg">PG</SelectItem><SelectItem value="flat">Flat</SelectItem><SelectItem value="hostel">Hostel</SelectItem></SelectContent></Select><Button type="button" variant="outline" onClick={() => setShowMap((value) => !value)}><MapPin className="w-4 h-4 mr-2"/>{showMap ? "Hide map" : "Map view"}</Button>{hasFilters && <Button type="button" variant="ghost" onClick={clearFilters}><X className="w-4 h-4 mr-1"/>Clear filters</Button>}</div></CardContent></Card>
        {showMap && <div className="mb-8 rounded-xl border bg-primary/5 p-8 text-center"><MapPin className="w-8 h-8 text-primary mx-auto mb-3"/><p className="font-semibold">Map view is ready for {filteredProperties.length} matching stays</p><p className="text-sm text-muted-foreground mt-1">Connect a maps provider when live location data is available.</p></div>}
        <div className="flex flex-col sm:flex-row gap-3 justify-between sm:items-center mb-6"><p className="text-muted-foreground">{filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found</p><Select value={sort} onValueChange={setSort}><SelectTrigger className="w-full sm:w-52"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="recommended">Recommended</SelectItem><SelectItem value="price-low">Price: low to high</SelectItem><SelectItem value="price-high">Price: high to low</SelectItem><SelectItem value="rating">Highest rated</SelectItem></SelectContent></Select></div>
        {filteredProperties.length ? <><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{filteredProperties.slice(0, visibleCount).map((property) => <PropertyCard key={property.id} {...property} />)}</div>{visibleCount < filteredProperties.length && <div className="text-center mt-10"><Button variant="outline" onClick={() => setVisibleCount((count) => count + 4)}><Filter className="w-4 h-4 mr-2"/>Show more properties</Button></div>}</> : <div className="rounded-xl border border-dashed py-16 text-center"><h2 className="text-xl font-semibold">No stays match these filters</h2><p className="text-muted-foreground mt-2">Try another city, budget, or search term.</p><Button variant="outline" className="mt-5" onClick={clearFilters}>Reset search</Button></div>}
      </main>
    </PageLayout>
  );
};

export default Properties;
