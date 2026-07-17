import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from "@/components/Layout/PageLayout";
import { useToast } from "@/components/ui/use-toast";
import { 
  Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, ArrowRight
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", category: "", message: ""
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will get back to you within 24 hours.",
      variant: "default",
      className: "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800"
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", category: "", message: "" });
  };

  const contactInfo = [
    { icon: Phone, title: "Phone", details: ["+91 98765 43210"], desc: "Mon-Sat, 9AM-6PM" },
    { icon: Mail, title: "Email", details: ["support@staylo.com"], desc: "24/7 Online Support" },
    { icon: MapPin, title: "Headquarters", details: ["Hiranandani Gardens", "Powai, Mumbai"], desc: "Walk-ins welcome" },
  ];

  const faqs = [
    { q: "How do I book a property?", a: "Browse properties matching your criteria, click 'View Details', and use the 'Book Now' button. You'll need to pay a small refundable token amount to confirm." },
    { q: "Are all properties verified?", a: "Yes, 100%. We physically verify every property and owner before they are listed on Staylo to ensure your safety and comfort." },
    { q: "What is the cancellation policy?", a: "You can cancel any booking within 24 hours for a full refund of the token amount. After 24 hours, cancellation terms vary by property owner." },
    { q: "How do I contact the property owner?", a: "Once you schedule a visit or pay the token amount, the owner's direct contact details will be shared with you instantly." }
  ];

  return (
    <PageLayout>
      <div className="bg-background min-h-screen">
        
        {/* HEADER */}
        <section className="pt-24 pb-12 bg-secondary/30 dark:bg-gray-900/20 border-b border-border">
          <div className="container text-center max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's get in touch</h1>
            <p className="text-lg text-muted-foreground">Have a question about a property, need help with your account, or just want to say hi? We're here for you.</p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 xl:gap-16">
              
              {/* LEFT: Contact Form */}
              <div className="lg:col-span-3 animate-fade-in-up delay-100">
                <Card className="border-border shadow-lg">
                  <CardContent className="p-6 sm:p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-orange-500" />
                      </div>
                      <h2 className="text-2xl font-bold">Send us a Message</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                          <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required className="bg-secondary/50 border-transparent focus:bg-background focus:border-orange-500 transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                          <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className="bg-secondary/50 border-transparent focus:bg-background focus:border-orange-500 transition-colors" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="bg-secondary/50 border-transparent focus:bg-background focus:border-orange-500 transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <Label>Category <span className="text-red-500">*</span></Label>
                          <Select value={formData.category} onValueChange={(v) => handleInputChange("category", v)} required>
                            <SelectTrigger className="bg-secondary/50 border-transparent focus:bg-background focus:border-orange-500 transition-colors">
                              <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="booking">Booking Support</SelectItem>
                              <SelectItem value="technical">Technical Issue</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                        <Input id="subject" value={formData.subject} onChange={(e) => handleInputChange("subject", e.target.value)} required className="bg-secondary/50 border-transparent focus:bg-background focus:border-orange-500 transition-colors" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                        <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} required rows={5} className="bg-secondary/50 border-transparent focus:bg-background focus:border-orange-500 transition-colors resize-none" />
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 text-base font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 w-full">
                            Send Message <Send className="w-4 h-4 ml-1" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT: Info & Map */}
              <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-200">
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-border hover:border-orange-500/30 hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-1">{info.title}</h4>
                        {info.details.map((d, idx) => (
                          <p key={idx} className="text-sm text-foreground">{d}</p>
                        ))}
                        <p className="text-xs text-muted-foreground mt-1">{info.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Card */}
                <div className="rounded-2xl overflow-hidden border border-border h-[250px] relative group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur px-4 py-3 rounded-xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold">Mumbai Office</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold hover:text-orange-500">Directions</Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900 border-t border-border">
          <div className="container max-w-4xl animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Quick answers to questions you may have.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-orange-500/30">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <span className="font-semibold pr-4">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 bg-orange-100 text-orange-600' : ''}`}>
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/50 bg-white dark:bg-gray-950">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default Contact;
