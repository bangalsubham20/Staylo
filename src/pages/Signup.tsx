import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { registerUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/Layout/PageLayout";
import { UserPlus, User, Building, Mail, Lock, Phone, UserCheck, Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [role, setRole] = useState("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get("role")?.toUpperCase();
    if (roleParam === "STUDENT" || roleParam === "OWNER") {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerUser({ name, email, password, phone, role });
      toast({
        title: "Registration Successful!",
        description: "Account created. You can now log in.",
      });
      navigate("/login");
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message || "An error occurred during sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-secondary/10 dark:bg-transparent">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <Card className="w-full max-w-md border-border shadow-xl relative z-10 rounded-2xl animate-fade-in-up">
          <CardHeader className="space-y-2 text-center pb-4">
            <CardTitle className="text-3xl font-extrabold tracking-tight">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Join Staylo to find or list student accommodations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Role Switcher */}
            <Tabs value={role} onValueChange={setRole} className="w-full">
              <TabsList className="grid grid-cols-2 w-full bg-secondary/60 rounded-xl p-1">
                <TabsTrigger value="STUDENT" className="rounded-lg flex items-center gap-2 py-2 text-sm font-semibold transition-all">
                  <User className="w-4 h-4" /> Student
                </TabsTrigger>
                <TabsTrigger value="OWNER" className="rounded-lg flex items-center gap-2 py-2 text-sm font-semibold transition-all">
                  <Building className="w-4 h-4" /> Property Owner
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 bg-secondary/40 border-transparent focus:bg-background focus:border-orange-500 transition-colors rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-secondary/40 border-transparent focus:bg-background focus:border-orange-500 transition-colors rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-secondary/40 border-transparent focus:bg-background focus:border-orange-500 transition-colors rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 bg-secondary/40 border-transparent focus:bg-background focus:border-orange-500 transition-colors rounded-xl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-11 text-base font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Registering...
                  </>
                ) : (
                  <>
                    Sign Up <UserPlus className="w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="text-center pt-2 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                  Log in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Signup;
