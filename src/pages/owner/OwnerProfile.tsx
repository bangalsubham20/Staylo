import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/Layout/PageLayout";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Star,
  Briefcase,
  Home,
  TrendingUp,
  Users
} from "lucide-react";

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Mock owner data - in real app, fetch from API
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      dateOfBirth: "1985-03-20",
      gender: "Male",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    business: {
      companyName: "Kumar Properties",
      businessType: "Property Management",
      registrationNumber: "REG123456789",
      gstNumber: "27ABCDE1234F1Z5",
      experience: "8 years",
      totalProperties: 12,
      activeProperties: 8
    },
    address: {
      street: "123, Hiranandani Gardens",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400076",
      country: "India"
    },
    bank: {
      accountHolder: "Rajesh Kumar",
      accountNumber: "1234567890",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
      branch: "Powai Branch"
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      documentVerified: true,
      kycCompleted: true,
      bankVerified: false
    },
    stats: {
      totalBookings: 45,
      totalRevenue: 675000,
      averageRating: 4.8,
      responseTime: "2 hours"
    }
  });

  const [editData, setEditData] = useState(profileData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    // In real app, save to API
    console.log("Profile updated:", editData);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "business", label: "Business Info", icon: Building },
    { id: "address", label: "Address", icon: MapPin },
    { id: "bank", label: "Bank Details", icon: Briefcase },
    { id: "verification", label: "Verification", icon: Shield },
    { id: "stats", label: "Statistics", icon: TrendingUp }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and business details</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={profileData.personal.profileImage} />
                      <AvatarFallback>
                        {profileData.personal.firstName[0]}{profileData.personal.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">
                      {profileData.personal.firstName} {profileData.personal.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{profileData.business.companyName}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{profileData.stats.averageRating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? 'bg-primary text-white'
                              : 'hover:bg-secondary/20 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </CardTitle>
                    {!isEditing && activeTab !== "stats" && (
                      <Button onClick={handleEdit} variant="outline" size="sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    {isEditing && activeTab !== "stats" && (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} size="sm" className="bg-primary hover:bg-primary-dark">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  {activeTab === "personal" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={isEditing ? editData.personal.firstName : profileData.personal.firstName}
                            onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={isEditing ? editData.personal.lastName : profileData.personal.lastName}
                            onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={isEditing ? editData.personal.email : profileData.personal.email}
                          onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={isEditing ? editData.personal.phone : profileData.personal.phone}
                          onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={isEditing ? editData.personal.dateOfBirth : profileData.personal.dateOfBirth}
                            onChange={(e) => handleInputChange("personal", "dateOfBirth", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Input
                            id="gender"
                            value={isEditing ? editData.personal.gender : profileData.personal.gender}
                            onChange={(e) => handleInputChange("personal", "gender", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "business" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={isEditing ? editData.business.companyName : profileData.business.companyName}
                          onChange={(e) => handleInputChange("business", "companyName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Input
                          id="businessType"
                          value={isEditing ? editData.business.businessType : profileData.business.businessType}
                          onChange={(e) => handleInputChange("business", "businessType", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="registrationNumber">Registration Number</Label>
                          <Input
                            id="registrationNumber"
                            value={isEditing ? editData.business.registrationNumber : profileData.business.registrationNumber}
                            onChange={(e) => handleInputChange("business", "registrationNumber", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gstNumber">GST Number</Label>
                          <Input
                            id="gstNumber"
                            value={isEditing ? editData.business.gstNumber : profileData.business.gstNumber}
                            onChange={(e) => handleInputChange("business", "gstNumber", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          value={isEditing ? editData.business.experience : profileData.business.experience}
                          onChange={(e) => handleInputChange("business", "experience", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "address" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={isEditing ? editData.address.street : profileData.address.street}
                          onChange={(e) => handleInputChange("address", "street", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={isEditing ? editData.address.city : profileData.address.city}
                            onChange={(e) => handleInputChange("address", "city", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={isEditing ? editData.address.state : profileData.address.state}
                            onChange={(e) => handleInputChange("address", "state", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            value={isEditing ? editData.address.pincode : profileData.address.pincode}
                            onChange={(e) => handleInputChange("address", "pincode", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={isEditing ? editData.address.country : profileData.address.country}
                            onChange={(e) => handleInputChange("address", "country", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "bank" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="accountHolder">Account Holder Name</Label>
                        <Input
                          id="accountHolder"
                          value={isEditing ? editData.bank.accountHolder : profileData.bank.accountHolder}
                          onChange={(e) => handleInputChange("bank", "accountHolder", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={isEditing ? editData.bank.accountNumber : profileData.bank.accountNumber}
                          onChange={(e) => handleInputChange("bank", "accountNumber", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="ifscCode">IFSC Code</Label>
                          <Input
                            id="ifscCode"
                            value={isEditing ? editData.bank.ifscCode : profileData.bank.ifscCode}
                            onChange={(e) => handleInputChange("bank", "ifscCode", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input
                            id="bankName"
                            value={isEditing ? editData.bank.bankName : profileData.bank.bankName}
                            onChange={(e) => handleInputChange("bank", "bankName", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Input
                          id="branch"
                          value={isEditing ? editData.bank.branch : profileData.bank.branch}
                          onChange={(e) => handleInputChange("bank", "branch", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "verification" && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Email Verification</div>
                              <div className="text-sm text-muted-foreground">Verify your email address</div>
                            </div>
                          </div>
                          <Badge variant={profileData.verification.emailVerified ? "default" : "secondary"}>
                            {profileData.verification.emailVerified ? "Verified" : "Pending"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Phone Verification</div>
                              <div className="text-sm text-muted-foreground">Verify your phone number</div>
                            </div>
                          </div>
                          <Badge variant={profileData.verification.phoneVerified ? "default" : "secondary"}>
                            {profileData.verification.phoneVerified ? "Verified" : "Pending"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Building className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Document Verification</div>
                              <div className="text-sm text-muted-foreground">Upload business documents</div>
                            </div>
                          </div>
                          <Badge variant={profileData.verification.documentVerified ? "default" : "secondary"}>
                            {profileData.verification.documentVerified ? "Verified" : "Pending"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">KYC Verification</div>
                              <div className="text-sm text-muted-foreground">Complete identity verification</div>
                            </div>
                          </div>
                          <Badge variant={profileData.verification.kycCompleted ? "default" : "secondary"}>
                            {profileData.verification.kycCompleted ? "Completed" : "Pending"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Bank Verification</div>
                              <div className="text-sm text-muted-foreground">Verify bank account details</div>
                            </div>
                          </div>
                          <Badge variant={profileData.verification.bankVerified ? "default" : "secondary"}>
                            {profileData.verification.bankVerified ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "stats" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Home className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">{profileData.stats.totalBookings}</div>
                            <div className="text-sm text-muted-foreground">Total Bookings</div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">₹{profileData.stats.totalRevenue.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Total Revenue</div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Star className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">{profileData.stats.averageRating}</div>
                            <div className="text-sm text-muted-foreground">Average Rating</div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">{profileData.stats.responseTime}</div>
                            <div className="text-sm text-muted-foreground">Response Time</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Property Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Properties</span>
                                <span className="font-semibold">{profileData.business.totalProperties}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Active Properties</span>
                                <span className="font-semibold text-primary">{profileData.business.activeProperties}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Inactive Properties</span>
                                <span className="font-semibold">{profileData.business.totalProperties - profileData.business.activeProperties}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <Button className="w-full justify-start" variant="outline">
                                <Home className="w-4 h-4 mr-2" />
                                Add New Property
                              </Button>
                              <Button className="w-full justify-start" variant="outline">
                                <Users className="w-4 h-4 mr-2" />
                                View Bookings
                              </Button>
                              <Button className="w-full justify-start" variant="outline">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                View Analytics
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OwnerProfile;
