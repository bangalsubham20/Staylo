import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import StudentSignup from "./pages/student/StudentSignup";
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import OwnerSignup from "./pages/owner/OwnerSignup";
import OwnerLogin from "./pages/owner/OwnerLogin";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerProfile from "./pages/owner/OwnerProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="staylo-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTransition>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Student Routes */}
              <Route path="/student/signup" element={<StudentSignup />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              
              {/* Owner Routes */}
              <Route path="/owner/signup" element={<OwnerSignup />} />
              <Route path="/owner/login" element={<OwnerLogin />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/profile" element={<OwnerProfile />} />
              
              {/* Payment & Booking Routes */}
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/booking-success/:id" element={<BookingSuccess />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
