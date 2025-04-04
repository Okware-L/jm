"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  yearsInBusiness: z.number().min(0, "Years must be 0 or greater").int(),
  tradeType: z.enum(["import", "export", "both"] as const),
  primaryProducts: z.string().min(2, "Please specify primary products"),
  annualTurnover: z.number().min(0, "Annual turnover must be 0 or greater"),
  keyMarkets: z.string().min(2, "Please specify key markets"),
  complianceCertifications: z.string().optional(),
  riskAssessment: z.enum(["low", "medium", "high"] as const),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function TraderDueDiligenceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data);
      toast.success("Due diligence information submitted successfully");
    } catch (error) {
      console.error("Error submitting due diligence information:", error);
      toast.error("Failed to submit due diligence information");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 pt-32 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Trader Due Diligence
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <Input
                id="companyName"
                {...register("companyName")}
                className="mt-1"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Registration Number
              </label>
              <Input
                id="registrationNumber"
                {...register("registrationNumber")}
                className="mt-1"
              />
              {errors.registrationNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.registrationNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="yearsInBusiness"
                className="block text-sm font-medium text-gray-700"
              >
                Years in Business
              </label>
              <Input
                id="yearsInBusiness"
                type="number"
                {...register("yearsInBusiness", { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.yearsInBusiness && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.yearsInBusiness.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trade Type
              </label>
              <RadioGroup defaultValue="import" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="import"
                    id="import"
                    {...register("tradeType")}
                  />
                  <Label htmlFor="import">Import</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="export"
                    id="export"
                    {...register("tradeType")}
                  />
                  <Label htmlFor="export">Export</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="both"
                    id="both"
                    {...register("tradeType")}
                  />
                  <Label htmlFor="both">Both</Label>
                </div>
              </RadioGroup>
              {errors.tradeType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tradeType.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="primaryProducts"
              className="block text-sm font-medium text-gray-700"
            >
              Primary Products
            </label>
            <Input
              id="primaryProducts"
              {...register("primaryProducts")}
              className="mt-1"
            />
            {errors.primaryProducts && (
              <p className="mt-1 text-sm text-red-600">
                {errors.primaryProducts.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="annualTurnover"
                className="block text-sm font-medium text-gray-700"
              >
                Annual Turnover ($)
              </label>
              <Input
                id="annualTurnover"
                type="number"
                {...register("annualTurnover", { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.annualTurnover && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.annualTurnover.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="keyMarkets"
                className="block text-sm font-medium text-gray-700"
              >
                Key Markets
              </label>
              <Input
                id="keyMarkets"
                {...register("keyMarkets")}
                className="mt-1"
              />
              {errors.keyMarkets && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.keyMarkets.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="complianceCertifications"
              className="block text-sm font-medium text-gray-700"
            >
              Compliance Certifications
            </label>
            <Input
              id="complianceCertifications"
              {...register("complianceCertifications")}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Risk Assessment
            </label>
            <RadioGroup defaultValue="low" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="low"
                  id="low"
                  {...register("riskAssessment")}
                />
                <Label htmlFor="low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="medium"
                  id="medium"
                  {...register("riskAssessment")}
                />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="high"
                  id="high"
                  {...register("riskAssessment")}
                />
                <Label htmlFor="high">High</Label>
              </div>
            </RadioGroup>
            {errors.riskAssessment && (
              <p className="mt-1 text-sm text-red-600">
                {errors.riskAssessment.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="additionalNotes"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Notes
            </label>
            <Textarea
              id="additionalNotes"
              {...register("additionalNotes")}
              className="mt-1"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Submit Due Diligence
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
