import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Work from "@/pages/Work";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";
import { usePageTitle } from "./hooks/use-pageTitle";
import { WhatsAppButton } from "./components/WhatsAppButton";

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Router() {
  const [location] = useLocation();
  usePageTitle();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/work" component={Work} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

export default function App() {
  const [location] = useLocation();

  const knownRoutes = [
    "/", "/about", "/services", "/work",
    "/blog", "/contact", "/privacy-policy", "/terms"
  ];

  const isNotFound = !knownRoutes.includes(location);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground font-sans">
          <ScrollToTop />
          <Navigation />

          <main>
            <Router />
          </main>

          <Footer />
          <WhatsAppButton/>
          {!isNotFound && <ContactModal />}
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
