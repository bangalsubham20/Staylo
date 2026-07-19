import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createOwnerProperty, uploadImage } from "@/lib/api";
import { UploadCloud, X, Plus } from "lucide-react";

interface AddPropertyDialogProps {
  children: React.ReactNode;
}

const AddPropertyDialog = ({ children }: AddPropertyDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("pg");
  const [amenities, setAmenities] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const propertyData = {
        title,
        location,
        price: Number(price),
        type,
        amenities: amenities.split(",").map(a => a.trim()).filter(Boolean),
        image: imageUrl,
        rating: 0,
        reviewCount: 0,
        status: "ACTIVE"
      };

      return createOwnerProperty(propertyData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-properties"] });
      toast({
        title: "Success",
        description: "Property listed successfully!",
      });
      setOpen(false);
      resetForm();
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message || "Failed to list property.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setPrice("");
    setType("pg");
    setAmenities("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !price || !type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => { setOpen(newOpen); if(!newOpen) resetForm(); }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Property</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title *</Label>
              <Input id="title" placeholder="e.g. Sunrise PG for Boys" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" placeholder="e.g. Bangalore" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Monthly Rent (₹) *</Label>
              <Input id="price" type="number" placeholder="e.g. 8000" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pg">PG / Co-living</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="flat">Independent Flat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (Comma separated)</Label>
            <Input id="amenities" placeholder="WiFi, AC, Laundry, Food included" value={amenities} onChange={e => setAmenities(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Property Image</Label>
            <div 
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors
                ${imagePreview ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-500/10' : 'border-border hover:border-orange-400 bg-gray-50 dark:bg-gray-900/50'}`}
            >
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button type="button" variant="destructive" size="sm" onClick={clearImage}>
                      <X className="w-4 h-4 mr-2" /> Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center" onClick={() => fileInputRef.current?.click()}>
                  <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-2 cursor-pointer" />
                  <p className="text-sm font-medium">Click to upload an image</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WEBP (Max 5MB)</p>
                </div>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={createMutation.isPending} className="bg-orange-600 hover:bg-orange-700 text-white">
              {createMutation.isPending ? "Listing..." : "List Property"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyDialog;
