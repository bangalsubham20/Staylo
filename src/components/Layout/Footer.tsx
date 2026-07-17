import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube, ArrowRight, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Browse Properties", to: "/properties" },
      { label: "How It Works", to: "/about" },
      { label: "Pricing", to: "/properties" },
      { label: "Map Search", to: "/properties" },
    ],
    company: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/about" },
      { label: "Press", to: "/about" },
      { label: "Blog", to: "/about" },
    ],
    support: [
      { label: "Help Center", to: "/contact" },
      { label: "Contact Us", to: "/contact" },
      { label: "Student Signup", to: "/student/signup" },
      { label: "Owner Signup", to: "/owner/signup" },
    ],
  };

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-gray-950 dark:bg-gray-950 text-gray-300">
      {/* Top gradient bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      <div className="container mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">

          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/40 transition-shadow duration-300">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Stay<span className="text-orange-400">lo</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              India's most trusted student accommodation platform. Find your perfect
              home near campus — verified, affordable, and stress-free.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="pt-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all duration-200 min-w-0"
                />
                <button className="p-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg hover:from-orange-600 hover:to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Links — Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links — Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links — Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <a href="mailto:support@staylo.com" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                    support@staylo.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <a href="tel:+919876543210" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Office</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Hiranandani Gardens,<br />Powai, Mumbai — 400076
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} Staylo Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-orange-500 fill-orange-500" /> for students across India
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;