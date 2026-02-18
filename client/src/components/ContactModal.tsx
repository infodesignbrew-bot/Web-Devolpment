import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { countryCodes } from "@/constants/countryCode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSchema, type InsertContactSubmission } from "@shared/schema";
import { Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; 

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const lastInteractionRef = useRef<number>(0);
  const [loading, setLoading] = useState(false);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      message: "",
    },
  });

  const [progress, setProgress] = useState(0);

  const handleUserActivity = () => {
    lastInteractionRef.current = Date.now();
  };

  useEffect(() => {
    if (!isOpen) return;

    setProgress(0);
    lastInteractionRef.current = 0;

    const intervalDuration = 50; 
    const totalDuration = 10000; 
    const increment = (intervalDuration / totalDuration) * 100; 

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteractionRef.current;

      if (timeSinceLastInteraction < 2200) {
        return;
      }

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOpen(false);
          return 100;
        }
        return prev + increment;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenContactModal");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenContactModal", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit = async (data: InsertContactSubmission) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        contact: data.contact.startsWith("+") ? data.contact : `+${data.contact}`
      };

      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Successfully submitted!",
          description: "We'll be in touch with you shortly.",
        });
        setIsOpen(false);
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: "Something went wrong while sending your message.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Network error sending message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* UPDATED: 
         - Changed max-w to 380px for all screens 
         - Added w-[90%] to ensure margin on very small mobile screens
         - Reduced rounded corners slightly to fit smaller size
      */}
      <DialogContent className="w-[90%] max-w-[380px] p-0 overflow-hidden border-none shadow-2xl rounded-[1.25rem]">

        {/* Progress Bar */}
        <div className="h-1 w-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* UPDATED: Reduced padding to p-5 to make it tighter */}
        <div className="p-5">
          <DialogHeader className="mb-4">
            {/* UPDATED: Slightly smaller text size */}
            <DialogTitle className="text-2xl font-display font-bold leading-tight tracking-tight">
              Ready to <span className="text-primary">Brew?</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Book a 15-minute intro call to discuss your vision.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3" // Reduced vertical space between fields
              onKeyDown={handleUserActivity}
              onChange={handleUserActivity}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Full Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        required 
                        placeholder="John Doe" 
                        {...field} 
                        className="h-10 bg-secondary/20 border-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-lg text-sm" 
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Work Email <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        required 
                        type="email"
                        placeholder="john@company.com" 
                        {...field} 
                        className="h-10 bg-secondary/20 border-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-lg text-sm" 
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Phone Number <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="contact"
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            country={"in"}
                            value={value}
                            onChange={onChange}
                            onlyCountries={countryCodes}
                            enableSearch
                            placeholder="+1 234 567 8900"
                            // UPDATED: Changed height to h-10 to match other inputs
                            inputClass="!w-full !h-10 !bg-secondary/20 !border-none !focus:ring-1 !focus:ring-primary/50 !rounded-lg !text-sm !pl-[48px]"
                            buttonClass="!bg-secondary/20 !border-none !rounded-l-lg !pl-1"
                            dropdownClass="!bg-white !text-black"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Your Vision <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        required
                        placeholder="Tell us a bit about your goals..."
                        className="resize-none bg-secondary/20 border-none focus-visible:ring-1 focus-visible:ring-primary/50 min-h-[60px] rounded-lg p-3 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full group bg-primary hover:bg-primary/90 text-white font-bold h-10 rounded-xl transition-all mt-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2 text-xs uppercase tracking-wide">
                    Book Strategy Call
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}