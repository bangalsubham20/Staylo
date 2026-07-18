import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, User, Building2, Menu, X, Sparkles, LogOut, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/properties", label: "Properties" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  // Get role-specific dashboard & profile links
  const dashboardPath = user?.role === "OWNER" ? "/owner/dashboard" : "/student/dashboard";
  const profilePath = user?.role === "OWNER" ? "/owner/profile" : "/student/profile";

  // Get user initials for avatar
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg shadow-black/5"
          : "bg-white/60 dark:bg-gray-950/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-80" />
            <div className="relative w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
            </div>
          </div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Stay
            </span>
            <span className="text-foreground">lo</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                isActive(to)
                  ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800/60"
              }`}
            >
              {label}
              {isActive(to) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Mobile Hamburger */}
          <button
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-background hover:bg-secondary/50 transition-all duration-200"
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <Menu
              className={`absolute h-4 w-4 transition-all duration-300 ${
                isMobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`absolute h-4 w-4 transition-all duration-300 ${
                isMobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </button>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    id="user-menu-trigger"
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all duration-200 group focus:outline-none"
                  >
                    <Avatar className="w-8 h-8 ring-2 ring-orange-500/30 group-hover:ring-orange-500/60 transition-all duration-200">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xs font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-sm font-semibold text-foreground max-w-[120px] truncate">
                        {user.name.split(" ")[0]}
                      </span>
                      <span
                        className={`text-[10px] font-medium uppercase tracking-wide ${
                          user.role === "OWNER" ? "text-orange-500" : "text-blue-500"
                        }`}
                      >
                        {user.role === "OWNER" ? "Property Owner" : "Student"}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 rounded-xl shadow-xl border border-border bg-popover/95 backdrop-blur-lg p-1.5"
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link to={dashboardPath} className="flex items-center gap-2.5 px-3 py-2">
                        <LayoutDashboard className="w-4 h-4 text-orange-500" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link to={profilePath} className="flex items-center gap-2.5 px-3 py-2">
                        {user.role === "OWNER" ? (
                          <Building2 className="w-4 h-4 text-orange-500" />
                        ) : (
                          <User className="w-4 h-4 text-blue-500" />
                        )}
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    id="logout-btn"
                    onClick={handleLogout}
                    className="rounded-lg cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-500/10 px-3 py-2 gap-2.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-orange-500/30 hover:shadow-lg transition-all duration-300 gap-1.5 px-5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 py-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-border">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <Home className="w-4 h-4 opacity-60" />
                {label}
                {isActive(to) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                )}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              {isAuthenticated && user ? (
                <>
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-secondary/60 rounded-xl">
                    <Avatar className="w-10 h-10 ring-2 ring-orange-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p
                        className={`text-xs font-medium uppercase tracking-wide ${
                          user.role === "OWNER" ? "text-orange-500" : "text-blue-500"
                        }`}
                      >
                        {user.role === "OWNER" ? "Property Owner" : "Student"}
                      </p>
                    </div>
                  </div>

                  <Link to={dashboardPath}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <LayoutDashboard className="w-4 h-4 text-orange-500" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to={profilePath}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User className="w-4 h-4" /> Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full font-semibold bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white gap-2">
                      <Sparkles className="w-4 h-4" /> Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
