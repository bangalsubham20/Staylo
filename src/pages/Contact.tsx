import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Section } from '../components/ui/section';
import { useIsMobile } from '../hooks/use-mobile';

// MobileContactInfo component for smaller screens
const MobileContactInfo = () => {
  return (
    <div className="bg-muted p-4 rounded-lg mb-6">
      <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm">support@staylo.com</p>
        </div>
        <div>
          <p className="text-sm font-medium">Phone</p>
          <p className="text-sm">+1 (555) 123-4567</p>
        </div>
        <div>
          <p className="text-sm font-medium">Address</p>
          <p className="text-sm">123 Campus Drive, University City</p>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Section className="py-10 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our accommodation options? Need help with your booking? 
            Reach out to our friendly team.
          </p>
        </div>
        
        {/* Mobile contact info block */}
        {isMobile && <MobileContactInfo />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  required
                  className="w-full min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          {/* Contact Information - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium">Email Us</h3>
                    <p className="text-muted-foreground mt-1">support@staylo.com</p>
                    <p className="text-muted-foreground">bookings@staylo.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium">Call Us</h3>
                    <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">Mon-Fri, 9am-5pm</p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium">Visit Us</h3>
                    <p className="text-muted-foreground mt-1">123 Campus Drive</p>
                    <p className="text-muted-foreground">University City, ST 12345</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-base font-medium mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {/* Social media icons could go here */}
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="sr-only">Facebook</span>
                    {/* Icon */}
                  </div>
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="sr-only">Twitter</span>
                    {/* Icon */}
                  </div>
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="sr-only">Instagram</span>
                    {/* Icon */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
