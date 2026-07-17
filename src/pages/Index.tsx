import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/Layout/PageLayout";
import PropertyCard from "@/components/PropertyCard";
import { Search, Shield, MapPin, Users, ArrowRight, Star, TrendingUp, Sparkles, Building, CheckCircle2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/lib/api";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties
  });

  const featuredProperties = properties.slice(0, 3);

  const testimonials = [
    {
      id: 1,
      name: "Riya Sharma",
      role: "Student, IIT Bombay",
      content: "Found my perfect PG within 2 days of searching. The verified listings gave me peace of mind, and the owner is super helpful!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Ankit Patel",
      role: "Student, Delhi University",
      content: "The transparency in pricing is what I loved the most. No hidden fees. The 2BHK flat I got through Staylo is just 5 mins from my college.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      role: "Student, Christ University",
      content: "Staylo made my shift to Bangalore so seamless. I love the community features and how easy it is to find amenities around my hostel.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-background transition-colors duration-300">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient z-0">
            {/* Animated glowing orbs */}
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-[100px] animate-float"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[120px] animate-float delay-500"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            />
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full px-4 py-2 mb-8 text-sm font-medium text-white border border-white/20 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>India's #1 Student Accommodation Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 text-white animate-fade-in-up delay-100 leading-[1.1]">
                Find Your Perfect <br className="hidden md:block" />
                <span className="gradient-text-white drop-shadow-sm">Student Home</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-10 text-white/80 max-w-2xl mx-auto animate-fade-in-up delay-200">
                Discover verified, affordable, and comfortable places to stay near your campus. Start your stress-free journey today.
              </p>

              {/* Search Bar in Hero */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 sm:p-3 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mb-16 animate-fade-in-up delay-300">
                <div className="relative flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
                  <Search className="w-5 h-5 text-muted-foreground mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search by city, college, or area..." 
                    className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="relative flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
                  <Building className="w-5 h-5 text-muted-foreground mr-3" />
                  <select className="bg-transparent border-none outline-none w-full text-foreground appearance-none cursor-pointer">
                    <option value="">Any Type</option>
                    <option value="pg">PG</option>
                    <option value="flat">Flat</option>
                    <option value="hostel">Hostel</option>
                  </select>
                </div>
                <Link to="/properties" className="sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 shadow-lg shadow-orange-500/25">
                    Search
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto animate-fade-in-up delay-400">
                {[
                  { label: "Happy Students", value: "10K+" },
                  { label: "Verified Properties", value: "5K+" },
                  { label: "Cities Covered", value: "50+" },
                  { label: "Success Rate", value: "98%" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-pad bg-secondary/50 dark:bg-gray-900/20">
          <div className="container">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">How Staylo Works</h2>
              <p className="text-lg text-muted-foreground">Find your ideal home in three simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 dark:from-orange-900 dark:via-orange-500 dark:to-orange-900 z-0" />
              
              {[
                { step: "01", title: "Search & Filter", desc: "Browse thousands of verified properties based on your location, budget, and needs.", icon: Search },
                { step: "02", title: "Visit & Verify", desc: "Schedule a visit or view detailed virtual tours, photos, and genuine reviews.", icon: Shield },
                { step: "03", title: "Book Securely", desc: "Pay a small token amount securely through our platform to confirm your stay.", icon: CheckCircle2 }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-orange-500/10 flex items-center justify-center mb-6 relative group hover-lift">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <item.icon className="w-10 h-10 text-orange-500 group-hover:text-white transition-colors duration-300 relative z-10" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center shadow-lg border-2 border-background">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section-pad">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/10 rounded-full px-3 py-1 mb-4 text-sm font-semibold text-orange-600 dark:text-orange-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Why Choose Us</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Everything You Need</h2>
              </div>
              <Link to="/about">
                <Button variant="outline" className="hidden md:flex items-center gap-2 rounded-full px-6">
                  Learn more about us <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Search, title: "Smart Search", desc: "AI-powered filters help you find the perfect match instantly.", color: "from-blue-500 to-cyan-400" },
                { icon: Shield, title: "100% Verified", desc: "Every property goes through strict background checks.", color: "from-green-500 to-emerald-400" },
                { icon: MapPin, title: "Location Insights", desc: "See nearby colleges, transport, and hangout spots.", color: "from-purple-500 to-pink-400" },
                { icon: Users, title: "Community First", desc: "Connect with flatmates and read real student reviews.", color: "from-orange-500 to-amber-400" }
              ].map((feature, i) => (
                <Card key={i} className="glass-card hover-lift border-0 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-32 bg-gradient-to-bl from-gray-100 dark:from-gray-800 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg text-white`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Link to="/about" className="md:hidden mt-8 block text-center">
                <Button variant="outline" className="w-full rounded-full gap-2">
                  Learn more about us <ArrowRight className="w-4 h-4" />
                </Button>
            </Link>
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="section-pad bg-secondary/30 dark:bg-gray-900/10">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-full px-3 py-1 mb-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <Star className="w-4 h-4" />
                <span>Handpicked Stays</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Properties</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore some of our highest-rated and most popular accommodations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
              ) : (
                featuredProperties.map((property) => (
                  <div key={property.id} className="h-full">
                    <PropertyCard {...property} />
                  </div>
                ))
              )}
            </div>

            <div className="text-center">
              <Link to="/properties">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300 shadow-xl group">
                  View All Properties
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section-pad">
          <div className="container">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Loved by Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card key={t.id} className="bg-card hover:border-orange-500/50 transition-colors duration-300 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex text-yellow-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(t.rating) ? 'fill-current' : 'opacity-30'}`} />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-card-foreground mb-8">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                      <div>
                        <h4 className="font-bold">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad pt-0">
          <div className="container">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-cta-gradient p-10 md:p-20 text-center text-white shadow-2xl">
              {/* Particles/Pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:24px_24px]" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to find your <br/>perfect home?</h2>
                <p className="text-xl mb-10 text-white/90">Join thousands of students who have already found their ideal accommodation with Staylo.</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/student/signup">
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-orange-600 hover:bg-gray-50 text-lg font-bold px-8 py-6 shadow-xl hover:-translate-y-1 transition-all">
                      Get Started as Student
                    </Button>
                  </Link>
                  <Link to="/owner/signup">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl border-white/30 text-black hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md text-lg font-bold px-8 py-6 transition-all">
                      List Your Property
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default Index;
