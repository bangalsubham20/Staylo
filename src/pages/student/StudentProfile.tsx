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
  GraduationCap, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Star,
  BookOpen,
  Home
} from "lucide-react";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Mock user data - in real app, fetch from API
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: "Amit",
      lastName: "Kumar",
      email: "amit.kumar@example.com",
      phone: "+91 98765 43210",
      dateOfBirth: "1998-05-15",
      gender: "Male",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    academic: {
      university: "IIT Mumbai",
      course: "Computer Science Engineering",
      year: "3rd Year",
      studentId: "2021CS12345",
      cgpa: "8.5"
    },
    preferences: {
      budget: "15000",
      location: "Powai, Mumbai",
      propertyType: "PG",
      amenities: ["WiFi", "Meals", "Parking"],
      moveInDate: "2024-03-01"
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      documentVerified: false,
      kycCompleted: false
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
    { id: "academic", label: "Academic Info", icon: GraduationCap },
    { id: "preferences", label: "Preferences", icon: Home },
    { id: "verification", label: "Verification", icon: Shield }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
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
                    <p className="text-sm text-muted-foreground">{profileData.academic.university}</p>
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
                    {!isEditing ? (
                      <Button onClick={handleEdit} variant="outline" size="sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
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

                  {activeTab === "academic" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="university">University/College</Label>
                        <Input
                          id="university"
                          value={isEditing ? editData.academic.university : profileData.academic.university}
                          onChange={(e) => handleInputChange("academic", "university", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="course">Course/Program</Label>
                        <Input
                          id="course"
                          value={isEditing ? editData.academic.course : profileData.academic.course}
                          onChange={(e) => handleInputChange("academic", "course", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="year">Academic Year</Label>
                          <Input
                            id="year"
                            value={isEditing ? editData.academic.year : profileData.academic.year}
                            onChange={(e) => handleInputChange("academic", "year", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID</Label>
                          <Input
                            id="studentId"
                            value={isEditing ? editData.academic.studentId : profileData.academic.studentId}
                            onChange={(e) => handleInputChange("academic", "studentId", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cgpa">CGPA/Percentage</Label>
                        <Input
                          id="cgpa"
                          value={isEditing ? editData.academic.cgpa : profileData.academic.cgpa}
                          onChange={(e) => handleInputChange("academic", "cgpa", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Monthly Budget (₹)</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={isEditing ? editData.preferences.budget : profileData.preferences.budget}
                          onChange={(e) => handleInputChange("preferences", "budget", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Preferred Location</Label>
                        <Input
                          id="location"
                          value={isEditing ? editData.preferences.location : profileData.preferences.location}
                          onChange={(e) => handleInputChange("preferences", "location", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Input
                          id="propertyType"
                          value={isEditing ? editData.preferences.propertyType : profileData.preferences.propertyType}
                          onChange={(e) => handleInputChange("preferences", "propertyType", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                        <Input
                          id="moveInDate"
                          type="date"
                          value={isEditing ? editData.preferences.moveInDate : profileData.preferences.moveInDate}
                          onChange={(e) => handleInputChange("preferences", "moveInDate", e.target.value)}
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
                            <BookOpen className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Document Verification</div>
                              <div className="text-sm text-muted-foreground">Upload student ID and other documents</div>
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
                      </div>

                      <div className="p-4 bg-secondary/10 rounded-lg">
                        <h4 className="font-medium mb-2">Why verify your account?</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Get priority in property bookings</li>
                          <li>• Access to exclusive properties</li>
                          <li>• Faster approval process</li>
                          <li>• Enhanced security and trust</li>
                        </ul>
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

export default StudentProfile;
