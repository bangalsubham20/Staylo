import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
} from "lucide-react";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, children }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 p-2 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <div className="text-xs text-muted-foreground">{children}</div>
      </div>
    </div>
  );
};

const MobileContactInfo = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 lg:hidden py-2">
      <ContactInfoItem 
        icon={<Phone className="w-4 h-4 text-primary" />} 
        title="Phone"
      >
        <p>+91 9876543210</p>
        <p>+91 8765432109</p>
      </ContactInfoItem>

      <ContactInfoItem 
        icon={<Mail className="w-4 h-4 text-primary" />} 
        title="Email"
      >
        <p>info@staylo.com</p>
        <p>support@staylo.com</p>
      </ContactInfoItem>

      <ContactInfoItem 
        icon={<MapPin className="w-4 h-4 text-primary" />} 
        title="Address"
      >
        <p>123 University Road, Mumbai</p>
        <p>Maharashtra, India - 400001</p>
      </ContactInfoItem>

      <ContactInfoItem 
        icon={<Clock className="w-4 h-4 text-primary" />} 
        title="Working Hours"
      >
        <p>Monday - Friday: 9 AM - 6 PM</p>
        <p>Saturday: 10 AM - 4 PM</p>
      </ContactInfoItem>
    </div>
  );
};

export default MobileContactInfo;