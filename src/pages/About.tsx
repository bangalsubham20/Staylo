import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/Layout/PageLayout";
import { Link } from "react-router-dom";
import { 
  Users, Target, Award, Heart, Shield, Zap, Globe, 
  MapPin, TrendingUp, CheckCircle2, ArrowRight,
  PlayCircle
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
    { icon: Heart, title: "Student-Centric", desc: "Every decision we make starts with student comfort and safety in mind." },
    { icon: Shield, title: "Trust & Transparency", desc: "100% verified listings with zero hidden costs or fake photos." },
    { icon: Zap, title: "Innovation", desc: "Using AI to match you with the perfect flatmates and properties." },
    { icon: Users, title: "Community Driven", desc: "Building meaningful connections through shared experiences." }
  ];

  const team = [
    { name: "Rajesh Kumar", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
    { name: "Priya Sharma", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { name: "Amit Singh", role: "Head of Operations", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
    { name: "Neha Gupta", role: "Community Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" }
  ];

  const timeline = [
    { year: "2021", title: "The Beginning", desc: "Started as a small WhatsApp group helping friends find PGs in Mumbai." },
    { year: "2022", title: "Going Digital", desc: "Launched the first version of Staylo with 500 properties." },
    { year: "2023", title: "Pan-India Expansion", desc: "Expanded to 20+ cities with our new owner-verification protocol." },
    { year: "2024", title: "AI Integration", desc: "Introduced smart matching and virtual tours for students." }
  ];

  return (
    <PageLayout>
      <div className="bg-background">
        
        {/* HERO */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-950">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80" alt="Students" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
          </div>
          
          <div className="container relative z-10 text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Reimagining <span className="text-orange-500">Student Living</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              We're on a mission to make finding your next home as exciting as starting a new college semester — safe, transparent, and completely hassle-free.
            </p>
            <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-8">
              <PlayCircle className="w-5 h-5 mr-2" /> Watch Our Story
            </Button>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 bg-white dark:bg-gray-900 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION / VISION */}
        <section className="section-pad">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-500/10 rounded-full px-3 py-1 mb-6 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <Target className="w-4 h-4" /> Our Purpose
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Mission & Vision</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our mission is to democratize student housing in India by building an ecosystem built on trust, transparency, and technology.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a future where no student ever has to settle for subpar living conditions or fall prey to brokers. Your focus should be on your education, leave the housing to us.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-border">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="font-medium">Verified Owners</span>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="font-medium">Secure Payments</span>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in-up delay-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-indigo-500 rounded-3xl transform rotate-3 scale-105 opacity-20 dark:opacity-40 blur-xl" />
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                  alt="Students studying" 
                  className="relative z-10 rounded-3xl shadow-2xl object-cover w-full h-[500px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="section-pad bg-secondary/30 dark:bg-gray-900/30">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-16">The principles that guide every feature we build and every property we approve.</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, i) => (
                <Card key={i} className="border-0 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-colors">
                      <val.icon className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{val.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="section-pad">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Journey</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-orange-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-gray-900 border border-border shadow-sm group-hover:border-orange-500/50 transition-colors">
                    <span className="text-orange-500 font-bold text-sm tracking-wider uppercase mb-1 block">{item.year}</span>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="section-pad bg-gray-950 text-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Built by students, for students. We understand the struggle.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden bg-gray-900 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl text-white mb-1">{member.name}</h3>
                    <p className="text-orange-400 text-sm font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="container max-w-3xl animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Staylo Community</h2>
            <p className="text-xl text-muted-foreground mb-10">Whether you're looking for a home or want to list your property, we've got you covered.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/student/signup">
                <Button size="lg" className="w-full sm:w-auto rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-8">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default About;
