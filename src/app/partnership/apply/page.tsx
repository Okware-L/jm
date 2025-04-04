"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "../../../../firebseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";

const applicationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  organization: z.string().nonempty("Organization name is required"),
  partnershipType: z.enum([
    "Solution Provider",
    "Distributor",
    "System Integrator",
    "Managed Service Provider",
    "Technology Partner",
    "Consultant",
  ]),
  message: z.string().nonempty("Message is required"),
});

type ApplicationData = z.infer<typeof applicationSchema>;

export default function PartnershipApply() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationData) => {
    try {
      await addDoc(collection(db, "partnerApplications"), data);
      toast.success("Application submitted", {
        description: "Thank you for applying. We'll get back to you soon!",
      });
      reset();
    } catch (error) {
      toast.error("Submission failed", {
        description: "An error occurred. Please try again later.",
      });
      console.error("Submission error: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-32">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-light text-indigo-900">
            Apply to Become a Partner
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
            Join the JM-Qafri partner program and collaborate with us to drive
            impact, innovation, and sustainable solutions across industries.
          </p>
        </section>

        <section className="mb-12 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-light text-indigo-900">
            Partnership Application Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <Input
                id="name"
                {...register("name")}
                aria-invalid={!!errors.name}
                className="mt-1 block w-full"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                className="mt-1 block w-full"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Name
              </label>
              <Input
                id="organization"
                {...register("organization")}
                aria-invalid={!!errors.organization}
                className="mt-1 block w-full"
              />
              {errors.organization && (
                <p className="text-red-500">{errors.organization.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="partnershipType"
                className="block text-sm font-medium text-gray-700"
              >
                Type of Partnership
              </label>
              <select
                id="partnershipType"
                {...register("partnershipType")}
                aria-invalid={!!errors.partnershipType}
                className="mt-1 block w-full rounded-md border-gray-300"
              >
                <option value="Solution Provider">Solution Provider</option>
                <option value="Distributor">Distributor</option>
                <option value="System Integrator">System Integrator</option>
                <option value="Managed Service Provider">
                  Managed Service Provider
                </option>
                <option value="Technology Partner">Technology Partner</option>
                <option value="Consultant">Consultant</option>
              </select>
              {errors.partnershipType && (
                <p className="text-red-500">{errors.partnershipType.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Why do you want to partner with JM-Qafri?
              </label>
              <Textarea
                id="message"
                {...register("message")}
                aria-invalid={!!errors.message}
                rows={4}
                className="mt-1 block w-full"
              />
              {errors.message && (
                <p className="text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="rounded bg-indigo-600 px-6 py-2 text-white transition duration-300 hover:bg-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
