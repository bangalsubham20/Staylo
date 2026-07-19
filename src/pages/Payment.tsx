import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/Layout/PageLayout";
import { getProperty, createBooking } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Shield,
  CheckCircle,
  ArrowLeft,
  Lock,
  Calendar,
  MapPin,
  Star,
  DollarSign
} from "lucide-react";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [searchParams] = useSearchParams();
  const selectedMoveInDate = searchParams.get('date') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Fetch property details from API
  const { data: propertySummary, isLoading: propertyLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id as string),
    enabled: !!id
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in as a student to book a property.",
        variant: "destructive"
      });
      navigate("/student/login");
    }
  }, [isAuthenticated, authLoading, navigate, toast]);

  if (authLoading || propertyLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !propertySummary) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold text-red-500">Property not found</h2>
          <Button onClick={() => navigate('/properties')} className="mt-4">Back to Properties</Button>
        </div>
      </PageLayout>
    );
  }

  const property = {
    id: propertySummary.id,
    title: propertySummary.title,
    location: propertySummary.location,
    price: propertySummary.price,
    deposit: 30000,
    maintenance: 2000,
    image: propertySummary.image
  };

  const totalAmount = property.price + property.deposit + property.maintenance;

  const handlePayment = async () => {
    if (!agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Call real backend booking API
      const booking = await createBooking({
        propertyId: Number(property.id),
        paymentMethod,
        amount: totalAmount,
        moveInDate: selectedMoveInDate
      });

      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed!",
      });

      // Redirect to success page with backend custom booking code
      navigate(`/booking-success/${booking.bookingCode}`);
    } catch (err: any) {
      toast({
        title: "Payment Failed",
        description: err.message || "Failed to process booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-secondary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Property
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Booking</h1>
              <p className="text-muted-foreground">Secure payment for your accommodation</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/10">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer">
                          <CreditCard className="w-5 h-5" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/10">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer">
                          <Smartphone className="w-5 h-5" />
                          <span>UPI Payment</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/10">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer">
                          <Building className="w-5 h-5" />
                          <span>Net Banking</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="text-lg tracking-widest"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              className="text-center"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="text-center"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@paytm"
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          You will be redirected to your UPI app to complete the payment
                        </div>
                      </div>
                    )}

                    {paymentMethod === "netbanking" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bank">Select Bank</Label>
                          <Input
                            id="bank"
                            placeholder="Search for your bank"
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          You will be redirected to your bank's website to complete the payment
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/terms" className="text-primary hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{property.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Rent</span>
                        <span>₹{property.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Security Deposit</span>
                        <span>₹{property.deposit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance</span>
                        <span>₹{property.maintenance.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Security Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">PCI DSS compliant</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Secure payment gateway</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Money-back guarantee</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !agreeToTerms}
                  className="w-full bg-primary hover:bg-primary-dark text-lg py-6"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Pay ₹{totalAmount.toLocaleString()}
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Payment;
