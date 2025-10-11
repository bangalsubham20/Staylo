import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/Layout/PageLayout";
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Download,
  Home,
  MessageCircle,
  Star,
  ArrowRight,
  Clock,
  DollarSign
} from "lucide-react";

const BookingSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Mock booking data - in real app, fetch by ID
  const booking = {
    id: "BK" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    property: {
      id: id || "1",
      title: "Modern PG near IIT Campus",
      location: "Powai, Mumbai",
      address: "123, Hiranandani Gardens, Powai, Mumbai - 400076",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@example.com"
    },
    payment: {
      amount: 47000,
      method: "Credit Card",
      transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString()
    },
    moveInDate: "2024-03-01",
    status: "Confirmed"
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownloadReceipt = () => {
    // In real app, generate and download PDF receipt
    console.log("Downloading receipt for booking:", booking.id);
  };

  const handleContactOwner = () => {
    // In real app, open chat or call functionality
    console.log("Contacting owner:", booking.owner.phone);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
              <p className="text-xl text-muted-foreground mb-2">
                Your accommodation has been successfully booked
              </p>
              <p className="text-muted-foreground">
                Booking ID: <span className="font-mono font-semibold text-primary">{booking.id}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Property Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.property.image}
                        alt={booking.property.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{booking.property.title}</h3>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {booking.property.address}
                        </div>
                        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Booking Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Move-in Date</div>
                        <div className="font-semibold">{booking.moveInDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Booking Status</div>
                        <div className="font-semibold text-green-600 dark:text-green-400">{booking.status}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                        <div className="font-semibold">{booking.payment.method}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Transaction ID</div>
                        <div className="font-mono text-sm">{booking.payment.transactionId}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Owner Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold text-lg">{booking.owner.name}</div>
                        <div className="text-muted-foreground">Property Owner</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{booking.owner.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{booking.owner.email}</span>
                        </div>
                      </div>
                      <Button
                        onClick={handleContactOwner}
                        className="w-full bg-primary hover:bg-primary-dark"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact Owner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Rent</span>
                        <span>₹15,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Security Deposit</span>
                        <span>₹30,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance</span>
                        <span>₹2,000</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Paid</span>
                        <span className="text-primary">₹{booking.payment.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-primary" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        onClick={handleDownloadReceipt}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Rental Agreement
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        <div>
                          <div className="font-medium">Contact Owner</div>
                          <div className="text-muted-foreground">Reach out to confirm move-in details</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        <div>
                          <div className="font-medium">Visit Property</div>
                          <div className="text-muted-foreground">Schedule a property visit if needed</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        <div>
                          <div className="font-medium">Move In</div>
                          <div className="text-muted-foreground">Complete the move-in process</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/student/dashboard">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/properties">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary-dark">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Browse More Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookingSuccess;
