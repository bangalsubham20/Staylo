const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

export interface Property {
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

export interface User {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "OWNER";
}

// Helper to make authorized fetch requests
const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem("staylo_token");
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  return fetch(url, { ...options, headers });
};

export interface PropertyFilters {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getProperties = async (filters?: PropertyFilters): Promise<Property[]> => {
  const query = new URLSearchParams();
  if (filters) {
    if (filters.location) query.append("location", filters.location);
    if (filters.type) query.append("type", filters.type);
    if (filters.minPrice !== undefined) query.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) query.append("maxPrice", filters.maxPrice.toString());
  }
  
  const queryString = query.toString();
  const url = `${API_BASE_URL}/properties${queryString ? `?${queryString}` : ""}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  
  return data.map((p: any) => ({
    ...p,
    id: p.id.toString(),
  }));
};

export const getProperty = async (id: string): Promise<Property> => {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`);
  if (!response.ok) {
    throw new Error('Property not found');
  }
  const data = await response.json();
  
  return {
    ...data,
    id: data.id.toString(),
  };
};

// Auth API calls
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to log in");
  }

  return response.json(); // returns token and user details
};

export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to register");
  }

  return response.json();
};

// Booking types & API calls
export interface Booking {
  id: number;
  bookingCode: string;
  property: Property;
  user: User;
  paymentMethod: string;
  transactionId: string;
  amount: number;
  moveInDate: string;
  status: string;
  createdAt: string;
}

export const createBooking = async (bookingData: {
  propertyId: number;
  paymentMethod: string;
  amount: number;
  moveInDate: string;
}): Promise<Booking> => {
  const response = await authFetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to create booking");
  }

  return response.json();
};

export const getBookingByCode = async (bookingCode: string): Promise<Booking> => {
  const response = await authFetch(`${API_BASE_URL}/bookings/${bookingCode}`);
  if (!response.ok) {
    throw new Error("Booking not found");
  }
  return response.json();
};

// Fetch all bookings for the currently authenticated student
export const getMyBookings = async (): Promise<Booking[]> => {
  const response = await authFetch(`${API_BASE_URL}/bookings/my`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
};

// ── Owner-specific types & API calls ────────────────────────────────

export interface OwnerProperty extends Property {
  status?: string;
  views?: number;
  inquiries?: number;
}

// Fetch properties listed by the currently authenticated owner
export const getOwnerProperties = async (): Promise<OwnerProperty[]> => {
  const response = await authFetch(`${API_BASE_URL}/properties/owner`);
  if (!response.ok) {
    throw new Error("Failed to fetch your properties");
  }
  const data = await response.json();
  return data.map((p: any) => ({
    ...p,
    id: p.id.toString(),
  }));
};

// Delete a property owned by the current owner
export const deleteOwnerProperty = async (id: string): Promise<void> => {
  const response = await authFetch(`${API_BASE_URL}/properties/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to delete property");
  }
};

// Fetch bookings received on the owner's properties
export const getOwnerBookings = async (): Promise<Booking[]> => {
  const response = await authFetch(`${API_BASE_URL}/bookings/owner`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookings for your properties");
  }
  return response.json();
};
