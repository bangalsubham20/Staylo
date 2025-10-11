import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Building, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-background dark:bg-background-dark border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95 dark:bg-background-dark/95 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 h-12 sm:h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                Staylo
              </span>
            </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                location.pathname === '/'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-pulse"></span>
              )}
            </Link>
            <Link
              to="/properties"
              className={`relative text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                location.pathname.startsWith('/properties')
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Properties
              {location.pathname.startsWith('/properties') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-pulse"></span>
              )}
            </Link>
            <Link
              to="/about"
              className={`relative text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                location.pathname === '/about'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              About
              {location.pathname === '/about' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-pulse"></span>
              )}
            </Link>
            <Link
              to="/contact"
              className={`relative text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                location.pathname === '/contact'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              Contact
              {location.pathname === '/contact' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-pulse"></span>
              )}
            </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <ThemeToggle />
          <button
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-110 transition-all duration-300"
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <div className="relative w-5 h-5">
              <Menu className={`absolute h-5 w-5 transition-all duration-300 ${isMobileOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute h-5 w-5 transition-all duration-300 ${isMobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
              <Link to="/student/login" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm font-normal text-muted-foreground hover:text-primary hover:bg-secondary/20 hover:scale-105 transition-all duration-300">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden lg:inline">Student</span>
                  <span className="lg:hidden">Login</span>
                </Button>
              </Link>
              <Link to="/owner/login" className="hidden md:block">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm font-normal border-border text-muted-foreground hover:text-primary hover:bg-secondary/20 hover:scale-105 transition-all duration-300">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden lg:inline">Owner</span>
                  <span className="lg:hidden">Owner</span>
                </Button>
              </Link>
              <Link to="/student/signup" className="hidden sm:block">
                <Button size="sm" className="text-xs sm:text-sm px-4 sm:px-6 font-normal bg-primary hover:bg-primary-dark text-white hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <span className="hidden sm:inline">Get Started</span>
                </Button>
              </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800 transition-all duration-500 ease-out ${
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 py-4 bg-white dark:bg-gray-900">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 hover:shadow-sm ${
                location.pathname === '/' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                Home
                {location.pathname === '/' && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </Link>
            <Link
              to="/properties"
              className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 hover:shadow-sm ${
                location.pathname.startsWith('/properties') 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4" />
                Properties
                {location.pathname.startsWith('/properties') && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </Link>
            <Link
              to="/about"
              className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 hover:shadow-sm ${
                location.pathname === '/about' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                About
                {location.pathname === '/about' && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 hover:shadow-sm ${
                location.pathname === '/contact' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                Contact
                {location.pathname === '/contact' && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </Link>
            <Link
              to="/student/login"
              className="px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                Student Login
              </div>
            </Link>
            <Link
              to="/owner/login"
              className="px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4" />
                Owner Login
              </div>
            </Link>
            <div className="pt-3">
              <Link to="/student/signup">
                <Button className="w-full text-sm font-normal bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white hover:scale-105 hover:shadow-lg transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
