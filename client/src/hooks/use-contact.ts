import { useMutation } from "@tanstack/react-query";
import { api, type InsertContactSubmission } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSubmitContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400 || res.status === 500) {
          // In a real app we would parse the specific error schema here
          // For now, generic error handling or basic message extraction
          throw new Error("Failed to submit inquiry");
        }
        throw new Error("Network error occurred");
      }

      return api.contact.submit.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent",
        description: "Thank you for reaching out. We will be in touch shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
}
