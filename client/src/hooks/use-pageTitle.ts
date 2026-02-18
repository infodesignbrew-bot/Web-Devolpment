import { useLocation } from "wouter";
import { useEffect } from "react";

const pageTitles: Record<string, string> = {
  "/": "One Step Solution for all your",
  "/about": "About Us - Design Brew",
  "/work": "How we work - Design Brew",
  "/blog": "Our Blog - Design Brew",
  "/services": "What services we provide - Design Brew",
  "/contact": "Contact Us - Design Brew",
  "/privacy-policy":"Privacy Policy - Design Brew", 
  "/terms":"Terms of Service - Design Brew", 
};

export function usePageTitle() {
  const [location] = useLocation();

  useEffect(() => {
    document.title = pageTitles[location] || "Page not found - Design Brew";
  }, [location]);
}
