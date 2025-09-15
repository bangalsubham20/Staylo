import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-medium tracking-tight">
                Staylo
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Find your perfect student accommodation with ease. Connect with verified property owners 
              and discover comfortable, affordable housing near your campus.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-base mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/student/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Student Signup
                </Link>
              </li>
              <li>
                <Link to="/owner/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Owner Signup
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-base mb-5">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-3" />
                support@staylo.com
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-3" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-3" />
                123 Campus Drive, City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Staylo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;