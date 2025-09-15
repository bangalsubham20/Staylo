import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Layout/Header";
import { User, Mail, Lock, Phone, GraduationCap, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    college: "",
    course: "",
    year: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // TODO: Implement signup logic with Supabase
    console.log("Student signup:", formData);
    
    // Redirect to dashboard after successful signup
    navigate('/student/dashboard');
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isPasswordValid = formData.password.length >= 8;
  const isPasswordMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/5 dark:from-background-dark dark:via-background-dark dark:to-background-dark">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className={`max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">Join Staylo Today!</CardTitle>
              <p className="text-muted-foreground mt-2">Create your student account and find your perfect home</p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-12 h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-12 h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-12 h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-sm font-semibold text-gray-700 dark:text-gray-300">College/University</Label>
                  <Input
                    id="college"
                    name="college"
                    type="text"
                    placeholder="Enter your college name"
                    className="h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="course" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Course</Label>
                    <Input
                      id="course"
                      name="course"
                      type="text"
                      placeholder="e.g., Computer Science"
                      className="h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                      value={formData.course}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      type="text"
                      placeholder="e.g., 2nd Year"
                      className="h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-12 pr-12 h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 ${isPasswordValid ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className={isPasswordValid ? 'text-green-600' : 'text-gray-500'}>
                          {isPasswordValid ? 'Password is strong' : 'Password must be at least 8 characters'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-12 pr-12 h-12 border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 ${isPasswordMatch ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={isPasswordMatch ? 'text-green-600' : 'text-red-600'}>
                          {isPasswordMatch ? 'Passwords match' : 'Passwords do not match'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading || !isPasswordValid || !isPasswordMatch}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/student/login" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;