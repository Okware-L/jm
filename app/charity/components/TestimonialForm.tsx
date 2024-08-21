// ./components/TestimonialForm.tsx

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "../../../firebseConfig"; // Ensure this import path is correct
import { addDoc, collection } from "firebase/firestore";

const TestimonialForm: React.FC = () => {
  const [testimonial, setTestimonial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonial.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "testimonials"), {
        text: testimonial,
        createdAt: new Date(),
      });
      setTestimonial("");
      alert("Thank you for your testimonial!");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert(
        "There was an error submitting your testimonial. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-medium text-slate-800">Leave Testimonial</h3>
      <Textarea
        placeholder="Share your experience..."
        value={testimonial}
        onChange={(e) => setTestimonial(e.target.value)}
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Testimonial"}
      </Button>
    </form>
  );
};

export default TestimonialForm;
