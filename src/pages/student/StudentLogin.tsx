import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Layout/Header";
import { Mail, Lock, GraduationCap, Eye, EyeOff, ArrowRight } from "lucide-react";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // TODO: Implement login logic with Supabase
    console.log("Student login:", formData);
    
    // Redirect to dashboard after successful login
    navigate('/student/dashboard');
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/5 dark:from-background-dark dark:via-background-dark dark:to-background-dark">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-16">
        <div className={`max-w-md mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="shadow-lg sm:shadow-xl border-0 sm:border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-3 sm:pb-6 md:pb-8 px-3 sm:px-6 md:px-8 pt-5 sm:pt-8">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg">
                <GraduationCap className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Welcome Back!</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Sign in to your student account</p>
            </CardHeader>
            
            <CardContent className="px-3 sm:px-6 md:px-8 pb-4 sm:pb-8">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold text-foreground">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 sm:h-4 w-3.5 sm:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-8 sm:pl-10 h-9 sm:h-11 border-border focus:border-primary focus:ring-primary transition-all duration-300 text-xs sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 sm:h-4 w-3.5 sm:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-11 border-border focus:border-primary focus:ring-primary transition-all duration-300 text-xs sm:text-sm"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 h-3.5 sm:h-4 w-3.5 sm:w-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> : <Eye className="h-3.5 sm:h-4 w-3.5 sm:w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <Link to="/forgot-password" className="text-primary hover:text-primary-dark font-medium transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-9 sm:h-11 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-semibold text-xs sm:text-sm shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 group mt-1 sm:mt-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-xs sm:text-sm">Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm">Sign In</span>
                      <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/student/signup" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                    Create one now
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

export default StudentLogin;