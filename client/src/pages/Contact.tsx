import { PageTransition } from "@/components/PageTransition";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { countryCodes } from "@/constants/countryCode";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { insertContactSchema, type InsertContactSubmission } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { Loader2, Send, } from "lucide-react";
import { motion } from "framer-motion";
import contactVideo from "@/assets/Step-by-Step_Guide_to_Business_Certification_Grow_Your_Business_with_Confidence_720P.mp4";
import React from "react";
import { useToast } from "@/hooks/use-toast"; // Added useToast import

export default function Contact() {
  const submitMutation = useSubmitContact();
  const { toast } = useToast(); // Initialize toast

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      message: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: InsertContactSubmission) => {
    try {
      setLoading(true);

      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        toast({
          title: "Successfully submitted!",
          description: "Message sent successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error sending message",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    "Send us a quick brief.",
    "We discuss your goals.",
    "We build a custom plan.",
    "We start creating magic."
  ];

  // Animation variants
  const float = {
    animate: {
      y: [0, -10, 0],
      rotate: [1, -1, 1],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <PageTransition>
      <div className="w-full min-h-screen bg-[#f3f4f6] relative overflow-hidden">

        {/* Inject CSS for Lined Paper & Fonts */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&family=Reenie+Beanie&display=swap');
            .font-marker { font-family: 'Reenie Beanie', cursive; }
            
          `}
        </style>
        <div className="container-padding py-12 md:py-20 relative z-10">

          {/* Header Title with Doodle */}
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block relative"
            >
              <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter relative z-10">
                Let's <span className="text-primary">Create</span>
              </h1>

              {/* Hand-drawn arrow pointing down */}
              <div className="absolute -right-16 top-10 hidden md:block rotate-12 text-slate-400">

              </div>
            </motion.div>
            <p className="mt-6 text-xl text-muted-foreground font-handwriting">
              Tell us about your next big idea.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">

            {/* --- LEFT COLUMN: The "Desk Objects" (Swapped) --- */}
            <div className="lg:col-span-5 space-y-10 relative order-2 lg:order-1 mt-8 lg:mt-0">

              {/* 1. The Video Polaroid */}
              <motion.div
                variants={float}
                animate="animate"
                className="relative bg-white p-3 pb-12 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border border-slate-200 z-10"
              >

                <div className="aspect-video bg-black overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                  <video
                    src={contactVideo}
                    className="w-full h-full object-cover opacity-90"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Scanlines overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                </div>
                <div className="absolute bottom-3 left-4">
                  <p className="font-marker text-2xl text-slate-800"> Let's Build something different </p>
                </div>
              </motion.div>

              {/* 2. The Sticky Note Checklist */}
              <motion.div
                initial={{ rotate: 1, x: -20 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-yellow-200 p-6 shadow-lg rotate-[3deg] max-w-xs mx-auto lg:mr-4 lg:ml-auto"
              >

                <h3 className=" text-2xl font-bold mb-4 border-b border-black/10 pb-2">
                  What happens next?
                </h3>

                <ul className="space-y-3  text-xl text-slate-800">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-3 w-1 h-1 border-2 border-slate-800 rounded-full flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>

            {/* --- RIGHT COLUMN: The Modern Floating Card (Swapped) --- */}
            <div className="lg:col-span-7 relative perspective-1000 order-1 lg:order-2">

              {/* Decorative Backdrop Blur */}
              <div className="absolute top-10 right-10 w-full h-full bg-gradient-to-bl from-primary/20 to-purple-500/20 blur-[80px] -z-10 rounded-full opacity-60" />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative bg-white/80 backdrop-blur-md border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden"
              >

                <div className="p-8 md:p-12 relative">

                  {/* Header inside the card */}
                  <div className="mb-10">
                    <h3 className="text-3xl font-display font-bold text-slate-900">
                      Talk to us about your goals
                    </h3>
                    <p className="text-xl font-display text-slate-900">
                      Complete the form below and discover how we can help you.
                    </p>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-sans">

                      {/* Fields */}
                      <div className="grid md:grid-cols-2 gap-8">

                        {/* Full Name */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel className="text-sm font-medium text-slate-700">
                                Full Name <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="
                  h-12
                  bg-white
                  border border-slate-300
                  rounded-lg
                  px-4
                  text-slate-900 text-sm
                  placeholder:text-slate-400
                  focus:border-slate-900
                  focus:ring-0
                  transition
                "
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Contact */}
                        <FormField
                          control={form.control}
                          name="contact"
                          render={({ field }) => (
                            <FormItem className="space-y-1.5">
                              <FormLabel>Contact Number <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Controller
                                  control={form.control}
                                  name="contact"
                                  render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                      country={"in"} // default country
                                      value={value}
                                      onChange={onChange}
                                      onlyCountries={countryCodes}
                                      enableSearch
                                      placeholder="Enter phone number"
                                      inputClass="h-12 bg-white border border-slate-300 rounded-lg px-4 text-slate-900 text-sm focus:border-slate-900 focus:ring-0"
                                    />
                                  )}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-sm font-medium text-slate-700">
                              Email Address <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input

                                type="email"
                                placeholder="name@company.com"
                                {...field}
                                className="
                  h-12
                  bg-white
                  border border-slate-300
                  rounded-lg
                  px-4
                  text-slate-900 text-sm
                  placeholder:text-slate-400
                  focus:border-slate-900
                  focus:ring-0
                  transition
                "
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Message */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-sm font-medium text-slate-700">
                              Message <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea

                                placeholder="Briefly describe your project or requirements"
                                {...field}
                                className="
                min-h-[140px]
                bg-white
                border border-slate-300
                rounded-lg
                px-4 py-3
                text-slate-900 text-sm
                placeholder:text-slate-400
                resize-none
                focus:border-slate-900
                focus:ring-0
                transition
              "
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Submit */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="
          w-full h-12
          bg-slate-900
          hover:bg-slate-800
          text-white
          text-sm font-medium
          rounded-lg
          transition
          disabled:opacity-60
        "
                        >
                          {submitMutation.isPending ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <span className="flex items-center justify-center gap-2 font-bold">
                              Submit Enquiry
                              <Send size={16} />
                            </span>
                          )}
                        </Button>
                      </div>

                    </form>
                  </Form>

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}