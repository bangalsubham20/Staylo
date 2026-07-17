export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  type: "PG" | "Flat" | "Hostel";
  badge?: string;
};

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern PG near IIT Campus",
    location: "Powai, Mumbai",
    price: 15000,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    amenities: ["WiFi", "Meals", "Parking", "Laundry"],
    type: "PG",
    badge: "Top Rated"
  },
  {
    id: "2",
    title: "Cozy 2BHK Apartment",
    location: "Koramangala, Bangalore",
    price: 25000,
    rating: 4.6,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
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
    image: "https://images.unsplash.com/photo-1555854877-bab0e460b1e5?auto=format&fit=crop&w=900&q=80",
    amenities: ["Meals", "WiFi", "Laundry", "Security"],
    type: "Hostel"
  },
  {
    id: "4",
    title: "Shared Flat near Delhi University",
    location: "North Campus, Delhi",
    price: 12000,
    rating: 4.5,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    amenities: ["WiFi", "Parking", "Security"],
    type: "Flat"
  },
  {
    id: "5",
    title: "Premium PG with AC",
    location: "Bandra, Mumbai",
    price: 20000,
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    amenities: ["AC", "WiFi", "Meals", "Gym"],
    type: "PG",
    badge: "Premium"
  },
  {
    id: "6",
    title: "Budget Student Hostel",
    location: "Kota, Rajasthan",
    price: 6000,
    rating: 4.2,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
    amenities: ["WiFi", "Study Room", "Library"],
    type: "Hostel"
  },
  {
    id: "7",
    title: "Luxury Studio Apartment",
    location: "Whitefield, Bangalore",
    price: 32000,
    rating: 4.9,
    reviewCount: 211,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    amenities: ["AC", "WiFi", "Gym", "Parking", "Security"],
    type: "Flat",
    badge: "New"
  },
  {
    id: "8",
    title: "Girls PG near Jadavpur University",
    location: "Jadavpur, Kolkata",
    price: 9500,
    rating: 4.5,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
    amenities: ["WiFi", "Meals", "Laundry", "Security"],
    type: "PG"
  },
  {
    id: "9",
    title: "Heritage Hostel — Old City",
    location: "Chandni Chowk, Delhi",
    price: 5500,
    rating: 4.3,
    reviewCount: 102,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
    amenities: ["WiFi", "Meals", "Study Room"],
    type: "Hostel"
  },
  {
    id: "10",
    title: "Spacious 3BHK near IT Park",
    location: "Hinjewadi, Pune",
    price: 18000,
    rating: 4.6,
    reviewCount: 63,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80",
    amenities: ["WiFi", "Parking", "Gym", "AC"],
    type: "Flat",
    badge: "Popular"
  }
];

export const getProperty = (id?: string) =>
  properties.find((property) => property.id === id) ?? properties[0];
