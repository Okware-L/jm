// components/DonorWall.tsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { db } from "../../../firebseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

interface Donor {
  name: string;
  amount: number;
  message?: string;
  project?: string;
  date: string;
}

interface Testimonial {
  id: string;
  text: string;
  createdAt: Date;
}

interface DonorWallProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  donors: Donor[];
}

const TestimonialForm: React.FC = () => {
  const [testimonial, setTestimonial] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

const DonorWall: React.FC<DonorWallProps> = ({
  isOpen,
  onOpenChange,
  donors,
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc"),
          limit(3),
        );
        const querySnapshot = await getDocs(q);
        const fetchedTestimonials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })) as Testimonial[];
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader className="relative mb-6">
          <SheetTitle className="text-3xl font-light text-slate-900">
            Donor Wall of Honor
          </SheetTitle>
          <p className="text-sm text-slate-600">
            Recognizing our generous supporters
          </p>
          <SheetClose className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100">
            <X className="h-4 w-4 text-slate-500" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-full rounded-lg bg-slate-50 p-6 shadow-sm lg:col-span-2"
          >
            <h3 className="mb-4 text-xl font-medium text-slate-800">
              Recent Donations
            </h3>
            <div className="space-y-4">
              {donors.slice(0, 5).map((donor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between border-b border-slate-200 pb-2"
                >
                  <div>
                    <p className="font-medium text-slate-800">{donor.name}</p>
                    <p className="text-sm text-slate-600">
                      {donor.project || "General Fund"}
                    </p>
                  </div>
                  <p className="text-slate-700">
                    ${donor.amount.toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg bg-slate-50 p-6 shadow-sm"
          >
            <h3 className="mb-4 text-xl font-medium text-slate-800">
              Donor Testimonials
            </h3>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.blockquote
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-l-4 border-slate-300 pl-4 italic text-slate-600"
                >
                  <p>&quot;{testimonial.text}&quot;</p>
                  <footer className="mt-2 text-sm text-slate-500">
                    — {new Date(testimonial.createdAt).toLocaleDateString()}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-full rounded-lg bg-slate-50 p-6 shadow-sm"
          >
            <h3 className="mb-4 text-xl font-medium text-slate-800">
              Your Impact
            </h3>
            <p className="mb-4 text-slate-700">
              Together, our donors have contributed a total of $
              {donors
                .reduce((sum, donor) => sum + donor.amount, 0)
                .toLocaleString()}{" "}
              to various projects and initiatives.
            </p>
            <p className="text-slate-700">
              Every donation, big or small, makes a difference. Thank you for
              your generosity and commitment to our cause.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="col-span-full rounded-lg bg-slate-50 p-6 shadow-sm"
          >
            <TestimonialForm />
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DonorWall;
