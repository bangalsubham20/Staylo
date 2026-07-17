import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/Layout/PageLayout";
import { LogIn, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUser(email, password);
      login(data.accessToken, {
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        role: data.role,
      });

      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${data.name}.`,
      });

      navigate("/");
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message || "Invalid email or password",
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
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-3xl font-extrabold tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Log in to search, book, or list student accommodations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@university.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-secondary/40 border-transparent focus:bg-background focus:border-orange-500 transition-colors rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-orange-500 hover:text-orange-600 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    <Loader2 className="w-5 h-5 animate-spin" /> Loggin in...
                  </>
                ) : (
                  <>
                    Log In <LogIn className="w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="text-center pt-2 text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Login;
