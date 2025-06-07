
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20  p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="max-w-md w-full text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <Wrench className="h-8 w-8" /> Feedback Page
            </CardTitle>

          </CardHeader>
          <CardContent className="p-2">
            <p className="text-xl text-foreground/80 mb-4">
              This page is currently under construction and not yet available.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}



// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Ensure CardDescription is imported
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import React from "react";

// const feedbackFormSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }).max(50, {
//     message: "Name must not be longer than 50 characters.",
//   }).optional(),

//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),

//   subject: z.string().min(5, {
//     message: "Subject must be at least 5 characters.",
//   }).max(100, {
//     message: "Subject must not be longer than 100 characters.",
//   }),

//   message: z.string().min(10, {
//     message: "Message must be at least 10 characters.",
//   }).max(1000, {
//     message: "Message must not be longer than 1000 characters.",
//   }),
// });

// type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

// const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// if (!API_BASE_URL) {
//   throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in environment variables.");
// }

// export default function FeedbackPage() {
//   const { toast } = useToast();
//   const [isModalOpen, setIsModalOpen] = React.useState(false);

//   const form = useForm<FeedbackFormValues>({
//     resolver: zodResolver(feedbackFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     },
//   });

//   async function onSubmit(data: FeedbackFormValues) {
//     console.log("Attempting to submit feedback...");
//     form.clearErrors(); // Clear any previous errors

//     try {
//       const response = await fetch(`${API_BASE_URL}/feedback`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       console.log("Response status:", response.status);
//       console.log("Response OK:", response.ok);

//       if (response.ok) {
//         console.log("Feedback sent successfully! Opening modal...");
//         setIsModalOpen(true); // Open the modal
//         form.reset(); // Reset the form after modal state is set
//         toast({
//           title: "Feedback Sent!",
//           description: "Thank you for your valuable feedback. We'll get back to you if needed.",
//         });
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to send feedback, server error:", errorData);
//         toast({
//           variant: "destructive",
//           title: "Uh oh! Something went wrong.",
//           description: errorData.detail || "There was an issue sending your feedback. Please try again.",
//           action: <ToastAction altText="Try again">Try again</ToastAction>,
//         });
//         // Optionally, set a form error for the user to see
//         form.setError("root.serverError", { message: errorData.detail || "Failed to send feedback." });
//       }
//     } catch (error) {
//       console.error("Network error sending feedback:", error);
//       toast({
//         variant: "destructive",
//         title: "Network Error",
//         description: "Could not connect to the server. Please check your internet connection.",
//         action: <ToastAction altText="Try again">Try again</ToastAction>,
//       });
//       // Optionally, set a form error for the user to see
//       form.setError("root.networkError", { message: "Could not connect to the server." });
//     } finally {
//       // form.formState.isSubmitting should handle disabling/enabling the button correctly.
//     }
//   }

//   // Add a console log to see when the modal's open state changes
//   React.useEffect(() => {
//     console.log("isModalOpen state:", isModalOpen);
//   }, [isModalOpen]);


//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl">Feedback Section</CardTitle>
//           <CardDescription>Your thoughts help us improve!</CardDescription> {/* Added CardDescription */}
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name (Optional)</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Your Name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input type="email" placeholder="you@example.com" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="subject"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Subject</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Bug Report, Feature Request" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="message"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Message</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Please describe your feedback in detail."
//                         className="resize-y min-h-[120px]"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
//                 {form.formState.isSubmitting ? "Sending Feedback..." : "Send Feedback"}
//               </Button>
//               {/* Display general form errors if any */}
//               {form.formState.errors.root?.serverError && (
//                 <p className="text-destructive text-sm text-center">
//                   {form.formState.errors.root.serverError.message}
//                 </p>
//               )}
//                {form.formState.errors.root?.networkError && (
//                 <p className="text-destructive text-sm text-center">
//                   {form.formState.errors.root.networkError.message}
//                 </p>
//               )}
//             </form>
//           </Form>
//         </CardContent>
//       </Card>

//       {/* Success Modal */}
//       {/* Dialog open and onOpenChange should work for controlled component */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle className="text-center text-green-600">Request Sent!</DialogTitle>
//             <DialogDescription className="text-center">
//               Thank you for your valuable feedback. We appreciate you taking the time to help us improve.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-4 text-center">
//             <p>Your feedback has been successfully submitted.</p>
//           </div>
//           <DialogFooter>
//             <Button onClick={() => setIsModalOpen(false)} className="w-full">
//               Close
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }