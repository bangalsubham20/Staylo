import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  Shield,
  Zap,
  Globe,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: "Happy Students", value: "10,000+", icon: Users },
    { label: "Properties Listed", value: "5,000+", icon: Globe },
    { label: "Cities Covered", value: "50+", icon: MapPin },
    { label: "Success Rate", value: "98%", icon: TrendingUp }
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "We prioritize student needs and comfort in every decision we make."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified properties and secure transactions for peace of mind."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology to simplify the accommodation search process."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections between students and property owners."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "Former IIT graduate with 10+ years in real estate"
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "Tech enthusiast passionate about solving student problems"
    },
    {
      name: "Amit Singh",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "Operations expert ensuring smooth user experience"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/5 dark:bg-background-dark">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary">Staylo</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize student accommodation by connecting students 
              with verified, comfortable, and affordable housing options near their campuses.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide every student with access to safe, comfortable, and affordable accommodation 
                  that enhances their academic journey. We believe that where you live significantly 
                  impacts your educational experience, and we're committed to making that experience 
                  as positive as possible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted student accommodation platform, creating a seamless 
                  ecosystem where students can find their perfect home away from home, and property 
                  owners can connect with reliable tenants. We envision a future where no student 
                  struggles to find suitable accommodation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Staylo was born out of a simple observation: finding the right accommodation 
                    as a student is unnecessarily complicated. Our founders, having experienced 
                    the struggles of student housing firsthand, decided to create a solution 
                    that would make this process seamless and stress-free.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    What started as a small project to help fellow students has grown into a 
                    comprehensive platform serving thousands of students across India. We've 
                    built a community where students and property owners can connect, communicate, 
                    and create lasting relationships.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, we're proud to be at the forefront of student accommodation innovation, 
                    constantly improving our platform and expanding our reach to help more students 
                    find their perfect home.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                    <div className="text-primary font-medium mb-2">{member.role}</div>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Staylo?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Verified Properties</h3>
                      <p className="text-sm text-muted-foreground">
                        All properties are thoroughly verified for safety and authenticity
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">24/7 Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Round-the-clock customer support to help you anytime
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Easy Booking</h3>
                      <p className="text-sm text-muted-foreground">
                        Simple and secure booking process with instant confirmation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Transparent Pricing</h3>
                      <p className="text-sm text-muted-foreground">
                        No hidden charges, all costs are clearly displayed upfront
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Student Community</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with fellow students and build lasting friendships
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Mobile App</h3>
                      <p className="text-sm text-muted-foreground">
                        Access everything on the go with our user-friendly mobile app
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary to-primary-light text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of students who have found their ideal accommodation with Staylo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Browse Properties
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
